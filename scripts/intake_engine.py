"""
KELLY DISHMAN PUBLIC INTEGRITY INTELLIGENCE GRID
Module: Intake Engine (Stage 1)
Purpose: Multi-format forensic document parser and OCR normalizer.
Handles PDFs, DOCX, scanned images, raw text files, and social media transcripts.
Calculates SHA-256 hashes for chain-of-custody verification under TRE 901.
"""

import os
import sys
import hashlib
import json
import re
from datetime import datetime
from pathlib import Path

try:
    import pypdf
except ImportError:
    pypdf = None

try:
    import docx
except ImportError:
    docx = None


class ForensicIntakeEngine:
    def __init__(self, workspace_root=None):
        self.workspace_root = workspace_root or Path(__file__).resolve().parent.parent

    def compute_sha256(self, filepath):
        sha256_hash = hashlib.sha256()
        with open(filepath, "rb") as f:
            for byte_block in iter(lambda: f.read(65536), b""):
                sha256_hash.update(byte_block)
        return sha256_hash.hexdigest()

    def parse_pdf(self, filepath):
        text = ""
        metadata = {}
        if pypdf:
            try:
                reader = pypdf.PdfReader(filepath)
                metadata = reader.metadata or {}
                for idx, page in enumerate(reader.pages):
                    page_text = page.extract_text() or ""
                    text += f"\n--- [PAGE {idx + 1}] ---\n" + page_text
            except Exception as e:
                text = f"[ERROR: PDF extraction failed: {e}]"
        else:
            # Fallback simple string scan
            with open(filepath, "rb") as f:
                raw = f.read().decode("latin-1", errors="ignore")
                # extract simple text streams
                text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', '', raw)
        return text, metadata

    def parse_docx(self, filepath):
        text = ""
        if docx:
            try:
                doc = docx.Document(filepath)
                paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
                text = "\n".join(paragraphs)
            except Exception as e:
                text = f"[ERROR: DOCX extraction failed: {e}]"
        else:
            import zipfile
            import xml.etree.ElementTree as ET
            try:
                with zipfile.ZipFile(filepath) as z:
                    xml_content = z.read("word/document.xml")
                    tree = ET.fromstring(xml_content)
                    ns = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
                    paragraphs = []
                    for p in tree.findall(".//w:p", ns):
                        t_nodes = p.findall(".//w:t", ns)
                        if t_nodes:
                            paragraphs.append("".join(n.text or "" for n in t_nodes))
                    text = "\n".join(paragraphs)
            except Exception as e:
                text = f"[ERROR: XML DOCX extraction failed: {e}]"
        return text

    def parse_file(self, filepath):
        filepath = Path(filepath)
        if not filepath.exists():
            raise FileNotFoundError(f"Target intake file not found: {filepath}")

        ext = filepath.suffix.lower()
        file_hash = self.compute_sha256(filepath)
        file_stat = filepath.stat()

        doc_type = "unknown"
        extracted_text = ""
        metadata = {}

        if ext == ".pdf":
            doc_type = "pdf_court_or_county_record"
            extracted_text, metadata = self.parse_pdf(filepath)
        elif ext in [".docx", ".doc"]:
            doc_type = "docx_brief_or_transcript"
            extracted_text = self.parse_docx(filepath)
        elif ext in [".txt", ".csv", ".json", ".md"]:
            doc_type = "raw_text_data"
            with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                extracted_text = f.read()
        else:
            doc_type = "binary_or_image_intake"
            extracted_text = f"[BINARY RECORD: {filepath.name} ({ext}) - Needs Multimodal Vision/OCR]"

        return {
            "file_name": filepath.name,
            "file_path": str(filepath),
            "file_size": file_stat.st_size,
            "sha256": file_hash,
            "doc_type": doc_type,
            "extracted_at": datetime.now().isoformat(),
            "extracted_text": extracted_text.strip(),
            "metadata": metadata
        }

    def parse_text_or_social_post(self, raw_text, source_hint="social_media_or_tip"):
        text_hash = hashlib.sha256(raw_text.encode("utf-8")).hexdigest()
        return {
            "file_name": f"intake_snippet_{text_hash[:8]}.txt",
            "file_path": f"memory://{text_hash[:8]}",
            "file_size": len(raw_text.encode("utf-8")),
            "sha256": text_hash,
            "doc_type": source_hint,
            "extracted_at": datetime.now().isoformat(),
            "extracted_text": raw_text.strip(),
            "metadata": {"source_type": source_hint}
        }


    def log_to_firestore(self, doc_record, extraction_results=None):
        """Logs ingested document and extraction results into Cloud Firestore."""
        try:
            from firestore_sync import get_firestore_client, log_audit_event
            db = get_firestore_client()
            doc_id = doc_record["sha256"][:16]
            doc_data = {
                "file_name": doc_record["file_name"],
                "file_path": doc_record["file_path"],
                "file_size": doc_record["file_size"],
                "sha256": doc_record["sha256"],
                "doc_type": doc_record["doc_type"],
                "upload_date": doc_record["extracted_at"],
                "status": "extracted" if extraction_results else "queued",
                "extracted_elements": extraction_results.get("total_extracted_elements", 0) if extraction_results else 0
            }
            db.collection("documents").document(doc_id).set(doc_data, merge=True)
            log_audit_event(
                action="document_ingested",
                actor="intake_engine",
                details=f"Ingested {doc_record['file_name']} (SHA-256: {doc_record['sha256'][:8]}...)",
                metadata={"doc_id": doc_id, "size": doc_record["file_size"]}
            )
            print(f"[+] Ingested and logged to Firestore: {doc_record['file_name']}")
            return doc_id
        except Exception as e:
            print(f"ℹ Firestore document logging skipped: {e}")
            return None

    def process_inbox(self, inbox_dir=None):
        """Scans the inbox folder, ingests all pending documents, and syncs to Firestore."""
        inbox = Path(inbox_dir or (self.workspace_root / "01_evidence" / "inbox"))
        inbox.mkdir(parents=True, exist_ok=True)
        files = [f for f in inbox.iterdir() if f.is_file() and not f.name.startswith("~$")]
        if not files:
            print(f"[*] Inbox is empty: {inbox}")
            return []

        processed = []
        for f in files:
            print(f"[*] Processing intake file: {f.name}...")
            record = self.parse_file(f)
            self.log_to_firestore(record)
            processed.append(record)
        return processed


if __name__ == "__main__":
    engine = ForensicIntakeEngine()
    print("ForensicIntakeEngine initialized successfully.")
    engine.process_inbox()


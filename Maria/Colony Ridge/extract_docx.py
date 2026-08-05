import zipfile
import xml.etree.ElementTree as ET
import os

def read_docx(file_path):
    try:
        with zipfile.ZipFile(file_path) as docx:
            tree = ET.parse(docx.open('word/document.xml'))
            root = tree.getroot()
            paragraphs = []
            for paragraph in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
                texts = [node.text for node in paragraph.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text]
                if texts:
                    paragraphs.append(''.join(texts))
            return '\n'.join(paragraphs)
    except Exception as e:
        return f"Error reading {file_path}: {e}"

colony_ridge_path = r"C:\Users\kelly\My Drive\Maria\Colony Ridge"
scratch_dir = r"C:\Users\kelly\.gemini\antigravity\brain\7ff116f1-fadf-4d87-a09f-bb7eb529c682\scratch"

deed_file = os.path.join(colony_ridge_path, "Deed Tracker & Background — Liberty_colony Ridge (as Of Sep 7, 2025).docx")
master_report = os.path.join(colony_ridge_path, "Liberty_County_Campaign_Finance_Master_Report.docx")

deed_txt = read_docx(deed_file)
master_txt = read_docx(master_report)

with open(os.path.join(scratch_dir, "deed_tracker.txt"), "w", encoding="utf-8") as f:
    f.write(deed_txt)

with open(os.path.join(scratch_dir, "master_report.txt"), "w", encoding="utf-8") as f:
    f.write(master_txt)

print("Extraction completed successfully!")

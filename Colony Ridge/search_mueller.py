import os
import zipfile
import xml.etree.ElementTree as ET
import pypdf

def search_txt(path, term):
    try:
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            for i, line in enumerate(f, 1):
                if term in line.lower():
                    print(f"[TXT] {path}:{i} - {line.strip()}")
    except Exception:
        pass

def search_docx(path, term):
    try:
        with zipfile.ZipFile(path) as docx:
            tree = ET.parse(docx.open('word/document.xml'))
            root = tree.getroot()
            for i, paragraph in enumerate(root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'), 1):
                texts = [node.text for node in paragraph.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text]
                if texts:
                    p_text = ''.join(texts)
                    if term in p_text.lower():
                        print(f"[DOCX] {path}:p{i} - {p_text}")
    except Exception:
        pass

def search_pdf(path, term):
    try:
        reader = pypdf.PdfReader(path)
        for i, page in enumerate(reader.pages, 1):
            text = page.extract_text()
            if term in text.lower():
                print(f"[PDF] {path}:pg{i} - {text[:200].strip()}")
    except Exception:
        pass

term = "mueller"
paths_to_search = [r"C:\Users\kelly\My Drive", r"C:\Users\kelly\Projects"]

print(f"Searching for '{term}'...")
for base_path in paths_to_search:
    for root, dirs, files in os.walk(base_path):
        if any(p in root for p in [".git", ".cache", "AppData", "node_modules"]):
            continue
        for f in files:
            path = os.path.join(root, f)
            ext = os.path.splitext(f)[1].lower()
            if ext in ('.txt', '.md', '.json', '.csv', '.html'):
                search_txt(path, term)
            elif ext == '.docx':
                search_docx(path, term)
            elif ext == '.pdf':
                search_pdf(path, term)

print("Search finished.")

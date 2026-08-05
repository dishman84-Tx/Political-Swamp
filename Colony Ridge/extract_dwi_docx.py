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

dwi_path = r"C:\Users\kelly\My Drive\Working AI File\dwi-kelly-dishman"
scratch_dir = r"C:\Users\kelly\.gemini\antigravity\brain\149c7b72-20a4-4b46-9e57-7050705108c5\scratch"

files = [
    "EXTERNAL LITIGATION AUDIT  CONFIRMED VIDEO EVIDENC....docx",
    "Final Investigative Report  The Liberty County Cor....docx"
]

for filename in files:
    file_path = os.path.join(dwi_path, filename)
    txt_filename = filename.replace(".docx", ".txt")
    txt_path = os.path.join(scratch_dir, txt_filename)
    
    print(f"Extracting {filename}...")
    txt = read_docx(file_path)
    with open(txt_path, "w", encoding="utf-8") as f:
        f.write(txt)
    print(f"Saved to {txt_filename}")

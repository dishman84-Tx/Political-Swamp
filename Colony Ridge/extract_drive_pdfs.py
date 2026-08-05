import pypdf
import os

drive_path = r"C:\Users\kelly\My Drive"
scratch_dir = r"C:\Users\kelly\.gemini\antigravity\brain\149c7b72-20a4-4b46-9e57-7050705108c5\scratch"

# Let's list potential PDF files in My Drive that are related to Liberty County / Bergman
pdf_files = [
    "FINAL VULNERABILITY & NEXUS AUDIT  BERGMAN-HARKNES....pdf",
    "Make am external report from Kelly Dishman remove ....pdf",
    "2026-02-03_General_JAN 15 2026 REPORT_copy.pdf"
]

for filename in pdf_files:
    file_path = os.path.join(drive_path, filename)
    if not os.path.exists(file_path):
        # The filename in list_dir output might have been truncated with four dots in the string or actually named that way.
        # Let's search for files matching the prefix
        prefix = filename.split("..")[0]
        found = False
        for f in os.listdir(drive_path):
            if f.startswith(prefix) and f.endswith(".pdf"):
                file_path = os.path.join(drive_path, f)
                filename = f
                found = True
                break
        if not found:
            print(f"Could not find file matching {filename}")
            continue

    txt_filename = filename.replace(".pdf", ".txt")
    txt_path = os.path.join(scratch_dir, txt_filename)
    
    print(f"Extracting {filename}...")
    try:
        reader = pypdf.PdfReader(file_path)
        text_content = []
        for i, page in enumerate(reader.pages):
            text = page.extract_text()
            text_content.append(f"--- PAGE {i+1} --- \n{text}")
        
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write("\n".join(text_content))
        print(f"Saved to {txt_filename} (Pages: {len(reader.pages)})")
    except Exception as e:
        print(f"Error extracting {filename}: {e}")

print("Extraction complete.")

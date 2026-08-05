import pypdf
import os

colony_ridge_path = r"C:\Users\kelly\My Drive\Maria\Colony Ridge"
scratch_dir = r"C:\Users\kelly\.gemini\antigravity\brain\7ff116f1-fadf-4d87-a09f-bb7eb529c682\scratch"

pdf_files = [
    "David Hunter – Potential PAC Affiliations and Conflict-of-Interest Flags.pdf",
    "JENNIFER BERGMAN 01152025 CAMPAIGN.pdf",
    "RQ0372KP LIBERTY COUNTY COMMISIONER COURT.pdf",
    "RQ0550KP bruce commissioner liberty county legal.pdf",
    "bergman network graph.pdf"
]

for filename in pdf_files:
    file_path = os.path.join(colony_ridge_path, filename)
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
        print(f"Saved to {txt_filename} (Length: {len(text_content)} pages)")
    except Exception as e:
        print(f"Error extracting {filename}: {e}")

print("All PDF extractions completed.")

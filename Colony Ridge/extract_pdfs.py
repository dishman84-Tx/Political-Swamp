import pypdf
import os

# Base directory containing all PDFs and where extracted txt files will be saved
colony_ridge_path = r"C:/Users/kelly/My Drive/Working AI File/Colony Ridge"

# Dynamically discover all PDF files in the directory (ignore subdirectories)
pdf_files = [f for f in os.listdir(colony_ridge_path) if f.lower().endswith('.pdf')]

if not pdf_files:
    print("No PDF files found for extraction.")
else:
    for filename in pdf_files:
        file_path = os.path.join(colony_ridge_path, filename)
        txt_filename = filename.rsplit('.pdf', 1)[0] + '.txt'
        txt_path = os.path.join(colony_ridge_path, txt_filename)
        
        print(f"Extracting {filename}...")
        try:
            reader = pypdf.PdfReader(file_path)
            text_content = []
            for i, page in enumerate(reader.pages):
                text = page.extract_text() or ""
                text_content.append(f"--- PAGE {i+1} ---\n{text}")
            
            with open(txt_path, "w", encoding="utf-8") as f:
                f.write("\n".join(text_content))
            print(f"Saved to {txt_filename} (Length: {len(text_content)} pages)")
        except Exception as e:
            print(f"Error extracting {filename}: {e}")

print("All PDF extractions completed.")
import os

# Base path for all PDFs and output text files
colony_ridge_path = r"C:/Users/kelly/My Drive/Working AI File/Colony Ridge"

# List of PDF filenames to extract (including board meeting minutes)
pdf_files = [
    "David Hunter – Potential PAC Affiliations and Conflict-of-Interest Flags.pdf",
    "JENNIFER BERGMAN 01152025 CAMPAIGN.pdf",
    "RQ0372KP LIBERTY COUNTY COMMISIONER COURT.pdf",
    "RQ0550KP bruce commissioner liberty county legal.pdf",
    "bergman network graph.pdf",
    "2025-03-25-minutes.pdf",
    "_%20Montgomery%20County%20May%202025%20Road%20Bond%20Election%20-%20Order%20Calling%20Road%20Bond%20Election.pdf"
]

for filename in pdf_files:
    file_path = os.path.join(colony_ridge_path, filename)
    txt_filename = filename.replace(".pdf", ".txt")
    txt_path = os.path.join(colony_ridge_path, txt_filename)
    
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
import os

colony_ridge_path = r"C:\Users\kelly\My Drive\Working AI File\Colony Ridge"
scratch_dir = r"C:\Users\kelly\.gemini\antigravity\brain\149c7b72-20a4-4b46-9e57-7050705108c5\scratch"

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

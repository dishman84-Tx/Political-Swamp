import pypdf
import os

pdf_path = r"C:\Users\kelly\My Drive\Maria\2024.05.14 Agenda.Reg Mtg_gemini pid.pdf"
term = "mueller"

if os.path.exists(pdf_path):
    print("Searching agenda PDF for 'mueller'...")
    try:
        reader = pypdf.PdfReader(pdf_path)
        for i, page in enumerate(reader.pages, 1):
            text = page.extract_text()
            if term in text.lower():
                print(f"Match on page {i}:")
                for line in text.split("\n"):
                    if term in line.lower():
                        print("  ", line.strip())
    except Exception as e:
        print("Error reading PDF:", e)
else:
    print("File not found.")

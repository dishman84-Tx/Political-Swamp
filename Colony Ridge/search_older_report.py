import pypdf
import os

pdf_path = r"C:\Users\kelly\My Drive\Maria\older corruption report.pdf"
term = "mueller"

if os.path.exists(pdf_path):
    print("Searching older corruption report.pdf for 'mueller'...")
    try:
        reader = pypdf.PdfReader(pdf_path)
        print("Total pages:", len(reader.pages))
        for i, page in enumerate(reader.pages, 1):
            text = page.extract_text()
            if term in text.lower():
                print(f"Match on page {i}:")
                # print lines containing the term
                for line in text.split("\n"):
                    if term in line.lower():
                        print("  ", line.strip())
    except Exception as e:
        print("Error reading PDF:", e)
else:
    print("File not found.")

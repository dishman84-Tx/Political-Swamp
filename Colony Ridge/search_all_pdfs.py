import pypdf
import os

maria_path = r"C:\Users\kelly\My Drive\Maria"
term = "mueller"

print(f"Searching all PDFs in Maria directory for '{term}'...")
for f in os.listdir(maria_path):
    if f.endswith(".pdf"):
        path = os.path.join(maria_path, f)
        try:
            reader = pypdf.PdfReader(path)
            for i, page in enumerate(reader.pages, 1):
                text = page.extract_text()
                if term in text.lower():
                    print(f"[PDF MATCH] {f} pg{i}:")
                    for line in text.split("\n"):
                        if term in line.lower():
                            print("  ", line.strip())
        except Exception as e:
            pass
print("Completed PDF search.")

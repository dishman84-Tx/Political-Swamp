import pypdf
import os

maria_path = r"C:\Users\kelly\My Drive\Maria"
term = "mueller"

print(f"Searching voter lists for '{term}'...")
for f in os.listdir(maria_path):
    if "voter list" in f.lower() and f.endswith(".pdf"):
        path = os.path.join(maria_path, f)
        try:
            reader = pypdf.PdfReader(path)
            for i, page in enumerate(reader.pages, 1):
                text = page.extract_text()
                if term in text.lower():
                    print(f"[VOTER LIST] Match in {f} pg{i}: {text[:300]}")
        except Exception as e:
            print(f"Error reading {f}: {e}")

print("Voter list search completed.")

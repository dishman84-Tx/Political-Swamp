import os
import re
import requests
from urllib.parse import urljoin

# Target counties and base URLs for meeting minutes (public PDF archives)
TARGETS = {
    "Montgomery": "https://www.mctx.org/commcrt/minutes/2025/",  # example index URL (replace with actual if needed)
    "Harris": "https://www.harriscountytx.gov/board/minutes/2025/",
    "San_Jacinto": "https://www.sanjacintocounty.org/board/minutes/2025/",
    "Polk": "https://www.polk-county.com/board/minutes/2025/",
    "Brazoria": "https://www.brazoriacountytx.gov/board/minutes/2025/",
}

def download_pdfs(base_url, dest_dir):
    os.makedirs(dest_dir, exist_ok=True)
    try:
        resp = requests.get(base_url, timeout=10)
        resp.raise_for_status()
    except Exception as e:
        print(f"[ERROR] Could not fetch index page {base_url}: {e}")
        return
    # Find all hrefs ending with .pdf (simple regex)
    pdf_links = re.findall(r'href=["\']([^"\']+\.pdf)["\']', resp.text, re.IGNORECASE)
    for link in pdf_links:
        pdf_url = urljoin(base_url, link)
        filename = os.path.basename(pdf_url)
        out_path = os.path.join(dest_dir, filename)
        try:
            pdf_resp = requests.get(pdf_url, timeout=10)
            pdf_resp.raise_for_status()
            with open(out_path, "wb") as f:
                f.write(pdf_resp.content)
            print(f"[OK] Downloaded {pdf_url} -> {out_path}")
        except Exception as e:
            print(f"[ERROR] Failed to download {pdf_url}: {e}")

if __name__ == "__main__":
    root_dest = r"C:/Users/kelly/My Drive/Working AI File/Colony Ridge/Board Meetings"
    for county, url in TARGETS.items():
        county_dir = os.path.join(root_dest, county)
        print(f"Downloading PDFs for {county} from {url}")
        download_pdfs(url, county_dir)

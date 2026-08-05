import os, requests, urllib.parse

DEST_ROOT = r"C:/Users/kelly/My Drive/Working AI File/Colony Ridge/Board Meetings"
os.makedirs(DEST_ROOT, exist_ok=True)

PDF_URLS = [
    "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGshw_Yr4iLGgUJ6fAw3WsO96-HnR2CihEr8AOf44U3gune1iIzGLcvIdtk6CSsC0m3DJ1W1czBuRMCaS0RNNIWqYBHxanU8lgScRd0XlgvFBR3jxmRStUjSUIJAuuOl37NF_MbxUL3bYBjKAAERWbJaXicLnM=",
    "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHivQsHDIodqANxuKpq2F35yiZejWe0ByO5BLCPGyIf_7yWZCyMtA6ftF1jTXvlsmwsVfx45kjY-FvuipS9fRdiMLb1gJpoEN-0GqKco6Y9dh9-Tw5YfFGStrc5xDh5j6O=",
    "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFbX8F2DH22cRPGd6j8lnbbhqvvIiD9T70FqC5sHUBZiyFOeTZ6opDTZtFQyI1HPPVGYFO0ulwbcyBRQJB0XuowGLGPK1vmCv_F6HzpDCZxR2LP776IasdsOoxTNIWCxYSx-n38Knrd7CmOkly4OoZHShcIYHzHDM8GXXlrBZgCxNkR7MZNwjFnZODcmJGovAKrzUOs22tArhdT93cDShobwrMWEfM3ICabF9t1IJyAL3_I_N3xi9oYurXzkUBlFLQajKFnCHxlUFkPITF684VA"
]

def download_pdf(url, dest_dir, idx):
    try:
        resp = requests.get(url, timeout=15, allow_redirects=True)
        resp.raise_for_status()
        # Use the final URL after redirects to get a sensible filename
        final_url = resp.url
        parsed = urllib.parse.urlparse(final_url)
        filename = os.path.basename(parsed.path)
        if not filename.lower().endswith('.pdf'):
            # fallback to generic name if the URL does not end with .pdf
            filename = f"document_{idx}.pdf"
        out_path = os.path.join(dest_dir, filename)
        with open(out_path, "wb") as f:
            f.write(resp.content)
        print(f"[OK] downloaded {url} -> {out_path}")
    except Exception as e:
        print(f"[ERROR] {url}: {e}")

for i, u in enumerate(PDF_URLS, start=1):
    download_pdf(u, DEST_ROOT, i)

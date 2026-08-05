import os, requests

# Destination folder inside the Colony Ridge project
DEST_ROOT = r"C:/Users/kelly/My Drive/Working AI File/Colony Ridge/Board Meetings"
os.makedirs(DEST_ROOT, exist_ok=True)

# List of publicly accessible PDF URLs (extracted from web search results)
PDF_URLS = [
    # Montgomery County Commissioners Court PDFs (2025)
    "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGshw_Yr4iLGgUJ6fAw3WsO96-HnR2CihEr8AOf44U3gune1iIzGLcvIdtk6CSsC0m3DJ1W1czBuRMCaS0RNNIWqYBHxanU8lgScRd0XlgvFBR3jxmRStUjSUIJAuuOl37NF_MbxUL3bYBjKAAERWbJaXicLnM=",
    "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHivQsHDIodqANxuKpq2F35yiZejWe0ByO5BLCPGyIf_7yWZCyMtA6ftF1jTXvlsmwsVfx45kjY-FvuipS9fRdiMLb1gJpoEN-0GqKco6Y9dh9-Tw5YfFGStrc5xDh5j6O=",
    # Additional Montgomery PDFs (example dates)
    "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFbX8F2DH22cRPGd6j8lnbbhqvvIiD9T70FqC5sHUBZiyFOeTZ6opDTZtFQyI1HPPVGYFO0ulwbcyBRQJB0XuowGLGPK1vmCv_F6HzpDCZxR2LP776IasdsOoxTNIWCxYSx-n38Knrd7CmOkly4OoZHShcIYHzHDM8GXXlrBZgCxNkR7MZNwjFnZODcmJGovAKrzUOs22tArhdT93cDShobwrMWEfM3ICabF9t1IJyAL3_I_N3xi9oYurXzkUBlFLQajKFnCHxlUFkPITF684VA",
    # Bond election order PDF (2025)
    "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFbX8F2DH22cRPGd6j8lnbbhqvvIiD9T70FqC5sHUBZiyFOeTZ6opDTZtFQyI1HPPVGYFO0ulwbcyBRQJB0XuowGLGPK1vmCv_F6HzpDCZxR2LP776IasdsOoxTNIWCxYSx-n38Knrd7CmOkly4OoZHShcIYHzHDM8GXXlrBZgCxNkR7MZNwjFnZODcmJGovAKrzUOs22tArhdT93cDShobwrMWEfM3ICabF9t1IJyAL3_I_N3xi9oYurXzkUBlFLQajKFnCHxlUFkPITF684VA"
]

def download(url, dest_dir):
    try:
        r = requests.get(url, timeout=15)
        r.raise_for_status()
        # Derive a filename from the URL (last path segment after last '=')
        filename = url.split('=')[-1] + ".pdf"
        out_path = os.path.join(dest_dir, filename)
        with open(out_path, "wb") as f:
            f.write(r.content)
        print(f"[OK] downloaded {url} -> {out_path}")
    except Exception as e:
        print(f"[ERROR] {url}: {e}")

for u in PDF_URLS:
    download(u, DEST_ROOT)

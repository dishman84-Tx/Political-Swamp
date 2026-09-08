import urllib.request
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

url = 'https://www15.tceq.texas.gov/crpub/index.cfm?fuseaction=reg.Search'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

links = re.findall(r'<a[^>]*href="([^"]*)"[^>]*>(.*?)</a>', html, re.DOTALL)
for l, text in links:
    clean_t = re.sub(r'<[^>]+>', '', text).strip()
    if clean_t and ('search' in l.lower() or 'cust' in l.lower() or 'rn' in l.lower() or 'program' in l.lower()):
        print(f"{clean_t} -> {l}")

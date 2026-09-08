import urllib.request
import urllib.parse
import json
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

queries = [
    '"Wasteline Engineering"',
    '"Wasteline Engineering LLC"',
    '"Waste Line Engineering"',
    'site:bizapedia.com "Wasteline Engineering"',
    'site:opencorporates.com "Wasteline Engineering"',
    '"Wasteline" Texas "TCEQ"',
    '"Wasteline" Texas "MUD 15"'
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

for q in queries:
    url = 'https://html.duckduckgo.com/html/?q=' + urllib.parse.quote(q)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            # Extract links and snippets
            links = re.findall(r'<a class="result__snippet[^"]*"[^>]*href="([^"]*)"[^>]*>(.*?)</a>', html, re.DOTALL)
            if not links:
                # try alternative pattern
                links = re.findall(r'<a class="result__url"[^>]*href="([^"]*)"[^>]*>(.*?)</a>', html, re.DOTALL)
            
            snippets = re.findall(r'<a class="result__snippet"[^>]*>(.*?)</a>', html, re.DOTALL)
            titles = re.findall(r'<h2 class="result__title">.*?<a[^>]*>(.*?)</a>', html, re.DOTALL)
            
            print(f"=== QUERY: {q} ===")
            print(f"Titles found: {len(titles)}")
            for i in range(min(len(titles), 5)):
                t = re.sub(r'<[^>]+>', '', titles[i]).strip()
                s = re.sub(r'<[^>]+>', '', snippets[i]).strip() if i < len(snippets) else ''
                print(f"[{i+1}] {t}")
                print(f"    {s}")
            print()
    except Exception as e:
        print(f"Error on {q}: {e}")


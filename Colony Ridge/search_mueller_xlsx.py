import zipfile
import xml.etree.ElementTree as ET
import os

def search_xlsx(path, term):
    try:
        with zipfile.ZipFile(path) as xlsx:
            # Excel strings are usually stored in sharedStrings.xml
            try:
                tree = ET.parse(xlsx.open('xl/sharedStrings.xml'))
                root = tree.getroot()
                ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
                for i, si in enumerate(root.findall('ns:si', ns), 1):
                    # Text can be in <t> elements
                    t_nodes = si.findall('.//ns:t', ns)
                    text = "".join([t.text for t in t_nodes if t.text])
                    if term in text.lower():
                        print(f"[XLSX SharedString] {path}:s{i} - {text}")
            except Exception as e:
                pass
                
            # Let's also check individual sheets for inline strings or numbers (though shared strings covers 99% of text)
            # xl/worksheets/sheet1.xml, etc.
    except Exception as e:
        pass

term = "mueller"
paths = [
    r"C:\Users\kelly\My Drive\Maria\liberty_county_combined_master_tracker_2026-06-08.xlsx",
    r"C:\Users\kelly\My Drive\Maria\liberty_county_political_agenda_tracker_2026-06-08.xlsx",
    r"C:\Users\kelly\My Drive\Maria\LibertyCounty_MasterAudit.xlsx"
]

print(f"Searching xlsx files for '{term}'...")
for p in paths:
    if os.path.exists(p):
        search_xlsx(p, term)
print("Finished xlsx search.")

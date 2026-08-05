import os

search_dir = r"C:\Users\kelly\My Drive\Working AI File"
output_path = r"C:\Users\kelly\My Drive\Working AI File\cold_iron_search_results.txt"

results = []

print("Running search for 'cold iron'...")
for root, dirs, files in os.walk(search_dir):
    if ".git" in root or ".firebase" in root or "node_modules" in root:
        continue
    for file in files:
        if file.endswith((".html", ".js", ".css", ".json", ".txt", ".md", ".py")):
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read().lower()
                if "cold iron" in content or "cold_iron" in content:
                    idx = content.find("cold")
                    while idx != -1:
                        start = max(0, idx - 40)
                        end = min(len(content), idx + 80)
                        snippet = content[start:end].replace("\n", " ").strip()
                        results.append(f"Found match in {os.path.relpath(path, search_dir)} context: ...{snippet}...")
                        idx = content.find("cold", idx + 1)
            except Exception as e:
                pass

with open(output_path, "w", encoding="utf-8") as f:
    if results:
        f.write("\n".join(results))
        print("Done. Found matches.")
    else:
        f.write("No matches found.")
        print("Done. No matches.")

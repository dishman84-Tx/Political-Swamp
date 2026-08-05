import os
import re
import sys

def search_all_files(directory, pattern):
    compiled_pattern = re.compile(pattern, re.IGNORECASE)
    print(f"Searching for '{pattern}' in {directory}...")
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.txt', '.md', '.py', '.json', '.html')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                        for idx, line in enumerate(f, 1):
                            if compiled_pattern.search(line):
                                print(f"{file} (Line {idx}): {line.strip()[:150]}")
                except Exception as e:
                    print(f"Error reading {file}: {e}")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python search_all_files.py <pattern>")
    else:
        search_all_files("C:/Users/kelly/My Drive/Working AI File/Colony Ridge", sys.argv[1])

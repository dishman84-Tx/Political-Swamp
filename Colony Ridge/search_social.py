import sys
import re

def search_file(filepath, pattern):
    print(f"Searching for: {pattern}")
    compiled_pattern = re.compile(pattern, re.IGNORECASE)
    matches = 0
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        for idx, line in enumerate(f, 1):
            if compiled_pattern.search(line):
                print(f"Line {idx}: {line.strip()}")
                matches += 1
                if matches >= 100:
                    print("Reached limit of 100 matches.")
                    break
    print(f"Total matches: {matches}")

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python search_social.py <filepath> <pattern>")
    else:
        search_file(sys.argv[1], sys.argv[2])

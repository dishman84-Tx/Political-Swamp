import subprocess, os, json, glob

def run_script(script_path):
    print(f"Running {os.path.basename(script_path)}")
    result = subprocess.run(["python", script_path], capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error in {script_path}: {result.stderr}")
        raise RuntimeError(result.stderr)
    print(result.stdout)

def collect_txt_outputs(output_dir):
    data = []
    for txt_file in glob.glob(os.path.join(output_dir, "*.txt")):
        with open(txt_file, "r", encoding="utf-8") as f:
            data.append({"file": os.path.basename(txt_file), "content": f.read()})
    return data

def main():
    scratch = r"C:/Users/kelly/.gemini/antigravity/brain/149c7b72-20a4-4b46-9e57-7050705108c5/scratch"
    # Run existing extractors (they already output .txt files in the same scratch folder)
    for script in ["extract_docx.py", "extract_pdfs.py", "extract_dwi_docx.py", "extract_maria_docx.py"]:
        script_path = os.path.join(scratch, script)
        if os.path.exists(script_path):
            run_script(script_path)
        else:
            print(f"Skipping missing {script}")

    # Consolidate all txt outputs into a single JSON for downstream steps
    research_data = collect_txt_outputs(scratch)
    json_path = os.path.join(scratch, "research_data.json")
    with open(json_path, "w", encoding="utf-8") as jf:
        json.dump(research_data, jf, ensure_ascii=False, indent=2)
    print(f"Wrote consolidated data to {json_path}")

if __name__ == "__main__":
    main()

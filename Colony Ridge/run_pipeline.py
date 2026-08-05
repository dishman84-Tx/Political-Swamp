import subprocess, sys, os

def run_step(command, description):
    print(f"[START] {description}")
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    print(result.stdout)
    if result.returncode != 0:
        print(f"[ERROR] {description}: {result.stderr}", file=sys.stderr)
        sys.exit(result.returncode)
    print(f"[DONE] {description}\n")

def main():
    base_dir = r"C:/Users/kelly/My Drive/Working AI File/Colony Ridge"
    # Data extraction (placeholder scripts)
    run_step(f"python \"{base_dir}\..\\.gemini\\antigravity\\brain\\149c7b72-20a4-4b46-9e57-7050705108c5\\scratch\\data_extraction.py\"", "Data extraction")
    # Graph builder
    run_step(f"python \"{base_dir}\..\\.gemini\\antigravity\\brain\\149c7b72-20a4-4b46-9e57-7050705108c5\\scratch\\graph_builder.py\"", "Graph building")
    # Map generator
    run_step(f"python \"{base_dir}\..\\.gemini\\antigravity\\brain\\149c7b72-20a4-4b46-9e57-7050705108c5\\scratch\\map_generator.py\"", "Map generation")
    # Compile final report
    run_step(f"python \"{base_dir}\..\\.gemini\\antigravity\\brain\\149c7b72-20a4-4b46-9e57-7050705108c5\\scratch\\compile_report.py\"", "Report compilation")

if __name__ == "__main__":
    main()

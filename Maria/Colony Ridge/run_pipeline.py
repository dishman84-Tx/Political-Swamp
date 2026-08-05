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
    base_dir = r"C:/Users/kelly/My Drive/Maria/Colony Ridge"
    # Data extraction (placeholder scripts)
    run_step(f"python \"{base_dir}\..\\.gemini\\antigravity\\brain\\7ff116f1-fadf-4d87-a09f-bb7eb529c682\\scratch\\data_extraction.py\"", "Data extraction")
    # Graph builder
    run_step(f"python \"{base_dir}\..\\.gemini\\antigravity\\brain\\7ff116f1-fadf-4d87-a09f-bb7eb529c682\\scratch\\graph_builder.py\"", "Graph building")
    # Map generator
    run_step(f"python \"{base_dir}\..\\.gemini\\antigravity\\brain\\7ff116f1-fadf-4d87-a09f-bb7eb529c682\\scratch\\map_generator.py\"", "Map generation")
    # Compile final report
    run_step(f"python \"{base_dir}\..\\.gemini\\antigravity\\brain\\7ff116f1-fadf-4d87-a09f-bb7eb529c682\\scratch\\compile_report.py\"", "Report compilation")

if __name__ == "__main__":
    main()

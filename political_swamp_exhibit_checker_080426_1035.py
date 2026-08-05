# cold_iron_exhibit_checker.py
"""
Cold Iron Report Exhibit Integrity Validator
Parses C:/Users/kelly/My Drive/Maria/cold_iron_report.html for linked deeds, SVGs, and TPIA lists.
Checks path integrity to verify that every referenced file exists in the Maria/ folder.
"""

import os
import re
from urllib.parse import urlparse, unquote

def run_checker():
    report_path = r"C:\Users\kelly\My Drive\Maria\cold_iron_report.html"
    maria_dir = r"C:\Users\kelly\My Drive\Maria"
    
    if not os.path.exists(report_path):
        print(f"ERROR: Report file not found at {report_path}")
        return
        
    print(f"Analyzing exhibit integrity in: {report_path}")
    print(f"Reference directory: {maria_dir}\n")
    
    with open(report_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
        
    # Find all href and src links using regex
    links = re.findall(r'(?:href|src)\s*=\s*["\']([^"\']+)["\']', html_content)
    
    checked = 0
    passed = 0
    failed = []
    external = 0
    
    seen = set()
    
    for link in links:
        if link in seen:
            continue
        seen.add(link)
        
        # Check if it's an external URL (http, https, mailto) or internal anchor
        parsed = urlparse(link)
        if parsed.scheme in ('http', 'https', 'mailto') or link.startswith('#'):
            external += 1
            continue
            
        checked += 1
        
        # Handle file:// scheme or relative paths
        target_path = link
        if parsed.scheme == 'file':
            # Extract path from file:/// scheme
            target_path = unquote(parsed.path)
            # Remove leading slash on Windows if it looks like /C:/...
            if target_path.startswith('/') and len(target_path) > 2 and target_path[2] == ':':
                target_path = target_path[1:]
                
        # Resolve path
        if not os.path.isabs(target_path):
            # Treat as relative to the Maria directory
            full_path = os.path.abspath(os.path.join(maria_dir, target_path))
        else:
            full_path = os.path.abspath(target_path)
            
        # Verify existence
        if os.path.exists(full_path):
            passed += 1
            print(f"[PASS] Found: {os.path.basename(full_path)}")
        else:
            failed.append((link, full_path))
            print(f"[FAIL] Missing: {link} -> Resolved to: {full_path}")
            
    print("\n" + "="*40)
    print("EXHIBIT VERIFICATION SUMMARY")
    print("="*40)
    print(f"Total Local Exhibits Checked: {checked}")
    print(f"Verified (Present):           {passed}")
    print(f"Failed (Missing):             {len(failed)}")
    print(f"External Links (Ignored):     {external}")
    print("="*40)
    
    output_report = []
    output_report.append("=== COLD IRON EXHIBIT VERIFICATION ===")
    output_report.append(f"Checked: {checked} | Passed: {passed} | Failed: {len(failed)}")
    if failed:
        output_report.append("\nMISSING EXHIBITS:")
        for link, path in failed:
            output_report.append(f"- Link: {link} | Resolved: {path}")
    else:
        output_report.append("\nAll local referenced exhibits are present and verified.")
        
    output_report_path = r"C:\Users\kelly\My Drive\Working AI File\System Maintenance\exhibit_check_results.txt"
    with open(output_report_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(output_report))
    print(f"\nReport saved to: {output_report_path}")

if __name__ == '__main__':
    run_checker()

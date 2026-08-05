import sqlite3
import os

db_path = r"C:\Users\kelly\.openclaw\state\openclaw.sqlite"
if os.path.exists(db_path):
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # List tables
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = [row[0] for row in cursor.fetchall()]
        print("Tables:", tables)
        
        # Let's search all tables for "notion" or "secret" or "token"
        for table in tables:
            try:
                cursor.execute(f"PRAGMA table_info({table});")
                columns = [col[1] for col in cursor.fetchall()]
                
                # Check rows for notion or secrets
                cursor.execute(f"SELECT * FROM {table}")
                rows = cursor.fetchall()
                for row in rows:
                    row_str = str(row).lower()
                    if "notion" in row_str or "secret_" in row_str or "ntn_" in row_str:
                        print(f"Match in {table}:", row)
            except Exception as e:
                print(f"Error querying {table}: {e}")
                
        conn.close()
    except Exception as e:
        print("Error accessing sqlite DB:", e)
else:
    print("Database not found at", db_path)

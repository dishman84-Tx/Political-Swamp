import winreg

def get_env_from_reg():
    # User Environment
    try:
        key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, r"Environment")
        print("--- USER ENVIRONMENT REGISTRY ---")
        i = 0
        while True:
            try:
                name, value, val_type = winreg.EnumValue(key, i)
                print(f"{name} = {value}")
                i += 1
            except OSError:
                break
    except Exception as e:
        print("Error reading HKCU environment:", e)

    # System Environment
    try:
        key = winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, r"SYSTEM\CurrentControlSet\Control\Session Manager\Environment")
        print("\n--- SYSTEM ENVIRONMENT REGISTRY ---")
        i = 0
        while True:
            try:
                name, value, val_type = winreg.EnumValue(key, i)
                if "token" in name.lower() or "key" in name.lower() or "secret" in name.lower() or "notion" in name.lower():
                    print(f"{name} = {value}")
                i += 1
            except OSError:
                break
    except Exception as e:
        print("Error reading HKLM environment:", e)

get_env_from_reg()

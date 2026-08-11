import os

firebase_scripts = """    <!-- Firebase SDKs -->
    <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js"></script>
    <script src="js/firebase-init.js"></script>
    <script src="js/services/database.js"></script>
"""

for file in os.listdir("."):
    if file.endswith(".html"):
        with open(file, "r") as f:
            content = f.read()
        
        if "firebase-init.js" not in content and "<script src=\"script.js\"></script>" in content:
            content = content.replace('<script src="script.js"></script>', firebase_scripts + '    <script src="script.js"></script>')
            with open(file, "w") as f:
                f.write(content)
            print(f"Updated {file}")

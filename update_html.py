import os
import glob

mapping = {
    'fantaletteratura-dettagli.html': 'fantaletteratura',
    'rotta-eroi-dettagli.html': 'la-rotta-degli-eroi',
    'palestra-riflessione-dettagli.html': 'palestra-di-riflessione',
    'travel-agency.html': 'travel-agency',
    'quaderno-alternativo.html': 'il-mio-quaderno-alternativo',
    'corte-commedia-dettagli.html': 'la-corte-della-commedia',
    'ops-dettagli.html': 'ops'
}

for file, game_id in mapping.items():
    if os.path.exists(file):
        with open(file, 'r') as f:
            content = f.read()
        
        # Add data-game-id to <main> tag
        target = '<main '
        replacement = f'<main data-game-id="{game_id}" '
        if target in content and replacement not in content:
            content = content.replace(target, replacement, 1)
            with open(file, 'w') as f:
                f.write(content)
            print(f"Updated {file}")
        else:
            print(f"Skipped {file} (already updated or <main> not found)")
    else:
        print(f"File {file} not found")


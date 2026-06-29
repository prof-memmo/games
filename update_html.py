import re

files = ['archivio-giochi.html', 'giochi.html', 'condividi-esperienza.html']

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Replace occurrences of Palestra di Grammatica
    content = content.replace("Palestra di Grammatica", "Palestra di Riflessione")
    content = content.replace("palestra di grammatica", "palestra di riflessione")

    # Add the filter tab for Mito ed epica
    # Look for `<button class="filter-btn" data-filter="letteratura">Letteratura</button>`
    if 'data-filter="letteratura"' in content and 'data-filter="mito_epica"' not in content:
        filter_html = '<button class="filter-btn" data-filter="letteratura">Letteratura</button>\n                    <button class="filter-btn" data-filter="mito_epica">Mito ed epica</button>'
        content = content.replace('<button class="filter-btn" data-filter="letteratura">Letteratura</button>', filter_html)
    
    # Add the La rotta degli eroi card
    # Look for the end of Fantaletteratura card or just before <!-- Ops! --> or inside games-grid
    if 'data-materia="mito_epica"' not in content and 'games-grid' in content:
        card_html = """
                <!-- La rotta degli eroi -->
                <div class="game-card item" data-materia="mito_epica" data-title="La rotta degli eroi">
                    <div class="game-card-img"><img src="loghi/la-rotta-degli-eroi-logo.png" alt="La rotta degli eroi Logo"></div>
                    <div class="game-card-content">
                        <div class="game-card-cat">Mito ed epica</div>
                        <h3>La rotta degli eroi</h3>
                        <p>Affronta le missioni, accumula dracme e costruisci la tua base nel mondo epico e mitologico.</p>
                        <a href="https://prof-memmo.github.io/la-rotta-degli-eroi/" class="btn btn-primary">Vai al gioco ➜</a>
                    </div>
                </div>
"""
        # Insert after Fantaletteratura card ends
        # In archivio-giochi.html and giochi.html, Fantaletteratura card ends with </div>\n                </div>\n
        # Let's just insert it before <!-- Ops! -->
        content = content.replace('                <!-- Ops! -->', card_html + '                <!-- Ops! -->')

    with open(file, 'w') as f:
        f.write(content)

print("HTML updated successfully.")

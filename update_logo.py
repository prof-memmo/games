from PIL import Image, ImageDraw, ImageFont

img = Image.open('loghi/palestra-logo.png').convert('RGBA')
draw = ImageDraw.Draw(img)

# Blank out the entire bottom text area
draw.rectangle([(0, 650), (1024, 1024)], fill=(255, 255, 255, 255))

# Try to load a font
try:
    font_main = ImageFont.truetype("/System/Library/Fonts/Avenir Next.ttc", 70, index=1) # Bold
except IOError:
    try:
        font_main = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 70)
    except IOError:
        font_main = ImageFont.load_default()

# Text to draw
text_main = "PALESTRA DI RIFLESSIONE"

# Calculate text bounding box for centering
bbox_main = draw.textbbox((0, 0), text_main, font=font_main)
w_main = bbox_main[2] - bbox_main[0]
h_main = bbox_main[3] - bbox_main[1]

# Draw main text, slightly lower since there's no subtitle
x_main = (1024 - w_main) / 2
y_main = 740
draw.text((x_main, y_main), text_main, fill=(45, 20, 85, 255), font=font_main) # Dark purple

img.save('loghi/palestra-logo.png')
print("Logo updated successfully without subtitle.")

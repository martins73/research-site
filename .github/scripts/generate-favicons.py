#!/usr/bin/env python3
"""Generate PNG favicons from the current color theme in _config.yml.

Reads the active color_theme and author initials from _config.yml,
looks up the accent color in _data/theme/themes.yml, and writes
favicon-192.png and favicon-512.png to assets/logos/.

Dependencies: Pillow (pip install Pillow), PyYAML (pip install pyyaml)
"""

import os
import sys
import yaml
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.join(os.path.dirname(__file__), "..", "..")


def hex_to_rgb(hex_color):
    h = hex_color.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def load_config():
    with open(os.path.join(ROOT, "_config.yml")) as f:
        return yaml.safe_load(f)


def load_themes():
    with open(os.path.join(ROOT, "_data", "theme", "themes.yml")) as f:
        return yaml.safe_load(f)


def find_font():
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf",
        "/usr/share/fonts/TTF/DejaVuSans-Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for path in candidates:
        if os.path.exists(path):
            return path
    return None


def generate(size, accent_rgb, initials, out_path):
    img = Image.new("RGBA", (size, size), accent_rgb + (255,))
    draw = ImageDraw.Draw(img)

    font_path = find_font()
    font_size = int(size * 0.35)
    font = (
        ImageFont.truetype(font_path, font_size)
        if font_path
        else ImageFont.load_default()
    )

    bbox = draw.textbbox((0, 0), initials, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (size - tw) / 2 - bbox[0]
    y = (size - th) / 2 - bbox[1]
    draw.text((x, y), initials, fill=(255, 255, 255, 255), font=font)

    img.save(out_path)
    print(f"  {out_path} ({size}x{size})")


def main():
    config = load_config()
    themes = load_themes()

    theme_key = config.get("color_theme", "ucla")
    initials = config.get("author", {}).get("initials", "ME")
    accent_hex = themes[theme_key]["light"]["accent"]
    accent_rgb = hex_to_rgb(accent_hex)

    print(f"Theme: {theme_key}  Accent: {accent_hex}  Initials: {initials}")

    out_dir = os.path.join(ROOT, "assets", "logos")
    generate(512, accent_rgb, initials, os.path.join(out_dir, "favicon-512.png"))
    generate(192, accent_rgb, initials, os.path.join(out_dir, "favicon-192.png"))
    print("Done.")


if __name__ == "__main__":
    main()

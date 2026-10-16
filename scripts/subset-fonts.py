# Barlow Condensed for the site: one small WOFF2 per weight with just the characters the pages use (Latin, Bosnian,
# Croatian and German letters, typographic punctuation). The source is the Google Fonts subsets that
# @fontsource/barlow-condensed ships; hinting is dropped (it only matters on old desktop screens). The result is small
# enough to be embedded in the stylesheet, so text is set in the right face from the very first paint.
#
#   npm install --no-save @fontsource/barlow-condensed
#   python scripts/subset-fonts.py node_modules/@fontsource/barlow-condensed/files src/assets/fonts 700,800
#
# Needs fontTools and brotli (pip install fonttools brotli). The output is committed (src/assets/fonts); run this only
# when a character the site uses is missing from it.
import sys
from io import BytesIO

from fontTools import subset
from fontTools.merge import Merger
from fontTools.ttLib import TTFont

SRC, OUT = sys.argv[1], sys.argv[2]
WEIGHTS = [int(weight) for weight in sys.argv[3].split(',')]

UNICODES = (
    list(range(0x20, 0x7F))  # Basic Latin
    + [0xA0, 0xA9, 0xB0, 0xB7, 0xD7]  # no-break space, copyright, degree, middle dot, multiplication sign
    + [0xC4, 0xD6, 0xDC, 0xDF, 0xE4, 0xF6, 0xFC]  # German: Ä Ö Ü ß ä ö ü
    + [0x106, 0x107, 0x10C, 0x10D, 0x110, 0x111, 0x160, 0x161, 0x17D, 0x17E]  # Bosnian: Ć ć Č č Đ đ Š š Ž ž
    + [0x2013, 0x2014, 0x2018, 0x2019, 0x201A, 0x201C, 0x201D, 0x201E, 0x2022, 0x2026, 0x20AC]  # dashes, quotes, bullet, ellipsis, euro
)
FEATURES = ['kern', 'ccmp', 'locl', 'mark', 'mkmk', 'tnum', 'lnum']


def slim(path):
    options = subset.Options()
    options.layout_features = FEATURES
    options.hinting = False
    options.notdef_outline = True
    options.name_IDs = [1, 2, 3, 4, 6]
    options.drop_tables += ['DSIG', 'STAT', 'meta', 'gasp', 'prep', 'fpgm', 'cvt ', 'FFTM']
    font = TTFont(path)
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=UNICODES)
    subsetter.subset(font)
    buffer = BytesIO()
    font.save(buffer)
    return buffer.getvalue()


for weight in WEIGHTS:
    parts = []
    for kind in ('latin', 'latin-ext'):
        part = f'{OUT}/_part-{weight}-{kind}.ttf'
        with open(part, 'wb') as handle:
            handle.write(slim(f'{SRC}/barlow-condensed-{kind}-{weight}-normal.woff2'))
        parts.append(part)
    merged = Merger().merge(parts)
    merged.flavor = 'woff2'
    target = f'{OUT}/barlow-condensed-{weight}.woff2'
    merged.save(target)
    with open(target, 'rb') as handle:
        print(weight, len(handle.read()), 'bytes', len(TTFont(target).getBestCmap()), 'characters')

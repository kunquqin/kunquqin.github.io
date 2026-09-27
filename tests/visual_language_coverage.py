"""Run after npm run build. Fail when visual portfolio copy lacks English text."""
import json
import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TRANSLATIONS = json.loads((ROOT / 'source/_data/visual_i18n.json').read_text(encoding='utf-8-sig'))
PROJECTS = ['rayban-tmall', 'ocean-engine', 'eleme-pacman', 'epo', 'zstar', 'dewu', 'su7', 'iphone17-pro', 'mimo', 'meowbreak']


class CopyParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.skip = 0
        self.strings = set()

    def add(self, value):
        if value and re.search(r'[\u4e00-\u9fff]', value):
            self.strings.add(value.strip())

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self.skip += 1
        for key, value in attrs:
            if key in ('alt', 'aria-label', 'aria-roledescription', 'title', 'placeholder', 'data-tooltip', 'data-copy', 'data-title', 'data-description', 'data-paint-copy', 'data-alt'):
                self.add(value)

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.skip -= 1

    def handle_data(self, value):
        if not self.skip:
            self.add(value)


for role, projects in [('visual-designer', PROJECTS), ('creative-visual-designer', PROJECTS)]:
    for slug in [''] + projects:
        path = ROOT / 'public' / role / (f'projects/{slug}' if slug else '') / 'index.html'
        parser = CopyParser()
        html = path.read_text(encoding='utf-8')
        parser.feed(html)
        missing = parser.strings - TRANSLATIONS.keys() - {'中文', 'Language / 语言'}
        assert not missing, f'{role}/{slug}: missing translations: {sorted(missing)}'
        assert 'id="visual-translations"' in html, f'{slug}: language data missing'
        assert 'data-language="en"' in html, f'{slug}: language control missing'
    home = (ROOT / 'public' / role / 'index.html').read_text(encoding='utf-8')
    project_links = re.findall(r'class="featured-card[^"\n]*" href="([^"#?]+)', home)
    expected = [f'/{role}/projects/{slug}/' for slug in projects]
    assert project_links == expected, (role, project_links, expected)
    for index, slug in enumerate(projects):
        html = (ROOT / 'public' / role / 'projects' / slug / 'index.html').read_text(encoding='utf-8')
        next_href = f'/{role}/projects/{projects[(index + 1) % len(projects)]}/'
        assert next_href in html, (role, slug, 'next project')
        assert re.search(r'href="/visual-designer/', html) is None if role == 'creative-visual-designer' else True

for role in ['alljobs', '3d', '3d-character', 'ai-native-builder', 'brand-creative']:
    html = (ROOT / 'public' / role / 'index.html').read_text(encoding='utf-8')
    assert 'id="visual-translations"' not in html, f'{role}: language feature leaked into another role'

assert all(value.strip() and not re.search(r'[\u4e00-\u9fff]', value) for value in TRANSLATIONS.values())
print(f'PASS: 22 bilingual pages, {len(TRANSLATIONS)} translations, 5 other roles unchanged.')

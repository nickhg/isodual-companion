# The isodual constant: a companion

A picture-led companion to

> Nick Howgrave-Graham, *The isodual constant of the LLL potential: exact values and structure* (2026),
> [Cryptology ePrint Archive 2026/2846](https://eprint.iacr.org/2026/2846).

Site: <https://nickhg.github.io/isodual-companion/>. Certificates and code: <https://github.com/nickhg/isodual_constant>.

## Preview it locally

You need Python 3 with the `venv` module. On Debian or a Chromebook's Linux, that is `sudo apt install python3-venv` once.

```
cd isodual-companion
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/mkdocs serve
```

Then open <http://localhost:8000> in a browser. The page reloads by itself when you save a file under `docs/`.
Stop the server with Ctrl-C. Before committing, `.venv/bin/mkdocs build --strict` checks that every internal link resolves.

## How it is published

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it with GitHub Pages.
The repository's *Settings → Pages → Source* must be set to **GitHub Actions** (once). The Actions tab shows each run.

## Layout

- `docs/*.md`: the chapters (Markdown, maths between `$…$` or `$$…$$`).
- `docs/assets/widgets/`: one ES module per interactive figure, plus `loader.js` and `common.js`. A page embeds
  `<div class="widget" data-widget="NAME" data-config='{…}'></div>`.
- `docs/assets/vendor/`: three.js r180 and KaTeX 0.16.22, vendored so the site needs no CDN.
- `docs/assets/data/`: the geodesic data, converted from the certificate repository.
- `includes/abbreviations.md`: the hover definitions of lattice names, appended to every page.
- `NOTES.md`: sources for each chapter and the points to check.

Text CC BY 4.0, code MIT (see `LICENSE`).

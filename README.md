# Luke Anderson’s portfolio

The Developer’s Realm is a static portfolio and playable top-down pixel-art world, with an accessible Classic Mode. Game and Classic Mode share the content in `game/src/content.js`.

- `/` and `/index.html` are the main entry points. `/game/` remains available.
- `/portfolio.html` is the illustrated portfolio, with standalone project pages at their existing URLs.
- `/legacy/` preserves the previously published portfolio and its project pages.
- `/game/assets/UTAustinResume2.pdf` is the current software résumé download.

Run `python3 -m http.server 8000` from the repository root and open `http://localhost:8000/`. There is no build step. GitHub Pages serves the repository under `/portfolio_website/`. See [game/README.md](game/README.md) for game controls and layout.

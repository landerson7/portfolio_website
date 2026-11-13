# The Developer’s Realm

A standalone pixel-art portfolio game for Luke Anderson. Game Mode and Classic Mode read the same content in `src/content.js`. All game files and dependencies are inside this folder.

## Run locally

From the repository root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/game/`. To serve the game independently, run the same command from inside `game/` and open `http://localhost:8000/`. Use `?mode=game` or `?mode=classic` for a direct link to a mode. A static server is required for browser module imports. There are no packages to install and no build command.

## Play

- Move with WASD or arrow keys. Walk through the four exits at the Crossroads to change areas.
- Press E or Enter near a highlighted hotspot. Every visible marker also responds to click or tap.
- Press M or select World Map to travel directly. The sidebar lists destinations and shortcuts for the current area.
- Close a panel with Escape or its close button. Mobile opens in Classic Mode and offers a directional pad in Game Mode.

## Files

- `index.html` and `styles.css` define the game shell, portfolio modes, panels and responsive layouts.
- `src/main.js` handles movement input, camera, travel, dialog focus and mode switching.
- `src/world.js` defines room geometry, collisions, portals and hotspots.
- `src/art.js` draws the layered overhead rooms and animates the avatar and residents.
- `src/content.js` stores the shared portfolio facts. `src/view.js` renders the accessible HTML.
- `assets/` contains the palette-reduced scene thumbnails, sprites, fonts and standalone résumé. See `assets/CREDITS.md`.

## GitHub Pages

The public Pages deployment reports a successful deployment of commit `a1fa232` from `main`. The live root HTML matches the root file from that commit, and the repository has no custom Pages workflow. The publishing-folder setting requires repository access to inspect directly. See the [deployment record](https://github.com/landerson7/portfolio_website/actions/runs/18150172513).

When authorized, verify **Settings → Pages** uses the root of the intended source branch, then commit only `game/` and push or merge into that source branch. The main address is `https://landerson7.github.io/portfolio_website/`; the game also works at `/game/` under that base. If the configured source excludes `game/`, keep the existing publishing setup and agree on a separate preview or deployment before changing it.

## Content and art

The main site opens the Realm, and the original portfolio is preserved at `/legacy/`. Content draws first from the Georgia Tech résumé, then the original site for additional roles, projects, and coursework. The UT Austin graduate program dates were supplied separately. The public software résumé download is `assets/UTAustinResume2.pdf`.

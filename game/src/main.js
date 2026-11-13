import { scenes, nearbySpot, walk } from "./world.js";
import { paintScene, paintPlayer, paintResidents, pixelScale } from "./art.js";
import { classicMarkup, contactLinks, destinationCards, panelMarkup } from "./view.js";

const game = document.querySelector("#game");
const classic = document.querySelector("#classic");
const screen = document.querySelector("#game-screen");
const canvas = document.querySelector("#world");
const ctx = canvas.getContext("2d");
const markers = document.querySelector("#hotspots");
const roomLinks = document.querySelector("#room-links");
const areaButton = document.querySelector(".area-button");
const dialog = document.querySelector("#panel");
const panelTitle = document.querySelector("#panel-title");
const panelContent = document.querySelector("#panel-content");
const closeButton = document.querySelector("#close-panel");
const interactButton = document.querySelector("#touch-interact");
const prompt = document.querySelector("#prompt");
const motion = matchMedia("(prefers-reduced-motion: reduce)");
const controls = new Map([
  ["w", "up"],
  ["a", "left"],
  ["s", "down"],
  ["d", "right"],
  ["arrowup", "up"],
  ["arrowleft", "left"],
  ["arrowdown", "down"],
  ["arrowright", "right"],
]);
const pressed = new Map();
const scenery = new Map();
const art = { sprites: new Image(), terrain: new Image() };
const viewport = { x: 0, y: 0, w: 480, h: 320 };

let mode;
let locationId = "crossroads";
let player = { ...scenes.crossroads.spawn, direction: "down" };
let renderedMarkers = [];
let animation = 0;
let previousTime = 0;
let stride = 0;
let focusReturn;
let focusWorldOnClose = false;
let nearby = null;
let lastResidentFrame = -1;
let dirty = true;
let markerLayout = "";

const siteRoot = new URL("../../", import.meta.url);
document.querySelector("#header-links").innerHTML =
  contactLinks() +
  `<a class="site-version" href="${new URL("legacy/", siteRoot).href}"><span class="link-mark" aria-hidden="true">◈</span><span>Legacy</span></a>`;
document.querySelector("#destination-list").innerHTML = destinationCards();

function focusWorld() {
  screen.focus({ preventScroll: true });
}

function schedule() {
  if (!animation && mode === "game" && !document.hidden && !dialog.open) {
    animation = requestAnimationFrame(frame);
  }
}

function cancelInput() {
  pressed.clear();
  document.querySelectorAll("[data-direction].held").forEach((button) => button.classList.remove("held"));
  previousTime = 0;
}

function changeMode(next, focus = false) {
  if (next === mode) {
    if (focus && next === "game") focusWorld();
    return;
  }
  mode = next;
  document.documentElement.dataset.mode = mode;
  game.hidden = mode !== "game";
  classic.hidden = mode !== "classic";
  if (mode === "classic" && !classic.hasChildNodes()) classic.innerHTML = classicMarkup();
  document
    .querySelectorAll(".mode-switch [data-mode]")
    .forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.mode === mode)));
  cancelInput();
  if (mode === "game") {
    window.scrollTo(0, 0);
    if (!art.sprites.getAttribute("src")) {
      art.sprites.src = new URL("../assets/realm-atlas.webp", import.meta.url).href;
      art.terrain.src = new URL("../assets/realm-terrain.webp", import.meta.url).href;
    }
    if (!renderedMarkers.length) renderMarkers();
    if (focus) focusWorld();
    dirty = true;
    schedule();
  } else {
    cancelAnimationFrame(animation);
    animation = 0;
    if (focus) document.querySelector("#classic-title").scrollIntoView({ block: "nearest" });
  }
}

function renderMarkers() {
  const scene = scenes[locationId];
  document.querySelector("#location-name").textContent = scene.title;
  document.querySelector("#scene-purpose").textContent = scene.purpose;
  markers.replaceChildren();
  markerLayout = "";
  roomLinks.replaceChildren();
  for (const spot of scene.hotspots) {
    if (spot.key.startsWith("travel.") || spot.key === "map") continue;
    const shortcut = document.createElement("button");
    shortcut.type = "button";
    shortcut.className = "button";
    shortcut.dataset.open = spot.key;
    shortcut.textContent = spot.label;
    roomLinks.append(shortcut);
  }
  if (locationId === "lab") {
    const allProjects = document.createElement("button");
    allProjects.type = "button";
    allProjects.className = "button blue";
    allProjects.dataset.open = "projects";
    allProjects.textContent = "All Projects";
    roomLinks.append(allProjects);
  }
  roomLinks.hidden = !roomLinks.childElementCount;
  areaButton.hidden = roomLinks.hidden;
  document.querySelector("#room-title").hidden = roomLinks.hidden;
  renderedMarkers = scene.hotspots.map((spot) => {
    const button = document.createElement("button");
    const [section, target] = spot.key.split(".");
    button.type = "button";
    button.className = "hotspot";
    button.setAttribute("aria-label", spot.label);
    if (section === "travel") button.dataset.travel = target;
    else button.dataset.open = spot.key;
    const label = document.createElement("span");
    label.textContent = spot.label;
    button.append(label);
    markers.append(button);
    return { spot, button };
  });
  nearby = null;
  prompt.hidden = true;
  interactButton.disabled = true;
  markDestination();
}

function markDestination() {
  document.querySelectorAll("#destination-list [data-travel]").forEach((button) => {
    if (button.dataset.travel === locationId) button.setAttribute("aria-current", "location");
    else button.removeAttribute("aria-current");
  });
}

function travel(id, focus = true) {
  if (!scenes[id]) return;
  const last = locationId;
  const scene = scenes[id];
  locationId = id;
  player = { ...(scene.arrivals?.[last] || scene.spawn), direction: "down" };
  cancelInput();
  renderMarkers();
  if (dialog.open) {
    focusWorldOnClose = true;
    dialog.close();
  } else if (focus) {
    focusWorld();
  }
  dirty = true;
  schedule();
}

function showPanel(key, trigger) {
  const { title, body } =
    key === "area"
      ? { title: scenes[locationId].title, body: '<div class="area-links">' + roomLinks.innerHTML + "</div>" }
      : panelMarkup(key);
  panelTitle.textContent = title;
  panelContent.innerHTML = body;
  panelContent.scrollTop = 0;
  if (!dialog.open) {
    focusReturn = trigger;
    cancelInput();
    cancelAnimationFrame(animation);
    animation = 0;
    dialog.showModal();
  }
  closeButton.focus();
}

function interact(spot, trigger = screen) {
  if (!spot) return;
  const [section, target] = spot.key.split(".");
  if (section === "travel") travel(target);
  else showPanel(spot.key, trigger);
}

function setViewport(scene) {
  const aspect = screen.clientWidth / screen.clientHeight;
  if (!Number.isFinite(aspect) || aspect <= 0) return false;
  viewport.h = Math.round(Math.min(scene.height, scene.width / aspect));
  viewport.w = Math.round(Math.min(scene.width, viewport.h * aspect));
  viewport.x = Math.round(Math.max(0, Math.min(scene.width - viewport.w, player.x - viewport.w / 2)));
  viewport.y = Math.round(Math.max(0, Math.min(scene.height - viewport.h, player.y - viewport.h / 2)));
  const width = viewport.w * pixelScale;
  const height = viewport.h * pixelScale;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  return true;
}

function positionMarkers() {
  const layout = [screen.clientWidth, screen.clientHeight, viewport.x, viewport.y, nearby?.key].join(",");
  if (layout === markerLayout) return;
  markerLayout = layout;
  const scaleX = screen.clientWidth / viewport.w;
  const scaleY = screen.clientHeight / viewport.h;
  for (const { spot, button } of renderedMarkers) {
    const x = spot.x - viewport.x,
      y = spot.y - viewport.y;
    button.hidden = x + spot.w <= 0 || x >= viewport.w || y + spot.h <= 0 || y >= viewport.h;
    if (button.hidden) continue;
    const min = 44;
    const left = Math.max(0, x * scaleX),
      right = Math.min(screen.clientWidth, (x + spot.w) * scaleX);
    const top = Math.max(0, y * scaleY),
      bottom = Math.min(screen.clientHeight, (y + spot.h) * scaleY);
    const width = Math.max(min, right - left),
      height = Math.max(min, bottom - top);
    const targetLeft = Math.max(0, Math.min(screen.clientWidth - width, (left + right - width) / 2));
    const targetTop = Math.max(0, Math.min(screen.clientHeight - height, (top + bottom - height) / 2));
    button.style.left = `${targetLeft}px`;
    button.style.top = `${targetTop}px`;
    button.style.width = `${width}px`;
    button.style.height = `${height}px`;
    const labelWidth = button.firstElementChild.offsetWidth;
    const centered = targetLeft + (width - labelWidth) / 2;
    const labelLeft = Math.max(3, Math.min(screen.clientWidth - labelWidth - 3, centered));
    button.style.setProperty("--label-shift", `${labelLeft - centered}px`);
    button.classList.toggle("nearby", spot === nearby);
  }
}

function draw(time, moving) {
  const scene = scenes[locationId];
  if (!setViewport(scene)) return;
  if (!scenery.has(locationId)) scenery.set(locationId, paintScene(locationId, scene, art));
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    scenery.get(locationId),
    viewport.x * pixelScale,
    viewport.y * pixelScale,
    canvas.width,
    canvas.height,
    0,
    0,
    canvas.width,
    canvas.height,
  );
  ctx.save();
  ctx.scale(pixelScale, pixelScale);
  ctx.translate(-viewport.x, -viewport.y);
  paintResidents(ctx, locationId, time, motion.matches, art);
  paintPlayer(ctx, player, Math.floor(stride / 8), moving && !motion.matches, art);
  ctx.restore();
  const nextSpot = nearbySpot(scene, player);
  if (nearby !== nextSpot) {
    nearby = nextSpot;
    prompt.hidden = !nearby;
    prompt.textContent = nearby ? nearby.label : "";
    interactButton.disabled = !nearby;
  }
  positionMarkers();
}

function frame(time) {
  animation = 0;
  if (mode !== "game" || dialog.open) return;
  const dt = previousTime ? Math.min((time - previousTime) / 1000, 0.033) : 0;
  previousTime = time;
  const directions = [...pressed.values()];
  const x = Number(directions.includes("right")) - Number(directions.includes("left"));
  const y = Number(directions.includes("down")) - Number(directions.includes("up"));
  let moving = false;
  if (x || y) {
    player.direction = directions.findLast(
      (direction) =>
        direction === (x > 0 ? "right" : x < 0 ? "left" : "") ||
        direction === (y > 0 ? "down" : y < 0 ? "up" : ""),
    );
    const speed = (116 * dt) / (x && y ? Math.SQRT2 : 1);
    const oldX = player.x,
      oldY = player.y;
    const exit = walk(scenes[locationId], player, speed * x, speed * y);
    moving = oldX !== player.x || oldY !== player.y;
    if (moving) stride += Math.hypot(player.x - oldX, player.y - oldY);
    dirty = true;
    if (exit) {
      travel(exit, document.activeElement === screen);
      return;
    }
  }
  const residentsAnimate = !motion.matches && ["crossroads", "home", "academy"].includes(locationId);
  const residentFrame = Math.floor(time / 140);
  if (dirty || (residentsAnimate && lastResidentFrame !== residentFrame)) {
    draw(time, moving);
    lastResidentFrame = residentFrame;
    dirty = false;
  }
  if (pressed.size || residentsAnimate) schedule();
  else previousTime = 0;
}

function onKeyDown(event) {
  if (mode !== "game" || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
  const key = event.key.toLowerCase();
  if (dialog.open) {
    if (key === "escape") {
      event.preventDefault();
      dialog.close();
    }
    return;
  }
  if (event.target.closest("input, textarea, select, [contenteditable]")) return;
  const direction = controls.get(key);
  const onControl = event.target.closest("a, button, summary");
  if (direction && (!onControl || screen.contains(event.target))) {
    event.preventDefault();
    pressed.set(key, direction);
    schedule();
  } else if (!event.repeat && key === "m") {
    event.preventDefault();
    showPanel("map", document.activeElement === document.body ? screen : document.activeElement);
  } else if (!event.repeat && (key === "e" || (key === "enter" && !onControl)) && nearby) {
    event.preventDefault();
    interact(nearby, document.activeElement === document.body ? screen : document.activeElement);
  }
}

function releaseDirection(id) {
  if (pressed.delete(id)) {
    dirty = true;
    schedule();
  }
}

document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", (event) => releaseDirection(event.key.toLowerCase()));
window.addEventListener("blur", () => {
  cancelInput();
  dirty = true;
  schedule();
});
document.addEventListener("visibilitychange", () => {
  cancelInput();
  dirty = true;
  schedule();
});
motion.addEventListener("change", () => {
  dirty = true;
  schedule();
});

document.querySelectorAll("[data-direction]").forEach((button) => {
  button.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    button.setPointerCapture(event.pointerId);
    pressed.set(event.pointerId, button.dataset.direction);
    button.classList.add("held");
    schedule();
  });
  for (const name of ["pointerup", "pointercancel", "lostpointercapture"]) {
    button.addEventListener(name, (event) => {
      releaseDirection(event.pointerId);
      button.classList.remove("held");
    });
  }
  button.addEventListener("click", (event) => {
    if (event.detail !== 0 || dialog.open) return;
    const direction = button.dataset.direction;
    const x = direction === "left" ? -11 : direction === "right" ? 11 : 0;
    const y = direction === "up" ? -11 : direction === "down" ? 11 : 0;
    player.direction = direction;
    // Use small steps so a keyboard-activated control obeys the same collision.
    for (let n = 0; n < 4; n++) {
      const exit = walk(scenes[locationId], player, x / 4, y / 4);
      if (exit) {
        travel(exit);
        return;
      }
    }
    dirty = true;
    schedule();
  });
});
interactButton.addEventListener("click", () => interact(nearby, interactButton));

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.mode) changeMode(button.dataset.mode, true);
  if (button.dataset.open) showPanel(button.dataset.open, button);
  if (button.dataset.travel) travel(button.dataset.travel);
});
closeButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  dialog.close();
});
dialog.addEventListener("close", () => {
  if (focusWorldOnClose || !focusReturn?.getClientRects().length) focusWorld();
  else focusReturn.focus({ preventScroll: true });
  focusReturn = null;
  focusWorldOnClose = false;
  dirty = true;
  schedule();
});
new ResizeObserver(() => {
  dirty = true;
  schedule();
}).observe(screen);

for (const image of Object.values(art)) {
  image.addEventListener("load", () => {
    scenery.clear();
    dirty = true;
    schedule();
  });
}

const oldSections = {
  "#home": "#classic-title",
  "#projects": "#classic-projects",
  "#skills": "#classic-skills",
  "#work-experience": "#classic-experience",
  "#education": "#classic-education",
  "#coursework": "#classic-coursework",
  "#contact": "#classic-contact",
};
const requestedMode = new URLSearchParams(location.search).get("mode");
const sectionHash = oldSections[location.hash] ?? location.hash;
const classicSection = sectionHash.startsWith("#classic-");
changeMode(
  requestedMode === "game" || requestedMode === "classic"
    ? requestedMode
    : classicSection || matchMedia("(max-width: 700px), (pointer: coarse)").matches
      ? "classic"
      : "game",
);
if (classicSection && mode === "classic") {
  if (sectionHash === "#classic-coursework") document.querySelector("#classic-coursework").open = true;
  document.getElementById(sectionHash.slice(1))?.scrollIntoView();
}

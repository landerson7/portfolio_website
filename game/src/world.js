import { areas, contentTitle } from "./content.js";

const point = (x, y) => ({ x, y });
const rect = (x, y, w, h) => ({ x, y, w, h });
const spot = (key, x, y, w, h, label) => ({
  ...rect(x, y, w, h),
  key,
  label: label || contentTitle(key),
});
const door = (to, x, y, w, h) => ({ ...rect(x, y, w, h), to });
const area = Object.fromEntries(areas.map((entry) => [entry.id, entry]));

const labHeight = 778;
const labEntrance = 356;
const labTools = spot("skills", labEntrance - 6, labHeight - 100, 138, 36);
const labStations = [
  ["sidecraftx", "sidecraft", "#e39942"],
  ["pegasus", "avionics", "#28ecce"],
  ["tradingBot", "trading", "#b74aff"],
  ["portfolio", "portfolio", "#4596ff"],
  ["fitLink", "portfolio", "#51ce8f"],
  ["sipMwi", "power", "#a181ff"],
  ["goNotion", "sidecraft", "#d6bd80"],
  ["rangeFinder", "avionics", "#6ad6f4"],
  ["planner", "portfolio", "#66a9ee"],
  ["theater", "trading", "#e292b1"],
  ["universityRecords", "desk", "#b8d07b"],
  ["flipFlop", "crate", "#ed8e66"],
  ["quantumFourier", "power", "#bd8cf4"],
].map(([project, sprite, glow], index) => ({
  ...spot(`projects.${project}`, index % 2 === 0 ? 91 : 422, 599 - Math.floor(index / 2) * 74, 143, 43),
  sprite,
  glow,
  shortcut: index < 4,
}));

export const scenes = {
  crossroads: {
    title: "Crossroads",
    purpose: "The four paths meet here",
    width: 480,
    height: 320,
    spawn: point(239, 159),
    arrivals: {
      academy: point(239, 38),
      lab: point(441, 159),
      village: point(239, 282),
      home: point(36, 159),
    },
    doors: [
      door("academy", 216, 0, 48, 15),
      door("lab", 465, 138, 15, 44),
      door("village", 216, 305, 48, 15),
      door("home", 0, 138, 15, 44),
    ],
    hotspots: [
      spot("map", 220, 106, 40, 30, "Crossroads sign"),
      spot("travel.academy", 258, 18, 48, 27, area.academy.name),
      spot("travel.lab", 407, 108, 57, 27, area.lab.name),
      spot("travel.village", 263, 271, 57, 27, area.village.name),
      spot("travel.home", 17, 108, 62, 27, area.home.name),
    ],
    blocks: [
      rect(220, 106, 40, 22),
      rect(261, 19, 39, 19),
      rect(412, 111, 42, 19),
      rect(272, 272, 41, 20),
      rect(23, 112, 43, 19),
      rect(0, 30, 141, 45),
      rect(0, 0, 204, 27),
      rect(277, 0, 203, 31),
      rect(339, 35, 141, 58),
      rect(0, 218, 148, 102),
      rect(0, 190, 63, 28),
      rect(325, 228, 155, 92),
      rect(397, 205, 83, 24),
      rect(152, 273, 37, 47),
      rect(115, 88, 34, 36),
      rect(315, 93, 29, 29),
      rect(349, 193, 24, 18),
    ],
  },
  academy: {
    title: area.academy.name,
    purpose: area.academy.description,
    width: 480,
    height: 320,
    spawn: point(240, 276),
    doors: [door("crossroads", 215, 305, 50, 15)],
    hotspots: [
      spot("education.ucf", 103, 112, 60, 35, "UCF lectern"),
      spot("education.utaustin", 319, 112, 60, 35, "UT Austin lectern"),
      spot("education", 77, 202, 82, 31, "All Education"),
      spot("travel.crossroads", 212, 288, 56, 32, "Return to Crossroads"),
    ],
    blocks: [
      rect(0, 0, 480, 36),
      rect(0, 36, 38, 284),
      rect(442, 36, 38, 284),
      rect(38, 303, 175, 17),
      rect(267, 303, 175, 17),
      rect(55, 46, 370, 28),
      rect(103, 112, 60, 35),
      rect(319, 112, 60, 35),
      rect(77, 202, 82, 31),
      rect(320, 202, 82, 31),
      rect(189, 105, 21, 25),
      rect(268, 111, 35, 25),
    ],
  },
  lab: {
    title: area.lab.name,
    purpose: area.lab.description,
    width: 656,
    height: labHeight,
    spawn: point(328, labHeight - 65),
    entrance: { left: 300, right: labEntrance },
    tools: labTools,
    stations: labStations,
    doors: [door("crossroads", 301, labHeight - 18, 54, 18)],
    hotspots: [
      labTools,
      ...labStations,
      spot("travel.crossroads", 300, labHeight - 33, 56, 30, "Return to Crossroads"),
    ],
    blocks: [
      rect(0, 0, 656, 30),
      rect(0, 30, 41, labHeight - 30),
      rect(615, 30, 41, labHeight - 30),
      rect(41, labHeight - 20, 259, 20),
      rect(labEntrance, labHeight - 20, 259, 20),
      rect(278, 41, 100, 97),
      ...labStations,
      labTools,
      rect(77, labHeight - 95, 110, 32),
      rect(517, 53, 54, 32),
      rect(87, 52, 54, 30),
    ],
  },
  village: {
    title: area.village.name,
    purpose: area.village.description,
    width: 480,
    height: 320,
    spawn: point(240, 52),
    doors: [door("crossroads", 214, 0, 52, 16)],
    hotspots: [
      spot("experience", 198, 189, 84, 47, "Guild quest board"),
      spot("travel.crossroads", 212, 0, 56, 35, "Return to Crossroads"),
    ],
    blocks: [
      rect(0, 0, 192, 97),
      rect(287, 0, 193, 97),
      rect(0, 100, 68, 67),
      rect(413, 100, 67, 72),
      rect(0, 225, 150, 95),
      rect(333, 220, 147, 100),
      rect(195, 275, 92, 45),
      rect(198, 189, 84, 47),
      rect(96, 128, 37, 29),
      rect(346, 132, 37, 29),
    ],
  },
  home: {
    title: area.home.name,
    purpose: area.home.description,
    width: 480,
    height: 320,
    spawn: point(240, 273),
    doors: [door("crossroads", 214, 304, 52, 16)],
    hotspots: [
      spot("about", 307, 171, 97, 51, "Workstation · About Me"),
      spot("contact", 111, 231, 38, 39, "Mailbox · Contact"),
      spot("travel.crossroads", 212, 286, 56, 34, "Return to Crossroads"),
    ],
    blocks: [
      rect(0, 0, 480, 40),
      rect(0, 40, 43, 280),
      rect(437, 40, 43, 280),
      rect(43, 302, 168, 18),
      rect(269, 302, 168, 18),
      rect(59, 48, 95, 27),
      rect(326, 48, 95, 27),
      rect(64, 94, 48, 77),
      rect(371, 94, 48, 58),
      rect(199, 66, 82, 39),
      rect(307, 171, 97, 51),
      rect(111, 231, 38, 39),
      rect(169, 187, 80, 31),
      rect(319, 259, 75, 23),
    ],
  },
};

export function canStand(scene, x, y) {
  if (x < 8 || y < 7 || x > scene.width - 8 || y > scene.height - 7) return false;
  return !scene.blocks.some((b) => x + 5 > b.x && x - 5 < b.x + b.w && y + 3 > b.y && y - 4 < b.y + b.h);
}

function distanceTo(point, box) {
  const x = Math.max(box.x - point.x, 0, point.x - box.x - box.w);
  const y = Math.max(box.y - point.y, 0, point.y - box.y - box.h);
  return Math.hypot(x, y);
}

export function nearbySpot(scene, player) {
  let nearest = null;
  let distance = 26;
  for (const hotspot of scene.hotspots) {
    const next = distanceTo(player, hotspot);
    if (next < distance) {
      nearest = hotspot;
      distance = next;
    }
  }
  return nearest;
}

export function walk(scene, player, dx, dy) {
  if (canStand(scene, player.x + dx, player.y)) player.x += dx;
  if (canStand(scene, player.x, player.y + dy)) player.y += dy;
  return scene.doors.find((d) => distanceTo(player, d) === 0)?.to;
}

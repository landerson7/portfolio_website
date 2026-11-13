import { frames } from "./art-frames.js";

export const pixelScale = 2;

const ground = {
  grass: [0, 64],
  cobble: [1, 64],
  steel: [2, 64],
  timber: [3, 64],
  flagstone: [4, 64],
  water: [5, 64],
};

function seeded(seed) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function painter(ctx, { sprites, terrain } = {}) {
  function rect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  function sprite(name, x, y, w, h, fit = false) {
    if (!sprites?.naturalWidth) return;
    const [sx, sy, sw, sh] = frames[name];
    if (fit) {
      const scale = Math.min(w / sw, h / sh);
      x += (w - sw * scale) / 2;
      y += (h - sh * scale) / 2;
      w = sw * scale;
      h = sh * scale;
    }
    ctx.drawImage(sprites, sx, sy, sw, sh, Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  function tile(name, x, y, w, h) {
    const [index, size] = ground[name];
    if (!terrain?.naturalWidth) {
      rect(x, y, w, h, ["#203c31", "#806961", "#202a48", "#64402d", "#554f70", "#235a88"][index]);
      return;
    }
    const sx = (index % 3) * 128;
    const sy = Math.floor(index / 3) * 128;
    for (let yy = 0; yy < h; yy += size) {
      for (let xx = 0; xx < w; xx += size) {
        const dw = Math.min(size, w - xx);
        const dh = Math.min(size, h - yy);
        ctx.drawImage(terrain, sx, sy, dw * 2, dh * 2, x + xx, y + yy, dw, dh);
      }
    }
  }

  function pool(points) {
    const xs = points.map(([x]) => x);
    const ys = points.map(([, y]) => y);
    const x = Math.min(...xs);
    const y = Math.min(...ys);
    const w = Math.max(...xs) - x;
    const h = Math.max(...ys) - y;
    ctx.save();
    ctx.beginPath();
    for (const [index, [px, py]] of points.entries()) {
      if (index === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#31505a";
    ctx.stroke();
    ctx.clip();
    tile("water", x, y, w, h);
    ctx.restore();
  }

  function glow(x, y, radius, color, strength = "50", aspect = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, aspect);
    const gradient = ctx.createRadialGradient(0, 0, 1, 0, 0, radius);
    gradient.addColorStop(0, color + strength);
    gradient.addColorStop(0.45, color + "22");
    gradient.addColorStop(1, color + "00");
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = gradient;
    ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
    ctx.restore();
  }

  return { rect, sprite, tile, glow, pool };
}

function lantern(p, x, y, size = 12) {
  p.glow(x, y + size / 4, size * 2.4, "#fa941e", "68", 0.76);
  p.sprite("lantern", x - size / 2, y - size * 0.65, size, size * 1.4, true);
}

function crystal(p, x, y, size) {
  p.glow(x, y + size / 5, size * 1.04, "#1581ff", "91", 0.68);
  p.sprite("crystal", x - size / 2, y - size * 0.65, size, size, true);
}

function compass(p, x, y, size) {
  p.rect(x - 2, y + 3, size + 4, size - 1, "#100d2580");
  p.sprite("medallion", x, y, size, size);
}

function stonePath(p, x, y, w, h) {
  p.rect(x - 3, y - 3, w + 6, h + 6, "#152d35");
  p.tile("cobble", x, y, w, h);
}

function crossroads(p, scene, random) {
  p.tile("grass", 0, 0, scene.width, scene.height);
  p.rect(0, 0, 480, 43, "#221d48a0");
  p.rect(0, 223, 480, 97, "#112a3e54");
  stonePath(p, 222, 0, 36, 320);
  stonePath(p, 0, 141, 480, 36);
  p.rect(203, 120, 74, 76, "#1b2638");
  p.tile("cobble", 206, 123, 68, 70);
  compass(p, 214, 134, 53);

  p.pool([
    [362, 43],
    [480, 38],
    [480, 86],
    [468, 89],
    [459, 91],
    [373, 91],
    [365, 85],
    [353, 85],
    [345, 76],
    [342, 66],
    [350, 58],
    [350, 49],
  ]);
  p.pool([
    [354, 268],
    [378, 265],
    [391, 250],
    [480, 245],
    [480, 320],
    [347, 320],
    [344, 309],
    [347, 292],
    [342, 284],
    [346, 275],
  ]);
  p.sprite("gate", 386, 231, 89, 88, true);
  p.sprite("waterfall", 353, 25, 102, 74, true);
  p.glow(418, 62, 56, "#0b6cf2", "69", 0.65);

  for (const [x, y, w, h] of [
    [0, 0, 205, 78],
    [279, 0, 201, 36],
    [0, 216, 151, 104],
    [322, 215, 160, 31],
  ]) {
    for (let row = 0; row < h; row += 21) {
      for (let col = 0; col < w; col += 23) {
        const height = 24 + random() * 15;
        const tree = ["pine", "oak", "violetPine"][Math.floor(random() * 3)];
        p.sprite(tree, x + col - 11 + random() * 8, y + row - 12 + random() * 8, height, height);
      }
    }
  }
  for (const [x, y, w, h] of [
    [2, 185, 46, 36],
    [152, 274, 38, 49],
    [307, 85, 35, 39],
    [109, 83, 39, 43],
    [347, 188, 27, 29],
    [443, 79, 37, 20],
    [319, 242, 38, 44],
  ]) {
    p.sprite("rock", x, y, w, h, true);
  }
  for (const [x, y, size] of [
    [130, 110, 33],
    [331, 104, 24],
    [365, 206, 27],
    [155, 287, 29],
    [28, 202, 29],
    [345, 250, 27],
  ])
    crystal(p, x, y, size);
  for (const [x, y] of [
    [200, 129],
    [281, 129],
    [198, 181],
    [282, 181],
    [214, 60],
    [265, 251],
    [89, 132],
    [399, 183],
  ])
    lantern(p, x, y);
  for (const [x, y, w] of [
    [220, 103, 40],
    [258, 15, 48],
    [411, 104, 48],
    [267, 264, 48],
    [20, 105, 48],
  ]) {
    p.sprite("sign", x, y, w, 34, true);
  }
  for (let i = 0; i < 86; i++) {
    const x = random() * 480;
    const y = random() * 320;
    if (Math.abs(x - 240) < 40 || Math.abs(y - 159) < 30) continue;
    p.rect(x, y, 1, 1, ["#f1bc58b0", "#66defeab", "#c79ce8a0"][i % 3]);
  }
}

function room(p, { width, height }, surface, doorLeft, doorRight) {
  p.tile(surface, 0, 0, width, height);
  p.rect(0, 0, width, 32, "#14142a");
  p.rect(0, 0, 29, height, "#10162c");
  p.rect(width - 29, 0, 29, height, "#10162c");
  p.rect(0, height - 18, doorLeft, 18, "#151528");
  p.rect(doorRight, height - 18, width - doorRight, 18, "#151528");
  for (let x = 3; x < width - 8; x += 59) p.sprite("ivy", x, 0, 62, 25);
  for (const x of [7, width - 24]) {
    p.tile("steel", x, 25, 17, height - 46);
    p.rect(x + (x < 10 ? 16 : 0), 25, 1, height - 46, "#936a4e");
  }
  p.rect(27, 28, width - 54, 2, "#af764d");
  p.rect(27, 30, width - 54, 6, "#100c2390");
  p.tile("cobble", doorLeft + 1, height - 17, doorRight - doorLeft - 2, 17);
  p.rect(doorLeft, height - 18, doorRight - doorLeft, 2, "#e9ab62");
  for (let x = 23; x < width; x += 74) lantern(p, x, 22, 11);
}

function shelf(p, x, y, w, h) {
  p.rect(x + 2, y + 4, w, h, "#140d21a0");
  const rows = Math.max(1, Math.round(h / 26));
  const columns = Math.max(1, Math.round(w / 41));
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      p.sprite("shelf", x + (col * w) / columns, y + (row * h) / rows, w / columns, h / rows);
    }
  }
}

function home(p, scene) {
  room(p, scene, "timber", 211, 269);
  p.rect(31, 36, 417, 268, "#2e18243e");
  p.sprite("rug", 129, 105, 228, 155);
  p.sprite("rug", 108, 171, 58, 43);
  for (const [x, y, w, h] of [
    [56, 44, 99, 31],
    [326, 44, 99, 31],
    [60, 92, 52, 80],
    [370, 89, 53, 66],
    [318, 256, 78, 29],
    [167, 187, 85, 34],
  ]) {
    shelf(p, x, y, w, h);
  }
  for (const [name, x] of [
    ["glacier", 155],
    ["katmai", 216],
    ["yosemite", 277],
  ]) {
    p.sprite(name, x, 34, 48, 32);
  }
  p.glow(239, 103, 91, "#f4882b", "84", 0.71);
  p.sprite("fireplace", 202, 61, 77, 45);
  p.glow(359, 193, 56, "#31b9f9", "51", 0.7);
  p.sprite("desk", 308, 172, 95, 49);
  p.sprite("mailbox", 109, 229, 42, 42, true);
  for (const [x, y] of [
    [56, 82],
    [422, 84],
    [153, 153],
    [303, 108],
    [73, 214],
    [422, 229],
  ])
    lantern(p, x, y);
}

function academy(p, scene) {
  room(p, scene, "flagstone", 213, 267);
  p.rect(38, 36, 404, 264, "#1f1b4a36");
  p.rect(182, 77, 116, 218, "#35265391");
  p.rect(186, 81, 108, 210, "#a76e4875");
  p.rect(189, 84, 102, 204, "#2c3158");
  p.sprite("medallion", 198, 153, 84, 84);
  for (let x = 56; x < 417; x += 62) shelf(p, x, 43, 58, 33);
  shelf(p, 75, 200, 86, 35);
  shelf(p, 318, 200, 86, 35);
  p.sprite("lectern", 101, 107, 64, 43);
  p.sprite("lectern", 317, 107, 64, 43);
  for (const [x, y] of [
    [57, 98],
    [423, 98],
    [168, 158],
    [309, 158],
    [165, 241],
    [314, 241],
  ])
    lantern(p, x, y);
  for (const x of [49, 402]) p.sprite("pennant", x, 128, 30, 49, true);
  for (const x of [70, 400]) crystal(p, x, 254, 21);
}

function runway(p, x, y, w, h, tint) {
  p.rect(x, y, w, h, "#11172a70");
  p.rect(x, y, 1, h, tint);
  p.rect(x + w - 1, y, 1, h, tint);
  p.rect(x, y, w, 1, tint);
  p.rect(x, y + h - 1, w, 1, tint);
  for (let offset = 5; offset < w - 6; offset += 8) {
    p.rect(x + offset, y + 2, 4, 2, "#c39a56a0");
    p.rect(x + offset, y + h - 4, 4, 2, "#c39a56a0");
  }
}

function lab(p, scene) {
  room(p, scene, "steel", 300, 356);
  p.rect(37, 35, 581, 372, "#15152a52");
  p.rect(271, 40, 115, 366, "#2536505b");
  for (const x of [53, 267, 388, 603]) {
    for (let y = 43; y < 398; y += 13) p.rect(x, y, 2, 7, "#b7955a");
  }
  for (let y = 150; y < 399; y += 24) p.rect(327, y, 2, 11, "#8b9fb467");
  runway(p, 271, 39, 116, 104, "#9e9e8b");
  p.glow(328, 80, 62, "#3b90dc", "3c", 0.76);
  p.sprite("plane", 271, 41, 115, 99, true);
  for (const [name, x, y, tint, glow] of [
    ["sidecraft", 91, 154, "#b48950", "#e39942"],
    ["avionics", 422, 154, "#549a98", "#28ecce"],
    ["trading", 91, 247, "#a278af", "#b74aff"],
    ["portfolio", 422, 247, "#6180b4", "#4596ff"],
  ]) {
    runway(p, x - 10, y - 10, 163, 63, tint);
    p.glow(x + 72, y + 24, 79, glow, "4c", 0.65);
    p.rect(x + 3, y + 6, 140, 41, "#0b112797");
    p.sprite(name, x, y, 143, 43);
  }
  p.glow(418, 351, 85, "#f1a632", "68", 0.64);
  p.sprite("tools", 350, 332, 138, 36);
  p.sprite("crate", 77, 336, 110, 33);
  for (const x of [87, 517]) p.sprite("power", x, 52, 54, 31);
  for (const [x, y] of [
    [52, 50],
    [603, 50],
    [55, 202],
    [600, 202],
    [56, 365],
    [600, 365],
    [343, 352],
    [499, 353],
  ])
    lantern(p, x, y);
  for (const x of [304, 351]) p.rect(x, 402, 2, 8, "#55e1f5");
}

function village(p, scene, random) {
  p.tile("grass", 0, 0, scene.width, scene.height);
  p.rect(34, 16, 408, 293, "#162235");
  p.tile("flagstone", 38, 20, 400, 285);
  p.rect(38, 20, 400, 285, "#28304949");
  stonePath(p, 218, 0, 44, 318);
  compass(p, 199, 100, 82);
  for (const [name, x, y, w, h] of [
    ["villageRoof", 0, -5, 184, 99],
    ["guildhall", 287, -12, 193, 109],
    ["guildhall", 0, 219, 145, 101],
    ["villageRoof", 335, 219, 145, 100],
    ["roof", 194, 273, 93, 47],
  ]) {
    p.rect(x + 6, y + 14, w - 6, h - 11, "#0c132d88");
    p.sprite(name, x, y, w, h);
  }
  for (const [x, y] of [
    [93, 124],
    [344, 128],
    [15, 104],
    [420, 110],
  ]) {
    p.sprite("market", x, y, 42, 38);
    lantern(p, x + 38, y + 22, 9);
  }
  p.glow(241, 220, 74, "#f18c27", "78", 0.68);
  p.sprite("questBoard", 198, 186, 84, 51);
  for (const [x, y] of [
    [39, 99],
    [159, 94],
    [321, 99],
    [442, 98],
    [183, 210],
    [297, 211],
    [188, 282],
    [297, 280],
    [208, 41],
    [271, 42],
  ])
    lantern(p, x, y);
  for (const [x, y] of [
    [3, 180],
    [429, 181],
    [10, 215],
    [439, 209],
  ]) {
    p.sprite(random() > 0.5 ? "oak" : "pine", x, y, 43, 39);
  }
  crystal(p, 26, 193, 19);
  crystal(p, 450, 193, 19);
}

const drawScene = { crossroads, academy, lab, village, home };

export function paintScene(id, scene, art) {
  const canvas = document.createElement("canvas");
  canvas.width = scene.width * pixelScale;
  canvas.height = scene.height * pixelScale;
  const ctx = canvas.getContext("2d");
  ctx.scale(pixelScale, pixelScale);
  ctx.imageSmoothingEnabled = false;
  drawScene[id](painter(ctx, art), scene, seeded(id.charCodeAt(0) * 721));
  const edge = ctx.createRadialGradient(
    scene.width / 2,
    scene.height / 2,
    scene.height * 0.31,
    scene.width / 2,
    scene.height / 2,
    scene.width * 0.63,
  );
  edge.addColorStop(0, "#110e2000");
  edge.addColorStop(1, "#090b217e");
  ctx.fillStyle = edge;
  ctx.fillRect(0, 0, scene.width, scene.height);
  return canvas;
}

export function paintResidents(ctx, id, time, reduced, art) {
  const p = painter(ctx, art);
  if (id === "crossroads" && !reduced) {
    for (let i = 0; i < 7; i++) {
      const phase = (Math.floor(time / 120) + i * 13) % 27;
      if (phase < 8 || phase > 22) continue;
      p.rect(387 + i * 3, 46 + phase, 1, 2, i % 2 ? "#b3f4ff65" : "#effcff6d");
    }
    for (const [i, x, y] of [
      [0, 71, 113],
      [1, 142, 143],
      [2, 166, 226],
      [3, 329, 211],
      [4, 407, 224],
      [5, 317, 64],
    ]) {
      const phase = time / 750 + i * 2;
      if (Math.sin(phase) < 0.28) continue;
      p.rect(x + Math.cos(phase) * 4, y + Math.sin(phase * 0.7) * 4, 1, 1, "#ffd383a8");
    }
  }
  if (id === "academy") {
    const gesture = !reduced && Math.floor(time / 550) % 7 === 2 ? 1 : 0;
    p.rect(189, 125, 23, 4, "#20182c7a");
    p.sprite("knight", 187, 95 - gesture, 29, 34, true);
    p.rect(265, 128, 45, 6, "#251c2f7a");
    p.sprite("longhorn", 264, 100, 46, 35, true);
  }
  if (id === "home") {
    const breath = !reduced && Math.floor(time / 520) % 6 === 2 ? 1 : 0;
    p.sprite("dog", 116, 180 - breath, 40, 24 + breath, true);
  }
}

const heroFrames = { down: "heroDown", up: "heroUp", left: "heroLeft", right: "heroRight" };

export function paintPlayer(ctx, player, stride, moving, art) {
  const p = painter(ctx, art);
  const step = moving && stride % 2 === 1;
  const face = heroFrames[player.direction];
  const frame = step && (face === "heroDown" || face === "heroUp") ? face + "Walk" : face;
  p.rect(player.x - 8, player.y - 2, 16, 5, "#100c248a");
  p.rect(player.x - 5, player.y + 3, 10, 1, "#100c245c");
  if (art.sprites.naturalWidth) {
    p.sprite(frame, player.x - 12, player.y - 28 - Number(step), 24, 30, true);
  } else {
    p.rect(player.x - 5, player.y - 10, 10, 10, "#306cb3");
    p.rect(player.x - 4, player.y - 17, 8, 8, "#d7a766");
  }
}

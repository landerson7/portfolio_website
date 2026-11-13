import {
  about,
  areas,
  contact,
  education,
  experience,
  projects,
  skills,
  coursework,
  contentTitle,
} from "./content.js";

const asset = (name, extension = "png") => new URL(`../assets/${name}.${extension}`, import.meta.url).href;
const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character],
  );
const icon = (name) => `<img class="icon" src="${asset(name)}" alt="" width="32" height="32">`;
const links = [
  [contact.github, "GitHub", "github"],
  [contact.linkedin, "LinkedIn", "linkedin"],
  [`mailto:${contact.email}`, "Email", "email"],
  [contact.resume, "Résumé", "resume", true],
];

export function contactLinks(className = "") {
  return links
    .map(([url, title, id, download]) => {
      const marks = { github: "GH", linkedin: "in", email: "✉", resume: "↓" };
      return `<a class="${className}" href="${esc(url)}"${download ? " download" : ""}>
      <span class="link-mark" aria-hidden="true">${marks[id]}</span><span>${title}</span></a>`;
    })
    .join("");
}

function tags(values) {
  return values?.length
    ? `<ul class="tags" aria-label="Technologies">${values.map((value) => `<li>${esc(value)}</li>`).join("")}</ul>`
    : "";
}

function description(entry) {
  return `
    ${entry.subtitle ? `<p class="entry-subtitle">${esc(entry.subtitle)}</p>` : ""}
    ${entry.date ? `<p class="entry-date">${esc(entry.date)}${entry.location ? " · " + esc(entry.location) : ""}</p>` : ""}
    <p>${esc(entry.summary)}</p>
    ${tags(entry.tags)}`;
}

function facts(entry) {
  const outbound = [entry.link].filter(Boolean);
  return `
    ${(entry.details || []).map(([title, detail]) => `<p><strong>${esc(title)}</strong><br>${esc(detail)}</p>`).join("")}
    ${outbound.length ? `<ul class="outbound">${outbound.map(([url, label]) => `<li><a href="${esc(url)}">${esc(label)} ↗</a></li>`).join("")}</ul>` : ""}`;
}

function entryList(records) {
  return `<div class="record-list">${Object.values(records)
    .map(
      (entry) => `
    <article class="record">
      <h3>${esc(entry.title)}</h3>
      ${description(entry)}
      ${entry.details?.length ? `<details><summary>Details <span class="sr-only">for ${esc(entry.title)}</span></summary>${facts(entry)}</details>` : ""}
    </article>`,
    )
    .join("")}</div>`;
}

function skillList() {
  return `<div class="skill-groups">${Object.entries(skills)
    .map(
      ([label, entries], i) => `
    <section class="skill-group">
      <h3>${icon(["swords", "book", "potion", "shield", "crystal"][i])}${esc(label)}</h3>
      ${entries.map(([name, detail]) => (detail ? `<details><summary>${esc(name)}</summary><p>${esc(detail)}</p></details>` : `<p class="skill-name">${esc(name)}</p>`)).join("")}
    </section>`,
    )
    .join("")}</div>`;
}

function direct(entry) {
  return `<article class="direct-entry">${description(entry)}
    ${entry.details?.length || entry.link ? `<details open><summary>Details</summary>${facts(entry)}</details>` : ""}
  </article>`;
}

function contactView() {
  return `<p>Have an opportunity or collaboration in mind?</p>
    <p><a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a></p>
    <div class="contact-buttons">${contactLinks("button blue")}</div>`;
}

function projectsView() {
  return `<div class="project-grid">${Object.entries(projects)
    .map(
      ([key, entry]) => `
    <article class="project-card">
      <img class="project-art" src="${asset(entry.art, "webp")}" alt="" width="240" height="112" loading="lazy">
      <div>
        <h3>${esc(entry.title)}</h3>
        ${description(entry)}
        <button type="button" class="button blue" data-open="projects.${key}">Project details <span class="sr-only">for ${esc(entry.title)}</span> →</button>
      </div>
    </article>`,
    )
    .join("")}</div>`;
}

export function panelMarkup(key) {
  if (key === "map") {
    return {
      title: "World Map",
      body: `<p>Choose a destination to travel there.</p>${destinationCards(true)}`,
    };
  }
  const [section, item] = key.split(".");
  const views = {
    about: () => direct(about),
    contact: contactView,
    skills: skillList,
    projects: projectsView,
    education: () => entryList(education),
    experience: () => entryList(experience),
  };
  const entry = item ? { projects, education, experience }[section][item] : null;
  return { title: contentTitle(key), body: item ? direct(entry) : views[section]() };
}

export function destinationCards(includeCenter = false) {
  const options = includeCenter
    ? [
        {
          id: "crossroads",
          name: "Crossroads",
          direction: "Center",
          icon: "crest",
          description: "Starting point",
          art: "crossroads",
        },
        ...areas,
      ]
    : areas;
  return `<div class="destination-grid">${options
    .map(
      (entry) => `
    <button type="button" class="destination-card" data-travel="${entry.id}">
      <img class="destination-art" src="${asset(entry.art, "webp")}" width="240" height="112" alt="" loading="lazy">
      <span class="destination-info">${icon(entry.icon)}
        <span><small>${entry.direction} · ${entry.description}</small><strong>${entry.name}</strong></span><b aria-hidden="true">→</b>
      </span>
    </button>`,
    )
    .join("")}</div>`;
}

const classicSections = [
  ["about", "About", "crest"],
  ["projects", "Projects", "swords"],
  ["skills", "Skills", "potion"],
  ["experience", "Experience", "shield"],
  ["education", "Education", "book"],
  ["contact", "Contact", "lantern"],
];

export function classicMarkup() {
  return `
    <div class="classic-hero">
      <img src="${asset("crossroads", "webp")}" alt="" width="475" height="158">
      <div><h1 id="classic-title">Luke Anderson</h1><p>Software Engineer · Builder of Digital Worlds</p>
        <button class="button blue" type="button" data-mode="game">${icon("crest")} Enter Game Mode →</button></div>
    </div>
    <nav class="classic-nav" aria-label="Portfolio sections">
      ${classicSections.map(([id, title]) => `<a href="#classic-${id}">${title}</a>`).join("")}
    </nav>
    ${classicSections
      .map(
        ([key, title, emblem]) => `
      <section class="classic-section" id="classic-${key}" aria-labelledby="heading-${key}">
        <h2 id="heading-${key}">${icon(emblem)}${title}</h2>${panelMarkup(key).body}
        ${key === "education" ? `<details class="record" id="classic-coursework"><summary>Selected coursework</summary><p>${coursework.join(", ")}.</p></details>` : ""}
      </section>`,
      )
      .join("")}`;
}

const menu = document.querySelector(".mobile-menu");

menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) menu.open = false;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.open) {
    menu.open = false;
    menu.querySelector("summary").focus();
  }
});

const filters = document.querySelector(".filters");

if (filters) {
  const filterButtons = [...filters.querySelectorAll("button")];
  const projects = [...document.querySelectorAll("[data-category]")];
  const projectCount = document.querySelector("[data-project-count]");
  const filterStatus = document.querySelector("#filter-status");

  filters.hidden = false;
  filters.addEventListener("click", (event) => {
    const selected = event.target.closest("button[data-filter]");
    if (!selected) return;

    const category = selected.dataset.filter;
    let visibleCount = 0;
    for (const project of projects) {
      const matches = category === "all" || project.dataset.category.split(" ").includes(category);
      project.hidden = !matches;
      if (matches) visibleCount += 1;
    }

    for (const button of filterButtons) {
      button.setAttribute("aria-pressed", String(button === selected));
    }
    projectCount.textContent = visibleCount;
    filterStatus.textContent = `${visibleCount} ${visibleCount === 1 ? "project" : "projects"} shown`;
  });

  const links = [...document.querySelectorAll(".nav-links a, .mobile-menu nav a, .mobile-dock a")];
  const sections = [...new Set(links.map((link) => document.querySelector(link.hash)))];
  const header = document.querySelector(".site-header");

  function markCurrent(id) {
    for (const link of links) {
      if (link.hash === `#${id}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    }
  }

  function updateCurrent() {
    const activationLine = header.offsetHeight + 50;
    const current = sections.findLast((section) => section.getBoundingClientRect().top <= activationLine);
    if (current) markCurrent(current.id);
  }

  // Recalculate only when a section heading crosses the sticky navigation.
  function observeSections() {
    const activationLine = header.offsetHeight + 50;
    const bottom = Math.max(0, window.innerHeight - activationLine - 1);
    observer?.disconnect();
    observer = new IntersectionObserver(updateCurrent, {
      rootMargin: `-${activationLine}px 0px -${bottom}px 0px`,
    });
    for (const section of sections) observer.observe(section);
    updateCurrent();
  }

  let observer;
  observeSections();
  window.addEventListener("resize", observeSections);
  window.addEventListener("hashchange", () => {
    if (location.hash === "#coursework") {
      document.querySelector("#coursework").open = true;
    }
    updateCurrent();
  });
  if (location.hash === "#coursework") document.querySelector("#coursework").open = true;
}

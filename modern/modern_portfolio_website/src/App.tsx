import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Download,
  Moon,
  Sun,
  Github,
  Linkedin,
} from "lucide-react";

/**
 * NOTE:
 * The previous canvas content was plain text, which caused:
 *   SyntaxError: /index.tsx: Missing semicolon. (1:5)
 * because TypeScript tried to parse prose as code. This file rewrites the
 * component from scratch, restoring the liquid-glass UI with black text in
 * light mode and with the top highlight lines removed.
 */

// Safer inline SVG noise (avoids complex escaping inside JSX strings)
const NOISE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 100 100"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;

// -------------------------
// Theme hook (adds/removes .dark on <html>)
// -------------------------
function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);
  return { dark, setDark } as const;
}

// -------------------------
// UI building blocks
// -------------------------
function Glass({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-3xl border border-white/20 dark:border-white/10 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] ${className}`}
      style={{
        background: "rgba(255,255,255,0.55)", // frosted look
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        backdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      {/* Removed top glossy hairline to avoid the visible white line */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs border border-white/20 bg-[rgba(255,255,255,0.5)] dark:bg-white/20 text-zinc-900 dark:text-zinc-100 backdrop-blur-md">
      {children}
    </span>
  );
}

function Dock() {
  return (
    <div className="fixed bottom-6 right-6 flex gap-3 z-50">
      <a
        href="#resume"
        className="rounded-2xl px-4 py-2 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-xl hover:opacity-90 transition inline-flex items-center gap-2"
      >
        <Download className="w-4 h-4" /> Resume
      </a>
      <a
        href="#contact"
        className="rounded-2xl px-4 py-2 border border-white/20 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-xl text-zinc-900 dark:text-zinc-100 shadow-xl hover:opacity-90 transition inline-flex items-center gap-2"
      >
        <Mail className="w-4 h-4" /> Contact
      </a>
    </div>
  );
}

function GooeyBackdrop() {
  return (
    <>
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Gradient wash */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_0%,#60a5fa_0%,transparent_40%),radial-gradient(120%_120%_at_100%_0%,#a78bfa_0%,transparent_40%),radial-gradient(120%_120%_at_50%_100%,#22d3ee_0%,transparent_45%)] dark:opacity-80 opacity-90" />
        {/* Gooey blobs */}
        <div className="absolute inset-0" style={{ filter: "url(#goo)" }}>
          <motion.div className="absolute w-[40vmax] h-[40vmax] bg-blue-400/20 blur-3xl rounded-full" animate={{ x: [0, 60, -40, 0], y: [0, -40, 30, 0] }} transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute left-1/2 top-1/3 w-[35vmax] h-[35vmax] bg-indigo-400/20 blur-3xl rounded-full" animate={{ x: [0, -50, 40, 0], y: [0, 30, -35, 0] }} transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute left-1/3 top-2/3 w-[28vmax] h-[28vmax] bg-cyan-300/20 blur-3xl rounded-full" animate={{ x: [0, 30, -20, 0], y: [0, -25, 20, 0] }} transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }} />
        </div>
        {/* Noise for depth */}
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: `url('${NOISE_SVG}')` }} />
      </div>
    </>
  );
}

// -------------------------
// Data (resume + legacy)
// -------------------------
const experiences = [
  {
    company: "Lutron Electronics Company",
    role: "Software Engineer Intern",
    location: "Austin, TX",
    dates: "May 2025 – Aug 2025",
    bullets: [
      "Built cross‑platform mobile features with Kotlin + Jetpack Compose for Lutron’s smart lighting app.",
      "Collaborated in an Agile team environment (Jira) across sprints and iterations.",
      "Wrote unit tests, contributed design docs, and participated in code reviews.",
    ],
  },
  {
    company: "Airmeez Inc.",
    role: "Software Engineer Intern",
    location: "Remote",
    dates: "Jan 2024 – Jul 2024, Jan 2025 – May 2025, Aug 2025 – Current",
    bullets: [
      "Migrated legacy services toward a Dockerized microservice architecture.",
      "Extended telecom connectivity using C++ integrations with SIP servers / SoundHound AI.",
      "Built RESTful Go APIs for resilient data transfer.",
    ],
  },
  {
    company: "Necival LLC",
    role: "Software Engineer",
    location: "Remote",
    dates: "Jul 2024 – Feb 2025",
    bullets: [
      "Developed a concurrent cryptocurrency trading system in Go for real‑time execution.",
      "Collaborated on system design, testing, and deployment to improve reliability.",
    ],
  },
];

const projects = [
  {
    name: "SIP MWI Go Service",
    href: "https://landerson7.github.io/portfolio_website/project1.html",
    stack: ["Go", "SipGo", "Google Pub/Sub", "GCS", "net/http"],
    dates: "Jan 2023 – Apr 2024",
    summary: "API that converts SIP data to JSON and routes to Google Cloud (Storage + Pub/Sub); notifies SIP users of waiting messages.",
  },
  {
    name: "Movie Theater Management Programs",
    href: "https://landerson7.github.io/portfolio_website/project2.html",
    stack: ["C", "Data Structures", "BST", "Hash Table", "Recursion"],
    dates: "Aug 2023 – Nov 2023",
    summary: "Ticketing, concessions, projector angle, seating, loyalty program; robust testing and algorithmic implementations.",
  },
  {
    name: "University Faculty/Staff Manager",
    href: "https://landerson7.github.io/portfolio_website/project3.html",
    stack: ["Java", "OOP"],
    dates: "Jun 2023 – Aug 2023",
    summary: "CRUD system for students and staff; strong OOP design, classes, and encapsulation.",
  },
  {
    name: "Fit Link",
    stack: ["MongoDB", "Express", "Node.js", "React Native", "Google Cloud", "Jest", "Swagger"],
    dates: "Mar 2025 – Apr 2025",
    summary: "Trainer–client backend in Node/Express; Google OAuth + Calendar integration; 100% unit‑test pass rate; live Swagger docs.",
  },
  {
    name: "Growbitz Bot",
    stack: ["Go", "AWS Lightsail", "MySQL"],
    dates: "Aug 2024 – Feb 2025",
    summary: "Crypto bot with concurrent trade exec; +6% profit via Coinbase API; uptime improved from 40% → 99.9% with auto‑restart.",
  },
];

const skills: Record<string, string[]> = {
  Languages: ["Go", "JavaScript", "Kotlin", "C/C++", "Python", "Java", "PHP", "SQL"],
  Frameworks: ["Jetpack Compose", "React", "Express", "SwiftUI"],
  Tools: ["AWS Lightsail", "Google Cloud", "Git", "Jira", "Figma", "Swagger", "Docker"],
};

// -------------------------
// Self-tests (non-breaking) – basic data assertions + DOM smoke
// -------------------------
function runSelfTests() {
  console.assert(Array.isArray(projects) && projects.length >= 3, "Projects should have ≥ 3 items");
  for (const p of projects) {
    console.assert(p && typeof p.name === "string" && p.name.length > 0, "Project name missing");
    console.assert(Array.isArray(p.stack) && p.stack.length > 0, `Stack missing for ${p.name}`);
    const s = JSON.stringify(p);
    console.assert(!/\\\"/.test(s), `Escaped quotes detected in ${p.name}`);
  }
  console.assert(Array.isArray(experiences) && experiences.length >= 2, "Experiences should have ≥ 2 items");
}
runSelfTests();

function useDOMSmoke() {
  useEffect(() => {
    const ids = ["home", "experience", "projects", "about", "skills", "coursework", "education", "resume", "contact"];
    ids.forEach((id) => console.assert(!!document.getElementById(id), `Missing section #${id}`));
  }, []);
}

// -------------------------
// App
// -------------------------
export default function App() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const { dark, setDark } = useTheme();
  useDOMSmoke();

  return (
    <div className="min-h-screen text-zinc-900 dark:text-zinc-100 relative">
      <GooeyBackdrop />

      {/* Global styles for tiny shine hover */}
      <style>{`
        .shine { background-image: linear-gradient(90deg, transparent, rgba(255,255,255,.5), transparent); background-size: 200% 100%; }
        .shine:hover { animation: shine 1.2s linear; }
        @keyframes shine { from { background-position: 200% 0; } to { background-position: -200% 0; } }
      `}</style>

      {/* Nav */}
      <header className="sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 pt-4">
          <Glass className="px-5 py-3 flex items-center justify-between">
            <a href="#home" className="font-semibold tracking-tight text-base md:text-lg">Luke Anderson</a>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#experience" className="hover:opacity-80">Experience</a>
              <a href="#projects" className="hover:opacity-80">Projects</a>
              <a href="#skills" className="hover:opacity-80">Skills</a>
              <a href="#education" className="hover:opacity-80">Education</a>
              <a href="#contact" className="hover:opacity-80">Contact</a>
            </nav>
            <button
              aria-label="Toggle theme"
              onClick={() => setDark(!dark)}
              className="inline-flex items-center gap-2 rounded-2xl px-3 py-1.5 border border-white/20 bg-white/50 dark:bg-white/10 text-zinc-900 dark:text-zinc-100 backdrop-blur hover:bg-white/60 transition"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </Glass>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="md:col-span-2">
            <Glass className="p-8 md:p-10">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Building reliable systems &
                <span className="ml-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-500 bg-clip-text text-transparent"> liquid‑glass UIs</span>
              </h1>
              <p className="mt-4 text-base leading-relaxed text-zinc-800 dark:text-zinc-200">
                Software engineer focused on Go backends, Kotlin/Compose apps, and cloud‑first architectures. I like clean design, fast feedback, and shipping.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="https://landerson7.github.io/portfolio_website/" target="_blank" rel="noreferrer" className="shine inline-flex items-center gap-1 text-sm px-4 py-2 rounded-xl bg-white/60 dark:bg-white/10 border border-white/20 backdrop-blur text-zinc-900 dark:text-zinc-100 hover:bg-white/70 transition">
                  View Legacy Site <ExternalLink className="w-4 h-4" />
                </a>
                <a href="#projects" className="inline-flex items-center gap-1 text-sm px-4 py-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white hover:opacity-90 transition shadow">
                  See Projects <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </Glass>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Glass className="p-6">
              <div className="flex flex-col gap-3 text-zinc-800 dark:text-zinc-200">
                <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4" /><span>727‑947‑0370</span></div>
                <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4" /><a className="underline underline-offset-4" href="mailto:lu097697@ucf.edu">lu097697@ucf.edu</a></div>
                <div className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4" /><span>Orlando, FL · Austin, TX</span></div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>Go</Pill>
                <Pill>Kotlin</Pill>
                <Pill>Jetpack Compose</Pill>
                <Pill>React</Pill>
                <Pill>Docker</Pill>
                <Pill>Google Cloud</Pill>
              </div>
              <div className="mt-5 flex gap-3">
                <a href="https://github.com/landerson7" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-xl bg-white/60 dark:bg-white/10 border border-white/20 backdrop-blur text-zinc-900 dark:text-zinc-100 hover:bg-white/70 transition"><Github className="w-4 h-4"/>GitHub</a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-xl bg-white/60 dark:bg-white/10 border border-white/20 backdrop-blur text-zinc-900 dark:text-zinc-100 hover:bg-white/70 transition"><Linkedin className="w-4 h-4"/>LinkedIn</a>
              </div>
            </Glass>
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          <h2 className="text-xl font-semibold tracking-tight">Experience</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {experiences.map((e, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
              <Glass className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{e.role}</h3>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">{e.company} · {e.location}</p>
                  </div>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">{e.dates}</span>
                </div>
                <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-zinc-800 dark:text-zinc-200">
                  {e.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </Glass>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2">
          <Code2 className="w-5 h-5" />
          <h2 className="text-xl font-semibold tracking-tight">Projects</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <Glass className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{p.href ? (
                    <a className="inline-flex items-center gap-1 underline underline-offset-4" href={p.href} target="_blank" rel="noreferrer">{p.name} <ExternalLink className="w-4 h-4" /></a>
                  ) : p.name}</h3>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">{p.dates}</span>
                </div>
                <p className="mt-2 text-sm text-zinc-800 dark:text-zinc-200">{p.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((s, k) => (
                    <Pill key={k}>{s}</Pill>
                  ))}
                </div>
              </Glass>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-7xl mx-auto px-4 py-8">
        <Glass className="p-6">
          <h2 className="text-xl font-semibold tracking-tight mb-3">About Me</h2>
          <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
            Honors Computer Engineering student (minor in Physics) at UCF; interests in Quantum Computing, AI/ML, Web, and Computer Architecture. Florida native who enjoys the beach, surfing, martial arts, hiking, and running. Visited 40 states and 8 countries; proud dog‑dad to a Dachshund named Buddy.
          </p>
        </Glass>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2">
          <Code2 className="w-5 h-5" />
          <h2 className="text-xl font-semibold tracking-tight">Technical Skills</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(skills).map(([group, items]) => (
            <Glass key={group} className="p-6">
              <h3 className="text-sm font-semibold tracking-wide uppercase text-zinc-700 dark:text-zinc-300">{group}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
            </Glass>
          ))}
        </div>
      </section>

      {/* Coursework */}
      <section id="coursework" className="max-w-7xl mx-auto px-4 py-8">
        <Glass className="p-6">
          <h2 className="text-xl font-semibold tracking-tight mb-4">Relevant Coursework</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="mb-2 text-zinc-700 dark:text-zinc-300">Math & Science</h3>
              <ul className="list-disc pl-5 space-y-1 text-zinc-800 dark:text-zinc-200">
                <li>Calculus I–III, Differential Equations</li>
                <li>Physics I–II, Mechanics, Wave Mechanics I–II</li>
                <li>Chemistry I, Theoretical Methods of Physics</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-zinc-700 dark:text-zinc-300">Computer Science</h3>
              <ul className="list-disc pl-5 space-y-1 text-zinc-800 dark:text-zinc-200">
                <li>Intro to C; CS I–II (DSA)</li>
                <li>Discrete Structures, OOP</li>
                <li>Intro to Quantum Computation</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-zinc-700 dark:text-zinc-300">Computer / Electrical Engineering</h3>
              <ul className="list-disc pl-5 space-y-1 text-zinc-800 dark:text-zinc-200">
                <li>Linear Circuits I–II, Digital Systems</li>
                <li>Computer Organization & Architecture</li>
              </ul>
            </div>
          </div>
        </Glass>
      </section>

      {/* Education */}
      <section id="education" className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          <h2 className="text-xl font-semibold tracking-tight">Education</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Glass className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">University of Central Florida</h3>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">Computer Engineering B.S. (Comprehensive & VLSI), Minor in Physics</p>
              </div>
              <span className="text-xs text-zinc-600 dark:text-zinc-400">Aug 2022 – May 2026</span>
            </div>
            <p className="mt-2 text-sm text-zinc-800 dark:text-zinc-200">GPA: 3.8 · Orlando, FL</p>
          </Glass>
          <Glass className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">St. Petersburg College</h3>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">Associate’s of Liberal Arts</p>
              </div>
              <span className="text-xs text-zinc-600 dark:text-zinc-400">Aug 2020 – May 2022</span>
            </div>
            <p className="mt-2 text-sm text-zinc-800 dark:text-zinc-200">GPA: 3.8 · St. Petersburg, FL</p>
          </Glass>
        </div>
      </section>

      {/* Resume + Contact */}
      <section id="resume" className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          <Glass className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Download className="w-5 h-5" />
              <h2 className="text-xl font-semibold tracking-tight">Resume</h2>
            </div>
            <p className="text-sm text-zinc-800 dark:text-zinc-200">Grab a PDF copy of my latest resume.</p>
            <div className="mt-4">
              {/* Place your resume at /public/resume.pdf for dev + GitHub Pages */}
              <a className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white hover:opacity-90 transition shadow" href="/resume.pdf" download>
                <Download className="w-4 h-4" /> Download PDF
              </a>
            </div>
          </Glass>
          <Glass id="contact" className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-5 h-5" />
              <h2 className="text-xl font-semibold tracking-tight">Contact</h2>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <a className="inline-flex items-center gap-2 underline underline-offset-4" href="mailto:lu097697@ucf.edu">
                <Mail className="w-4 h-4" /> lu097697@ucf.edu
              </a>
              <div className="inline-flex items-center gap-2"><Phone className="w-4 h-4" /> 727‑947‑0370</div>
              <a className="inline-flex items-center gap-2 underline underline-offset-4" href="https://landerson7.github.io/portfolio_website/" target="_blank" rel="noreferrer">
                <ExternalLink className="w-4 h-4" /> Portfolio (GitHub Pages)
              </a>
            </div>
          </Glass>
        </div>
      </section>

      <Dock />

      <footer className="max-w-7xl mx-auto px-4 pb-12 pt-4 text-xs text-zinc-700 dark:text-zinc-300">
        © {year} Luke Anderson · Built with React & Tailwind
      </footer>
    </div>
  );
}

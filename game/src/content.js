const github = "https://github.com/landerson7";

export const contact = {
  email: "landerson144000@gmail.com",
  github,
  linkedin: "https://www.linkedin.com/in/landerson007/",
  resume: new URL("../assets/UTAustinResume2.pdf", import.meta.url).href,
};

export const about = {
  title: "About Luke",
  summary: "I’m an electronics engineer with the U.S. Air Force, where I develop mission-planning software.",
  details: [
    [
      "Background",
      "I earned a B.S. in Computer Engineering with a minor in Physics from the University of Central Florida. My experience includes mobile development at Lutron, backend and telecom work at Airmeez, concurrent systems at Necival, and quantum circuit research at UCF.",
    ],
    [
      "Outside work",
      "I’m a Florida native who enjoys surfing, reading, climbing, hiking, running, and traveling. I have a dachshund named Buddy who loves to play fetch.",
    ],
  ],
};

export const projects = {
  sidecraftx: {
    title: "SidecraftX",
    subtitle: "AI mentorship platform",
    art: "home",
    date: "January 2026–Present",
    summary:
      "I’m building an LLM-powered platform that guides users through launching and running real-world side hustles.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"],
    details: [
      [
        "Agent design",
        "I use structured JSON schemas to define each agent’s goals, constraints, tools, and behavior.",
      ],
      [
        "Backend and infrastructure",
        "I’m developing a REST backend for persistent sessions, agent memory, and authentication, and deploying the platform on AWS with managed data storage.",
      ],
    ],
  },
  pegasus: {
    title: "P.E.G.A.S.U.S.",
    subtitle: "UCF senior design capstone",
    art: "lab",
    date: "August 2025–May 2026",
    summary:
      "A real-time heads-up display prototype for small aircraft that integrates readings from four sensors.",
    tags: ["C", "C++", "ESP32", "Raspberry Pi 4", "I²C", "UART", "Qt"],
    details: [
      [
        "My role",
        "I led a three-member team as project manager and embedded software engineer. The project placed among the top five interdisciplinary projects in UCF’s College of Engineering and Computer Science.",
      ],
      [
        "Implementation",
        "I wrote task-based C firmware on an ESP32 to poll four sensors on a shared I²C bus, designed a lightweight UART packet format, and built the C++ and Qt display on a Raspberry Pi 4.",
      ],
    ],
    link: [github + "/PEGASUS", "P.E.G.A.S.U.S. source on GitHub"],
  },
  fitLink: {
    title: "Fit Link",
    subtitle: "Team project",
    art: "academy",
    date: "March–April 2025",
    summary: "A React Native app for personal trainers to manage clients and schedules.",
    tags: ["Node.js", "Express", "React Native", "MongoDB", "Google Cloud", "Jest"],
    details: [
      [
        "Backend",
        "I built the REST backend in Node.js and Express with MongoDB, and configured Google Cloud for OAuth and Google Calendar integration.",
      ],
      ["Testing", "I wrote Jest test suites to validate REST API behavior."],
    ],
  },
  sipMwi: {
    title: "SIP Message Waiting Indicator (MWI)",
    subtitle: "Airmeez work sample",
    art: "lab",
    date: "January–April 2024",
    summary:
      "A Go microservice that converts SIP message-waiting traffic to structured JSON and notifies subscribed devices.",
    tags: ["Go", "SIP", "Google Cloud Storage", "Pub/Sub"],
    details: [
      [
        "Event processing",
        "I integrated Cloud Storage for persistence and Pub/Sub for asynchronous processing.",
      ],
      [
        "Notifications",
        "The service receives message-status requests from the primary server and sends SIP MWI notifications to subscribed devices.",
      ],
    ],
  },
  tradingBot: {
    title: "Trading Bot",
    subtitle: "Necival work sample",
    art: "village",
    summary: "A concurrent cryptocurrency trading system written in Go for real-time execution.",
    tags: ["Go"],
    details: [
      [
        "Engineering work",
        "I contributed to system design, testing, and deployment. Automated recovery from critical errors increased profit from 3.4% to 8%.",
      ],
    ],
  },
  portfolio: {
    title: "Portfolio Website",
    subtitle: "Personal project",
    art: "academy",
    summary: "My personal portfolio, built with HTML, CSS, and JavaScript and published with GitHub Pages.",
    tags: ["HTML", "CSS", "JavaScript", "Canvas", "GitHub Pages"],
    details: [
      [
        "Implementation",
        "The Realm uses Canvas for the playable world and HTML for navigation, project details, and the Classic portfolio view.",
      ],
    ],
    link: [github + "/portfolio_website", "Portfolio source on GitHub"],
  },
  goNotion: {
    title: "Webcourses to Notion API",
    subtitle: "Personal project",
    art: "academy",
    date: "August 2024",
    summary: "A Go service that turns Webcourses assignments into a Notion to-do list.",
    tags: ["Go", "REST APIs", "Notion API", "Raspberry Pi 5"],
    details: [
      [
        "Implementation",
        "I deployed the service on a Raspberry Pi 5, where it ran daily to sync assignments and make upcoming coursework easier to see.",
      ],
    ],
  },
  rangeFinder: {
    title: "Ultrasonic Range Finder",
    subtitle: "Hardware project",
    art: "lab",
    summary: "An MSP430-based device that measures distance and displays it on an LCD.",
    tags: ["C", "MSP430", "Fusion 360"],
    details: [
      [
        "Implementation",
        "I prototyped the circuit on a breadboard, designed the schematic and PCB in Fusion 360, and wrote the device driver in C.",
      ],
    ],
  },
  planner: {
    title: "Planner Web Application",
    subtitle: "Team prototype",
    art: "home",
    date: "May–July 2024",
    summary: "A shared calendar and to-do list prototype built with PHP and MySQL.",
    tags: ["PHP", "MySQL", "HTML/CSS", "Apache", "AWS Lightsail"],
    details: [
      [
        "Implementation",
        "My teammate and I built a LAMP-stack prototype that connects a calendar view to daily to-do lists and stores entries in MySQL.",
      ],
    ],
    link: [github + "/summerProject", "Planner source on GitHub"],
  },
  theater: {
    title: "Movie Theater Management",
    subtitle: "Coursework",
    art: "village",
    date: "August–November 2023",
    summary: "C programs modeling theater operations such as ticketing and concessions.",
    tags: ["C", "Data structures", "Algorithms"],
    details: [
      [
        "Implementation",
        "I used linked lists, queues, hash tables, and binary search trees and tested operations against assignment cases.",
      ],
    ],
  },
  universityRecords: {
    title: "University Records Manager",
    subtitle: "Coursework",
    art: "academy",
    date: "June–August 2023",
    summary: "A Java program for creating, viewing, and removing student and staff records.",
    tags: ["Java", "Object-oriented programming"],
    details: [
      [
        "Implementation",
        "I used Java classes to represent records and implemented create, read, and delete operations.",
      ],
    ],
  },
  flipFlop: {
    title: "Breadboard D Flip-Flop",
    subtitle: "Personal project",
    art: "lab",
    date: "May 2023",
    summary: "A breadboard circuit demonstrating the timing behavior of a D flip-flop.",
    tags: ["Digital logic", "Circuit analysis", "Prototyping"],
    details: [
      [
        "Implementation",
        "I used resistors, capacitors, and LEDs to show the circuit’s delay, and a voltmeter to analyze it.",
      ],
    ],
  },
  quantumFourier: {
    title: "Quantum Fourier Transform",
    subtitle: "Coursework",
    art: "academy",
    date: "May 2023",
    summary: "Quantum Fourier and inverse transform circuits implemented and tested in Qiskit.",
    tags: ["Python", "Qiskit", "Quantum computing"],
    details: [
      [
        "Implementation",
        "I built both circuits in Qiskit and tested how the inverse transform recovers information encoded by the forward transform.",
      ],
    ],
  },
};

export const skills = {
  Languages: [
    ["Go", "Built REST APIs at Airmeez and concurrent trading software at Necival."],
    ["Kotlin", "Built a component reordering feature for Lutron’s smart home app."],
    ["JavaScript", "Built the portfolio interface and worked on the Node.js backend for Fit Link."],
    ["TypeScript", "Used for SidecraftX."],
    ["C", "Wrote deterministic sensor polling firmware on an ESP32."],
    ["C#", ""],
    ["C++", "Maintained telecom modules at Airmeez and built the P.E.G.A.S.U.S. display."],
    ["Python", "Built a convolutional neural network for quantum error classification at UCF."],
    ["Java", "Implemented a university records program for object-oriented coursework."],
    ["SQL", "Persisted user preferences in Lutron’s mobile app."],
    ["Swift", ""],
    ["MIPS Assembly", ""],
  ],
  "Web & Backend": [
    ["React", "Used for SidecraftX."],
    ["Node.js", "Used for SidecraftX and Fit Link."],
    ["Express", "Built the Fit Link REST API."],
    ["PostgreSQL", "Used for SidecraftX."],
    ["MongoDB", "Used for Fit Link."],
    ["Redis", ""],
    ["HTML/CSS", "Built the portfolio and a shared planner prototype."],
    ["PHP / MySQL", "Used the LAMP stack for a shared planner prototype."],
    ["SipGo", "Worked on SIP message-waiting notifications at Airmeez."],
  ],
  "Cloud & Tools": [
    ["AWS", "Architected and deployed cloud infrastructure for SidecraftX."],
    [
      "Google Cloud",
      "Configured OAuth and Calendar integration for Fit Link and used Storage and Pub/Sub for SIP notifications.",
    ],
    ["Git", "Used for collaboration and version control."],
    ["Jira", "Used for Agile sprint planning and task tracking at Lutron."],
    ["Figma", ""],
    ["Docker", "Used during the Airmeez migration to containerized microservices and on SidecraftX."],
    ["Kubernetes", ""],
    ["Helm", ""],
    ["Linux", "Ran a scheduled coursework sync on Raspberry Pi OS."],
    ["VS Code", ""],
    ["Android Studio", ""],
    ["Xcode", ""],
    ["Cadence", ""],
    ["Code Composer Studio", ""],
    ["Arduino IDE", ""],
  ],
  "Systems & CS": [
    [
      "Embedded systems",
      "Worked on ESP32 sensor polling, I²C, UART, and Raspberry Pi display software for P.E.G.A.S.U.S.",
    ],
    ["Computer networks", "Worked with SIP and VoIP at Airmeez."],
    ["Operating systems", "Coursework included a concurrent hash table in C."],
    ["Digital logic", "Prototyped a D flip-flop on a breadboard to demonstrate timing."],
    ["Circuit and VLSI design", "Studied circuit design and analysis and CMOS VLSI design at UCF."],
    ["Breadboard prototyping and soldering", ""],
  ],
  "Mobile & Other": [
    ["Jetpack Compose", "Built cross-platform smart home features at Lutron."],
    ["React Native", "Used on the Fit Link team project."],
    ["SwiftUI", ""],
    ["Fusion 360", "Designed the schematic and PCB for an ultrasonic range finder."],
    ["Qiskit", "Modeled quantum circuit errors and simulated configurable qubit flips in UCF research."],
    ["TensorFlow", ""],
    ["OpenCV", ""],
    ["TabulaPy", ""],
    ["Matplotlib", ""],
  ],
};

export const experience = {
  usaf: {
    title: "United States Air Force",
    subtitle: "Electronics Engineer",
    date: "June 2026–Present",
    location: "Warner Robins, GA",
    current: true,
    summary:
      "Develop and maintain mission-planning software for Next-Generation Open Mission Systems (NOMS).",
    details: [
      [
        "Software development",
        "Design, develop, and maintain components across multiple programming languages.",
      ],
      [
        "Integration and quality",
        "Work with software, QA, and DevOps engineers to integrate, validate, and troubleshoot systems. Participate in code review, testing, and technical documentation.",
      ],
    ],
  },
  airmeez: {
    title: "Airmeez Inc.",
    subtitle: "Software Engineer Intern",
    date: "January–July 2024 · January–May 2025 · August 2025–June 2026",
    location: "Remote",
    summary:
      "Helped migrate a legacy system to Docker-based microservices and built Go REST APIs for data exchange with a remote server.",
    tags: ["Go", "C++", "Docker", "REST APIs"],
    details: [
      [
        "Telecommunications",
        "Developed and maintained C++ server modules that improved session stability and connection reliability.",
      ],
    ],
  },
  pegasus: {
    title: "P.E.G.A.S.U.S.",
    subtitle: "Project Manager & Embedded Software Engineer · UCF capstone",
    date: "August 2025–May 2026",
    location: "Orlando, FL",
    summary:
      "Led a three-member team building a small-aircraft heads-up display using Agile project management.",
    details: [
      [
        "Engineering leadership",
        "Evaluated implementation tradeoffs against requirements and engineering standards. The capstone placed among the top five interdisciplinary projects in UCF’s College of Engineering and Computer Science.",
      ],
    ],
  },
  lutron: {
    title: "Lutron Electronics Company",
    subtitle: "Software Engineer Intern",
    date: "May–August 2025",
    location: "Austin, TX",
    summary:
      "Built a component reordering feature for Lutron’s smart home app and persisted user preferences in a local SQL database.",
    tags: ["Kotlin", "Jetpack Compose", "SQL", "Jira"],
    details: [
      [
        "Team practices",
        "Used Jira for sprint planning and task tracking, wrote unit tests, contributed to design documentation, and participated in code reviews.",
      ],
    ],
  },
  necival: {
    title: "Necival LLC",
    subtitle: "Software Engineer",
    date: "July 2024–February 2025",
    location: "Remote",
    summary: "Developed a concurrent cryptocurrency trading system in Go for real-time market execution.",
    tags: ["Go"],
    details: [
      [
        "Reliability and performance",
        "Collaborated on system design, testing, and deployment. Automated recovery from critical system errors increased profit from 3.4% to 8%.",
      ],
    ],
  },
  ucfResearch: {
    title: "University of Central Florida",
    subtitle: "Undergraduate Research Assistant",
    date: "August 2023–October 2024",
    location: "Orlando, FL",
    summary: "Modeled quantum circuit errors in Qiskit and implemented configurable qubit-flip simulations.",
    tags: ["Python", "Qiskit", "Convolutional neural networks"],
    details: [
      [
        "Error classification",
        "Developed and tuned a dual-channel convolutional neural network in Python for quantum error classification and optimization.",
      ],
    ],
  },
  pricing: {
    title: "Restaurant Equipment World",
    subtitle: "Pricing Administrator",
    date: "June–December 2023",
    summary: "Prepared Excel price updates for the online store and resolved discrepancies in price lists.",
    tags: ["Excel"],
    details: [
      ["Operations", "Coordinated with coworkers and management to upload pricing updates on schedule."],
    ],
  },
};

export const education = {
  utaustin: {
    title: "The University of Texas at Austin",
    subtitle: "Online M.S. in Computer Science",
    date: "Spring 2027–Fall 2029 (expected)",
    summary:
      "Incoming graduate student. The program starts in Spring 2027, with expected completion in Fall 2029.",
  },
  ucf: {
    title: "University of Central Florida",
    subtitle: "B.S. in Computer Engineering",
    date: "August 2022–May 2026",
    location: "Orlando, FL",
    summary: "Comprehensive & VLSI Track, minor in Physics. GPA 3.75.",
    details: [
      [
        "Honors and scholarships",
        "Florida Academic Scholars and UCF Provost Scholarship recipient. Dean’s List in Fall 2022, Spring 2023, Fall 2023, Fall 2024, and Fall 2025. President’s Honor Roll in Spring 2025.",
      ],
    ],
  },
  spc: {
    title: "St. Petersburg College",
    subtitle: "Associate degree in Liberal Arts",
    date: "August 2020–May 2022",
    location: "St. Petersburg, FL",
    summary: "Early College Program through East Lake High School. GPA 3.8.",
  },
};

export const coursework = [
  "Introduction to C",
  "Data Structures and Algorithms",
  "Object-Oriented Programming",
  "Discrete Structures",
  "Quantum Computation",
  "Operating Systems",
  "Object-Oriented Software Development",
  "Robot Vision",
  "Linear Circuits I–II",
  "Digital Systems",
  "Computer Organization",
  "Computer Architecture",
  "Electronics I",
  "Computer Communication Networks",
  "Embedded Systems",
  "Junior Design",
  "Computer-Aided VLSI Design",
  "Calculus I–III",
  "Differential Equations",
  "Physics I–II",
  "Mechanics",
  "Theoretical Methods of Physics",
  "Wave Mechanics I–II",
  "Chemistry I",
];

export const areas = [
  {
    id: "academy",
    name: "Grand Academy",
    direction: "North",
    icon: "book",
    description: "Education",
    art: "academy",
  },
  {
    id: "lab",
    name: "Inventor’s Lab",
    direction: "East",
    icon: "swords",
    description: "Projects & skills",
    art: "lab",
  },
  {
    id: "village",
    name: "Guild Village",
    direction: "South",
    icon: "shield",
    description: "Experience",
    art: "village",
  },
  {
    id: "home",
    name: "Adventurer’s Home",
    direction: "West",
    icon: "lantern",
    description: "About & contact",
    art: "home",
  },
];

export const titles = {
  projects: "Projects",
  skills: "Wall of Tools",
  experience: "Guild Quest Log",
  education: "Education",
  about: about.title,
  contact: "Contact",
};

export function contentTitle(key) {
  const [section, item] = key.split(".");
  return item ? { projects, education, experience }[section][item].title : titles[section];
}

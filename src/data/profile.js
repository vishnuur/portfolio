// Portfolio content shared between sections (Experience) and the magic
// (the résumé letter Accio summons). Edit here and both stay in sync.

export const PROFILE = {
  name: "Vishnu U R",
  title: "Lead Software Engineer",
  location: "Trivandrum, Kerala",
  careerStart: new Date(2019, 9), // October 2019
  email: "vishnuur77@gmail.com",
  phone: "+91 6282443764",
  linkedin: "https://www.linkedin.com/in/vishnu-ur-213165186/",
  // Drop a PDF at public/resume.pdf and set this to "/resume.pdf" to offer a
  // download button in the résumé letter.
  resumePdf: null,
};

/** Whole years of experience since the career start. */
export const yearsOfExperience = (now = new Date()) => {
  const start = PROFILE.careerStart;
  const years = now.getFullYear() - start.getFullYear();
  return now.getMonth() < start.getMonth() ? years - 1 : years;
};

// Oldest first.
export const EXPERIENCE = [
  {
    date: "2019/10 - 2021/02",
    title: "Junior Software Engineer",
    company: "Techbyheart Pvt Ltd, Kochi, Kerala",
    description:
      "Developed dynamic admin panels for LMS and CMS applications. Built a Progressive Web Application (PWA) for hotel staff in the Maldives. Led multiple projects with a team of up to 9 members, ensuring timely delivery and high-quality output. Gained experience in frontend technologies like HTML, CSS, and JavaScript.",
  },
  {
    date: "2021/02 - 2022/05",
    title: "Associate Software Engineer",
    company: "Techbyheart Pvt Ltd, Kochi, Kerala",
    description:
      "Led frontend development for logistics and e-commerce projects. Implemented Redux for state management, enhancing application performance. Developed reusable code libraries, reducing development time and improving consistency. Trained junior developers in core frontend technologies, contributing to team skill enhancement.",
  },
  {
    date: "2022/05 - 2024/04",
    title: "Software Engineer",
    company: "Experion Technologies, Trivandrum, Kerala",
    description:
      "Spearheaded the integration of Redux-Saga and TypeScript, resulting in a 30% performance boost. Played a key role in developing custom maps and enhancing app functionality. Delivered critical projects under tight deadlines, including an EV car app for Stellantis. Focused on performance optimization and code efficiency, achieving significant improvements.",
  },
  {
    date: "2024/04 - 2024/08",
    title: "Senior Software Engineer",
    company: "Experion Technologies, Trivandrum, Kerala",
    description:
      "Conducted extensive R&D for converting React Native apps to Android Auto and CarPlay compatibility. Improved API consumption efficiency, reducing data retrieval time by 20%. Mentored junior developers, helping them advance their skills in React Native and related technologies. Developed and executed comprehensive test cases, ensuring high code quality and reliability.",
  },
  {
    date: "2024/08 - present",
    title: "Lead Software Engineer",
    company: "Experion Technologies, Trivandrum, Kerala",
    description:
      "Leading the development of an ESG management platform, driving the project's technical vision. Collaborating with stakeholders to align technical implementation with business goals. Mentoring a team of front-end developers, focusing on optimizing and scaling a large Next.js codebase. Ensuring high performance and maintainability across all project deliverables.",
  },
];

export const SKILL_NAMES = [
  "React",
  "Next.js",
  "React Native",
  "TypeScript",
  "JavaScript",
  "Redux",
  "HTML",
  "CSS / SCSS",
  "Tailwind CSS",
  "Material UI",
  "Ant Design",
  "Vite",
  "Jest",
  "Vitest",
  "Azure",
  "GitLab",
];

// The page sections, with the Hogwarts room each one is on the Marauder's Map.
export const SECTIONS = [
  { key: "home", id: "home-id", label: "Home", room: "The Great Hall" },
  { key: "about", id: "about-id", label: "About", room: "Gryffindor Tower" },
  { key: "skills", id: "skills-id", label: "Skills", room: "Potions Dungeon" },
  {
    key: "projects",
    id: "projects-id",
    label: "Projects",
    room: "Room of Requirement",
  },
  {
    key: "experience",
    id: "experience-id",
    label: "Experience",
    room: "Trophy Room",
  },
  { key: "contact", id: "contact-id", label: "Contact", room: "The Owlery" },
];

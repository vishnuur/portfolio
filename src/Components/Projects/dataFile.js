import educareer from "../../Assets/Images/educareer.webp";
import cakeshop from "../../Assets/Images/cakeshop.webp";
import pin360 from "../../Assets/Images/pin360.webp";
import automoto from "../../Assets/Images/automoto.webp";
import ifc from "../../Assets/Images/ifc.webp";
import stellantis from "../../Assets/Images/stellantis.webp";
import esg from "../../Assets/Images/esg.webp";
import mali from "../../Assets/Images/mali.jpg";
import mezzo from "../../Assets/Images/mezzo.png";
import rentd from "../../Assets/Images/rentd.png";
import maphabit from "../../Assets/Images/maphabit.png";


const expList = [
  {
  name: "Mezzo",
  image: mezzo, // add image import
  content:
    "A middleware platform acting as an operational bridge between brokers and service providers, streamlining communication, data exchange, and workflow coordination across systems.",
  techused: [
    "ReactJs",
    "JavaScript",
    "REST APIs",
    "GitHub",
    "Jira"
  ],
  roles: [
    "Worked on core frontend features and system workflows in a broker-facing platform",
    "Diagnosed and resolved complex UI and integration issues beyond automated tool suggestions",
    "Improved data handling and interface reliability across broker-service communication flows",
    "Collaborated with backend teams to ensure seamless API integration and data consistency"
  ],
},
{
  name: "MapHabit",
  image: maphabit, // add image import
  content:
    "A React Native mobile application designed to assist individuals with cognitive or developmental challenges in completing daily routines through guided task flows, caregiver monitoring, and real-time progress tracking.",
  techused: [
    "React Native",
    "Firebase",
    "GitHub",
    "JavaScript",
    "Push Notifications"
  ],
  roles: [
    "Built and enhanced mobile features focused on task guidance and user accessibility",
    "Integrated Firebase for real-time data sync and user activity tracking",
    "Implemented caregiver-side visibility into user progress and updates",
    "Worked on performance and stability improvements for diverse user needs"
  ],
},
{
  name: "Rent 2.0",
  image: rentd, // add image import
  content:
    "A rental marketplace mobile application enabling users to list, discover, and rent apartments, manage payments, transfer funds, and earn rewards within a unified financial ecosystem.",
  techused: [
    "React Native",
    "Stripe",
    "Apple Pay",
    "Socket.io",
    "Secure Payment APIs"
  ],
  roles: [
    "Developed core mobile features for property listing, booking, and in-app transactions",
    "Integrated Stripe and Apple Pay for secure rent payments and fund transfers",
    "Implemented real-time communication and balance updates using Socket.io",
    "Applied secure data handling and encryption practices for financial and user data privacy"
  ],
},

  {
    name: "ESG Playbook",
    image: esg,
    content:
      "An ESG application for tracking emission values, carbon footprints, double materiality, CSRD compliance, and EU Taxonomy standards, allowing companies to easily access and report their sustainability metrics.",
    techused: [
      "NextJS",
      "JavaScript",
      "Firebase",
      "Jira",
      "Sass",
      "Azure Devops",
    ],
    roles: [
      "Handled front end lead position",
      "Mentoring junior developers and new team members",
      "Provide technical advice and assist in solving programming problems",
      "Fostered seamless collaboration with American client's in-house developers",
    ],
  },
  {
    name: "Stellantis",
    image: stellantis,
    content:
      "A mobile application built with React Native for Maserati EV users, designed to locate and navigate to nearby charging stations, view power and voltage specifications, monitor real-time charging status, make seamless payments for charging, and provide user reviews for enhanced charging experiences.",
    techused: [
      "React Native",
      "TypeScript",
      "Redux",
      "Sass",
      "JAVA",
      "Azure Devops",
      "JEST",
    ],
    roles: [
      "Handled Mobile App development",
      "Quickly adapted to React Native",
      "Skillfully implemented Redux-Saga, enhancing project functionality",
      "Fostered seamless collaboration with Australian client's in-house developers",
    ],
  },
  {
    name: "IFC",
    image: ifc,
    content:
      "A website to efficiently manage and track orders, simplify booking for agents, empower clients to oversee shipments, and provide administrators with real-time statistics and live shipment tracking.",
    techused: [
      "ReactJs",
      "TypeScript",
      "Redux",
      "Sass",
      "JAVA",
      "Azure Devops",
    ],
    roles: [
      "Handled front end lead position",
      "Mentoring junior developers and new team members",
      "Provide technical advice and assist in solving programming problems",
      "Skillfully implemented Redux-Saga, enhancing project functionality",
      "Fostered seamless collaboration with Australian client's in-house developers",
      "Proposed Redux and code splitting strategies, boosting application performance by a notable percentage",
    ],
  },
  {
    name: "AutoMoto",
    image: automoto,
    content:
      "This website is an all-in-one platform that offers online booking for vehicle services, accessory purchases, price comparisons, detailed vehicle information, and easy insurance acquisition.",
    techused: [
      "ReactJs",
      "CSS",
      "Redux",
      "Django",
      "PWA",
      "Capacitor",
      "Gitlab",
      "Jira",
    ],
    roles: [
      "Handled lead developer position",
      "Mentoring junior developers and new team members",
      "Involved in requirement gathering, development and deployment",
      "Provide technical advice and assist in solving programming problems",
      "Hands on coding to fix any critical bugs or urgent client requirements",
    ],
  },
  {
    name: "Mali",
    image: mali,
    content:
      "Effortlessly manage employee tasks at Mali Island Resort, from food orders to laundry and menu settings, with our streamlined website and admin panel.",
    techused: [
      "ReactJs",
      "CSS",
      "Django",
      "PWA",
      "Capacitor",
      "IONIC",
      "Gitlab",
      "Jira",
    ],
    roles: [
      "Handled lead developer position",
      "Mentoring junior developers and new team members",
      "Involved in requirement gathering, development and deployment",
      "Provide technical advice and assist in solving programming problems",
      "Adapted to PWA and build and delivered the App",
    ],
  },
  {
    name: "Pin360",
    image: pin360,
    content:
      "A website tailored for car enthusiasts. It offers a wealth of car reviews, convenient booking for car conventions and programs, and a hub for staying informed about all things automotive",
    techused: ["NextJs", "Sass", "ContextAPI", "FireBase", "GitHub", "Trello"],
    roles: [
      "Handled lead developer position",
      "Mentoring junior developers and new team members",
      "Involved in requirement gathering, development and deployment",
      "Provide technical advice and assist in solving programming problems",
      "Quickly adapted to NextJS and mentored team members",
    ],
  },
  {
    name: "EduCareer",
    image: educareer,
    content:
      "A multifunctional educational platform that serves as both a training center for graduates, offering PSC exam courses and exams, and a teaching platform for professors, enabling them to instruct and communicate effectively.",
    techused: ["ReactJs", "CSS", "Django", "PWA", "Capacitor"],
    roles: [
      "Handled lead developer position",
      "Mentoring junior developers and new team members",
      "Involved in requirement gathering, development and deployment",
      "Provide technical advice and assist in solving programming problems",
      "Learned and implemented PWA application",
    ],
  },
  {
    name: "Cake World",
    image: cakeshop,
    content:
      "A cake-selling website that allows users to order their favorite cakes directly through WhatsApp for a convenient and delightful experience",
    techused: ["ReactJs", "CSS", "Django", "Gitlab", "Jira"],
    roles: [
      "Handled lead developer position",
      "Involved in requirement gathering, development and deployment",
      "Provide technical advice and assist in solving programming problems",
    ],
  },
];
export default expList;

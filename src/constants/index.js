import { meta, shopify, starbucks, tesla, bytewise, career, hero, skillsprint, bank, ecom, university, movie, toc } from "../assets/images";
import {
    car,
    contact,
    css,
    estate,
   
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    nextjs,
    nodejs,
    pricewise,
    react,
  
    sass,
    snapgram,
    
    tailwindcss,
    threads,
    typescript
} from "../assets/icons";

export const skills = [
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: sass,
        name: "Sass",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    /*
    {
        imageUrl: mern,
        name: "MERN Stack",
        type: "FullStack",
    }
    */
];

export const experiences = [
    {
        title: "MERN Stack Front-End Developer",
        company_name: "The Orange Club",
        icon: toc,
        iconBg: "#ff8c00",
        date: "Feb 2025 - Present",
        points: [
            "Built the front-end from scratch using Figma designs, Next.js, Tailwind CSS, and Payload CMS, ensuring responsive and scalable UI across all devices.",
            "Developed an interactive map-based web app using React.js, integrating MapTiler and Leaflet for dynamic route rendering and user interactions.",
            "Integrated RESTful APIs with dynamic Next.js routing and optimized performance through efficient state management and debugging.",
        ],
    },
    {
        title: "Web and Operations Executive",
        company_name: "Career Pakistan",
        icon: career,
        iconBg: "#fbc3bc",
        date: "Oct 2023 - Mar 2025",
        points: [
            "Developed and maintained dynamic, responsive websites for Career Pakistan, Career Saudi and Lavitas using cutting-edge frameworks like Next.js and React, ensuring robust performance and scalability.",
            "Took part in the recruitment and development of intern teams.",
            "Closely working with the CEO to launch a new multinational project related to web development and project management of previous uprunning projects.",


        ],
    },
    {
        title: "Frontend fellowship",
        company_name: "Bytewise",
        icon: bytewise,
        iconBg: "#accbe1",
        date: "Mar 2023 - June 2023",
        points: [
            "Developed web applications using Next js, React.js, Tailwind, Shadcn, Material UI and the Bootstrap framework, ensuring responsive design and optimal performance across all devices.",
            "Collaborated with team members to meet project goals.",
            "Participated in code reviews and provided constructive feedback to other developers.",
        ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/YourGitHubUsername',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/YourLinkedInUsername',
    }
];

export const projects = [
    {
        iconUrl: pricewise,
        theme: 'btn-back-red',
        name: 'Skillsprint',
        description: 'Built an AI-powered career recommendation platform using Flask and Python. Implemented a Random Forest Classifier to analyze user inputs and suggest suitable career paths. Developed an interactive frontend with Next.js and TypeScript. Integrated ether.js to handle blockchain-based payment subscriptions.',
        link: 'https://skill-sprint-delta.vercel.app/',
        showcaseImageUrl: skillsprint
    },
    {
        iconUrl: threads,
        theme: 'btn-back-green',
        name: 'University Webpage',
        description: 'Developed using HTML and Bootstraps pre-existing classes were used to successfully craft a webpage that is responsive across all screen dimensions.',
        link: 'https://farfura.github.io/Bootstrap-project/',
        showcaseImageUrl: university
    },
    {
        iconUrl: car,
        theme: 'btn-back-blue',
        name: 'Ecommerce webpage',
        description: 'Designed this parallax webpage for skincare brands using Tailwind.',
        link: 'https://majestic-zabaione-741ab3.netlify.app',
        showcaseImageUrl: ecom
    },
    {
        iconUrl: snapgram,
        theme: 'btn-back-pink',
        name: 'Movie Webpage',
        description: 'Designed a webpage for browsing movies, implementing React, and APIs',
        link: 'https://polite-frangipane-7e4c79.netlify.app',
        showcaseImageUrl: movie
    },
    {
        iconUrl: estate,
        theme: 'btn-back-black',
        name: 'Bank Webpage',
        description: 'This webpage was designed using react and tailwind. It makes use of reusability feature of react.',
        link: 'https://64d4c06e14ebf7557c03f401--cute-hamster-adb06b.netlify.app',
        showcaseImageUrl: bank
    },
    
];

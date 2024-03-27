import { meta, shopify, starbucks, tesla,bytewise,career } from "../assets/images";
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
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
   
  
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
 
    {
        imageUrl: sass,
        name: "Sass",
        type: "Frontend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    }
];

export const experiences = [
    {
        title: "Fellowship Front end",
        company_name: "Bytewise",
        icon: bytewise,
        iconBg: "#accbe1",
        date: "March 2023 - June 2023",
        points: [
            
            "Developing and maintaining web applications using React.js, HTML,CSS, and Boootstrap",
            "Collaborating with team members.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
    {
        title: "Web Developer Intern",
        company_name: "Career Pakistan",
        icon: career,
        iconBg: "#fbc3bc",
        date: "Nov 2023 - Curr",
        points: [
            "Developing and maintaining website for Career Pakistan, Career Sausi and Lavitas",
            "Collaborating with cross-functional teams.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in quality assurance for website and providing constructive feedback to other developers.",
            "Closely working with CEO to launch a new multinational project related to web development.",

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
        name: 'Personal Blog',
        description: 'Developed a blog using HTML, CSS, and JavaScript. Designed this responsive blog with compatibility across various screen resolutions using media queries.',
        link: 'https://farfura.github.io/Blog-Project-1/',
    },
    {
        iconUrl: threads,
        theme: 'btn-back-green',
        name: 'University Webpage',
        description: 'Developed using HTML and Bootstraps pre-existing classes were used to successfully craft a webpage that is responsive across all screen dimensions.',
        link: 'https://farfura.github.io/Bootstrap-project/',
    },
    {
        iconUrl: car,
        theme: 'btn-back-blue',
        name: 'Ecommerce webpage',
        description: 'Designed this parallax webpage for skincare brands using Tailwind.',
        link: 'https://majestic-zabaione-741ab3.netlify.app',
    },
    {
        iconUrl: snapgram,
        theme: 'btn-back-pink',
        name: 'Movie Webpage',
        description: 'Designed a webpage for browsing movies, implementing React, and APIs',
        link: 'https://polite-frangipane-7e4c79.netlify.app',
    },
    {
        iconUrl: estate,
        theme: 'btn-back-black',
        name: 'Bank Webpage',
        description: 'This webpage was designed using react and tailwind. It makes use of reusability feature of react.',
        link: 'https://64d4c06e14ebf7557c03f401--cute-hamster-adb06b.netlify.app',
    },
    
];
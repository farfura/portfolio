import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import React, { useRef } from "react";

import { CTA } from "../components/CTA.jsx";
import { projects } from "../constants";
import { arrow } from "../assets/icons";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardEntryVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
  },
};

const titleWordVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const titleLetterVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 12 }
  },
};

const iconContainerHover = {
  scale: 1.15,
  rotate: 5,
  transition: { type: "spring", stiffness: 400, damping: 10 }
}

const titleVariants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const getCardThemeStyles = (theme) => {
  const themeMap = {
    'btn-back-red': 'bg-gradient-to-br from-white to-rose-50 dark:from-slate-800/90 dark:to-rose-900/10',
    'btn-back-green': 'bg-gradient-to-br from-white to-emerald-50 dark:from-slate-800/90 dark:to-emerald-900/10',
    'btn-back-blue': 'bg-gradient-to-br from-white to-sky-50 dark:from-slate-800/90 dark:to-sky-900/10',
    'btn-back-pink': 'bg-gradient-to-br from-white to-pink-50 dark:from-slate-800/90 dark:to-pink-900/10',
    'btn-back-black': 'bg-gradient-to-br from-white to-slate-100 dark:from-slate-800/90 dark:to-slate-700/10',
    'btn-back-yellow': 'bg-gradient-to-br from-white to-amber-50 dark:from-slate-800/90 dark:to-amber-900/10',
    'btn-back-purple': 'bg-gradient-to-br from-white to-purple-50 dark:from-slate-800/90 dark:to-purple-900/10',
  };
  
  return themeMap[theme] || 'bg-white dark:bg-slate-800/80'; 
};

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const imageToDisplay = project.showcaseImageUrl || `https://picsum.photos/seed/${index + 1}/600/400`;
  const altText = `${project.name} showcase ${project.showcaseImageUrl ? '' : '(placeholder)'}`;
  const bgThemeClass = getCardThemeStyles(project.theme);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={cardEntryVariants}
      className={`group relative flex flex-col ${bgThemeClass} rounded-xl shadow-lg overflow-hidden`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="transform-gpu"
      >
        <div className='w-full h-48 sm:h-56 overflow-hidden rounded-t-xl' style={{ transform: "translateZ(10px)" }}>
          <img
            src={imageToDisplay}
            alt={altText}
            className='w-full h-full object-cover transition-transform duration-350 ease-in-out'
            onError={(e) => { e.target.src = `https://picsum.photos/seed/fallback${index}/600/400`; e.target.alt = `${project.name} showcase (fallback placeholder)`; }}
          />
        </div>

        <div className='p-3 flex flex-col flex-grow' style={{ transform: "translateZ(5px)" }}>
          <h4 className='text-xl sm:text-2xl font-poppins font-semibold text-slate-800 dark:text-slate-100 mb-3 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300'>
            {project.name}
          </h4>

          <p className='mt-1 text-slate-600 dark:text-slate-300 leading-relaxed text-sm flex-grow mb-4 transition-opacity duration-300 group-hover:opacity-100 opacity-80 dark:opacity-70 dark:group-hover:opacity-90'>
            {project.description}
          </p>
          
          <div className='mt-auto pt-4 border-t border-slate-200 dark:border-slate-700 text-center'>
            <Link
              to={project.link}
              target='_blank'
              rel='noopener noreferrer'
              className='font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center group/link text-sm py-2.5 px-5 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-100 dark:hover:bg-blue-900/70 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95'
            >
              View Project
              <motion.img
                src={arrow}
                alt='arrow'
                className='w-4 h-4 object-contain ml-2'
                initial={{ x: 0 }}
                whileHover={{ x: 3 }} 
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <div className="w-full overflow-x-hidden"> 
      <div className="w-full max-w-5xl mx-auto px-8 sm:px-16 pt-20 pb-2 mt-12">
        <h1 className='head-text'>
          My{" "}
          <span className='blue-gradient_text drop-shadow font-semibold'>
            Projects
          </span>
        </h1>
      </div>

      <div className="w-full px-4 md:px-10 mt-12 pb-0">
        <motion.div
          className='max-w-[1920px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
          variants={containerVariants}
          initial='hidden'
          animate='show'
          style={{ perspective: "1200px" }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </motion.div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-8 sm:px-16 pt-4 pb-6 mt-12">
        <hr className='border-slate-200 mb-4' />
        <CTA />
      </div>
    </div>
  );
};

export default Projects;
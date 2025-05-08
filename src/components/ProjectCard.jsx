import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import OptimizedImage from "./OptimizedImage";
import { arrow } from "../assets/icons";

const cardEntryVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
  },
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
  const fallbackImage = `https://picsum.photos/seed/fallback${index}/600/400`;

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
          <OptimizedImage
            src={imageToDisplay}
            alt={altText}
            className='w-full h-full'
            fallbackSrc={fallbackImage}
            priority={index < 2} // Only prioritize the first 2 images
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

export default ProjectCard; 
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { CTA } from "../components/CTA.jsx";
import { skills, experiences } from '../constants';

const fadeIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});


const skillsContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
    },
  },
};

const skillItemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring", 
      stiffness: 100,
      damping: 10,
    },
  },
};


const timelineItemVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
};


const iconVariants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};


const textVariants = {
  hidden: { x: 30, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { ease: 'easeOut', duration: 0.5 } },
};

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  const reversedExperiences = [...experiences];
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: timelineRef, 
    offset: ["start end", "end 0.75"] 
  });

 
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]); 
  const skillBgColors = [
    "rgba(173, 216, 230, 0.3)", 
    "rgba(144, 238, 144, 0.3)", 
    "rgba(255, 223, 186, 0.3)", 
    "rgba(221, 160, 221, 0.3)", 
    "rgba(175, 238, 238, 0.3)", 
    "rgba(240, 230, 140, 0.3)", 
  ];

  return (
    <section className='max-container'>
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeIn("", "tween", 0.1, 0.8)}
      >
        <h1 className='head-text'>Hello, I'm <span className='blue-gradient_text font-semibold drop-shadow'>Fareeha</span></h1>
      </motion.div>

      <motion.div 
        className='mt-5 flex flex-col gap-3 text-slate-500'
        initial="hidden"
        animate="show"
        variants={fadeIn("", "tween", 0.2, 0.8)}
      >
        <p className='text-lg leading-relaxed'>
          With a strong passion for web development, I excel in designing dynamic and intuitive web applications. My skills encompass both front-end and back-end development, and I have a particular affinity for working with React, Tailwind, and Next.js.
        </p>
      </motion.div>

      <motion.div 
        className='py-10 flex flex-col'
        initial="hidden"
        animate="show"
        variants={skillsContainerVariants}
      >
        <h3 className='subhead-text'>My Skills</h3>
        
        <div className='mt-16 flex flex-wrap gap-12 justify-center'>
          {skills.map((skill, index) => ( 
            <motion.div 
              className='relative w-28 h-36 flex flex-col items-center group bg-white/60 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-white/20'
              key={`${skill.name}-skill-color-bg`}
              variants={skillItemVariants} 
              animate={{
                translateY: [0, -5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: Math.random() * 0.5 
              }}
            >
             <div className='block-container w-24 h-24'> 
                <motion.div 
                  className='btn-back rounded-xl'
                  animate={{
                    backgroundColor: skillBgColors,
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                 /> 
                 <motion.div 
                  className='btn-front rounded-xl flex justify-center items-center'
                  whileHover={{ 
                    translateY: -3, 
                    boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.15)" 
                  }}
                 >
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className='w-1/2 h-1/2 object-contain'
                  />
                </motion.div>
              </div>
              
              <p className='mt-2 text-center text-sm font-medium text-slate-700 
                          md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300'>
                {skill.name}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* --- WORK EXPERIENCE --- */}
      <motion.div 
        className='py-16'
        initial="hidden"
        animate="show"
        variants={fadeIn("", "tween", 0.2, 0.8)}
      >
        <h3 className='subhead-text mb-5'>Work Experience</h3>
        
        <p className='text-slate-500 text-lg mb-12 max-w-3xl'>
          Throughout my career, I've collaborated with talented teams and built applications that solve real-world problems. Here's a snapshot of my professional journey:
        </p>

    
        <div ref={timelineRef} className='relative mt-12'> 
          <motion.div 
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 to-blue-500 origin-top" // Added gradient, origin-top
            style={{ scaleY: lineScaleY }} 
          />
          
          {/* Experience Items */}
          <div className="flex flex-col gap-10">
            {reversedExperiences.map((experience, index) => (
              <motion.div 
                key={`experience-timeline-anim-${index}`}
                className="relative flex items-start w-full gap-6 md:gap-8"
                variants={timelineItemVariants} 
                initial="hidden"
                whileInView="show" 
                viewport={{ once: true, amount: 0.4 }} 
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
               
                <motion.div 
                  className="flex-shrink-0 relative pt-0.5"
                  variants={iconVariants} 
                > 
                   
                   <div 
                    className='relative z-0 flex justify-center items-center w-16 h-16 rounded-full bg-white shadow-lg border-2' // Increased shadow, border size
                    style={{ borderColor: experience.iconBg }}
                  >
                    <img 
                      src={experience.icon}
                      alt={experience.company_name}
                      className='w-[70%] h-[70%] object-contain p-1'
                    />
                  </div>
                </motion.div>

              
                <motion.div 
                  className="flex-1 pb-4"
                  variants={textVariants} 
                > 
                  <h3 className='text-black text-xl font-poppins font-semibold'>{experience.title}</h3>
                  <p className='text-blue-600 font-medium text-base mb-1' style={{margin:0}}>{experience.company_name}</p>
                  <p className='text-slate-500 text-sm font-normal mb-3'>{experience.date}</p>
                  <ul className='list-disc ml-5 space-y-1.5 text-left'>
                    {experience.points.map((point, idx) => (
                      <li
                        key={`exp-point-anim-${index}-${idx}`}
                        className='text-slate-600 font-normal pl-1 text-sm leading-relaxed'
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <hr className='border-slate-200 my-10'/>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <CTA/>
      </motion.div>
    </section>
  );
};

export default About;

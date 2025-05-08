import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion';
import cvPdf from '../assets/Fareeha_Nadeem_Cv.pdf';

const linkTextContainer = {
  hover: {
    transition: {
      staggerChildren: 0.05, 
    },
  },
};


const letterVariant = {
  initial: { y: 0 },
  hover: {
    y: [0, -4, 0], 
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

const Navbar = () => {
  return (
    <header className='header'>
        <NavLink 
          to="/" 
          className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md 
                     transition-transform duration-300 hover:scale-110"
        >
          <p className='blue-gradient_text'>FN</p>
        </NavLink>
        <nav className='flex text-lg gap-7 font-medium'>
          <NavLink 
            to="/about" 
            className={({isActive}) => 
              `inline-block transition-colors duration-200 ease-in-out 
               ${isActive ? 'text-blue-500' : 'text-black'}`
            }
          >
            <motion.div
              className="flex"
              variants={linkTextContainer}
              initial="initial"
              whileHover="hover"
            >
              {"About".split("").map((char, index) => (
                <motion.span
                  key={`about-${index}`}
                  variants={letterVariant}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </NavLink>
          <NavLink 
            to="/projects" 
            className={({isActive}) => 
              `inline-block transition-colors duration-200 ease-in-out 
               ${isActive ? 'text-blue-500' : 'text-black'}`
            }
          >
            <motion.div
              className="flex"
              variants={linkTextContainer}
              initial="initial"
              whileHover="hover"
            >
              {"Projects".split("").map((char, index) => (
                <motion.span
                  key={`projects-${index}`}
                  variants={letterVariant}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </NavLink>
          <a 
            href={cvPdf} 
            download="Fareeha_Nadeem_CV.pdf"
            className="hidden md:inline-flex items-center font-semibold text-blue-800 border-b-2 border-blue-700 transition-all duration-300 hover:text-blue-900 hover:border-blue-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <motion.div
              className="flex"
              variants={linkTextContainer}
              initial="initial"
              whileHover="hover"
            >
              {"Download".split("").map((char, index) => (
                <motion.span
                  key={`download-${index}`}
                  variants={letterVariant}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </a>
        </nav>
    </header>
  )
}

export default Navbar
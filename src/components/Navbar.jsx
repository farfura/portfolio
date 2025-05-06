import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion';


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
        </nav>
    </header>
  )
}

export default Navbar
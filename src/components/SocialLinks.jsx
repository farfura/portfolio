import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cvPdf from '../assets/Fareeha_Nadeem_Cv.pdf';

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

// Download Icon for the CV download button
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
  </svg>
);

const SocialLinks = ({ desktopStyle = 'bottomBar' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDesktopLinks, setShowDesktopLinks] = useState(false);
  const [showHint, setShowHint] = useState(false);
  

  const mainSocials = [
    {
      name: 'LinkedIn',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      url: 'https://www.linkedin.com/in/fareeha-nadeem',
      baseColor: 'text-slate-600 dark:text-slate-300',
      hoverColor: 'hover:text-blue-500 dark:hover:text-blue-400',
      mobileBg: 'bg-blue-500'
    },
    {
      name: 'GitHub',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      url: 'https://github.com/farfura',
      baseColor: 'text-slate-600 dark:text-slate-300',
      hoverColor: 'hover:text-slate-800 dark:hover:text-slate-100',
      mobileBg: 'bg-slate-700'
    },
    {
      name: 'Email',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
        </svg>
      ),
      url: 'mailto:fareehanadeem.new@gmail.com',
      baseColor: 'text-slate-600 dark:text-slate-300',
      hoverColor: 'hover:text-rose-600 dark:hover:text-rose-500',
      mobileBg: 'bg-rose-500'
    }
  ];


  const mobileSocials = [
    ...mainSocials,
 
    {
      name: 'Download CV',
      icon: <DownloadIcon />,
      url: cvPdf,
      safariUrl: '/documents/Fareeha_Nadeem_Cv.pdf', // Direct path for Safari
      baseColor: 'text-slate-600 dark:text-slate-300',
      hoverColor: 'hover:text-blue-600 dark:hover:text-blue-400',
      mobileBg: 'bg-gradient-to-r from-[#003580] to-[#0061dd]',
      download: 'Fareeha_Nadeem_CV.pdf',
      isCvDownload: true
    }
  ];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };


  useEffect(() => {
    const desktopTimer = setTimeout(() => {
      setShowDesktopLinks(true);
    }, 500);
    
    const hintTimer = setTimeout(() => {
      setShowHint(true);
    }, 1500); 

    const hideHintTimer = setTimeout(() => {
      setShowHint(false);
    }, 5000); 

    return () => {
      clearTimeout(desktopTimer);
      clearTimeout(hintTimer);
      clearTimeout(hideHintTimer);
    };
  }, []);

  const fabVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { delay: 0.7, duration: 0.4, type: "spring", stiffness: 120 }
    }
  };

  const sidebarVariants = {
    initial: { x: -100, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1, 
      transition: { delay: 0.5, duration: 0.5, type: "spring", stiffness: 80 }
    }
  };

  const bottomBarVariants = {
    initial: { y: 100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { delay: 0.5, duration: 0.5, type: "spring", stiffness: 80 }
    }
  };
  
  const expandedIconsContainerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1, when: "afterChildren" } }
  };

  const iconItemVariants = {
    initial: { opacity: 0, scale: 0.5, y: 15 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 15 } },
    exit: { opacity: 0, scale: 0.5, y: 15, transition: { duration: 0.15 } }
  };

  const fabIconVariants = {
    open: { rotate: 0, opacity: 1, scale: 1},
    closed: { rotate: -90, opacity: 0, scale: 0.5 }
  };
  
  const fabCloseIconVariants = {
    open: { rotate: 0, opacity: 1, scale: 1 },
    closed: { rotate: 90, opacity: 0, scale: 0.5 }
  };

  return (
    <>
     
      <motion.div 
        className="fixed bottom-6 right-8 z-50 lg:hidden"
        variants={fabVariants}
        initial="initial"
        animate={"animate"}
        whileHover={{ scale: 1.1 }}
      >
        <motion.button
          onClick={toggleExpand}
          className="bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform active:scale-90 relative overflow-hidden"
          aria-label={isExpanded ? "Close social links" : "Open social links"}
          aria-expanded={isExpanded}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            variants={fabIconVariants} 
            animate={isExpanded ? "closed" : "open"}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <UsersIcon />
          </motion.div>
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            variants={fabCloseIconVariants}
            initial="closed" // Start hidden
            animate={isExpanded ? "open" : "closed"}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <CloseIcon />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {showHint && !isExpanded && (
            <motion.div
              className="absolute bottom-5 right-20 bg-slate-800 text-white px-3 py-1.5 rounded-md text-xs shadow-lg whitespace-nowrap pointer-events-none"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.4 } }} 
              exit={{ opacity: 0, x: 10, transition: { duration: 0.3 } }}
            >
              Connect
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode='wait'>
          {isExpanded && (
            <motion.div 
              key="expanded-social-icons"
              className="absolute bottom-20 right-1 flex flex-col-reverse items-center gap-4"
              variants={expandedIconsContainerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {mobileSocials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  download={social.download}
                  type={social.isCvDownload ? "application/pdf" : undefined}
                  onClick={(e) => {
                    if (social.isCvDownload) {
                      e.preventDefault();
                      
                      // Check for iOS Safari specifically
                      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                      
                      if (isIOS && isSafari) {
                        // Safari iOS specific approach
                        // Open in new tab with _blank target which works better for Safari
                        window.open(social.safariUrl || social.url, '_blank');
                      } else {
                        // For other mobile browsers
                        const isMobile = /Android/.test(navigator.userAgent);
                        if (isMobile) {
                          // Create a hidden anchor with proper download attributes
                          const a = document.createElement('a');
                          a.href = social.url;
                          a.download = social.download;
                          a.style.display = 'none';
                          document.body.appendChild(a);
                          a.click();
                          
                          // Clean up
                          setTimeout(() => {
                            document.body.removeChild(a);
                          }, 100);
                        }
                      }
                    }
                  }}
                  className={`${social.mobileBg} text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl transform transition-all duration-200 hover:scale-110 hover:brightness-110`}
                  variants={iconItemVariants}
                >
                  {React.cloneElement(social.icon, { width: 24, height: 24, className:"fill-current" })}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {desktopStyle === 'sidebar' && showDesktopLinks && (
        <motion.div 
          className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-5 p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700"
          variants={sidebarVariants}
          initial="initial"
          animate="animate"
        >
          {mainSocials.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              title={social.name} 
              className={`p-3 rounded-full transition-all duration-300 transform hover:scale-125 ${social.baseColor} ${social.hoverColor}`}
              whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.9 }}
            >
              {React.cloneElement(social.icon, { width: 26, height: 26, className:"fill-current" })}
            </motion.a>
          ))}
        </motion.div>
      )}

      {desktopStyle === 'bottomBar' && showDesktopLinks && (
        <motion.div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 hidden lg:block"
          variants={bottomBarVariants}
          initial="initial"
          animate="animate"
        >
          <div className="bg-white dark:bg-slate-800 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-lg px-8 py-4 rounded-full shadow-2xl flex items-center gap-8 border border-slate-200 dark:border-slate-700">
            {mainSocials.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`flex items-center gap-2.5 transition-all duration-300 transform hover:scale-110 ${social.baseColor} ${social.hoverColor}`}
                whileHover={{ scale: 1.12, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                {React.cloneElement(social.icon, { width: 22, height: 22, className:"fill-current" })}
                <span className="text-sm font-semibold tracking-wide">{social.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default SocialLinks; 
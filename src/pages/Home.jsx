import { useState, Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import Loader from '../components/Loader'
import Island from "../models/Island"
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import HomeInfo from '../components/HomeInfo'

// Accept props from App
const Home = ({ introPlayed, setIntroPlayed }) => {
  const [isRotating, setIsRotating] = useState(false)
  const [currentStage, setCurrentStage] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Initialize based on prop from App
  const [showIntro, setShowIntro] = useState(!introPlayed);

  const [loadingProgress, setLoadingProgress] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const audioRef = useRef(null)


  useEffect(() => {
    if (showIntro) {
     
      setIntroPlayed(true); 
    }

  }, []); 

  useEffect(() => {
    let interval;
    if (!showIntro && !isLoaded) { // Only run if intro is NOT showing and content isn't loaded
      interval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + (Math.random() * 10);
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 150);
    } else if (isLoaded) {
      setLoadingProgress(100); 
    } else {
       setLoadingProgress(0); 
    }
    
    return () => clearInterval(interval);
  }, [isLoaded, showIntro]); 


  useEffect(() => {
    if (audioRef.current) {
      if (soundEnabled) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [soundEnabled]);


  useEffect(() => {
    if (showIntro && isLoaded) { // Run only if intro is showing
      const timer = setTimeout(() => {
        setShowIntro(false); 
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [isLoaded, showIntro]); 

  const IntroOverlay = () => {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
    
      checkMobile();
      const handleResize = () => {
        checkMobile();
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
      <motion.div 
        key="intro-overlay"
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0c1221]"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
      >
        {/* Edge glow effects */}
        <div className="edge-glow top-edge"></div>
        <div className="edge-glow right-edge"></div>
        <div className="edge-glow bottom-edge"></div>
        <div className="edge-glow left-edge"></div>
        
        {/* Skip intro button - Also marks intro as played in App state */}
        <motion.button
          className="absolute top-8 right-8 z-[110] px-5 py-2 rounded-full text-[13px] tracking-wider uppercase font-medium transition-all duration-300 fun-button"
          onClick={() => {
            setShowIntro(false); // Hide intro locally
            setIntroPlayed(true); // Mark as played in App state
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 20px rgba(192, 132, 252, 0.5)"
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Skip
        </motion.button>

      
        <motion.div
          className="relative z-[105] text-center p-10 sm:p-12 max-w-3xl mx-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: {
                delayChildren: 0.7, 
                staggerChildren: 0.5  
              }
            }
          }}
        >
        
          <motion.div 
            className="overflow-hidden mb-6 sm:mb-8"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
            }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide">
              Welcome to My Portfolio
            </h1>
          </motion.div>

       
          <motion.div 
            className="overflow-hidden mb-6 sm:mb-8"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
            }}
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#e2e8f0] font-normal">
              I'm <span className="fun-name">Fareeha Nadeem</span>, a Full Stack Developer.
            </p>
          </motion.div>
          
   
          <motion.div 
            className="overflow-hidden mb-6"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" } }
            }}
          >
            <p className="text-base sm:text-lg md:text-xl text-[#94a3b8]">
              Explore my interactive 3D world
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  const adjustIslandForScreenSize = () => { 
    let screenScale = null
    let screenPosition = [0, -6.5, -43]
    let rotation = [0.1, 4.7, 0]
    
    if(window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9]
    } else {
      screenScale = [1, 1, 1]
    }
    
    return [screenScale, screenPosition, rotation]
  }

  const adjustPlaneForScreenSize = () => { 
    let screenScale, screenPosition
    
    if(window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5]
      screenPosition = [0, -1.5, 0]
    } else {
      screenScale = [3, 3, 3]
      screenPosition = [0, -4, -4]
    }
    
    return [screenScale, screenPosition]
  }

  const [planeScale, planePosition] = adjustPlaneForScreenSize()
  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize()


  useEffect(() => {
    if (!showIntro) return;

    const container = document.querySelector('.wave-container');
    if (!container) return;
    

    container.innerHTML = '';
    

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    
    container.appendChild(svg);
    

    const waves = [
      { color: 'rgba(79, 70, 229, 0.4)', amplitude: 25, period: 700, phase: 0 },    // indigo-600
      { color: 'rgba(99, 102, 241, 0.3)', amplitude: 20, period: 500, phase: 2 },   // indigo-500
      { color: 'rgba(45, 212, 191, 0.2)', amplitude: 15, period: 300, phase: 4 },   // teal-400
      { color: 'rgba(20, 184, 166, 0.1)', amplitude: 30, period: 900, phase: 6 }    // teal-500
    ];
    
    const paths = waves.map(wave => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill', wave.color);
      svg.appendChild(path);
      return { path, ...wave };
    });
    

    let animationId;
    const animate = () => {
      const height = container.clientHeight;
      const width = container.clientWidth;
      

      const now = Date.now() / 1000;
      
      paths.forEach(({ path, amplitude, period, phase, color }) => {
        let d = `M 0 ${height} `;
        

        for (let x = 0; x <= width; x += 10) {
          const y = Math.sin((x / period) + now + phase) * amplitude + (height / 2);
          d += `L ${x} ${y} `;
        }
        

        d += `L ${width} ${height} L 0 ${height} Z`;
        path.setAttribute('d', d);
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    

    return () => {
      cancelAnimationFrame(animationId);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [showIntro]);


  useEffect(() => {
    if (!showIntro) return;

    const container = document.querySelector('.fun-background');
    if (!container) return;
    

    container.innerHTML = '';
    

    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    

    const bubbles = [];
    const colors = [
      '#8B5CF6', // purple-500
      '#EC4899', // pink-500 
      '#3B82F6', // blue-500
      '#10B981', // emerald-500
      '#F59E0B', // amber-500
    ];
    
  
    for (let i = 0; i < 40; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 30 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }
    
   
    const mouseFollower = document.querySelector('.mouse-follower');
    if (mouseFollower) {
      mouseFollower.style.width = '20px';
      mouseFollower.style.height = '20px';
      mouseFollower.style.borderRadius = '50%';
      mouseFollower.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)';
      mouseFollower.style.filter = 'blur(5px)';
      mouseFollower.style.transform = 'translate(-50%, -50%)';
    }
    
   
    let mouse = { x: 0, y: 0 };
    
    canvas.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      
      if (Math.random() > 0.8) {
        bubbles.push({
          x: mouse.x,
          y: mouse.y,
          radius: Math.random() * 20 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: (Math.random() * 4 - 2),
          speedY: (Math.random() * 4 - 2),
          alpha: Math.random() * 0.5 + 0.3,
        });
        
   
        if (bubbles.length > 100) {
          bubbles.shift();
        }
      }
    });
    

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
    
      bubbles.forEach((bubble, index) => {
 
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color + Math.floor(bubble.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
        

        bubble.x += bubble.speedX;
        bubble.y += bubble.speedY;
        

        if (bubble.x - bubble.radius < 0 || bubble.x + bubble.radius > canvas.width) {
          bubble.speedX *= -1;
        }
        
        if (bubble.y - bubble.radius < 0 || bubble.y + bubble.radius > canvas.height) {
          bubble.speedY *= -1;
        }
        
      
        const dx = mouse.x - bubble.x;
        const dy = mouse.y - bubble.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const forceX = dx / distance * 0.5;
          const forceY = dy / distance * 0.5;
          
          bubble.speedX += forceX;
          bubble.speedY += forceY;
        }
        
     
        const maxSpeed = 3;
        const speed = Math.sqrt(bubble.speedX * bubble.speedX + bubble.speedY * bubble.speedY);
        if (speed > maxSpeed) {
          bubble.speedX = (bubble.speedX / speed) * maxSpeed;
          bubble.speedY = (bubble.speedY / speed) * maxSpeed;
        }
        

        bubble.speedX += (Math.random() - 0.5) * 0.1;
        bubble.speedY += (Math.random() - 0.5) * 0.1;
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [showIntro]);

  return (
    <section className='w-full h-screen relative overflow-hidden home-section'>
      {/* Audio element */}
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        src="https://assets.codepen.io/721952/peaceful-garden-ambient.mp3" 
      />
      
    
      <AnimatePresence>
        {showIntro && <IntroOverlay />}
      </AnimatePresence>
      
   
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage}/>}
      </div>
      
      <Canvas 
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing': 'cursor-grab'}`}
        camera={{near:0.1, far:1000}}
        onCreated={() => setIsLoaded(true)}
      >
        <Suspense fallback={!showIntro ? <Loader/> : null}>
          <directionalLight position={[1,1,1]} intensity={1}/>
          <ambientLight intensity={0.5}/>
          <spotLight/>
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1}/>
          <Bird/>
          <Sky isRotating={isRotating} />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            scale={planeScale}
            position={planePosition}
            isRotating={isRotating}
            rotation={[0,20,0]}
          />
        </Suspense>
      </Canvas>
      
     
      <div className="absolute bottom-6 left-4 sm:left-6 md:left-0 right-28 sm:right-28 md:right-0 
                      flex justify-center items-center pointer-events-none z-10">
        <p className="px-4 py-2 bg-black bg-opacity-40 dark:bg-opacity-50 rounded-full text-xs sm:text-sm text-center text-white">
          Use arrow keys or drag to rotate the island
        </p>
      </div>
    </section>
  )
}


const style = document.createElement('style');
style.innerHTML = `

  .edge-glow {
    position: absolute;
    opacity: 0;
    animation: pulse-edge 4s ease-in-out infinite;
  }
  
  .top-edge {
    top: 0;
    left: 0;
    right: 0;
    height: 180px;
    background: radial-gradient(ellipse at top, rgba(139, 92, 246, 0.4) 0%, rgba(0, 0, 0, 0) 70%);
    animation-delay: 0s;
  }
  
  .right-edge {
    top: 0;
    right: 0;
    bottom: 0;
    width: 180px;
    background: radial-gradient(ellipse at right, rgba(236, 72, 153, 0.4) 0%, rgba(0, 0, 0, 0) 70%);
    animation-delay: 1s;
  }
  
  .bottom-edge {
    bottom: 0;
    left: 0;
    right: 0;
    height: 180px;
    background: radial-gradient(ellipse at bottom, rgba(59, 130, 246, 0.4) 0%, rgba(0, 0, 0, 0) 70%);
    animation-delay: 2s;
  }
  
  .left-edge {
    top: 0;
    left: 0;
    bottom: 0;
    width: 180px;
    background: radial-gradient(ellipse at left, rgba(16, 185, 129, 0.4) 0%, rgba(0, 0, 0, 0) 70%);
    animation-delay: 3s;
  }
  
  @keyframes pulse-edge {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }
  

  .fun-name {
    background: linear-gradient(to right, #8b5cf6, #ec4899, #3b82f6);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    position: relative;
    font-weight: 600;
    display: inline-block;
    animation: text-shimmer 6s ease-in-out infinite;
  }
  
  @keyframes text-shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  

  .fun-button {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: all 0.3s ease;
  }
  
  .fun-button:hover {
    background: rgba(255, 255, 255, 0.15);
    color: white;
    box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
    transform: translateY(-2px);
  }
  

  .fun-loader {
    background: linear-gradient(to right, #8b5cf6, #ec4899, #3b82f6);
    background-size: 200% 100%;
    animation: loader-move 4s ease infinite;
    box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
  }
  
  @keyframes loader-move {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;
document.head.appendChild(style);

export default Home
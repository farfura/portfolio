import React, { useState } from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Navbar from "./components/Navbar";
import SocialLinks from "./components/SocialLinks";
/*import index from "./pages/index"*/
import {Home,About,Projects,Contact,ViewCV} from './pages'

const App = () => {
  // State to track if intro has played in this session
  const [introPlayedInSession, setIntroPlayedInSession] = useState(false);

  return (
    <main className='animated-gradient-bg h-full min-h-screen'>
      <Router>
        <Navbar/>
        <SocialLinks desktopStyle="sidebar" />
        <Routes>
          {/* Pass state and setter to Home route */}
          <Route 
            path="/" 
            element={ <Home introPlayed={introPlayedInSession} setIntroPlayed={setIntroPlayedInSession} /> }
          />
          <Route path="/about" element={<About/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/view-cv" element={<ViewCV/>}/>
        </Routes>
      </Router>
    </main>
  )
}

export default App
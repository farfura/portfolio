import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Navbar from "./components/Navbar";
/*import index from "./pages/index"*/
import {Home,About,Projects,Contact} from './pages'
const App = () => {
  return (
    <main className='animated-gradient-bg h-full min-h-screen'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </Router>
    </main>
  )
}

export default App
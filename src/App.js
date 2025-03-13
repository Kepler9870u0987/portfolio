import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Animations from './components/Animations';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className="h-screen flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-grow overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/animations" element={<Animations />} />
          </Routes>
        </main>
        <footer className="bg-gray-100 py-6 border-t border-gray-200">
          <div className="container mx-auto text-center text-gray-600">
            <p>© {new Date().getFullYear()} - Mio Template React con Tailwind e GSAP</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;

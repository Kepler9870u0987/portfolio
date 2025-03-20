import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navItemsRef = useRef([]);
  const highlighterRef = useRef(null);
  const menuContainerRef = useRef(null);
  
  // Reset navItemsRef array
  navItemsRef.current = [];
  
  // Add references to the array
  const addToNavRefs = (el) => {
    if (el && !navItemsRef.current.includes(el)) {
      navItemsRef.current.push(el);
    }
  };
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleClickOutside = (event) => {
    if (
      menuRef.current && 
      !menuRef.current.contains(event.target) && 
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };
  
  const handleNavClick = (index) => {
    setActiveIndex(index);
  };
  
  // Inizializza e posiziona l'highlighter
  useEffect(() => {
    if (
      menuContainerRef.current && 
      navItemsRef.current.length > 0 && 
      highlighterRef.current
    ) {
      const activeItem = navItemsRef.current[activeIndex];
      if (activeItem) {
        const rect = activeItem.getBoundingClientRect();
        gsap.set(highlighterRef.current, {
          x: activeItem.offsetLeft,
          width: rect.width,
          height: rect.height,
          borderRadius: '9999px'
        });
      }
    }
  }, []);
  
  // Aggiorna la posizione dell'highlighter quando cambia l'elemento attivo
  useEffect(() => {
    if (navItemsRef.current.length > 0 && highlighterRef.current) {
      const activeItem = navItemsRef.current[activeIndex];
      if (activeItem) {
        gsap.to(highlighterRef.current, {
          x: activeItem.offsetLeft,
          width: activeItem.offsetWidth,
          duration: 0.5,
          ease: 'power3.out'
        });
      }
    }
  }, [activeIndex]);
  
  useEffect(() => {
    // Mobile menu animation
    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      if (menuRef.current) {
        gsap.to(menuRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power3.in'
        });
      }
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Contact button animation
  const contactBtnRef = useRef(null);
  
  useEffect(() => {
    if (contactBtnRef.current) {
      gsap.set(contactBtnRef.current, { scale: 1 });
      
      const handleMouseEnter = () => {
        gsap.to(contactBtnRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: 'back.out(1.5)'
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(contactBtnRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'power1.inOut'
        });
      };
      
      contactBtnRef.current.addEventListener('mouseenter', handleMouseEnter);
      contactBtnRef.current.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        if (contactBtnRef.current) {
          contactBtnRef.current.removeEventListener('mouseenter', handleMouseEnter);
          contactBtnRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }
  }, []);
  
  return (
    // Navbar con sfondo bianco molto trasparente, blur e ombra in basso
    <nav className="bg-transparent backdrop-blur-sm text-gray-800 py-4 px-6 shadow-md shadow-gray-500/20 font-custom z-10">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto">
        
        {/* Logo a sinistra */}
        <div className="flex items-center">
          <a href="/" className="text-gray-800">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" 
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
        
        {/* Menu centrale - desktop */}
        <div className="hidden md:block">
          {/* Contenitore menu con sfondo leggermente trasparente e blur */}
          <div
            ref={menuContainerRef}
            className=" backdrop-blur-sm rounded-full px-2 py-1 relative"
          >
            {/* Highlighter che si muove */}
            <div
              ref={highlighterRef}
              className="absolute  backdrop-blur-sm rounded-full top-1 left-0 z-0"
              style={{ height: '38px' }}
            ></div>
            
            <ul className="flex space-x-1 relative z-10">
              <li>
                <a
                  ref={addToNavRefs}
                  href="#"
                  className={`block py-2 px-4 rounded-full transition-colors duration-300 relative z-10 ${
                    activeIndex === 0 ? 'text-gray-800' : 'text-gray-600'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(0);
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  ref={addToNavRefs}
                  href="#"
                  className={`block py-2 px-4 rounded-full transition-colors duration-300 relative z-10 ${
                    activeIndex === 1 ? 'text-gray-800' : 'text-gray-600'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(1);
                  }}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  ref={addToNavRefs}
                  href="#"
                  className={`block py-2 px-4 rounded-full transition-colors duration-300 relative z-10 ${
                    activeIndex === 2 ? 'text-gray-800' : 'text-gray-600'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(2);
                  }}
                >
                  Work
                </a>
              </li>
              <li>
                <a
                  ref={addToNavRefs}
                  href="#"
                  className={`block py-2 px-4 rounded-full transition-colors duration-300 relative z-10 ${
                    activeIndex === 3 ? 'text-gray-800' : 'text-gray-600'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(3);
                  }}
                >
                  Reviews
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Pulsante Contact Me - desktop */}
        <div className="hidden md:block">
          <a
            ref={contactBtnRef}
            href="/contact"
            className="bg-gray-800 text-white px-4 py-2 rounded-full font-medium hover:bg-gray-700 transition-colors"
          >
            Contact Me
          </a>
        </div>
        
        {/* Menu hamburger - mobile */}
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="md:hidden text-gray-800"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      
      {/* Menu mobile */}
      <div
        ref={menuRef}
        className={`${isOpen ? 'flex' : 'hidden'} md:hidden flex-col mt-4`}
        style={{ opacity: 0 }}
      >
        {/* Contenitore mobile con trasparenza e blur */}
        <div className=" backdrop-blur-sm rounded-lg p-2 mx-auto w-full max-w-sm shadow-md shadow-gray-500/20 z-10">
          <ul className="flex flex-col space-y-2">
            <li>
              <a
                href="#"
                className={`block py-2 px-4 text-gray-800 rounded-lg text-center ${
                  activeIndex === 0 ? 'bg-transparent' : 'hover:bg-transparent'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(0);
                  setIsOpen(false);
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block py-2 px-4 text-gray-800 rounded-lg text-center ${
                  activeIndex === 0 ? 'bg-transparent' : 'hover:bg-transparent'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(1);
                  setIsOpen(false);
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block py-2 px-4 text-gray-800 rounded-lg text-center ${
                  activeIndex === 0 ? 'bg-transparent' : 'hover:bg-transparent'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(2);
                  setIsOpen(false);
                }}
              >
                Work
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block py-2 px-4 text-gray-800 rounded-lg text-center ${
                  activeIndex === 0 ? 'bg-transparent' : 'hover:bg-transparent'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(3);
                  setIsOpen(false);
                }}
              >
                Reviews
              </a>
            </li>
            <li className="pt-2">
              <a
                href="/contact"
                className="block bg-gray-800 text-white px-4 py-2 rounded-full font-medium text-center hover:bg-gray-700 transition-colors"
              >
                Contact Me
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import HeroSection from '../components/HeroSection';
import Lavori from '../components/Lavori';

const Home = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Register plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Get all sections
    const sections = sectionsRef.current;
    
    // Set up for snap scrolling
    gsap.utils.toArray(sections).forEach((section, i) => {
      // Create a ScrollTrigger for each section
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => gsap.to(window, {
          duration: 0.8,
          scrollTo: { y: section, offsetY: 0 },
          ease: "power2.inOut"
        }),
        onEnterBack: () => gsap.to(window, {
          duration: 0.8,
          scrollTo: { y: section, offsetY: 0 },
          ease: "power2.inOut"
        }),
        markers: false // Set to true during development for debugging
      });
    });

    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Function to add sections to the ref array
  const addToSectionsRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full overflow-y-auto overflow-x-hidden"
    >
      <div ref={addToSectionsRef} className="min-h-screen flex items-center justify-center">
        <HeroSection />
      </div>
      <div ref={addToSectionsRef} className="min-h-screen flex items-center justify-center">
        <Lavori />
      </div>
      {/* Add more sections as needed */}
    </div>
  );
};

export default Home;
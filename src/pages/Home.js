import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import HeroSection from '../components/HeroSection';
import Lavori from '../components/Lavori';

// Registra i plugin necessari di GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Home = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Inizializza Locomotive Scroll
    const locomotiveScroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1.5,
      lerp: 0.1,
      smartphone: {
        smooth: true,
        multiplier: 0.5
      },
      tablet: {
        smooth: true,
        breakpoint: 1024
      }
    });
    
    // Aggiorna ScrollTrigger quando lo scroll di locomotive-scroll si aggiorna
    locomotiveScroll.on("scroll", ScrollTrigger.update);

    // Configura proxy per ScrollTrigger
    ScrollTrigger.scrollerProxy(scrollRef.current, {
      scrollTop(value) {
        return arguments.length 
          ? locomotiveScroll.scrollTo(value, 0, 0) 
          : locomotiveScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      pinType: scrollRef.current.style.transform ? "transform" : "fixed"
    });
    
    // Configura le animazioni di ScrollTrigger per le sezioni
    const sections = gsap.utils.toArray('section');
    
    // Crea un effetto di parallax per ogni sezione
    sections.forEach((section, i) => {
      // Effetto di entrata
      gsap.fromTo(section, 
        {
          y: i === 0 ? 0 : 100,
          opacity: i === 0 ? 1 : 0,
        }, 
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            scroller: scrollRef.current,
            start: "top bottom",
            end: "top center",
            toggleActions: "play none none reverse",
            scrub: 0.5,
            invalidateOnRefresh: true
          }
        }
      );
    });
    
    // Evento di resize per aggiornare Locomotive Scroll e ScrollTrigger
    const handleResize = () => {
      locomotiveScroll.update();
      ScrollTrigger.refresh();
    };
    
    // Debounce function
    const debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };
    
    const debouncedResize = debounce(handleResize, 200);
    window.addEventListener('resize', debouncedResize);
    
    // Assicurati che ScrollTrigger si aggiorni dopo che Locomotive Scroll è stato inizializzato
    ScrollTrigger.refresh();
    
    return () => {
      locomotiveScroll.destroy();
      ScrollTrigger.getAll().forEach(st => st.kill());
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  return (
    <div 
      ref={scrollRef} 
      data-scroll-container
      className="scroll-container"
    >
      {/* Prima sezione - Hero */}
      <section 
        className="min-h-screen w-full flex items-center justify-center" 
        data-scroll-section
      >
        <div data-scroll data-scroll-speed="0.9" className="w-full">
          <HeroSection />
        </div>
      </section>
      
      {/* Seconda sezione - Lavori */}
      <section 
        className="min-h-screen w-full flex items-center justify-center" 
        data-scroll-section
      >
        <div data-scroll data-scroll-speed="1.1" className="w-full">
          <Lavori />
        </div>
      </section>
      
      {/* Altre sezioni se necessario */}
      
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          overflow: auto;
        }
        
        .scroll-container {
          height: auto;
          width: 100%;
        }
        
        [data-scroll-container] {
          min-height: 100vh;
          width: 100%;
        }
        
        [data-scroll-section] {
          width: 100%;
        }
        
        [data-scroll] {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Home;
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import HeroSection from '../components/HeroSection';
import Lavori from '../components/Lavori';

const Home = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  // Parametri personalizzabili per lo scroll GSAP
  const scrollParams = {
    // Durata dell'animazione (in secondi)
    duration: 2,
    
    // Tipo di easing (controlla la progressione dell'animazione)
    // Opzioni comuni: "power1.inOut", "power2.inOut", "power3.inOut", "back.inOut", "elastic.out", "sine.inOut"
    ease: "power2.inOut", 
    
    // Determina quanto dev'essere visibile una sezione prima di attivarsi (0-1)
    // 0.5 significa che la sezione deve essere visibile al 50% per attivarsi
    visibilityThreshold: 0.3,
    
    // Tempo in millisecondi prima di considerare un altro scroll dopo un'animazione
    debounceTime: 100,
    
    // Tempo minimo in millisecondi tra due scroll consecutivi
    scrollCooldown: 800,
    
    // Abilita/disabilita il centraggio verticale delle sezioni
    centerSections: true,
    
    // Percentuale della finestra in cui posizionare la sezione (0.5 = centro)
    positionPercentage: 0.5,
    
    // Valore per scrub dell'animazione (più alto = più fluido ma più ritardato)
    scrubValue: 1,
    
    // Offset aggiuntivo in pixel (positivo = più in basso, negativo = più in alto)
    additionalOffset: 0
  };

  useEffect(() => {
    // Registra i plugin necessari
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Riferimento al container e alle sezioni
    const container = containerRef.current;
    const sections = sectionsRef.current;
    
    if (!container || sections.length === 0) return;
    
    // Configurazione dello scroll fluido con scrub
    let scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: scrollParams.scrubValue,
      }
    });
    
    // Variabili per gestire lo stato dello scroll
    let isScrolling = false;
    let lastScrollTime = 0;
    
    // Funzione per calcolare l'offset di posizionamento
    const calculateOffset = (section) => {
      if (!scrollParams.centerSections) return 0;
      
      const windowHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;
      
      // Centra la sezione in base alla percentuale specificata
      const targetPosition = windowHeight * scrollParams.positionPercentage;
      const offset = targetPosition - (sectionHeight * scrollParams.positionPercentage);
      
      return offset + scrollParams.additionalOffset;
    };
    
    // Funzione per scorrere alla sezione specificata
    const scrollToSection = (index) => {
      const now = Date.now();
      
      // Controlla se è passato abbastanza tempo dall'ultimo scroll
      if (isScrolling || (now - lastScrollTime < scrollParams.scrollCooldown)) {
        return false;
      }
      
      // Aggiorna lo stato e il timestamp
      isScrolling = true;
      lastScrollTime = now;
      
      // Trova la sezione target
      const targetSection = sections[index];
      if (!targetSection) return false;
      
      // Calcola l'offset per il posizionamento
      const offset = calculateOffset(targetSection);
      
      // Anima lo scroll
      gsap.to(window, {
        duration: scrollParams.duration,
        scrollTo: {
          y: targetSection,
          offsetY: offset,
          autoKill: false
        },
        ease: scrollParams.ease,
        onComplete: () => {
          // Resetta lo stato dopo l'animazione e un breve delay
          setTimeout(() => {
            isScrolling = false;
          }, scrollParams.debounceTime);
        }
      });
      
      return true;
    };
    
    // Configura ScrollTrigger per ogni sezione
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: `top ${scrollParams.visibilityThreshold * 100}%`, 
        onEnter: () => {
          scrollToSection(index);
        },
        onEnterBack: () => {
          scrollToSection(index);
        }
      });
    });
    
    // Gestisci gli eventi di scroll manuale
    const handleWheel = (e) => {
      if (isScrolling) return;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      
      // Trova la sezione attualmente più visibile
      let currentSectionIndex = 0;
      let maxVisibility = 0;
      
      sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calcola quanta parte della sezione è visibile (0-1)
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const sectionVisibility = visibleHeight / rect.height;
        
        if (sectionVisibility > maxVisibility) {
          maxVisibility = sectionVisibility;
          currentSectionIndex = i;
        }
      });
      
      // Calcola l'indice della prossima sezione
      const nextIndex = Math.max(0, Math.min(sections.length - 1, currentSectionIndex + direction));
      
      // Tenta di scorrere alla sezione successiva
      if (nextIndex !== currentSectionIndex) {
        scrollToSection(nextIndex);
      }
    };
    
    // Aggiungi l'event listener
    container.addEventListener('wheel', handleWheel, { passive: true });
    
    // Opzione per scrollare alla prima sezione all'inizio
    // Decommentare la riga seguente per attivare lo scroll iniziale
    // setTimeout(() => scrollToSection(0), 200);
    
    // Cleanup
    return () => {
      container.removeEventListener('wheel', handleWheel);
      ScrollTrigger.getAll().forEach(st => st.kill());
      if (scrollTl) scrollTl.kill();
    };
  }, [scrollParams]); // Aggiunto scrollParams alle dipendenze

  // Funzione per aggiungere sezioni al ref
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
      <div ref={addToSectionsRef} className="min-h-5/6 h-5/6 flex items-center justify-center">
        <HeroSection />
      </div>
      <div ref={addToSectionsRef} className="min-h-full flex items-center justify-center">
        <Lavori />
      </div>
      {/* Add more sections as needed */}
    </div>
  );
};

export default Home;
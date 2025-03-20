import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import animationData from '../animations/lottie/LaptopAnimation.json';
import secondAnimationData from '../animations/lottie/scrollingIcon.json';
import thirdAnimationData from '../animations/lottie/underlying.json';

// Registra il plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const laptopAnimationRef = useRef(null);
  const containerRef = useRef(null);
  const lastScrollPos = useRef(0);

  useEffect(() => {
    const laptopAnimation = laptopAnimationRef.current;
    const container = containerRef.current;
    
    if (!laptopAnimation || !container) return;
    
    // Effetto di fluttuazione continua con movimento più ampio
    const floatAnimation = gsap.timeline({ repeat: -1, yoyo: true });
    floatAnimation.to(laptopAnimation, {
      y: -30, // Aumentato da -15 a -30 per maggiore movimento verticale
      duration: 2.5,
      ease: "sine.inOut"
    });
    floatAnimation.to(laptopAnimation, {
      y: 10, // Aggiunto movimento positivo per estendere l'ampiezza totale dell'oscillazione
      duration: 2.5,
      ease: "sine.inOut"
    });
    
    // Aggiungo una leggera rotazione durante la fluttuazione per renderla più naturale
    const rotateAnimation = gsap.timeline({ repeat: -1, yoyo: true });
    rotateAnimation.to(laptopAnimation, {
      rotation: 3,
      duration: 3.5,
      ease: "sine.inOut",
      delay: 0.5
    });
    rotateAnimation.to(laptopAnimation, {
      rotation: -3,
      duration: 3.5,
      ease: "sine.inOut"
    });
    
    // Implemento un listener di scroll manuale invece di ScrollTrigger per maggiore controllo
    const handleScroll = () => {
      // Calcola la direzione e la velocità di scroll
      const currentScrollPos = window.scrollY;
      const scrollDirection = currentScrollPos > lastScrollPos.current ? 1 : -1; // 1 = down, -1 = up
      const scrollDelta = Math.abs(currentScrollPos - lastScrollPos.current);
      
      // Calcoliamo un effetto di rotazione basato sulla direzione e velocità
      const rotationAmount = Math.min(scrollDelta / 10, 15) * scrollDirection;
      
      // Applica la rotazione immediatamente
      gsap.to(laptopAnimation, {
        rotation: rotationAmount,
        duration: 0.2,
        overwrite: true
      });
      
      // Ritorna alla rotazione normale dopo un breve ritardo
      gsap.to(laptopAnimation, {
        rotation: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "elastic.out(1, 0.3)",
        overwrite: false
      });
      
      // Aggiorna la posizione per il prossimo evento
      lastScrollPos.current = currentScrollPos;
    };
    
    // Aggiungi l'event listener per lo scroll
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      floatAnimation.kill();
      rotateAnimation.kill();
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-between relative"
    >
      {/* Contenuto principale */}
      <div className="flex w-full h-full items-center justify-center p-6">
        {/* Prima colonna - 2/3 della larghezza */}
        <div className="w-2/3 ml-6 flex flex-col space-y-4">
          <div className="text-7xl text-gray-900 font-custom font-extralight">Crea il tuo sito web</div>
          <hr className="my-6 h-0.5 w-2/3 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-70 dark:via-neutral-400" />
          <div className="text-5xl text-gray-900 ml-2 font-custom font-extralight">Crea la tua identità digitale</div>
          
          {/* Animazione sotto "Crea la tua identità digitale" */}
          <div className="w-2/3 h-24">
            <Lottie 
              animationData={thirdAnimationData}
              loop={true}
              autoplay={true}
              speed={0.5}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
        
        {/* Seconda colonna - 1/3 della larghezza */}
        <div ref={laptopAnimationRef} className="w-1/3 flex items-center justify-center">
          {/* Animazione Lottie */}
          <Lottie 
            animationData={animationData}
            loop={true}
            autoplay={true}
            speed={1}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      {/* Testo sopra l'icona di scorrimento */}
      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-gray-600 font-custom font-medium whitespace-nowrap">
          Scorri per esplorare
        </div>
      </div>

      {/* Animazione di scorrimento */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-32 flex items-center justify-center">
        <Lottie 
          animationData={secondAnimationData}
          loop={true}
          autoplay={true}
          speed={1}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default HeroSection;
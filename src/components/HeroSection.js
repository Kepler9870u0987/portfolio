import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import secondAnimationData from '../animations/lottie/scrollingIcon.json';
import thirdAnimationData from '../animations/lottie/underlying.json';

// Registra il plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const laptopGifRef = useRef(null);
  const deviceGifRef = useRef(null); // Nuovo ref per la seconda GIF
  const containerRef = useRef(null);
  const lastScrollPos = useRef(0);

  useEffect(() => {
    const laptopGif = laptopGifRef.current;
    const deviceGif = deviceGifRef.current; // Riferimento alla nuova GIF
    const container = containerRef.current;
    
    if (!laptopGif || !container || !deviceGif) return;
    
    // Effetto di fluttuazione continua con movimento più ampio per il laptop
    const floatAnimation = gsap.timeline({ repeat: -1, yoyo: true });
    floatAnimation.to(laptopGif, {
      y: -30,
      duration: 2.5,
      ease: "sine.inOut"
    });
    floatAnimation.to(laptopGif, {
      y: 10,
      duration: 2.5,
      ease: "sine.inOut"
    });
    
    // Effetto di fluttuazione per il device (sfasato rispetto al laptop)
    const deviceFloatAnimation = gsap.timeline({ repeat: -1, yoyo: true });
    deviceFloatAnimation.to(deviceGif, {
      y: -20, 
      duration: 2.2, // Durata leggermente diversa per creare un effetto non sincronizzato
      ease: "sine.inOut",
      delay: 0.7 // Ritardo per creare uno sfasamento con l'animazione del laptop
    });
    deviceFloatAnimation.to(deviceGif, {
      y: 15,
      duration: 2.2,
      ease: "sine.inOut"
    });
    
    // Aggiungo una leggera rotazione durante la fluttuazione per renderla più naturale
    const rotateAnimation = gsap.timeline({ repeat: -1, yoyo: true });
    rotateAnimation.to(laptopGif, {
      rotation: 3,
      duration: 3.5,
      ease: "sine.inOut",
      delay: 0.5
    });
    rotateAnimation.to(laptopGif, {
      rotation: -3,
      duration: 3.5,
      ease: "sine.inOut"
    });
    
    // Rotazione per il device (con valori e timing diversi)
    const deviceRotateAnimation = gsap.timeline({ repeat: -1, yoyo: true });
    deviceRotateAnimation.to(deviceGif, {
      rotation: -2,
      duration: 3,
      ease: "sine.inOut",
      delay: 1
    });
    deviceRotateAnimation.to(deviceGif, {
      rotation: 2,
      duration: 3,
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
      
      // Applica la rotazione immediatamente a entrambi gli elementi
      gsap.to([laptopGif, deviceGif], {
        rotation: rotationAmount,
        duration: 0.2,
        overwrite: true,
        stagger: 0.1 // Aggiunge un leggero ritardo tra le animazioni
      });
      
      // Ritorna alla rotazione normale dopo un breve ritardo
      gsap.to([laptopGif, deviceGif], {
        rotation: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "elastic.out(1, 0.3)",
        overwrite: false,
        stagger: 0.1
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
      deviceFloatAnimation.kill();
      deviceRotateAnimation.kill();
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-screen flex flex-col items-center justify-between relative"
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
        
        {/* Seconda colonna - 1/3 della larghezza con entrambe le GIF */}
        <div className="w-1/3 flex flex-col items-center justify-center relative">
          {/* Laptop GIF */}
          <div ref={laptopGifRef} className="w-full flex items-center justify-center">
            <img 
              src="/animations/nsc-wine-shop/laptop_home_nobg.gif" 
              alt="Laptop Animation"
              className="w-full h-auto"
              onError={(e) => {
                // Fallback alla seconda location se la prima non funziona
                e.target.onerror = null;
                e.target.src = "animations/MatteoBocchi/laptop_home.gif";
              }}
            />
          </div>
          
          {/* Device GIF - posizionata sotto e leggermente sfalsata */}
          <div 
            ref={deviceGifRef} 
            className="absolute -bottom-12 right-0 w-1/2"
          >
            <img 
              src="animations/MatteoBocchi/device_filmografia.gif" 
              alt="Device Animation"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Container per l'animazione di scorrimento e il testo - position: absolute per fissarlo al componente */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-4">
        {/* Testo sopra l'icona di scorrimento */}
        <div className="text-gray-600 font-custom font-medium whitespace-nowrap mb-2">
          Scorri per esplorare
        </div>
        
        {/* Animazione di scorrimento */}
        <div className="w-24 h-24 flex items-center justify-center">
          <Lottie 
            animationData={secondAnimationData}
            loop={true}
            autoplay={true}
            speed={1}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
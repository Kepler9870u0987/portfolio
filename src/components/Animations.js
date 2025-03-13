import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Animations = () => {
  const boxRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRefs = useRef([]);

  // Animazione base
  const playBasicAnimation = () => {
    gsap.to(boxRef.current, {
      x: 100,
      duration: 1,
      backgroundColor: '#4ade80',
      borderRadius: '50%',
      yoyo: true,
      repeat: 1
    });
  };

  // Animazione timeline
  const playTimelineAnimation = () => {
    const tl = gsap.timeline();
    
    tl.to(circleRef.current, {
      y: -50,
      duration: 0.5,
      ease: 'power1.out'
    })
    .to(circleRef.current, {
      x: 100,
      backgroundColor: '#60a5fa',
      duration: 0.5
    })
    .to(circleRef.current, {
      y: 0,
      duration: 0.5,
      ease: 'bounce.out'
    })
    .to(circleRef.current, {
      x: 0,
      backgroundColor: '#f43f5e',
      duration: 0.5
    });
  };

  // Animazione testo
  const playTextAnimation = () => {
    gsap.from(textRef.current.children, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out'
    });
  };

  // Animazione sui bottoni all'ingresso
  useEffect(() => {
    gsap.from(buttonRefs.current, {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-secondary">
        Demo Animazioni GSAP
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div className="card flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-6">Animazione Base</h2>
          <div 
            ref={boxRef} 
            className="w-24 h-24 bg-red-500 mb-6"
          ></div>
          <button 
            ref={el => buttonRefs.current[0] = el}
            onClick={playBasicAnimation}
            className="btn"
          >
            Avvia Animazione
          </button>
        </div>
        
        <div className="card flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-6">Timeline Animation</h2>
          <div 
            ref={circleRef} 
            className="w-24 h-24 rounded-full bg-red-500 mb-6"
          ></div>
          <button 
            ref={el => buttonRefs.current[1] = el}
            onClick={playTimelineAnimation}
            className="btn"
          >
            Avvia Timeline
          </button>
        </div>
      </div>
      
      <div className="card max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-center">Animazione Testo</h2>
        <div ref={textRef} className="text-center mb-6">
          <p className="text-lg mb-2">GSAP rende le animazioni semplici.</p>
          <p className="text-lg mb-2">Timeline permette di sequenziare animazioni.</p>
          <p className="text-lg mb-2">ScrollTrigger attiva animazioni allo scroll.</p>
          <p className="text-lg mb-2">Stagger anima elementi in sequenza.</p>
        </div>
        <div className="text-center">
          <button 
            ref={el => buttonRefs.current[2] = el}
            onClick={playTextAnimation}
            className="btn"
          >
            Anima Testo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Animations;
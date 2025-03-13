import React, { useEffect, useRef } from 'react';
import { scrollAnimation, titleAnimation } from '../animations/gsapAnimations';

const About = () => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Animazione per il titolo
    if (titleRef.current) {
      titleAnimation(titleRef.current);
    }
    
    // Animazione per il contenuto basata su scroll
    if (contentRef.current) {
      scrollAnimation(contentRef.current);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 ref={titleRef} className="text-4xl font-bold text-center mb-12 text-secondary">
        Chi siamo
      </h1>
      
      <div ref={contentRef} className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <p className="text-lg text-gray-700 mb-6">
          Questo template React personalizzato è stato creato per offrire un punto di partenza solido
          per lo sviluppo di applicazioni React senza dipendere da Create React App.
        </p>
        
        <p className="text-lg text-gray-700 mb-6">
          Offre una configurazione flessibile che può essere modificata in base alle tue esigenze specifiche.
        </p>
        
        <h2 className="text-2xl font-semibold text-secondary mb-4 mt-8">
          Tecnologie incluse:
        </h2>
        
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>React con supporto completo per Hooks e Context API</li>
          <li>Tailwind CSS per styling veloce e responsive</li>
          <li>GSAP per animazioni professionali</li>
          <li>Webpack configurato per sviluppo e produzione</li>
          <li>Babel per ES6+ e JSX</li>
          <li>React Router per la navigazione</li>
          <li>ESLint e Prettier per code quality</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
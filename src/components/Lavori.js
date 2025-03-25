import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

const Lavori = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 relative">
      {/* Header section */}
      <div className="w-full rounded-[10vh] shadow-lg bg-gray-100 p-12">
        <div className="mb-16 text-center">
          <div className="text-sm text-gray-600 mb-4">scopri i nostri</div>
          <h1 className="text-7xl font-custom font-light leading-none">progetti</h1>
          <h1 className="text-7xl font-custom font-light leading-none mb-6">completati</h1>
          <p className="text-sm">
            In 10 anni abbiamo <br />
            implementato oltre 400+ <br />
            progetti, ecco alcuni esempi
          </p>
        </div>
        {/* Grid system per le ProjectCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <ProjectCard 
            image="/lavori/matteo-bocchi-portfolio/home.png"
            titolo="Matteo Bocchi"
          />
          <ProjectCard 
            image="/lavori/nsc-wine-shop/nsc_eventi.png"
            titolo="NSC Wine Shop"
          />
        </div>
      </div>
    </div>
  );
};

export default Lavori;
import React, { useState } from 'react';
import { gsap } from 'gsap';

const Lavori = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 relative">
      {/* Header section */}
      <div className="w-full rounded-[10vh] shadow-lg bg-gray-100 p-12">
        <div className="mb-16">
          <div className="text-sm text-gray-600 mb-4">
            scopri i nostri
          </div>
          <h1 className="text-7xl font-custom font-light leading-none">
            progetti
          </h1>
          <h1 className="text-7xl font-custom font-light leading-none mb-6">
            completati
          </h1>
          <div className="text-right">
            <p className="text-sm">
              In 10 anni abbiamo <br />
              implementato oltre 400+ <br />
              progetti, ecco alcuni esempi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lavori;
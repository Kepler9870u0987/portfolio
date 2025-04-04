import React from 'react';

const Servizi = () => {
  return (
    <div 
      className={`
        rounded-2xl 
        overflow-hidden 
        relative 
        h-[36rem] w-full
        transition-all 
        duration-300 
        hover:scale-[1.02] 
        hover:shadow-2xl 
        group
      `}
      // Impostiamo un bordo grigio per l'intero container o per l'area interna
      style={{ border: '1px solid #ccc' }}
    >
      <div className="p-6 flex flex-col h-full border border-gray-300">
        {/* Nessun elemento interno */}
      </div>
    </div>
  );
};

export default Servizi;
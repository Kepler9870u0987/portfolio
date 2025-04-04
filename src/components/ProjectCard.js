import React, { useState, useEffect, useRef } from 'react';
import ColorThief from 'colorthief';

const ProjectCard = ({ 
  image, 
  titolo, 
  subtitle = 'Descrizione non disponibile',
  textColor = 'light',
  onViewCase 
}) => {
  const textColors = {
    light: {
      title: 'text-white',
      subtitle: 'text-gray-400',
      button: 'text-white border-white/30 hover:bg-white/10'
    },
    dark: {
      title: 'text-black',
      subtitle: 'text-black/70',
      button: 'text-black border-black/30 hover:bg-black/10'
    }
  };
  
  const currentTextColor = textColors[textColor];
  const [gradientBg, setGradientBg] = useState('');
  const imgRef = useRef(null);

  const handleImageLoad = () => {
    if (imgRef.current && imgRef.current.complete) {
      console.log('Immagine caricata:', imgRef.current.src);
      const colorThief = new ColorThief();
      // Ottieni una palette con 3 colori
      const palette = colorThief.getPalette(imgRef.current, 3);
      if (palette && palette.length >= 3) {
        console.log('Palette:', palette);
        // Costruisci un gradiente con i 3 colori
        const gradient = `linear-gradient(135deg, rgb(${palette[0].join(',')}) 0%, rgb(${palette[1].join(',')}) 50%, rgb(${palette[2].join(',')}) 100%)`;
        setGradientBg(gradient);
      } else {
        console.log('Palette non sufficiente.');
      }
    } else {
      console.log('L\'immagine non è ancora completamente caricata.');
    }
  };

  const handleViewCase = () => {
    if (onViewCase) {
      onViewCase();
    }
  };

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
      style={{ backgroundImage: gradientBg || undefined }}
    >
      <div className="p-6 flex flex-col h-full">
        <div 
          className={`
            rounded-xl 
            overflow-hidden 
            h-[21rem]
            mb-6 
            relative 
            group-hover:scale-[1.02] 
            transition-transform 
            duration-300
            flex 
            items-center 
            justify-center
          `}
        >
          <img
            ref={imgRef}
            src={image || 'https://via.placeholder.com/400x300'}
            alt={`${titolo} project`}
            className="max-w-full max-h-full object-contain"
            crossOrigin="anonymous"
            onLoad={handleImageLoad}
          />
          <div 
            className="
              absolute 
              inset-0 
              bg-black/20 
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300 
              flex 
              items-center 
              justify-center
            "
          >
            <div 
              className="
                bg-white/20 
                p-3 
                rounded-full 
                backdrop-blur-sm 
                opacity-0 
                group-hover:opacity-100 
                transition-opacity 
                duration-300
              "
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className="w-6 h-6 text-white"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" 
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <h3 className={`text-4xl font-custom font-bold ${currentTextColor.title} mb-2`}>
            {titolo}
          </h3>
          <p className={`text-lg font-cusotm ${currentTextColor.subtitle} mb-6`}>
            {subtitle}
          </p>
        </div>
        <div>
          <button
            onClick={handleViewCase}
            className={`
              inline-flex 
              items-center 
              text-2xl 
              ${currentTextColor.button} 
              border 
              rounded-full 
              px-10 
              py-4 
              transition-all 
              duration-300 
              hover:pl-12 
              hover:pr-8
            `}
          >
            <span>view case</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              className="w-8 h-8 ml-4 transition-transform group-hover:translate-x-2"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
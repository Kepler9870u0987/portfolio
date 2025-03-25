import React from 'react';

const ProjectCard = ({ 
  image, 
  titolo, 
  subtitle = 'Descrizione non disponibile',
  backgroundColor = 'dark',
  textColor = 'light',
  onViewCase 
}) => {
  const backgroundColors = {
    dark: 'bg-[#18181b]',
    sand: 'bg-[#d2b59b]',
    yellow: 'bg-[#fcd34d]',
    military: 'bg-[#2f3a2f]'
  };
   
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
 
  const bgColor = backgroundColors[backgroundColor];
  const currentTextColor = textColors[textColor];
 
  const handleViewCase = () => {
    if (onViewCase) {
      onViewCase();
    }
  };
 
  return (
    <div 
      className={`
        ${bgColor} 
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
    >
      <div className="p-6 flex flex-col h-full">
        <div 
          className={`
            bg-white/10 
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
            src={image || 'https://via.placeholder.com/400x300'}
            alt={`${titolo} project`}
            className="max-w-full max-h-full object-contain"
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
          <h3 className={`text-2xl font-bold ${currentTextColor.title} mb-2`}>
            {titolo}
          </h3>
          <p className={`text-sm ${currentTextColor.subtitle} mb-6`}>
            {subtitle}
          </p>
        </div>
        <div>
          <button
            onClick={handleViewCase}
            className={`
              inline-flex 
              items-center 
              text-sm 
              ${currentTextColor.button} 
              border 
              rounded-full 
              px-5 
              py-2 
              transition-all 
              duration-300 
              hover:pl-6 
              hover:pr-4
            `}
          >
            <span>view case</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
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
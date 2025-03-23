import React from 'react';

const ProjectCard = ({ title, description, background }) => {
  return (
    <div className={`project-card relative rounded-3xl overflow-hidden shadow-lg ${background} flex flex-col`}>
      <div className="h-64 bg-gray-500"></div>
      <div className="p-8 text-white flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-custom mb-2">{title}</h3>
          <p className="text-sm opacity-80">{description}</p>
        </div>
        
        <div className="mt-8">
          <button className="flex items-center space-x-2 text-sm border border-white/30 px-4 py-2 rounded-full hover:bg-white/10 transition-colors">
            <span>view case</span>
            <svg className="w-4 h-4 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
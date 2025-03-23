import React from 'react';
import ProjectCard from './ProjectCard';

const Lavori = () => {
  const projects = [
    {
      id: 1,
      title: 'Fittra London',
      description: 'Renovation and house extension',
      background: 'bg-zinc-900'
    },
    {
      id: 2,
      title: 'Duna Estate',
      description: 'Real estate agency in Dubai',
      background: 'bg-stone-300'
    },
    {
      id: 3,
      title: 'Aerated Concrete',
      description: 'Sale of aerated concrete',
      background: 'bg-yellow-400'
    },
    {
      id: 4,
      title: 'III Assault Brigade',
      description: 'Site design',
      background: 'bg-zinc-800'
    }
  ];

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="w-full rounded-[10vh] shadow-lg bg-gray-100 p-12">
        {/* Header section */}
        <div className="mb-16">
          <div className="text-sm text-gray-600 mb-4">check our</div>
          <h1 className="text-7xl font-custom font-light leading-none">
            finished
          </h1>
          <h1 className="text-7xl font-custom font-light leading-none mb-6">
            projects
          </h1>
          
          <div className="text-right">
            <p className="text-sm">
              In 10 years we have <br />
              implemented more than 400+ <br />
              sites, here are some of them
            </p>
          </div>
        </div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              title={project.title} 
              description={project.description} 
              background={project.background} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lavori;
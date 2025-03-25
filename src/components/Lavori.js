import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ProjectCard = ({ title, description, background, onClick, cardRef }) => (
  <div 
    ref={cardRef}
    onClick={onClick}
    className={`${background} w-full h-96 rounded-2xl flex flex-col justify-end p-6 cursor-pointer hover:scale-105 transition-transform`}
  >
    <h2 className="text-2xl font-bold text-white">{title}</h2>
    <p className="text-sm text-white/80">{description}</p>
  </div>
);

const Lavori = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  const projects = [
    {
      id: 1,
      title: 'Fittra London',
      description: 'Ristrutturazione ed estensione casa',
      background: 'bg-zinc-900',
      details: 'Progetto di ristrutturazione completo a Londra, che include l\'ampliamento della struttura abitativa esistente con soluzioni moderne e funzionali.'
    },
    {
      id: 2,
      title: 'Duna Estate',
      description: 'Agenzia immobiliare a Dubai',
      background: 'bg-stone-300',
      details: 'Agenzia immobiliare di lusso specializzata in proprietà esclusive nel mercato di Dubai, offrendo servizi di intermediazione di alto livello.'
    },
    {
      id: 3,
      title: 'Calcestruzzo Aerato',
      description: 'Vendita di calcestruzzo aerato',
      background: 'bg-yellow-400',
      details: 'Distribuzione di calcestruzzo aerato, un materiale da costruzione innovativo con eccellenti proprietà isolanti e leggerezza.'
    },
    {
      id: 4,
      title: 'Brigata III Assalto',
      description: 'Progettazione sito web',
      background: 'bg-zinc-800',
      details: 'Progettazione e sviluppo di un sito web istituzionale per la Brigata III Assalto, con design moderno e funzionale.'
    }
  ];

  const openModal = (project, index) => {
    const selectedCardRef = cardRefs.current[index];
    
    if (!selectedCardRef || !modalRef.current) {
      console.error('Card or modal reference is missing');
      return;
    }
  
    setSelectedProject(project);
    setIsModalOpen(true);
  
    // Ottieni le dimensioni e la posizione della card selezionata
    const cardRect = selectedCardRef.getBoundingClientRect();
    const modalTarget = modalRef.current;
  
    // Imposta le animazioni GSAP
    gsap.set(modalTarget, { 
      position: 'fixed',
      top: cardRect.top,
      left: cardRect.left,
      width: cardRect.width,
      height: cardRect.height,
      borderRadius: '1rem',
      backgroundColor: getComputedStyle(selectedCardRef).backgroundColor, // Prendi il colore di sfondo della card
      opacity: 1
    });
  
    // Animazione di transizione
    gsap.timeline()
      .to(modalTarget, {
        duration: 0.5,
        top: '50%',
        left: '50%',
        width: '90%',
        height: 'auto',
        maxWidth: '42rem',
        transform: 'translate(-50%, -50%)',
        borderRadius: '1rem',
        backgroundColor: 'white', // Transizione al colore bianco del modale
        ease: 'power2.inOut'
      })
      .fromTo(
        modalTarget.querySelector('.modal-content'),
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.3,
          onStart: () => {
            // Assicurati che il contenuto del modale sia visibile
            modalTarget.querySelector('.modal-content').style.display = 'block';
          }
        },
        '-=0.2'
      );
  };
  const closeModal = () => {
    const modalTarget = modalRef.current;

    gsap.timeline()
      .to(modalTarget.querySelector('.modal-content'), {
        opacity: 0,
        scale: 0.9,
        duration: 0.2
      })
      .to(modalTarget, {
        duration: 0.5,
        top: `${window.innerHeight / 2}px`,
        left: `${window.innerWidth / 2}px`,
        width: 0,
        height: 0,
        opacity: 0,
        borderRadius: '50%',
        ease: 'power2.in',
        onComplete: () => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }
      });
  };

  useEffect(() => {
    const container = containerRef.current;
    
    const handleWheel = (e) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    if (container) {
      container.addEventListener('wheel', handleWheel);
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-8 relative">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"></div>
      )}
      
      <div className="w-full rounded-[10vh] shadow-lg bg-gray-100 p-12">
        {/* Header section */}
        <div className="mb-16">
          <div className="text-sm text-gray-600 mb-4">scopri i nostri</div>
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
        
        {/* Projects grid with horizontal scroll */}
        <div 
          ref={containerRef}
          className="flex overflow-x-scroll scrollbar-hide space-x-6 pb-4 scroll-smooth"
          style={{ 
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="flex-shrink-0 w-[600px]" 
              style={{ scrollSnapAlign: 'center' }}
            >
            <ProjectCard 
              cardRef={(el) => {
                // Importante: assegna il ref all'indice corretto
                cardRefs.current[index] = el;
              }}
              title={project.title} 
              description={project.description} 
              background={project.background} 
              onClick={() => openModal(project, index)}
            />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          ref={modalRef}
          className="fixed z-50 bg-white" // Assicurati che sia bg-white
          onClick={closeModal}
        >
          <div 
            className="modal-content p-8 max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>
            <p className="text-gray-700">{selectedProject.details}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lavori;
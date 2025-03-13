import React from 'react';

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header centrale */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Benvenuto nel mio template React personalizzato
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Un punto di partenza moderno con Tailwind CSS per layout responsive.
          </p>
        </div>

        {/* Sezione Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-gray-100 shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Tailwind CSS
            </h3>
            <p className="text-gray-700">
              Utility-first CSS framework per un design veloce e responsivo.
            </p>
          </div>

          <div className="bg-gray-100 shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              GSAP
            </h3>
            <p className="text-gray-700">
              Animazioni fluide e professionali per migliorare l'esperienza utente.
            </p>
          </div>

          <div className="bg-gray-100 shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Webpack
            </h3>
            <p className="text-gray-700">
              Configurazione personalizzata per una build ottimizzata.
            </p>
          </div>
        </div>

        {/* Pulsante Call-to-Action */}
        <div className="mt-16 text-center">
          <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition-colors">
            Inizia a sviluppare
          </button>
        </div>

      </div>
    </div>
  );
};

export default Home;

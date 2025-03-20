import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Animations from './components/Animations';
import Navbar from './components/Navbar';
import './fonts/fonts.css';

const App = () => {
  // Applica lo stile del colore di sfondo al body del documento
  React.useEffect(() => {
    // Imposta il colore di sfondo sul body
    document.body.style.backgroundColor = '#F6F6F6'; // gray-light
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.minHeight = '100vh';
    document.body.style.fontFamily = "'HomePageFont'";
    document.body.style.fontWeight = '300'; // Light
    document.body.style.fontOpticalSizing = 'none'; // no optical
    document.body.style.overflow = 'hidden'; // Previene lo scrolling del body
    
    // Aggiungi viewport meta tag per garantire il responsive design
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(viewportMeta);
    
    // Cleanup: ripristina lo stile originale quando il componente viene smontato
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.minHeight = '';
      document.body.style.fontFamily = '';
      document.body.style.fontWeight = '';
      document.body.style.fontOpticalSizing = '';
      document.body.style.overflow = '';
      
      // Rimuovi il viewport meta tag
      if (document.head.contains(viewportMeta)) {
        document.head.removeChild(viewportMeta);
      }
    };
  }, []); // L'array vuoto garantisce che questo effetto venga eseguito solo una volta al montaggio

  return (
    <Router>
      <div className="h-screen w-full max-w-full overflow-hidden flex flex-col bg-white">
        <Navbar/>
        <main className="flex-grow w-full overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/animations" element={<Animations />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../animations/lottie/LaptopAnimation.json';
import thirdAnimationData from '../animations/lottie/underlying.json';

const Lavori = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center rounded-[10vh] shadow-lg bg-gray-100">
      {/* Contenuto del secondo contenitore */}
      <div className="text-4xl text-gray-800 font-custom font-medium">
        Benvenuto nella sezione di esplorazione
      </div>
    </div>
  );
};

export default Lavori;

import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-rose-50 to-white pt-24 md:pt-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 md:w-96 md:h-96 bg-rose-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 md:w-80 md:h-80 bg-pink-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-6xl lg:text-8xl font-light text-gray-800 mb-6 leading-tight">
            Elevate
            <span className="block font-serif italic text-rose-600">
              Your Style
            </span>
          </h1>
          
          <p className="text-sm md:text-lg lg:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light px-2">
            Discover timeless elegance with our curated collection of premium women's fashion. 
            Where sophistication meets contemporary design.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-center items-center mb-8 md:mb-16 px-4">
            <Link 
              to="/collection"
              className="bg-gray-900 text-white px-6 md:px-12 py-3 md:py-4 text-xs md:text-sm uppercase tracking-wider font-medium hover:bg-gray-800 transition-all duration-300 w-full sm:w-auto sm:min-w-[180px] text-center"
            >
              Shop Collection
            </Link>
            <Link 
              to="/about"
              className="border border-gray-300 text-gray-800 px-6 md:px-12 py-3 md:py-4 text-xs md:text-sm uppercase tracking-wider font-medium hover:bg-gray-50 transition-all duration-300 w-full sm:w-auto sm:min-w-[180px] text-center"
            >
              About Us
            </Link>
          </div>

          <div className="flex justify-center items-center space-x-4 md:space-x-8 lg:space-x-12 text-gray-600 px-2">
            <div className="text-center">
              <div className="text-lg md:text-2xl lg:text-3xl font-light text-gray-800">500+</div>
              <div className="text-[9px] md:text-xs uppercase tracking-wider">Curated Pieces</div>
            </div>
            <div className="w-px h-8 md:h-12 lg:h-16 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-lg md:text-2xl lg:text-3xl font-light text-gray-800">10K+</div>
              <div className="text-[9px] md:text-xs uppercase tracking-wider">Happy Customers</div>
            </div>
            <div className="w-px h-8 md:h-12 lg:h-16 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-lg md:text-2xl lg:text-3xl font-light text-gray-800">Global</div>
              <div className="text-[9px] md:text-xs uppercase tracking-wider">Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

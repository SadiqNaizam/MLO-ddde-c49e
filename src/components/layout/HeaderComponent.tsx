import React from 'react';

const HeaderComponent: React.FC = () => {
  console.log('HeaderComponent loaded');

  return (
    <header className="w-full bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 text-white py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4">
          Eldarnwand Design System
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
          A scalable, accessible, and elegant color system for modern UIs
        </p>
      </div>
    </header>
  );
};

export default HeaderComponent;
import React from 'react';

const FooterComponent: React.FC = () => {
  console.log('FooterComponent loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 w-full">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {currentYear} Eldarnwand. All Rights Reserved.
        </p>
        <p className="text-xs mt-2">
          Crafting elegant, accessible, and cohesive user interfaces.
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
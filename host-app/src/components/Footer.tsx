import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-3 bg-gray-800 text-white"> 
      <div className="container mx-auto px-4 lg:max-w-[1200px] flex justify-between items-center">
        <span className="text-sm">
          © {new Date().getFullYear()} Ваше приложение
        </span>
        <a 
          href="https://example.com"
          className="ml-2 text-white hover:text-gray-300 transition-colors text-sm"
        >
          Политика конфиденциальности
        </a>
      </div>
    </footer>
  );
};

export default Footer;

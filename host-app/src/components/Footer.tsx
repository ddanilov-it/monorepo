import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <span className="footer-text">
          © {new Date().getFullYear()} Ваше приложение
        </span>
        <a
          href="https://example.com"
          className="footer-link"
        >
          Политика конфиденциальности
        </a>
      </div>
    </footer>
  );
};

export default Footer;

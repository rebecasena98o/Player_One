import React from 'react';
import { Link } from 'react-router-dom';
import '../style/StylePages/StyleGlobal.css';
import SearchBar from './SearchBar';
import '../style/StyleComponents/Header.css';
import iconLogo from '../imgs/IconeDado.png';

const Header = ({ toggleDarkMode, isDark, searchQuery, setSearchQuery, showSearch = true }) => {
  return (
    <header className="main-header">
      <div className="header-content">

        <div className="header-section left">
          <Link to="/home" className="logo-link" title="Ir para a Home">
            <div className="logo-icon-box">
              <img src={iconLogo} alt="Player One Logo" className="logo-img" />
            </div>
            <span className="logo-text">Player One</span>
          </Link>
        </div>

        <div className="header-section center">
          {showSearch && (
           <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          )}
        </div>

       <div className="header-section right">
          {/* Ícone de Festa/Reservas com Ponto de Notificação Vermelho */}
          <Link to="/reservas" className="header-icon-btn" title="Minhas Reservas">
            <div className="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor" className="svg-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-1.074-.765 7.99 7.99 0 0 0 1.257-3.707C4.228 15.018 3 13.622 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
              </svg>
              <span className="notification-dot"></span>
            </div>
          </Link>
          
          {/* Ícone de Perfil Outline */}
          <Link to="/perfil" className="header-icon-btn" title="Meu Perfil">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.6" stroke="currentColor" className="svg-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </Link>

          {/* Alternador de Tema Escuro/Claro integrado ao grupo */}
          <button onClick={toggleDarkMode} className="theme-toggle-btn" title="Alternar Tema">
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
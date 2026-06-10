import React, { useState, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './routes/PlayerOneAppRoutes';
import SearchBar from './components/SearchBar';

// Componente auxiliar global que monta a estrutura da página
function MainLayout({ isDark, toggleDarkMode, searchQuery, setSearchQuery }) {
  const location = useLocation();
  
  // Lista de rotas onde o Header e Footer NÃO devem aparecer
  const noHeaderRoutes = ['/', '/cadastro'];
  const showHeader = !noHeaderRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {showHeader && (
        <Header 
          toggleDarkMode={toggleDarkMode} 
          isDark={isDark} 
          searchQuery={searchQuery}      /* 🌟 Passa o texto para o Header global */
          setSearchQuery={setSearchQuery} /* 🌟 Passa a função para o Header global */
          showSearch={location.pathname === '/home'} 
        />
      )}
      
      <main className="main-content">
        {/* 🌟 Passamos o termo de busca para dentro das rotas filtrarem as páginas */}
        <AppRoutes searchQuery={searchQuery} /> 
      </main>

      {showHeader && (
        <footer className="main-footer" style={{ textAlign: 'center', padding: '20px 0', opacity: 0.7 }}>
          <p>© 2026 PLAYER ONE - Sistema de Gestão de Ludoteca UNIFOR</p>
        </footer>
      )}
    </div>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState(''); // 🌟 Estado da busca centralizado globalmente
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    const rootElement = document.documentElement;
    if (isDark) {
      rootElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      rootElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <BrowserRouter>
      <MainLayout 
        isDark={isDark} 
        toggleDarkMode={toggleDarkMode} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </BrowserRouter>
  );
}

export default App;
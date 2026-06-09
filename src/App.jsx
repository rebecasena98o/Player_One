import React, { useState, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './routes/PlayerOneAppRoutes';

// Componente auxiliar para escutar a rota atual e decidir se exibe o Header
function MainLayout({ isDark, toggleDarkMode }) {
  const location = useLocation();
  
  // Lista de rotas onde o Header NÃO deve aparecer de jeito nenhum
  const noHeaderRoutes = ['/', '/cadastro'];
  const showHeader = !noHeaderRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {showHeader && (
        <Header 
          toggleDarkMode={toggleDarkMode} 
          isDark={isDark} 
          showSearch={location.pathname === '/home'} // Só mostra a barra de pesquisa na Home
        />
      )}
      
      <main className="main-content">
        <AppRoutes /> 
      </main>
    </div>
  );
}

function App() {
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
      {/* Movemos a estrutura para o MainLayout para poder usar o useLocation() com segurança */}
      <MainLayout isDark={isDark} toggleDarkMode={toggleDarkMode} />
    </BrowserRouter>
  );
}

export default App;
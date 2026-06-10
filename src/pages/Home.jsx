import React, { useEffect, useState } from 'react';
import { jogoService } from '../service/JogoApi'; 
import GameGrid from '../components/GameGrid'; 
import Loader from '../components/Loader';

import "../style/StylePages/StyleGlobal.css";
import "../style/StylePages/StyleHome.css";
import "../style/StyleComponents/Header.css";
import "../style/StyleComponents/Card.css";
import "../style/StyleComponents/GameGrid.css";

const Home = ({ searchQuery = '' }) => { // 🌟 Recebe a busca diretamente do sistema global
  console.log("🔍 Texto digitado que chegou na Home:", searchQuery);
  const [games, setGames] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await jogoService.getAllGames(); 
        
        if (response && Array.isArray(response)) { 
          const sorted = response.sort((a, b) => 
            a.nome.localeCompare(b.nome)
          );
          setGames(sorted);
        }
      } catch (error) {
        console.error("🔴 Erro ao buscar jogos da Ludoteca:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  // Filtro de pesquisa rodando perfeitamente em tempo real
  const gamesToDisplay = games.filter(game =>
    game.nome.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    /* 🌟 COMPLETO: Sem tags duplicadas de Layout aqui dentro! 
       O container abaixo encaixa perfeitamente na <main> do App.jsx */
    <div className="home-page-container">
      <section className="hero-catalog">
        <h1>Catálogo de Jogos</h1>
        <p>Bem-vindo, usuário! Aproveite e reserve um jogo!</p>
      </section>

      {loading ? (
        <Loader /> 
      ) : (
        <GameGrid games={gamesToDisplay} />
      )}
    </div>
  );
};

export default Home;
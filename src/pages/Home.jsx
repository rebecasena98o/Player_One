import React, { useEffect, useState } from 'react';
import { jogoService } from '../service/JogoApi'; // Substitua pelo seu serviço real
import Layout from '../components/Layout'; 
import SearchBar from '../components/SearchBar';
import GameGrid from '../components/GameGrid'; 
import Loader from '../components/Loader';


import "../style/StylePages/StyleGlobal.css";
import "../style/StylePages/StyleHome.css";
import "../style/StyleComponents/Header.css";
import "../style/StyleComponents/Card.css";
import "../style/StyleComponents/GameGrid.css";

const Home = () => {
  const [games, setGames] = useState([]); // Lista crua vinda da API
  const [searchQuery, setSearchQuery] = useState(''); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Alinhado com o seu backend Spring Boot mapeado no documento
        const response = await jogoService.getAllGames(); 
        
        if (response && Array.isArray(response)) { 
          // Ordena os jogos de A-Z pelo nome
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

  // Filtro de pesquisa por nome (Atende REF06)
  const gamesToDisplay = games.filter(game =>
    game.nome.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
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
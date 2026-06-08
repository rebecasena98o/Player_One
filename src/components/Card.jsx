import React from 'react';
import { Link } from 'react-router-dom';
import '../style/StyleComponents/Card.css'; // Importando o CSS específico para o Card

const Card = ({ game }) => {
  // Tratamento do status mapeado no Enum do seu documento (DISPONIVEL, INDISPONIVEL)
  const isUnavailable = game.statusJogo === 'INDISPONIVEL' || game.indisponivel;

  return (
    <Link to={`/jogo/${game.codigoUnico || game.id}`} className="game-card">
      {/* Tag de Indisponível no topo superior direito (conforme o card do W.A.R) */}
      {isUnavailable && (
        <span className="badge-unavailable">Indisponível</span>
      )}
      
      {/* Imagem que preenche todo o fundo do card */}
      <img 
        src={game.imagemUrl || 'https://via.placeholder.com/300x400'} 
        alt={game.nome} 
        className="game-card-img" 
      />
      
      {/* Container do Nome do Jogo (No canto inferior esquerdo) */}
      <div className="game-card-overlay">
        <h3 className="game-card-title">{game.nome.toUpperCase()}</h3>
      </div>
    </Link>
  );
};

export default Card;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Blockinfo from '../components/Blockinfo';
import Loader from '../components/Loader'; 
import Layout from '../components/Layout';

// Import das imagens (mesmo esquema da Home)
import unoImg from '../imgs/XadrezImage.png';
import ludoImg from '../imgs/LudoImage.png';
// ... importar as outras conforme necessário

const Detail = ({ toggleDarkMode, isDark }) => {
  const { id } = useParams(); 
  const [jogo, setJogo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Simulando busca no "banco de dados" local
    const gamesDB = [
        { id: 1, nome: 'UNO', img: unoImg, categoria: 'Cartas', jogadores: '2-10', tempo: '30 min', idade: '7+', descricao: 'O clássico jogo de cartas de combinar cores e números.' },
        { id: 2, nome: 'LUDO', img: ludoImg, categoria: 'Tabuleiro', jogadores: '2-4', tempo: '45 min', idade: '6+', descricao: 'Mova suas quatro peças do início ao fim de acordo com os lançamentos de um único dado.' },
        // Adicione os outros aqui...
    ];

    const foundGame = gamesDB.find(g => g.id === parseInt(id));
    
    setTimeout(() => {
        setJogo(foundGame);
        setLoading(false);
    }, 500); // Pequeno delay para o Loader brilhar
  }, [id]);

  if (loading) return <Layout><Loader /></Layout>;

  if (!jogo) {
    return (
      <Layout>
        <div className="error-container">
          <h2>Jogo não encontrado</h2>
          <Link to="/home">Voltar para o Catálogo</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout toggleDarkMode={toggleDarkMode} isDark={isDark}>
      <div className="detail-container">
        
        <Link to="/home" className="back-button">
          <span className="back-icon">↩</span> VOLTAR AO CATÁLOGO
        </Link>

        <section className="detail-header">
          <div className="detail-image-wrapper">
            <img src={jogo.img} alt={jogo.nome} className="detail-image" />
          </div>
          
          <div className="detail-titles">
            <h1 className="game-title-main">{jogo.nome}</h1>
            <p className="game-category-tag">{jogo.categoria}</p>
            <p className="game-description">{jogo.descricao}</p>
          </div>
        </section>

        <div className="info-grid">
          <Blockinfo label="Jogadores" value={jogo.jogadores} />
          <Blockinfo label="Duração" value={jogo.tempo} />
          <Blockinfo label="Idade Recomendada" value={jogo.idade} />
          <Blockinfo label="ID do Produto" value={`#00${jogo.id}`} />
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
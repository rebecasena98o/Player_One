import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jogoService } from '../../service/JogoApi';
import Loader from '../../components/Loader';

// Importação da folha de estilo desacoplada
import '../../style/StylePages/StyleDetail.css';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    jogoService.getGameById(id)
      .then((res) => {
        const result = Array.isArray(res) ? res[0] : res;
        setGame(result);
      })
      .catch((err) => {
        console.error("🔴 Erro ao carregar detalhes do jogo:", err);
        setGame(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;

  if (!game) {
    return (
      <div className="detail-page-wrapper">
        <div className="detail-card-panel" style={{ textAlign: 'center', maxWidth: '450px' }}>
          <h2 style={{ marginBottom: '12px', color: '#090d16' }}>Jogo não encontrado</h2>
          <button className="detail-btn-primary" onClick={() => navigate('/home')}>
            Voltar ao Catálogo
          </button>
        </div>
      </div>
    );
  }

  const isAvailable = game.disponivel || game.statusJogo === 'DISPONIVEL';
  const playersCount = game.minJogadores && game.maxJogadores 
    ? `${game.minJogadores}-${game.maxJogadores}`
    : (game.players || 'N/A');

  // Quantidade de cópias seguras vinda da API/Mock
  const quantidade = game.quantidadeDisponivel ?? 0;

  return (
    <div className="detail-page-wrapper">
      <div className="detail-bg-banner" style={{ backgroundImage: `url(${game.imagemUrl || game.image})` }} />
      <div className="detail-bg-overlay" />

      <button className="detail-btn-back" onClick={() => navigate(-1)}>←</button>

      <div className="detail-card-panel">
        <header className="detail-main-header">
          <div className="detail-title-group">
            <h1>{game.nome || game.title}</h1>
            <div className="detail-badges-row">
              <span className="detail-badge-tag">{game.categoria || game.category || 'Estratégia'}</span>
              <span className="detail-badge-tag outline">{game.faixaEtaria || game.ageRating || '10+'}</span>
            </div>
          </div>

          {/* ✨ SEÇÃO MODIFICADA: Mostra o indicador com a quantidade real do local */}
          <div>
            {isAvailable && quantidade > 0 ? (
              <div className="detail-status-indicator available">
                <span className="detail-status-icon">✓</span>
                <div className="detail-status-info-box">
                  <span className="detail-status-label">Disponíveis</span>
                  <span className="detail-status-qty">{quantidade}</span>
                </div>
              </div>
            ) : (
              <div className="detail-status-indicator unavailable">
                <span className="detail-status-icon">✕</span>
                <div className="detail-status-info-box">
                  <span className="detail-status-label">Status</span>
                  <span className="detail-status-qty">Indisponível</span>
                </div>
              </div>
            )}
          </div>
        </header>

        <section className="detail-attributes-grid">
          <div className="detail-attr-item">
            <div className="detail-attr-icon-box">👥</div>
            <div className="detail-attr-text-box">
              <p className="detail-attr-label">Jogadores</p>
              <p className="detail-attr-value">{playersCount} jog.</p>
            </div>
          </div>

          <div className="detail-attr-item">
            <div className="detail-attr-icon-box">🕒</div>
            <div className="detail-attr-text-box">
              <p className="detail-attr-label">Duração</p>
              <p className="detail-attr-value">{game.duracao || game.duration || '60 min'}</p>
            </div>
          </div>

          <div className="detail-attr-item">
            <div className="detail-attr-icon-box">📅</div>
            <div className="detail-attr-text-box">
              <p className="detail-attr-label">Idade</p>
              <p className="detail-attr-value">{game.faixaEtaria || game.ageRating || '10+'}</p>
            </div>
          </div>
        </section>

        <section className="detail-description-section">
          <h2>Descrição</h2>
          <p>{game.descricao || game.description || 'Nenhuma descrição fornecida.'}</p>
        </section>

        <footer className="detail-actions-footer">
          <button 
            className="detail-btn-primary" 
            disabled={!isAvailable || quantidade === 0}
            onClick={() => navigate('/parties/create', { state: { gameId: game.id || id } })}
            >
            Criar Party's
            </button>
          <button className="detail-btn-secondary" onClick={() => navigate('/parties')}>
            Ver Party's
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Detail;
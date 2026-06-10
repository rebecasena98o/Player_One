import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jogoService } from '../../service/JogoApi'; // Mantido (Correto)
import Loader from '../../components/Loader';

// Importação do CSS desacoplado criado no passo anterior
import '../../style/StylePages/StyleCreateParty.css';

export default function CreateParty() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 🔍 PEGA O ID ENVIADO PELO BOTÃO DA TELA DE DETALHES:
  const preselectedGameId = location.state?.gameId;

  const [gamesList, setGamesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 💎 O estado inicial recebe o ID pré-selecionado (converte para String caso seu backend/mock use IDs numéricos no valor do <option>)
  const [gameId, setGameId] = useState(preselectedGameId ? String(preselectedGameId) : '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [slots, setSlots] = useState('4');
  const [description, setDescription] = useState('');

  const FIXED_LOCATION = 'Biblioteca da Unifor';

  useEffect(() => {
    jogoService.getAllGames()
      .then((res) => {
        if (res && Array.isArray(res)) {
          const disponiveis = res.filter(g => g.disponivel || g.statusJogo === 'DISPONIVEL');
          setGamesList(disponiveis);
        }
      })
      .catch((err) => console.error("🔴 Erro ao buscar jogos para preencher select:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaParty = {
      jogoId: Number(gameId),
      data: date,
      horario: time,
      local: FIXED_LOCATION,
      maxJogadores: Number(slots),
      descricao: description
    };
    console.log("🚀 Dados prontos para o back-end:", novaParty);
    alert("Party's criada com sucesso! Aguarde aprovação do administrador.");
    navigate('/home');
  };

  if (loading) return <Loader />;

  return (
    <div className="create-party-wrapper">
      <header className="create-party-header">
        <div className="create-party-header-content">
          <button className="btn-icon-back" onClick={() => navigate(-1)}>←</button>
          <h1>Criar Nova Party's</h1>
        </div>
      </header>

      <main className="create-party-main">
        <div className="create-party-card">
          <div className="create-party-info-block">
            <div className="info-block-icon">
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#090d16' }}>
                calendar_month
              </span>
            </div>
            <div className="info-block-text">
              <h2>Organize sua partida</h2>
              <p>Preencha os detalhes abaixo</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="form-group-stack">
            <div className="form-field">
              <label htmlFor="game-select">Jogo</label>
              <select 
                id="game-select" 
                value={gameId} 
                onChange={(e) => setGameId(e.target.value)} 
                required
              >
                <option value="" disabled>Selecione um jogo</option>
                {gamesList.map((game) => (
                  // Converte o game.id para string na comparação do value do option
                  <option key={game.id} value={String(game.id)}>
                    {game.nome || game.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label htmlFor="party-date">Data</label>
                <input id="party-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="form-field">
                <label htmlFor="party-time">Horário</label>
                <input id="party-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
              </div>
            </div>

            <div className="form-field">
              <label>Local</label>
              <div className="fixed-location-box">
                <span className="fixed-location-icon">📍</span>
                <span className="fixed-location-text">{FIXED_LOCATION}</span>
              </div>
              <p className="fixed-location-sub">Todas as party's acontecem na Biblioteca da Unifor</p>
            </div>

            <div className="form-field">
              <label htmlFor="slots-select">Número de Jogadores</label>
              <select id="slots-select" value={slots} onChange={(e) => setSlots(e.target.value)} required>
                {[2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num.toString()}>{num} jogadores</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="party-description">Descrição</label>
              <textarea id="party-description" placeholder="Adicione informações extras..." value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
            </div>

            <div className="form-actions-row">
              <button type="button" className="btn-party-cancel" onClick={() => navigate(-1)}>Cancelar</button>
              <button type="submit" className="btn-party-submit">Criar Party's</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
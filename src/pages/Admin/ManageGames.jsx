import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import './ManageGames.css';

export default function ManageGames() {
  const navigate = useNavigate();

  // Estado inicial mocado com base na imagem do sistema
  const [games, setGames] = useState([
    {
      id: 1,
      title: 'Catan',
      category: 'Estratégia',
      ageRating: '10+',
      available: true,
      image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=300&auto=format&fit=crop&q=80',
      description: 'Colonize a ilha de Catan! Negocie recursos, construa estradas e cidades, e torne-se o colonizador mais bem-sucedido.',
      players: '3-4 jogadores',
      duration: '60-90 min'
    },
    {
      id: 2,
      title: 'Pandemic',
      category: 'Cooperativo',
      ageRating: '8+',
      available: true,
      image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&auto=format&fit=crop&q=80',
      description: 'Trabalhe em equipe para salvar o mundo de quatro doenças mortais. Um jogo cooperativo intenso.',
      players: '2-4 jogadores',
      duration: '45 min'
    },
    {
      id: 3,
      title: 'Ticket to Ride',
      category: 'Familiar',
      ageRating: '8+',
      available: false,
      image: 'https://images.unsplash.com/photo-1511140595357-9377c0822e11?w=300&auto=format&fit=crop&q=80',
      description: 'Construa rotas de trem através da América do Norte e complete seus destinos secretos.',
      players: '2-5 jogadores',
      duration: '30-60 min'
    }
  ]);

  // Estados de Controle de Modais
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' ou 'edit'
  
  // Estado para o jogo atualmente selecionado (Edição ou Exclusão)
  const [selectedGame, setSelectedGame] = useState(null);

  // Estado dos campos do Formulário (Criação/Edição)
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
    category: '',
    ageRating: '',
    players: '',
    duration: ''
  });

  // Alternar Disponibilidade (Mark Available/Unavailable)
  const toggleAvailability = (id) => {
    setGames(games.map(game => 
      game.id === id ? { ...game, available: !game.available } : game
    ));
  };

  // Abrir Modal de Criação
  const handleOpenCreate = () => {
    setModalMode('create');
    setFormData({
      title: '',
      image: '',
      description: '',
      category: '',
      ageRating: '',
      players: '',
      duration: ''
    });
    setIsFormModalOpen(true);
  };

  // Abrir Modal de Edição preenchido
  const handleOpenEdit = (game) => {
    setModalMode('edit');
    setSelectedGame(game);
    setFormData({
      title: game.title,
      image: game.image,
      description: game.description,
      category: game.category,
      ageRating: game.ageRating,
      players: game.players,
      duration: game.duration
    });
    setIsFormModalOpen(true);
  };

  // Salvar Formulário (Adicionar ou Atualizar)
  const handleSaveGame = (e) => {
    e.preventDefault();
    if (modalMode === 'create') {
      const newGame = {
        id: Date.now(),
        ...formData,
        available: true // Todo jogo novo inicia disponível
      };
      setGames([...games, newGame]);
    } else {
      setGames(games.map(game => 
        game.id === selectedGame.id ? { ...game, ...formData } : game
      ));
    }
    setIsFormModalOpen(false);
  };

  // Confirmar Intenção de Exclusão
  const handleOpenDelete = (game) => {
    setSelectedGame(game);
    setIsDeleteModalOpen(true);
  };

  // Confirmar e Deletar de fato
  const handleConfirmDelete = () => {
    setGames(games.filter(game => game.id !== selectedGame.id));
    setIsDeleteModalOpen(false);
    setSelectedGame(null);
  };

  return (
    <div className="manage-games-layout">
      {/* HEADER SUPERIOR */}
      <header className="mg-top-navbar">
        <div className="mg-navbar-container">
          <div className="mg-brand-section">
            <button className="mg-back-btn" onClick={() => navigate('/admin/dashboard')}>
              <ArrowLeft className="mg-icon" />
            </button>
            <h1 className="mg-page-title">Gerenciar Jogos</h1>
          </div>
          
          <div className="mg-user-section">
            <div className="mg-avatar-mini">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Admin Profile" 
              />
            </div>
            <button className="mg-add-game-btn" onClick={handleOpenCreate}>
              <Plus className="mg-btn-icon" />
              Adicionar Jogo
            </button>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="mg-main-content">
        <div className="mg-content-container">
          <p className="mg-counter-text">{games.length} jogos cadastrados</p>

          {/* LISTA DE CARDS DE JOGOS */}
          <div className="mg-games-list">
            {games.map((game) => (
              <div key={game.id} className="mg-game-card">
                
                {/* Imagem do Jogo */}
                <div className="mg-card-image-box">
                  <img src={game.image || 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=300'} alt={game.title} />
                </div>

                {/* Detalhes Técnicos */}
                <div className="mg-card-info-box">
                  <div className="mg-card-title-row">
                    <h2 className="mg-game-title">{game.title}</h2>
                    <div className="mg-tags-wrapper">
                      <span className="mg-tag mg-tag-category">{game.category}</span>
                      <span className="mg-tag mg-tag-age">{game.ageRating}</span>
                      <span className={`mg-tag-status ${game.available ? 'status-online' : 'status-offline'}`}>
                        {game.available ? (
                          <>
                            <CheckCircle2 className="mg-status-icon" /> Disponível
                          </>
                        ) : (
                          <>
                            <XCircle className="mg-status-icon" /> Indisponível
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <p className="mg-game-description">{game.description}</p>

                  <div className="mg-game-meta-row">
                    <span className="mg-meta-item">
                      <Users className="mg-meta-icon" /> {game.players}
                    </span>
                    <span className="mg-meta-item">
                      <Clock className="mg-meta-icon" /> {game.duration}
                    </span>
                  </div>
                </div>

                {/* Ações de Controle */}
                <div className="mg-card-actions-box">
                  <button 
                    className={`mg-toggle-status-btn ${game.available ? 'btn-mark-unavailable' : 'btn-mark-available'}`}
                    onClick={() => toggleAvailability(game.id)}
                  >
                    {game.available ? 'Marcar Indisponível' : 'Marcar Disponível'}
                  </button>
                  
                  <button className="mg-action-icon-btn btn-edit" onClick={() => handleOpenEdit(game)}>
                    <Edit2 className="mg-action-icon" />
                  </button>

                  <button className="mg-action-icon-btn btn-delete" onClick={() => handleOpenDelete(game)}>
                    <Trash2 className="mg-action-icon" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </main>

      {/* MODAL: ADICIONAR / EDITAR JOGO */}
      {isFormModalOpen && (
        <div className="mg-modal-overlay">
          <div className="mg-modal-body form-modal-width">
            <button className="mg-modal-close-btn" onClick={() => setIsFormModalOpen(false)}>
              <X />
            </button>
            
            <h2 className="mg-modal-title">
              {modalMode === 'create' ? 'Adicionar Novo Jogo' : 'Editar Jogo'}
            </h2>
            <p className="mg-modal-subtitle">Preencha os detalhes do jogo abaixo</p>

            <form onSubmit={handleSaveGame} className="mg-modal-form">
              <div className="mg-form-group">
                <label>Título do Jogo</label>
                <input 
                  type="text" 
                  placeholder="Ex: Catan"
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  required 
                />
              </div>

              <div className="mg-form-group">
                <label>URL da Imagem</label>
                <input 
                  type="text" 
                  placeholder="https://..."
                  value={formData.image} 
                  onChange={(e) => setFormData({...formData, image: e.target.value})} 
                  required 
                />
              </div>

              <div className="mg-form-group">
                <label>Descrição</label>
                <textarea 
                  rows="3"
                  placeholder="Descreva as mecânicas ou objetivo do jogo..."
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  required 
                />
              </div>

              <div className="mg-form-row-2col">
                <div className="mg-form-group">
                  <label>Categoria</label>
                  <select 
                    value={formData.category} 
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Estratégia">Estratégia</option>
                    <option value="Cooperativo">Cooperativo</option>
                    <option value="Familiar">Familiar</option>
                    <option value="Party Game">Party Game</option>
                  </select>
                </div>

                <div className="mg-form-group">
                  <label>Faixa Etária</label>
                  <select 
                    value={formData.ageRating} 
                    onChange={(e) => setFormData({...formData, ageRating: e.target.value})}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Livre">Livre</option>
                    <option value="8+">8+</option>
                    <option value="10+">10+</option>
                    <option value="14+">14+</option>
                    <option value="18+">18+</option>
                  </select>
                </div>
              </div>

              <div className="mg-form-row-2col">
                <div className="mg-form-group">
                  <label>Número de Jogadores</label>
                  <input 
                    type="text" 
                    placeholder="Ex: 2-4 jogadores"
                    value={formData.players} 
                    onChange={(e) => setFormData({...formData, players: e.target.value})} 
                    required 
                  />
                </div>

                <div className="mg-form-group">
                  <label>Duração</label>
                  <input 
                    type="text" 
                    placeholder="Ex: 30-60 min"
                    value={formData.duration} 
                    onChange={(e) => setFormData({...formData, duration: e.target.value})} 
                    required 
                  />
                </div>
              </div>

              <div className="mg-modal-actions-footer">
                <button type="button" className="mg-btn-secondary" onClick={() => setIsFormModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="mg-btn-primary">
                  {modalMode === 'create' ? 'Adicionar' : 'Atualizar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO: EXCLUSÃO DE JOGO */}
      {isDeleteModalOpen && (
        <div className="mg-modal-overlay">
          <div className="mg-modal-body delete-modal-width">
            <h2 className="mg-modal-title text-danger">Confirmar Exclusão</h2>
            <p className="mg-modal-subtitle">
              Tem certeza que deseja excluir permanentemente o jogo <strong>{selectedGame?.title}</strong>? Esta ação não poderá ser desfeita.
            </p>
            <div className="mg-modal-actions-footer">
              <button className="mg-btn-secondary" onClick={() => setIsDeleteModalOpen(false)}>
                Cancelar
              </button>
              <button className="mg-btn-danger" onClick={handleConfirmDelete}>
                Excluir jogo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

// Importação da folha de estilo desacoplada
import '../../style/StylePages/StyleMyPartys.css';

export default function MyPartys() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('parties'); // Controle manual de Tabs: 'parties' | 'requests'

  // 🌟 MOCK DE ALTA FIDELIDADE SIMULANDO DADOS DO BACK-END
  // Identificador do usuário logado fictício: id: 99
  const [myCreatedParties, setMyCreatedParties] = useState([]);
  const [joinedParties, setJoinedParties] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // 1. Partys criadas por mim (Onde sou o host)
      const mockCreated = [
        {
          id: 10,
          gameName: "Catan",
          description: "Mesa de comércio avançado na biblioteca. Venha pronto para negociar ovelhas por pedra!",
          currentPlayers: 3,
          slots: 4,
          date: "2026-06-15",
          time: "19:00",
          location: "Biblioteca da Unifor",
          status: "approved"
        }
      ];

      // 2. Partys de terceiros que eu solicitei e já fui APROVADO
      const mockJoined = [
        {
          id: 11,
          gameName: "Dixit",
          hostName: "Mariana Costa",
          description: "Mesa casual de Dixit para descontrair no fim de semana.",
          currentPlayers: 5,
          slots: 6,
          date: "2026-06-19",
          time: "15:35",
          location: "Biblioteca da Unifor",
          status: "approved"
        }
      ];

      // 3. Solicitações pendentes que OUTROS usuários fizeram para entrar nas MINHAS partys
      const mockRequests = [
        {
          id: "req-1",
          partyId: 10,
          gameName: "Catan",
          partyDate: "2026-06-15",
          partyTime: "19:00",
          userName: "Mateus Silva",
          userAvatar: "", // Vazio para testar as iniciais no fallback
          createdAt: "2026-06-09T10:00:00.000Z"
        },
        {
          id: "req-2",
          partyId: 10,
          gameName: "Catan",
          partyDate: "2026-06-15",
          partyTime: "19:00",
          userName: "Ana Clara",
          userAvatar: "",
          createdAt: "2026-06-09T10:12:00.000Z"
        }
      ];

      setMyCreatedParties(mockCreated);
      setJoinedParties(mockJoined);
      setPendingRequests(mockRequests);
      setLoading(false);
    }, 600);
  }, []);

  // Ações de aprovar e rejeitar solicitações de terceiros
  const handleApproveRequest = (requestId) => {
    setPendingRequests(prev => prev.filter(req => req.id !== requestId));
    // Aqui no cenário real, dispararia um PUT atualizando o currentPlayers daquela party
  };

  const handleRejectRequest = (requestId) => {
    setPendingRequests(prev => prev.filter(req => req.id !== requestId));
  };

  // Gerador de iniciais para o Avatar Fallback
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return <Loader />;
  }

  // Totalizadores combinados da primeira Aba
  const totalPartiesCount = myCreatedParties.length + joinedParties.length;

  return (
    <div className="my-parties-wrapper">
      {/* HEADER FIXO SEMÂNTICO */}
      <header className="my-parties-header">
        <div className="my-parties-header-content">
          <div className="my-header-left">
            <button className="btn-my-back" onClick={() => navigate(-1)}>
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="my-header-title">Minhas Party's</h1>
          </div>
        </div>
      </header>

      {/* PAINEL DE CONTROLE CENTRAL */}
      <main className="my-parties-main">
        <div className="my-parties-dashboard-container">
          
          {/* TÍTULO DA SEÇÃO */}
          <section className="my-dashboard-intro">
            <h2>Gerenciar Party's</h2>
            <p className="my-dashboard-subtext">
              {myCreatedParties.length} criada{myCreatedParties.length !== 1 ? 's' : ''} • {joinedParties.length} participando • {pendingRequests.length} solicitaç{pendingRequests.length !== 1 ? 'ões' : 'ão'} pendente{pendingRequests.length !== 1 ? 's' : ''}
            </p>
          </section>

          {/* CONTROLE DE ABAS (TABS CONTROLLER) */}
          <div className="my-tabs-list">
            <button 
              className={`my-tab-trigger ${activeTab === 'parties' ? 'active' : ''}`}
              onClick={() => setActiveTab('parties')}
            >
              Minhas Party's ({totalPartiesCount})
            </button>
            <button 
              className={`my-tab-trigger relative-trigger ${activeTab === 'requests' ? 'active' : ''}`}
              onClick={() => setActiveTab('requests')}
            >
              Solicitações recebidas
              {pendingRequests.length > 0 && (
                <span className="my-requests-badge-count">
                  {pendingRequests.length}
                </span>
              )}
            </button>
          </div>

          {/* CONTEÚDO DA TAB: MINHAS PARTYS */}
          {activeTab === 'parties' && (
            <div className="my-tab-content-pane">
              {totalPartiesCount > 0 ? (
                <div className="my-parties-grid-flow">
                  
                  {/* SEÇÃO: QUE EU CRIEI */}
                  {myCreatedParties.map((party) => (
                    <div key={`created-${party.id}`} className="my-custom-card highlight-host-card">
                      <div className="my-card-header-row">
                        <div>
                          <div className="host-indicator-pill">Você é o Responsável</div>
                          <h3 className="my-card-game-title">{party.gameName}</h3>
                          <p className="my-card-game-desc">{party.description}</p>
                        </div>
                        <span className="my-status-badge badge-approved">Ativa</span>
                      </div>
                      <div className="my-card-details-grid">
                        <div className="my-detail-item"><span className="material-symbols-outlined">calendar_month</span> {new Date(party.date).toLocaleDateString('pt-BR')}</div>
                        <div className="my-detail-item"><span className="material-symbols-outlined">schedule</span> {party.time}</div>
                        <div className="my-detail-item"><span className="material-symbols-outlined">location_on</span> {party.location}</div>
                        <div className="my-detail-item"><span className="material-symbols-outlined">groups</span> {party.currentPlayers}/{party.slots} Jogadores</div>
                      </div>
                      <button className="btn-my-card-action" 
                      onClick={() => navigate(`/parties/${party.id}`, { state: { isMember: true, isHost: true } })} >
                        <span className="material-symbols-outlined">visibility</span> Ver Detalhes da Mesa
                        </button>
                    </div>
                  ))}

                  {/* SEÇÃO: QUE FUI ACEITO */}
                  {joinedParties.map((party) => (
                    <div key={`joined-${party.id}`} className="my-custom-card">
                      <div className="my-card-header-row">
                        <div>
                          <span className="guest-indicator-label">Organizado por {party.hostName}</span>
                          <h3 className="my-card-game-title">{party.gameName}</h3>
                          <p className="my-card-game-desc">{party.description}</p>
                        </div>
                        <span className="my-status-badge badge-joined">Inscrito</span>
                      </div>
                      <div className="my-card-details-grid">
                        <div className="my-detail-item"><span className="material-symbols-outlined">calendar_month</span> {new Date(party.date).toLocaleDateString('pt-BR')}</div>
                        <div className="my-detail-item"><span className="material-symbols-outlined">schedule</span> {party.time}</div>
                        <div className="my-detail-item"><span className="material-symbols-outlined">location_on</span> {party.location}</div>
                        <div className="my-detail-item"><span className="material-symbols-outlined">groups</span> {party.currentPlayers}/{party.slots} Jogadores</div>
                      </div>
                      <button className="btn-my-card-action" 
                      onClick={() => navigate(`/parties/${party.id}`, { state: { isMember: true, isHost: false } })} >
                      <span className="material-symbols-outlined">visibility</span> Ver Informações de Contato
                      </button>
                    </div>
                  ))}

                </div>
              ) : (
                <div className="my-parties-empty-state-pane">
                  <p>Você ainda não possui nenhuma movimentação em partidas.</p>
                  <button className="btn-my-empty-action" onClick={() => navigate('/parties')}>
                    Procurar Partys Disponíveis
                  </button>
                </div>
              )}
            </div>
          )}

          {/* CONTEÚDO DA TAB: SOLICITAÇÕES RECEBIDAS */}
          {activeTab === 'requests' && (
            <div className="my-tab-content-pane">
              {pendingRequests.length > 0 ? (
                <div className="my-parties-grid-flow">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="my-custom-card request-card-layout">
                      <div className="request-card-top">
                        <h3 className="request-game-context">Mesa de {request.gameName}</h3>
                        <p className="request-time-context">Agendada para {new Date(request.partyDate).toLocaleDateString('pt-BR')} às {request.partyTime}</p>
                      </div>

                      {/* AVATAR DO SOLICITANTE */}
                      <div className="request-user-profile-bar">
                        <div className="my-avatar-circle">
                          {request.userAvatar ? (
                            <img src={request.userAvatar} alt={request.userName} />
                          ) : (
                            <span className="my-avatar-fallback">{getInitials(request.userName)}</span>
                          )}
                        </div>
                        <div className="request-user-info">
                          <p className="request-user-name">{request.userName}</p>
                          <p className="request-user-date-sub">Solicitou ingressar na partida</p>
                        </div>
                      </div>

                      {/* BOTÕES DE DECISÃO */}
                      <div className="request-actions-dual-row">
                        <button 
                          className="btn-request-decision approve-trigger"
                          onClick={() => handleApproveRequest(request.id)}
                        >
                          <span className="material-symbols-outlined">check</span> Aprovar Jogador
                        </button>
                        <button 
                          className="btn-request-decision reject-trigger"
                          onClick={() => handleRejectRequest(request.id)}
                        >
                          <span className="material-symbols-outlined">close</span> Rejeitar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="my-parties-empty-state-pane">
                  <span className="material-symbols-outlined big-empty-icon">notification_important</span>
                  <p>Nenhuma solicitação de entrada pendente no momento.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
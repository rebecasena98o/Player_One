import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, Calendar, Clock, Users, MessageSquare, 
  CheckCircle2, XCircle, AlertTriangle, ShieldAlert 
} from 'lucide-react';
import './ManageParties.css';

export default function ManageParties() {
  const navigate = useNavigate();

  // Abas disponíveis: 'pending' | 'approved' | 'rejected'
  const [activeTab, setActiveTab] = useState('pending');

  // Estado inicial mocado com base no layout das imagens enviadas
  const [parties, setParties] = useState([
    {
      id: 101,
      title: 'Campanha de Catan de Fim de Semana',
      gameTitle: 'Catan',
      creator: 'Carlos Alencar',
      date: '13/06/2026',
      time: '19:00',
      currentPlayers: 1,
      maxPlayers: 4,
      status: 'pending',
      description: 'Buscando jogadores experientes para uma partida competitiva e estratégica.'
    },
    {
      id: 102,
      title: 'Mesa Cooperativa de Pandemic',
      gameTitle: 'Pandemic',
      creator: 'Juliana Costa',
      date: '14/06/2026',
      time: '15:30',
      currentPlayers: 2,
      maxPlayers: 4,
      status: 'approved',
      description: 'Grupo focado em vencer a partida no modo difícil. Venha cooperar!'
    },
    {
      id: 103,
      title: 'Ticket To Ride Casual',
      gameTitle: 'Ticket to Ride',
      creator: 'Marcos Souza',
      date: '08/06/2026',
      time: '20:00',
      currentPlayers: 4,
      maxPlayers: 5,
      status: 'rejected',
      description: 'Salinha rápida apenas para testar estratégias iniciais de rotas curtas.'
    }
  ]);

  // Estados de controle para Modais de Confirmação
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedParty, setSelectedParty] = useState(null);

  // Filtragem das salas conforme a aba ativa
  const filteredParties = parties.filter(p => p.status === activeTab);

  // Ação de Aprovação Direta
  const handleApprove = (id) => {
    setParties(parties.map(p => p.id === id ? { ...p, status: 'approved' } : p));
  };

  // Fluxo de Rejeição (Abertura do pop-up)
  const openRejectModal = (party) => {
    setSelectedParty(party);
    setIsRejectModalOpen(true);
  };

  const confirmReject = () => {
    setParties(parties.map(p => p.id === selectedParty.id ? { ...p, status: 'rejected' } : p));
    setIsRejectModalOpen(false);
    setSelectedParty(null);
  };

  // Fluxo de Cancelamento (Abertura do pop-up)
  const openCancelModal = (party) => {
    setSelectedParty(party);
    setIsCancelModalOpen(true);
  };

  const confirmCancel = () => {
    // Ao cancelar uma aprovada, removemos do sistema ou alteramos o status
    setParties(parties.filter(p => p.id !== selectedParty.id));
    setIsCancelModalOpen(false);
    setSelectedParty(null);
  };

  return (
    <div className="mp-layout">
      {/* HEADER NAVBAR SUPERIOR */}
      <header className="mp-navbar">
        <div className="mp-navbar-container">
          <div className="mp-brand-section">
            <button className="mp-back-btn" onClick={() => navigate('/admin/dashboard')} title="Voltar ao Painel">
              <ArrowLeft className="mp-back-icon" />
            </button>
            <h1 className="mp-page-title">Gerenciar Party's</h1>
          </div>
          
          <div className="mp-user-avatar-mini">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Admin Profile" />
          </div>
        </div>
      </header>

      {/* ÁREA DE CONTEÚDO PRINCIPAL COM ROLAGEM */}
      <main className="mp-main-container">
        <div className="mp-content-wrapper">
          
          {/* CONTROLE DE ABAS (TABS) */}
          <div className="mp-tabs-bar">
            <button 
              className={`mp-tab-item ${activeTab === 'pending' ? 'mp-tab-active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pendentes
              <span className="mp-badge-count count-pending">
                {parties.filter(p => p.status === 'pending').length}
              </span>
            </button>
            
            <button 
              className={`mp-tab-item ${activeTab === 'approved' ? 'mp-tab-active' : ''}`}
              onClick={() => setActiveTab('approved')}
            >
              Aprovadas
              <span className="mp-badge-count count-approved">
                {parties.filter(p => p.status === 'approved').length}
              </span>
            </button>
            
            <button 
              className={`mp-tab-item ${activeTab === 'rejected' ? 'mp-tab-active' : ''}`}
              onClick={() => setActiveTab('rejected')}
            >
              Rejeitadas
              <span className="mp-badge-count count-rejected">
                {parties.filter(p => p.status === 'rejected').length}
              </span>
            </button>
          </div>

          {/* LISTAGEM DE CARDS FILTRADOS */}
          <div className="mp-parties-stack">
            {filteredParties.length === 0 ? (
              <div className="mp-empty-state">
                <p>Nenhuma party encontrada nesta categoria.</p>
              </div>
            ) : (
              filteredParties.map((party) => (
                <div key={party.id} className="mp-party-card">
                  <div className="mp-card-top-header">
                    <div>
                      <h2 className="mp-party-title">{party.title}</h2>
                      <span className="mp-party-creator">Criado por: <b>{party.creator}</b></span>
                    </div>
                    
                    <span className={`mp-status-tag tag-${party.status}`}>
                      {party.status === 'pending' && 'Aguardando'}
                      {party.status === 'approved' && 'Ativa'}
                      {party.status === 'rejected' && 'Recusada'}
                    </span>
                  </div>

                  <p className="mp-party-description">{party.description}</p>

                  {/* METADADOS DA SESSÃO */}
                  <div className="mp-party-meta-grid">
                    <div className="mp-meta-pill">
                      <Calendar className="mp-meta-icon" />
                      <span>{party.date}</span>
                    </div>
                    <div className="mp-meta-pill">
                      <Clock className="mp-meta-icon" />
                      <span>{party.time}</span>
                    </div>
                    <div className="mp-meta-pill">
                      <Users className="mp-meta-icon" />
                      <span>{party.currentPlayers} / {party.maxPlayers} Jogadores</span>
                    </div>
                  </div>

                  {/* SEÇÃO DINÂMICA DE BOTÕES POR ABA OPERACIONAL */}
                  <div className="mp-card-actions-footer">
                    {party.status === 'pending' && (
                      <div className="mp-actions-split-row">
                        <button className="mp-btn-action btn-reject-action" onClick={() => openRejectModal(party)}>
                          <XCircle className="mp-inline-icon" /> Rejeitar
                        </button>
                        <button className="mp-btn-action btn-approve-action" onClick={() => handleApprove(party.id)}>
                          <CheckCircle2 className="mp-inline-icon" /> Aprovar Party
                        </button>
                      </div>
                    )}

                    {party.status === 'approved' && (
                      <div className="mp-actions-split-row">
                        <button className="mp-btn-action btn-chat-view" onClick={() => alert('Abrindo visualização de histórico do chat...')}>
                          <MessageSquare className="mp-inline-icon" /> Ver Chat
                        </button>
                        <button className="mp-btn-action btn-cancel-action" onClick={() => openCancelModal(party)}>
                          Cancelar Party
                        </button>
                      </div>
                    )}

                    {party.status === 'rejected' && (
                      <div className="mp-readonly-notice">
                        <span>Histórico de auditoria - Esta party foi recusada pela moderação.</span>
                      </div>
                    )}
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      </main>

      {/* POP-UP / MODAL: CONFIRMAR REJEIÇÃO (SALA PENDENTE) */}
      {isRejectModalOpen && (
        <div className="mp-modal-overlay">
          <div className="mp-modal-box">
            <div className="mp-modal-danger-head">
              <div className="mp-danger-icon-wrapper">
                <ShieldAlert className="mp-danger-svg-icon" />
              </div>
              <h3>Rejeitar Solicitação de Party?</h3>
            </div>
            <p className="mp-modal-body-text">
              Você está prestes a rejeitar a criação da party <strong>{selectedParty?.title}</strong>. 
              Esta ação moverá o registro para a aba de rejeitadas e é <span className="text-bold-underline">irreversível</span>.
            </p>
            <div className="mp-modal-footer-buttons">
              <button className="mp-btn-modal-cancel" onClick={() => setIsRejectModalOpen(false)}>Voltar</button>
              <button className="mp-btn-modal-confirm-danger" onClick={confirmReject}>Confirmar Rejeição</button>
            </div>
          </div>
        </div>
      )}

      {/* POP-UP / MODAL: CONFIRMAR CANCELAMENTO (SALA JÁ APROVADA) */}
      {isCancelModalOpen && (
        <div className="mp-modal-overlay">
          <div className="mp-modal-box">
            <div className="mp-modal-danger-head">
              <div className="mp-danger-icon-wrapper">
                <AlertTriangle className="mp-danger-svg-icon text-orange" />
              </div>
              <h3>Cancelar Party Ativa?</h3>
            </div>
            <p className="mp-modal-body-text">
              Tem certeza que deseja cancelar e derrubar a party ativa <strong>{selectedParty?.title}</strong>? 
              Todos os participantes serão desconectados e a ação é <span className="text-bold-underline">irreversível</span>.
            </p>
            <div className="mp-modal-footer-buttons">
              <button className="mp-btn-modal-cancel" onClick={() => setIsCancelModalOpen(false)}>Voltar</button>
              <button className="mp-btn-modal-confirm-danger bg-orange-danger" onClick={confirmCancel}>Confirmar Cancelamento</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
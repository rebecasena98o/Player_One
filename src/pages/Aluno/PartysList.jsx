import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

// Importação da folha de estilo desacoplada
import '../../style/StylePages/StylePartysList.css';

export default function PartiesList() {
  const navigate = useNavigate();
  const [partiesList, setPartiesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🌟 ESTADOS PARA CONTROLE DE SOLICITAÇÃO E MODAL
  const [requestedParties, setRequestedParties] = useState([]); // Guarda os IDs das partys solicitadas
  const [showModal, setShowModal] = useState(false);             // Controla a exibição do pop-up
  const [selectedHost, setSelectedHost] = useState('');          // Guarda o nome do host para o texto do modal

  // Dados Mockados de Alta Fidelidade (Alinhados com o seu Back-end do Spring Boot)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockParties = [
        {
          id: 1,
          gameName: "Catan",
          hostName: "Gabriel Sênior",
          description: "Partida focada em comércio e estratégia pura. Novatos são super bem-vindos, explicamos as regras na hora!",
          currentPlayers: 3,
          slots: 4,
          date: "2026-06-15",
          time: "19:00",
          location: "Biblioteca da Unifor"
        },
        {
          id: 2,
          gameName: "Dixit",
          hostName: "Mariana Costa",
          description: "Mesa casual de Dixit na sexta-feira à tarde. Venha exercitar a criatividade e dar boas risadas.",
          currentPlayers: 4,
          slots: 6,
          date: "2026-06-19",
          time: "15:35",
          location: "Biblioteca da Unifor"
        }
      ];
      setPartiesList(mockParties);
      setLoading(false);
    }, 600);
  }, []);

  // 🌟 FUNÇÃO DISPARADA AO CLICAR EM PARTICIPAR
  const handleJoinParty = (partyId, hostName) => {
    // Evita cliques duplicados acidentais se o estado demorar a atualizar
    if (requestedParties.includes(partyId)) return;

    // Adiciona o ID da party na lista de solicitados (desabilita o botão permanentemente)
    setRequestedParties((prev) => [...prev, partyId]);
    
    // Configura os dados do modal e abre o pop-up
    setSelectedHost(hostName);
    setShowModal(true);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="parties-list-wrapper">
      {/* HEADER DA PÁGINA */}
      <header className="parties-list-header">
        <div className="parties-list-header-content">
          <div className="header-left-group">
            <button className="btn-icon-back" onClick={() => navigate(-1)}>
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="header-title-text">
              <h1>Party's Disponíveis</h1>
              <p className="sub-header-text">Encontre jogadores e organize suas partidas</p>
            </div>
          </div>
          
          <button className="btn-parties-create-new" onClick={() => navigate('/parties/create')}>
            <span className="material-symbols-outlined btn-icon-inner">add</span>
            Criar Party's
          </button>
        </div>
      </header>

      {/* GRID DE CARDS */}
      <main className="parties-list-main">
        <div className="parties-grid-container">
          {partiesList.map((party) => {
            // Verifica se este card específico já foi clicado
            const isRequested = requestedParties.includes(party.id);

            return (
              <div 
                key={party.id} 
                className={`party-glass-card ${isRequested ? 'party-card-disabled' : ''}`}
              >
                {/* Topo do Card: Título e Slots */}
                <div className="party-card-top-row">
                  <div className="party-title-block">
                    <h3>{party.gameName}</h3>
                    <span className="party-host-label">Organizado por {party.hostName}</span>
                  </div>
                  <div className="party-slots-badge">
                    <span className="material-symbols-outlined badge-icon">groups</span>
                    <span>{party.currentPlayers}/{party.slots}</span>
                  </div>
                </div>

                {/* Descrição */}
                <p className="party-card-description">{party.description}</p>

                {/* Grid de Informações de Agendamento */}
                <div className="party-info-subgrid">
                  <div className="party-info-meta-item">
                    <span className="material-symbols-outlined meta-icon">calendar_month</span>
                    <span>{new Date(party.date).toLocaleDateString('pt-BR')}</span>
                  </div>

                  <div className="party-info-meta-item">
                    <span className="material-symbols-outlined meta-icon">schedule</span>
                    <span>{party.time}</span>
                  </div>

                  <div className="party-info-meta-item col-span-2">
                    <span className="material-symbols-outlined meta-icon">location_on</span>
                    <span>{party.location}</span>
                  </div>
                </div>

                {/* Botão de Ação Dinâmico */}
                <button 
                  className={`btn-party-action-detail ${isRequested ? 'btn-requested' : ''}`}
                  onClick={() => handleJoinParty(party.id, party.hostName)}
                  disabled={isRequested}
                >
                  {isRequested ? (
                    <>
                      <span className="material-symbols-outlined btn-inline-icon">hourglass_empty</span>
                      Aguardando Autorização...
                    </>
                  ) : (
                    'Participar'
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {partiesList.length === 0 && (
          <div className="parties-empty-state">
            <span className="material-symbols-outlined empty-icon">Inbox</span>
            <p>Nenhuma party's disponível no momento</p>
            <button className="btn-parties-create-new" onClick={() => navigate('/parties/create')}>
              Criar a primeira party's
            </button>
          </div>
        )}
      </main>

      {/* 🌟 POP-UP / MODAL DE CONFIRMAÇÃO */}
      {showModal && (
        <div className="party-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="party-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="party-modal-icon-wrapper">
              <span className="material-symbols-outlined party-modal-success-icon">mark_email_read</span>
            </div>
            <h2>Solicitação Enviada!</h2>
            <p>
              Sua intenção de entrar na partida foi enviada diretamente para o responsável <strong>{selectedHost}</strong>.
            </p>
            <p className="party-modal-subtext">
              Por favor, aguarde a autorização dele para ter acesso completo aos dados de comunicação.
            </p>
            <button className="btn-party-modal-close" onClick={() => setShowModal(false)}>
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
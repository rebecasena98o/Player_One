import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Loader from '../../components/Loader';

// Importação do CSS desacoplado nativo
import '../../style/StylePages/StylePartyDetails.css';

export default function PartyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const chatScrollRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [party, setParty] = useState(null);
  const [typedMessage, setTypedMessage] = useState('');

  // Identificação dinâmica de permissão baseada no fluxo de navegação ou fallback seguro
  const [isHost, setIsHost] = useState(location.state?.isHost || false);
  const [isMember, setIsMember] = useState(location.state?.isMember || false);

  // Banco de Dados simulado com suporte completo a membros e solicitações internas
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockDatabase = {
        "10": {
          id: 10,
          gameName: "Catan",
          hostName: "Você",
          description: "Mesa de comércio avançado na biblioteca. Venha pronto para negociar ovelhas por pedra!",
          date: "2026-06-15",
          time: "19:00",
          location: "Biblioteca da Unifor",
          slots: 4,
          members: [
            { name: "Gabriel Sênior", isHost: true },
            { name: "Mateus Silva", isHost: false },
            { name: "Ana Clara", isHost: false }
          ],
          requests: [
            { id: "req-1", userName: "Marcos Oliveira" },
            { id: "req-2", userName: "Beatriz Ribeiro" }
          ],
          messages: [
            { id: 1, sender: "Mateus Silva", time: "19:05", text: "Fala galera, consigo levar a expansão de 5-6 jogadores se quiserem!" },
            { id: 2, sender: "Ana Clara", time: "19:07", text: "Boa! Eu prefiro jogar com o tabuleiro ampliado." }
          ]
        },
        "11": {
          id: 11,
          gameName: "Dixit",
          hostName: "Mariana Costa",
          description: "Mesa casual de Dixit para descontrair, rir bastante e usar a criatividade no fim de semana.",
          date: "2026-06-19",
          time: "15:35",
          location: "Biblioteca da Unifor",
          slots: 6,
          members: [
            { name: "Mariana Costa", isHost: true },
            { name: "Você", isHost: false },
            { name: "Bruno Silva", isHost: false },
            { name: "Arthur Pendragon", isHost: false },
            { name: "Carolina Lima", isHost: false }
          ],
          requests: [],
          messages: [
            { id: 1, sender: "Mariana Costa", time: "15:00", text: "Oi gente! Já estou pegando a mesa perto das janelas." }
          ]
        }
      };

      // Se o ID não constar no mock, geramos um modelo compatível genérico
      const currentParty = mockDatabase[String(id)] || {
        id: Number(id) || 99,
        gameName: "Mesa de Tabuleiro",
        hostName: "Organizador Fictício",
        description: "Partida agendada pelo painel de buscas do Player One.",
        date: "2026-06-20",
        time: "14:00",
        location: "Biblioteca da Unifor",
        slots: 5,
        members: [{ name: "Organizador Fictício", isHost: true }],
        requests: [],
        messages: []
      };

      // Ajusta flags caso caia no fallback automático
      if (currentParty.hostName === "Você") {
        setIsHost(true);
        setIsMember(true);
      }

      setParty(currentParty);
      setLoading(false);
    }, 500);
  }, [id]);

  // Efeito para manter o scroll do chat sempre fixado embaixo ao receber novas mensagens
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [party?.messages]);

  // Enviar mensagem nativa no Chat
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "Você",
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      text: typedMessage
    };

    setParty(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg]
    }));
    setTypedMessage('');
  };

  // Aceitar solicitação de entrada (Usa a classe .panel-requests-alert)
  const handleApproveRequest = (reqId, userName) => {
    setParty(prev => {
      if (prev.members.length >= prev.slots) {
        alert("A mesa já atingiu o limite máximo de jogadores!");
        return prev;
      }
      return {
        ...prev,
        requests: prev.requests.filter(r => r.id !== reqId),
        members: [...prev.members, { name: userName, isHost: false }]
      };
    });
  };

  // Rejeitar solicitação
  const handleRejectRequest = (reqId) => {
    setParty(prev => ({
      ...prev,
      requests: prev.requests.filter(r => r.id !== reqId)
    }));
  };

  // Remover membro da mesa (Exclusivo do Dono da mesa)
  const handleRemoveMember = (memberName) => {
    setParty(prev => ({
      ...prev,
      members: prev.members.filter(m => m.name !== memberName)
    }));
  };

  // Entrar ou Sair da Mesa voluntariamente
  const handleJoinParty = () => {
    alert("Sua solicitação de entrada foi enviada ao organizador!");
  };

  const handleLeaveParty = () => {
    if (window.confirm(isHost ? "Tem certeza que deseja cancelar esta mesa permanentemente?" : "Deseja mesmo sair desta mesa?")) {
      navigate('/parties/my');
    }
  };

  // Auxiliares visuais
  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatStringDate = (dateStr) => {
    if (!dateStr) return '';
    if (dateStr.includes('-')) {
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  };

  if (loading) return <Loader />;

  if (!party) {
    return (
      <div className="party-details-empty-screen">
        <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#ff4757' }}>error</span>
        <h2>Mesa não encontrada</h2>
        <p>A mesa solicitada não existe ou foi encerrada pelo organizador.</p>
        <button className="btn-details-back-fallback" onClick={() => navigate('/parties/my')}>
          Voltar para minhas reservas
        </button>
      </div>
    );
  }

  // Calcula dinamicamente quantas vagas vazias restam para renderizar os Skeletons pontilhados (.slot-empty-row)
  const emptySlotsCount = Math.max(0, party.slots - party.members.length);

  return (
    <div className="party-details-page-wrapper">
      
      {/* STICKY HEADER */}
      <header className="party-details-sticky-header">
        <div className="party-details-header-container">
          <button className="btn-details-header-back" onClick={() => navigate(-1)} title="Voltar">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="party-details-header-titles">
            <h1>{party.gameName}</h1>
            <p>{isHost ? "Você é o organizador desta mesa" : `Mesa organizada por ${party.hostName}`}</p>
          </div>
        </div>
      </header>

      {/* LAYOUT E GRID PRINCIPAL */}
      <main className="party-details-main-layout">
        <div className="party-details-grid-container">
          
          {/* COLUNA DA ESQUERDA: SIDEBAR DE INFORMAÇÕES */}
          <div className="details-sidebar-column">
            
            {/* CARD 1: METADADOS DA MESA */}
            <div className="details-custom-card">
              <div className="details-card-header">
                <h3>Informações da Partida</h3>
                <span className="card-sub-label">Detalhes da reserva na biblioteca</span>
              </div>

              <div className="spacing-rows">
                <div className="info-meta-row">
                  <span className="material-symbols-outlined icon-muted">calendar_month</span>
                  <div>
                    <label>Data</label>
                    <p>{formatStringDate(party.date)}</p>
                  </div>
                </div>

                <div className="info-meta-row">
                  <span className="material-symbols-outlined icon-muted">schedule</span>
                  <div>
                    <label>Horário</label>
                    <p>{party.time}</p>
                  </div>
                </div>

                <div className="info-meta-row">
                  <span className="material-symbols-outlined icon-muted">location_on</span>
                  <div>
                    <label>Localização</label>
                    <p>{party.location}</p>
                  </div>
                </div>

                <div className="info-meta-row">
                  <span className="material-symbols-outlined icon-muted">groups</span>
                  <div>
                    <label>Vagas</label>
                    <p className="slots-sub-badge">
                      {party.members.length} / {party.slots} Jogadores
                    </p>
                  </div>
                </div>
              </div>

              <hr className="details-divider" />

              <div className="info-description-block">
                <label>Descrição da Mesa</label>
                <p>{party.description}</p>
              </div>

              <div style={{ marginTop: '20px' }}>
                {isHost ? (
                  <button className="btn-details-action-trigger leave-mode" onClick={handleLeaveParty}>
                    <span className="material-symbols-outlined">delete_forever</span> Cancelar Mesa
                  </button>
                ) : isMember ? (
                  <button className="btn-details-action-trigger leave-mode" onClick={handleLeaveParty}>
                    <span className="material-symbols-outlined">logout</span> Sair da Mesa
                  </button>
                ) : (
                  <button className="btn-details-action-trigger join-mode" onClick={handleJoinParty}>
                    <span className="material-symbols-outlined">login</span> Solicitar Vaga
                  </button>
                )}
              </div>
            </div>

            {/* CARD 2: ADMNISTRAÇÃO DE SOLICITAÇÕES (Aparece se for Host e houver pedidos) */}
            {isHost && party.requests && party.requests.length > 0 && (
              <div className="details-custom-card panel-requests-alert">
                <div className="details-card-header">
                  <h3>Solicitações de Entrada</h3>
                  <span className="card-sub-label">Aprove ou rejeite novos jogadores</span>
                </div>
                
                <div className="requests-approval-stack">
                  {party.requests.map((req) => (
                    <div key={req.id} className="request-approval-item">
                      <div className="details-avatar-circle" style={{ width: '32px', height: '32px', fontSize: '11px' }}>
                        {getInitials(req.userName)}
                      </div>
                      <div className="request-approval-info">
                        <p className="req-name">{req.userName}</p>
                      </div>
                      <div className="request-approval-actions">
                        <button className="btn-req-approve" title="Aprovar Jogador" onClick={() => handleApproveRequest(req.id, req.userName)}>
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check</span>
                        </button>
                        <button className="btn-req-reject" title="Recusar" onClick={() => handleRejectRequest(req.id)}>
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CARD 3: LISTA DE PARTICIPANTES E SKELETONS */}
            <div className="details-custom-card">
              <div className="details-card-header">
                <h3>Participantes Confirmados</h3>
                <span className="card-sub-label">Jogadores na mesa atualmente</span>
              </div>

              <div className="participants-list-stack">
                {party.members.map((member, index) => (
                  <div key={index} className="participant-member-item">
                    <div className="details-avatar-circle">
                      {getInitials(member.name)}
                    </div>
                    <div className="participant-member-meta">
                      <p className="member-name">{member.name}</p>
                      {member.isHost && <span className="host-indicator-badge">Organizador</span>}
                    </div>
                    {isHost && !member.isHost && (
                      <button className="btn-remove-member" title="Remover Jogador" onClick={() => handleRemoveMember(member.name)}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>person_remove</span>
                      </button>
                    )}
                  </div>
                ))}

                {/* VAGAS DISPONÍVEIS - SKELETONS VIA CSS (.slot-empty-row) */}
                {Array.from({ length: emptySlotsCount }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="participant-member-item slot-empty-row">
                    <div className="details-avatar-circle empty-avatar">
                      <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#9ca3af' }}>add</span>
                    </div>
                    <div className="participant-member-meta">
                      <p className="slot-empty-text">Vaga disponível</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* COLUNA DA DIREITA: WORKSPACE DO CHAT */}
          <div className="details-custom-card chat-card-layout">
            <div className="details-card-header">
              <h3>Bate-papo da Mesa</h3>
              <span className="card-sub-label">Comunicação em tempo real com o grupo</span>
            </div>

            {/* CONTEÚDO DE MENSAGENS COM ROLAGEM */}
            <div className="chat-messages-container-scroll" ref={chatScrollRef}>
              {party.messages.length === 0 ? (
                <div className="chat-empty-state">
                  <p>Nenhuma mensagem por aqui. Envie um oi para iniciar!</p>
                </div>
              ) : (
                <div className="chat-messages-inner-stack">
                  {party.messages.map((msg) => {
                    const isOwn = msg.sender === "Você";
                    return (
                      <div key={msg.id} className={`chat-message-row ${isOwn ? 'own-msg-row' : ''}`}>
                        <div className="details-avatar-circle chat-avatar">
                          {getInitials(msg.sender)}
                        </div>
                        <div>
                          <div className="chat-message-meta-info">
                            <span className="chat-sender-name">{msg.sender}</span>
                            <span className="chat-msg-time">{msg.time}</span>
                          </div>
                          <div className="chat-message-bubble">
                            <p>{msg.text}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* FOOTER CONDICIONAL DO CHAT */}
            <div className="chat-footer-form-box">
              {isMember || isHost ? (
                <form onSubmit={handleSendMessage} className="chat-native-form">
                  <input
                    type="text"
                    className="chat-native-input"
                    placeholder="Digite uma mensagem na mesa..."
                    value={typedMessage}
                    onChange={(e) => setTypedMessage(e.target.value)}
                  />
                  <button type="submit" className="btn-chat-send" disabled={!typedMessage.trim()}>
                    <span className="material-symbols-outlined">send</span>
                  </button>
                </form>
              ) : (
                <div className="chat-locked-warning">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', verticalAlign: 'middle', marginRight: '6px' }}>lock</span>
                  Você precisa ser um participante aprovado para interagir no chat.
                </div>
              )}
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
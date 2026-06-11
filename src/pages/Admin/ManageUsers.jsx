import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, UserPlus, ShieldAlert, User, CheckCircle2, XCircle, Edit, Trash2, Shield, AlertTriangle } from 'lucide-react';
//import './ManageUsers.css';

export default function ManageUsers() {
  const navigate = useNavigate();

  // Estado dos usuários baseado nas telas carregadas
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@email.com',
      bio: 'Paixonado por jogos de estratégia',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      active: true,
      role: 'Aluno',
      joinedDate: '14/03/2026'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@email.com',
      bio: 'Organizadora de eventos de jogos',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      active: true,
      role: 'Aluno',
      joinedDate: '19/03/2026'
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro@email.com',
      bio: 'Colecionador de jogos de tabuleiro',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      active: true,
      role: 'Aluno',
      joinedDate: '31/03/2026'
    }
  ]);

  // Estados de controle para Modais
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Estados de dados temporários para manipulação externa
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', avatar: '', bio: '' });

  // Funções de Gerenciamento de Status (Ativar/Desativar)
  const toggleUserStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
  };

  // Função de alternação de cargo (Classe de Usuário: Aluno <-> Admin)
  const toggleUserRole = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const nextRole = u.role === 'Aluno' ? 'Administrador' : 'Aluno';
        return { ...u, role: nextRole };
      }
      return u;
    }));
  };

  // Inicialização do Modal de Edição
  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...editForm } : u));
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  // Inicialização do Modal de Exclusão Física
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteUser = () => {
    setUsers(users.filter(u => u.id !== selectedUser.id));
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="mu-layout">
      {/* HEADER SUPERIOR CONFORME IDENTIDADE VISUAL */}
      <header className="mu-header">
        <div className="mu-header-container">
          <div className="mu-title-wrapper">
            <button className="mu-back-btn" onClick={() => navigate('/admin/dashboard')} title="Voltar ao Painel">
              <ArrowLeft className="mu-back-icon" />
            </button>
            <h1 className="mu-main-title">Gerenciar Usuários</h1>
          </div>
          <button className="mu-add-btn">
            <UserPlus className="mu-add-icon" />
            Adicionar Usuário
          </button>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL DA MODERAÇÃO */}
      <main className="mu-container">
        <div className="mu-info-bar">
          <span className="mu-counter-text">{users.length} usuários cadastrados</span>
        </div>

        <div className="mu-users-list">
          {users.map((user) => (
            <div key={user.id} className={`mu-user-card ${!user.active ? 'mu-card-disabled' : ''}`}>
              <div className="mu-card-body">
                <img src={user.avatar} alt={user.name} className="mu-user-avatar" />
                
                <div className="mu-user-info">
                  <div className="mu-name-badge-row">
                    <h2 className="mu-user-name">{user.name}</h2>
                    <div className="mu-badges-flex">
                      <span className={`mu-badge-status ${user.active ? 'status-active' : 'status-inactive'}`}>
                        {user.active ? <CheckCircle2 className="mu-badge-inline-icon" /> : <XCircle className="mu-badge-inline-icon" />}
                        {user.active ? 'Ativo' : 'Inativo'}
                      </span>
                      <span className={`mu-badge-role ${user.role === 'Administrador' ? 'role-admin' : 'role-student'}`}>
                        <Shield className="mu-badge-inline-icon" />
                        {user.role}
                      </span>
                    </div>
                  </div>
                  
                  <p className="mu-user-email">{user.email}</p>
                  <p className="mu-user-bio">{user.bio || <i>Sem biografia definida</i>}</p>
                  <span className="mu-user-date">Cadastrado em {user.joinedDate}</span>
                </div>
              </div>

              {/* SEÇÃO DE BOTÕES DE CONTROLE ADICIONADOS */}
              <div className="mu-card-actions">
                <div className="mu-actions-left">
                  <button 
                    className={`mu-btn mu-btn-toggle-status ${user.active ? 'mu-btn-danger-light' : 'mu-btn-success-light'}`}
                    onClick={() => toggleUserStatus(user.id)}
                  >
                    {user.active ? 'Desativar' : 'Ativar'}
                  </button>

                  <button 
                    className="mu-btn mu-btn-role-switcher"
                    onClick={() => toggleUserRole(user.id)}
                    title="Alternar entre cargo Aluno e Administrador"
                  >
                    Mudar Classe
                  </button>
                </div>

                <div className="mu-actions-right">
                  <button className="mu-btn-icon-action mu-btn-edit" onClick={() => openEditModal(user)} title="Editar dados">
                    <Edit className="mu-icon-svg" />
                    <span>Editar</span>
                  </button>
                  <button className="mu-btn-icon-action mu-btn-delete" onClick={() => openDeleteModal(user)} title="Excluir Usuário">
                    <Trash2 className="mu-icon-svg" />
                    <span>Excluir</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL DE EDIÇÃO DE USUÁRIO (OVERLAY) */}
      {isEditModalOpen && (
        <div className="mu-modal-overlay">
          <div className="mu-modal-card">
            <div className="mu-modal-header">
              <h2>Editar Usuário</h2>
              <button className="mu-modal-close-x" onClick={() => setIsEditModalOpen(false)}>&times;</button>
            </div>
            <p className="mu-modal-subtitle">Atualize as informações do usuário</p>

            <form onSubmit={handleUpdateUser} className="mu-modal-form">
              <div className="mu-form-group">
                <label>Nome Completo</label>
                <input 
                  type="text" 
                  value={editForm.name} 
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} 
                  required 
                />
              </div>

              <div className="mu-form-group">
                <label>Matrícula / E-mail</label>
                <input 
                  type="email" 
                  value={editForm.email} 
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} 
                  required 
                />
              </div>

              <div className="mu-form-group">
                <label>URL do Avatar (opcional)</label>
                <input 
                  type="text" 
                  value={editForm.avatar} 
                  onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })} 
                />
              </div>

              <div className="mu-form-group">
                <label>Biografia (opcional)</label>
                <textarea 
                  rows="3" 
                  value={editForm.bio} 
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })} 
                />
              </div>

              <div className="mu-modal-actions-row">
                <button type="button" className="mu-btn-modal-secondary" onClick={() => setIsEditModalOpen(false)}>Cancelar</button>
                <button type="submit" className="mu-btn-modal-submit">Atualizar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POP-UP / MODAL DE CONFIRMAÇÃO DE EXCLUSÃO SEGUIDA DE SEGURANÇA */}
      {isDeleteModalOpen && (
        <div className="mu-modal-overlay">
          <div className="mu-modal-card mu-modal-danger-layout">
            <div className="mu-danger-alert-head">
              <div className="mu-alert-icon-box">
                <ShieldAlert className="mu-alert-danger-svg" />
              </div>
              <h3>Excluir Usuário permanentemente?</h3>
            </div>
            
            <p className="mu-danger-msg">
              Atenção! Você está prestes a excluir a conta de <strong>{selectedUser?.name}</strong>. 
              Esta ação é irreversível e removerá todos os vínculos do usuário com o sistema.
            </p>

            <div className="mu-modal-actions-row margin-top-md">
              <button type="button" className="mu-btn-modal-secondary" onClick={() => setIsDeleteModalOpen(false)}>
                Cancelar
              </button>
              <button type="button" className="mu-btn-modal-delete-confirm" onClick={confirmDeleteUser}>
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
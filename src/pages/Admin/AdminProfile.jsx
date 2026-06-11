import { useNavigate } from 'react-router-dom';
//import '../../style/Admin/AdminProfile';

export default function AdminProfile() {
  const navigate = useNavigate();

  // Estado para controlar se o perfil está em modo de edição
  const [isEditing, setIsEditing] = useState(false);

  // Dados do Perfil do Administrador
  const [profileData, setProfileData] = useState({
    name: 'Administrador',
    email: 'admin@playerone.com',
    role: 'Administrador',
    bio: 'Administrador do sistema'
  });

  // Estado temporário para o formulário de edição
  const [editForm, setEditForm] = useState({ ...profileData });

  // Estado para o formulário de alteração de senha
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Estatísticas vindas do back-end / requisitos de negócio
  const stats = {
    gamesAdded: 8,
    partiesApproved: 12,
    usersCreated: 3
  };

  // Manipular salvamento do perfil editado
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileData({
      ...profileData,
      name: editForm.name,
      bio: editForm.bio
    });
    setIsEditing(false);
  };

  // Cancelar a edição e restaurar valores anteriores
  const handleCancelEdit = () => {
    setEditForm({ ...profileData });
    setIsEditing(false);
  };

  // Manipular alteração de senha
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('A nova senha e a confirmação não coincidem.');
      return;
    }
    alert('Senha alterada com sucesso!');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="ap-profile-layout">
      {/* BARRA DE NAVEGAÇÃO SUPERIOR */}
      <header className="ap-top-navbar">
        <div className="ap-navbar-container">
          <div className="ap-brand-section">
            <button className="ap-back-btn" onClick={() => navigate('/admin/dashboard')} title="Voltar ao Painel">
              <ArrowLeft className="ap-icon-back" />
            </button>
            <h1 className="ap-page-title">Perfil do Administrador</h1>
          </div>
          
          <button className="ap-logout-btn" onClick={() => navigate('/login')}>
            <LogOut className="ap-btn-icon" />
            Sair
          </button>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL (SCROLL VIEW) */}
      <main className="ap-main-container">
        <div className="ap-content-wrapper">
          
          {/* CARD 1: INFORMAÇÕES DO PERFIL (VISUALIZAÇÃO OU EDIÇÃO) */}
          <section className="ap-card">
            <div className="ap-card-header">
              <div className="ap-card-icon-box">
                <User className="ap-card-header-icon" />
              </div>
              <div className="ap-card-header-text">
                <h2>Informações do Perfil</h2>
                <p>Gerencie suas informações pessoais</p>
              </div>
            </div>

            {!isEditing ? (
              /* MODO VISUALIZAÇÃO */
              <div className="ap-profile-view-mode">
                <div className="ap-avatar-center-box">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80" 
                    alt="Foto de Perfil do Administrador" 
                    className="ap-large-avatar"
                  />
                </div>

                <div className="ap-profile-details">
                  <h3 className="ap-user-display-name">{profileData.name}</h3>
                  <p className="ap-user-display-email"># {profileData.email}</p>
                  
                  <div className="ap-badge-role">
                    <Shield className="ap-badge-icon" />
                    {profileData.role}
                  </div>

                  <p className="ap-user-display-bio">{profileData.bio}</p>
                </div>

                <button className="ap-btn-action-primary" onClick={() => setIsEditing(true)}>
                  <User className="ap-btn-internal-icon" />
                  Editar Perfil
                </button>
              </div>
            ) : (
              /* MODO EDIÇÃO COMPLETA */
              <form onSubmit={handleSaveProfile} className="ap-profile-edit-mode-form">
                <div className="ap-avatar-center-box">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80" 
                    alt="Foto de Perfil do Administrador" 
                    className="ap-large-avatar"
                  />
                </div>

                <div className="ap-form-inputs-stack">
                  <div className="ap-form-group">
                    <label htmlFor="edit-name">Nome</label>
                    <input 
                      id="edit-name"
                      type="text" 
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="ap-form-group">
                    <label htmlFor="edit-bio">Biografia</label>
                    <textarea 
                      id="edit-bio"
                      rows="3"
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="ap-form-actions-row">
                  <button type="button" className="ap-btn-action-secondary" onClick={handleCancelEdit}>
                    <X className="ap-btn-internal-icon" />
                    Cancelar
                  </button>
                  <button type="submit" className="ap-btn-action-submit">
                    <Save className="ap-btn-internal-icon" />
                    Salvar
                  </button>
                </div>
              </form>
            )}
          </section>

          {/* CARD 2: SEGURANÇA (ALTERAÇÃO DE SENHA) */}
          <section className="ap-card">
            <div className="ap-card-header">
              <div className="ap-card-icon-box">
                <Key className="ap-card-header-icon" />
              </div>
              <div className="ap-card-header-text">
                <h2>Segurança</h2>
                <p>Altere sua senha de acesso</p>
              </div>
            </div>

            <form onSubmit={handlePasswordChange} className="ap-security-form">
              <div className="ap-form-group">
                <label htmlFor="current-pass">Senha Atual</label>
                <input 
                  id="current-pass"
                  type="password" 
                  placeholder="••••••••"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  required 
                />
              </div>

              <div className="ap-form-group">
                <label htmlFor="new-pass">Nova Senha</label>
                <input 
                  id="new-pass"
                  type="password" 
                  placeholder="••••••••"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required 
                />
              </div>

              <div className="ap-form-group">
                <label htmlFor="confirm-pass">Confirmar Nova Senha</label>
                <input 
                  id="confirm-pass"
                  type="password" 
                  placeholder="••••••••"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  required 
                />
              </div>

              <button type="submit" className="ap-btn-action-primary margin-top-sm">
                <Key className="ap-btn-internal-icon" />
                Alterar Senha
              </button>
            </form>
          </section>

          {/* CARD 3: ESTATÍSTICAS DE ADMINISTRAÇÃO */}
          <section className="ap-card">
            <div className="ap-card-header">
              <div className="ap-card-icon-box">
                <BarChart3 className="ap-card-header-icon" />
              </div>
              <div className="ap-card-header-text">
                <h2>Estatísticas de Administração</h2>
                <p>Resumo das suas atividades</p>
              </div>
            </div>

            <div className="ap-stats-grid">
              <div className="ap-stat-box">
                <span className="ap-stat-number color-dark">{stats.gamesAdded}</span>
                <span className="ap-stat-label">Jogos Adicionados</span>
              </div>
              <div className="ap-stat-box">
                <span className="ap-stat-number color-green">{stats.partiesApproved}</span>
                <span className="ap-stat-label">Party's Aprovadas</span>
              </div>
              <div className="ap-stat-box">
                <span className="ap-stat-number color-blue">{stats.usersCreated}</span>
                <span className="ap-stat-label">Usuários Criados</span>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
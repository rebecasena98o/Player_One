import './Dashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Dados mocados estáticos conforme a imagem do painel administrativo fornecida
  const stats = {
    usersActive: 3,
    gamesRegistered: 8,
    totalParties: 3,
    pendingApproval: 2,
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard-layout">
      {/* HEADER PRINCIPAL */}
      <header className="dashboard-top-navbar">
        <div className="navbar-container">
          <div className="brand-section">
            <div className="brand-icon-wrapper">
              <Settings className="brand-gear-icon" />
            </div>
            <div>
              <h1 className="brand-title">Painel Administrativo</h1>
              <p className="brand-subtitle">Bem-vindo, Administrador</p>
            </div>
          </div>

          <div className="user-action-section">
            <div className="admin-avatar-mini">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Admin Avatar" 
                className="avatar-img"
              />
            </div>
            <Button variant="destructive" onClick={handleLogout} className="top-logout-btn">
              <LogOut className="btn-icon-left" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="dashboard-main-content">
        <div className="content-container">
          
          {/* SEÇÃO DE BOAS-VINDAS / TÍTULO DA PÁGINA */}
          <section className="page-intro-heading">
            <h2 className="intro-title">Dashboard</h2>
            <p className="intro-subtitle">Visão geral do sistema PlayerOne</p>
          </section>

          {/* GRID DE CARDS COM INDICADORES MÊTRICOS */}
          <section className="metrics-summary-grid">
            
            {/* Card Usuários */}
            <Card className="metric-card">
              <CardContent className="metric-card-body">
                <div className="metric-icon-title">
                  <Users className="metric-icon text-blue" />
                  <span className="metric-label">Usuários</span>
                </div>
                <div className="metric-value-box">
                  <span className="metric-number">{stats.usersActive}</span>
                  <span className="metric-desc">Usuários ativos</span>
                </div>
              </CardContent>
            </Card>

            {/* Card Jogos */}
            <Card className="metric-card">
              <CardContent className="metric-card-body">
                <div className="metric-icon-title">
                  <Dices className="metric-icon text-green" />
                  <span className="metric-label">Jogos</span>
                </div>
                <div className="metric-value-box">
                  <span className="metric-number">{stats.gamesRegistered}</span>
                  <span className="metric-desc">Jogos cadastrados</span>
                </div>
              </CardContent>
            </Card>

            {/* Card Party's */}
            <Card className="metric-card">
              <CardContent className="metric-card-body">
                <div className="metric-icon-title">
                  <Calendar className="metric-icon text-purple" />
                  <span className="metric-label">Party's</span>
                </div>
                <div className="metric-value-box">
                  <span className="metric-number">{stats.totalParties}</span>
                  <span className="metric-desc">Total de party's</span>
                </div>
              </CardContent>
            </Card>

            {/* Card Pendentes (Destaque Laranja) */}
            <Card className="metric-card pending-highlight">
              <CardContent className="metric-card-body">
                <div className="metric-icon-title">
                  <Clock className="metric-icon text-orange" />
                  <span className="metric-label text-orange-dark">Pendentes</span>
                </div>
                <div className="metric-value-box">
                  <span className="metric-number">{stats.pendingApproval}</span>
                  <span className="metric-desc">Party's aguardando aprovação</span>
                </div>
              </CardContent>
            </Card>

          </section>

          {/* CONTAINER DE AÇÕES RÁPIDAS */}
          <section className="quick-actions-panel">
            <div className="panel-header">
              <h3 className="panel-title">Ações Rápidas</h3>
              <p className="panel-subtitle">Gerenciar o sistema PlayerOne</p>
            </div>

            <div className="actions-button-grid">
              
              <button 
                className="action-tile-btn" 
                onClick={() => navigate('/admin/games')}
              >
                <Dices className="tile-btn-icon" />
                <span className="tile-btn-text">Gerenciar Jogos</span>
              </button>

              <button 
                className="action-tile-btn" 
                onClick={() => navigate('/admin/users')}
              >
                <Users className="tile-btn-icon" />
                <span className="tile-btn-text">Gerenciar Usuários</span>
              </button>

              <button 
                className="action-tile-btn relative-badge-container" 
                onClick={() => navigate('/admin/parties')}
              >
                <Calendar className="tile-btn-icon" />
                <span className="tile-btn-text">Gerenciar Party's</span>
                {stats.pendingApproval > 0 && (
                  <div className="tile-notification-badge">
                    {stats.pendingApproval}
                  </div>
                )}
              </button>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
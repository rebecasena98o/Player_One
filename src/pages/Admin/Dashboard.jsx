import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';
import { games } from '../../data/games';
import { parties } from '../../data/parties';
import { users } from '../../data/users';
import './AdminDashboard.css'; // Importação do CSS Puro

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const pendingParties = parties.filter(p => p.status === 'pending').length;
  const totalUsers = users.filter(u => u.role === 'user').length;
  const totalGames = games.length;
  const totalParties = parties.length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'AD';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="admin-dashboard-container">
      {/* Cabeçalho / Navbar */}
      <header className="dashboard-header">
        <div className="header-container">
          <div className="header-brand">
            <div className="brand-icon-wrapper">
              <span className="material-symbols-outlined icon-primary">settings</span>
            </div>
            <div className="brand-text">
              <h1 className="brand-title">Painel Administrativo</h1>
              <p className="brand-subtitle">Bem-vindo, {user?.name}</p>
            </div>
          </div>

          <div className="header-actions">
            <button 
              className="avatar-btn" 
              onClick={() => navigate('/admin/profile')}
              title="Ver perfil"
            >
              <div className="avatar-wrapper">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="avatar-img" />
                ) : (
                  <span className="avatar-fallback">
                    {getInitials(user?.name)}
                  </span>
                )}
              </div>
            </button>

            <button className="btn btn-destructive" onClick={handleLogout}>
              <span className="material-symbols-outlined btn-icon">logout</span>
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="dashboard-main">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-welcome"
        >
          <h2 className="welcome-title">Dashboard</h2>
          <p className="welcome-subtitle">Visão geral do sistema PlayerOne</p>
        </motion.div>

        {/* Grid de Cards Estatísticos */}
        <div className="stats-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">
                  <span className="material-symbols-outlined icon-blue">group</span>
                  Usuários
                </h3>
              </div>
              <div className="card-content">
                <p className="stat-number">{totalUsers}</p>
                <p className="stat-label">Usuários ativos</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">
                  <span className="material-symbols-outlined icon-green">casino</span>
                  Jogos
                </h3>
              </div>
              <div className="card-content">
                <p className="stat-number">{totalGames}</p>
                <p className="stat-label">Jogos cadastrados</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">
                  <span className="material-symbols-outlined icon-purple">calendar_month</span>
                  Party's
                </h3>
              </div>
              <div className="card-content">
                <p className="stat-number">{totalParties}</p>
                <p className="stat-label">Total de party's</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="dashboard-card card-pending">
              <div className="card-header">
                <h3 className="card-title">
                  <span className="material-symbols-outlined icon-orange">calendar_month</span>
                  Pendentes
                </h3>
              </div>
              <div className="card-content">
                <p className="stat-number text-orange">{pendingParties}</p>
                <p className="stat-label">Party's aguardando aprovação</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Seção de Ações Rápidas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="dashboard-card actions-container-card">
            <div className="actions-card-header">
              <h3 className="section-title">Ações Rápidas</h3>
              <p className="card-description">Gerenciar o sistema PlayerOne</p>
            </div>
            <div className="actions-grid">
              <button
                className="btn-action-outline"
                onClick={() => navigate('/admin/games')}
              >
                <span className="material-symbols-outlined action-icon">casino</span>
                <span className="action-text">Gerenciar Jogos</span>
              </button>

              <button
                className="btn-action-outline"
                onClick={() => navigate('/admin/users')}
              >
                <span className="material-symbols-outlined action-icon">group</span>
                <span className="action-text">Gerenciar Usuários</span>
              </button>

              <button
                className="btn-action-outline btn-relative"
                onClick={() => navigate('/admin/parties')}
              >
                {pendingParties > 0 && (
                  <span className="badge-pending">
                    {pendingParties}
                  </span>
                )}
                <span className="material-symbols-outlined action-icon">calendar_month</span>
                <span className="action-text">Gerenciar Party's</span>
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
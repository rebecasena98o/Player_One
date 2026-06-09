// AdminDashboard.jsx
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { motion } from 'motion/react';
import { Users, Dices, Calendar, LogOut, Settings } from 'lucide-react';
import { games } from '../../data/games';
import { parties } from '../../data/parties';
import { users } from '../../data/users';

// Importação do arquivo de estilo separado
import './AdminDashboard.css';

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
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-container">
          <div className="header-left">
            <div className="icon-wrapper">
              <Settings className="icon-primary" />
            </div>
            <div className="header-title">
              <h1>Painel Administrativo</h1>
              <p>Bem-vindo, {user?.name}</p>
            </div>
          </div>

          <div className="header-right">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin/profile')}
              className="avatar-button"
            >
              <Avatar className="avatar-frame">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="avatar-fallback-custom">
                  {user?.name ? getInitials(user.name) : 'AD'}
                </AvatarFallback>
              </Avatar>
            </Button>

            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="logout-icon" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="welcome-section"
        >
          <h2>Dashboard</h2>
          <p>Visão geral do sistema PlayerOne</p>
        </motion.div>

        <div className="stats-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="card-title-content">
                  <Users className="icon-blue" />
                  Usuários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="stat-number">{totalUsers}</p>
                <p className="stat-desc">Usuários ativos</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="card-title-content">
                  <Dices className="icon-green" />
                  Jogos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="stat-number">{totalGames}</p>
                <p className="stat-desc">Jogos cadastrados</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="card-title-content">
                  <Calendar className="icon-purple" />
                  Party's
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="stat-number">{totalParties}</p>
                <p className="stat-desc">Total de party's</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="card-pending-custom">
              <CardHeader>
                <CardTitle className="card-title-content">
                  <Calendar className="icon-orange" />
                  Pendentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="stat-number text-pending-custom">{pendingParties}</p>
                <p className="stat-desc">Party's aguardando aprovação</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Gerenciar o sistema PlayerOne</CardDescription>
            </CardHeader>
            <CardContent className="actions-grid">
              <Button
                variant="outline"
                className="action-button-custom"
                onClick={() => navigate('/admin/games')}
              >
                <Dices />
                <span>Gerenciar Jogos</span>
              </Button>

              <Button
                variant="outline"
                className="action-button-custom"
                onClick={() => navigate('/admin/users')}
              >
                <Users />
                <span>Gerenciar Usuários</span>
              </Button>

              <Button
                variant="outline"
                className="action-button-custom"
                onClick={() => navigate('/admin/parties')}
              >
                {pendingParties > 0 && (
                  <span className="pending-badge">
                    {pendingParties}
                  </span>
                )}
                <Calendar />
                <span>Gerenciar Party's</span>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
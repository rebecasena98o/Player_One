import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { motion } from 'motion/react';
import { ArrowLeft, LogOut, Save, Shield, User as UserIcon, Lock, Hash, Camera } from 'lucide-react';
import './AdminProfile.css'; // Importação do arquivo de estilo customizado

export default function AdminProfile() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const fileInputRef = useRef(null);

  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [editing, setEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  if (!user) {
    navigate('/admin/login');
    return null;
  }

  const handleSave = () => {
    updateProfile({ name, bio, avatar: avatarPreview });
    setEditing(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    alert('Senha alterada com sucesso!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        updateProfile({ avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AD';

  return (
    <div className="admin-profile-page">
      <header className="profile-header">
        <div className="header-container">
          <div className="header-flex">
            <div className="header-title-group">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/admin')}
                className="back-button"
              >
                <ArrowLeft className="icon-md" />
              </Button>
              <h1 className="header-title">Perfil do Administrador</h1>
            </div>

            <Button variant="destructive" onClick={handleLogout} className="logout-btn">
              <LogOut className="icon-sm mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="profile-main">
        <div className="profile-content-wrapper">
          
          {/* CARD DE INFORMAÇÕES DO PERFIL */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="profile-card">
              <CardHeader>
                <div className="card-header-flex">
                  <div className="card-icon-container">
                    <Shield className="icon-lg text-primary" />
                  </div>
                  <div>
                    <CardTitle>Informações do Perfil</CardTitle>
                    <CardDescription>Gerencie suas informações pessoais</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="avatar-section">
                  <div className="avatar-wrapper group">
                    <Avatar className="avatar-component">
                      <AvatarImage src={avatarPreview} alt={user.name} />
                      <AvatarFallback className="avatar-fallback">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <button onClick={handleAvatarClick} className="avatar-overlay-btn">
                      <Camera className="icon-xl text-white" />
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden-file-input"
                  />

                  {!editing && (
                    <div className="profile-info-display">
                      <h2 className="profile-display-name">{user.name}</h2>
                      <p className="profile-display-email">
                        <Hash className="icon-sm" />
                        {user.email}
                      </p>
                      <div className="profile-role-badge">
                        <Shield className="icon-sm text-primary" />
                        <span className="badge-text">Administrador</span>
                      </div>
                      {user.bio && (
                        <p className="profile-display-bio">{user.bio}</p>
                      )}
                    </div>
                  )}
                </div>

                {editing ? (
                  <div className="edit-form-container">
                    <div className="form-field">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome"
                      />
                    </div>

                    <div className="form-field">
                      <Label htmlFor="bio">Biografia</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Conte um pouco sobre você..."
                        rows={4}
                      />
                    </div>

                    <div className="form-actions-flex">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setName(user.name);
                          setBio(user.bio || '');
                          setAvatarPreview(user.avatar || '');
                          setEditing(false);
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button className="flex-1" onClick={handleSave}>
                        <Save className="icon-sm mr-2" />
                        Salvar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button className="w-full" onClick={() => setEditing(true)}>
                    <UserIcon className="icon-sm mr-2" />
                    Editar Perfil
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* CARD DE SEGURANÇA */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="profile-card">
              <CardHeader>
                <div className="card-header-flex">
                  <div className="card-icon-container">
                    <Lock className="icon-lg text-primary" />
                  </div>
                  <div>
                    <CardTitle>Segurança</CardTitle>
                    <CardDescription>Altere sua senha de acesso</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="security-form">
                  <div className="form-field">
                    <Label htmlFor="currentPassword">Senha Atual</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <Label htmlFor="newPassword">Nova Senha</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      placeholder="••••••••"
                      minLength={8}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      minLength={8}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Lock className="icon-sm mr-2" />
                    Alterar Senha
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* CARD DE ESTATÍSTICAS */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="profile-card">
              <CardHeader>
                <CardTitle>Estatísticas de Administração</CardTitle>
                <CardDescription>Resumo das suas atividades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="stats-grid">
                  <div className="stat-box">
                    <p className="stat-number text-primary">8</p>
                    <p className="stat-label">Jogos Adicionados</p>
                  </div>
                  <div className="stat-box">
                    <p className="stat-number text-success">12</p>
                    <p className="stat-label">Parties Aprovadas</p>
                  </div>
                  <div className="stat-box">
                    <p className="stat-number text-info">3</p>
                    <p className="stat-label">Usuários Criados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ZONA DE PERIGO */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="profile-card danger-card">
              <CardHeader>
                <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
                <CardDescription>Ações irreversíveis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="danger-zone-item">
                  <div>
                    <p className="danger-item-title">Sair da conta</p>
                    <p className="danger-item-desc">Desconectar desta sessão de administrador</p>
                  </div>
                  <Button variant="destructive" onClick={handleLogout}>
                    <LogOut className="icon-sm mr-2" />
                    Sair
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
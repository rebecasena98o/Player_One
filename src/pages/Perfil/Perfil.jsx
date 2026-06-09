import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Importação da sua folha de estilo desacoplada e customizável
import '../../style/StylePages/StylePerfil.css';

export default function Profile({ user, setUser }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [name, setName] = useState(user?.name || user?.nome || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [editing, setEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');

  useEffect(() => {
    if (user) {
      setName(user.name || user.nome || '');
      setBio(user.bio || '');
      setAvatarPreview(user.avatar || '');
    }
  }, [user]);

  if (!user) {
    navigate('/');
    return null;
  }

  const handleSave = () => {
    const dadosAtualizados = {
      ...user,
      name: name,
      nome: name,
      bio: bio,
      avatar: avatarPreview
    };

    if (setUser) setUser(dadosAtualizados);
    setEditing(false);
  };

  const handleLogout = () => {
    if (setUser) setUser(null);
    navigate('/');
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setAvatarPreview(base64String);
        if (setUser) {
          setUser(prev => ({ ...prev, avatar: base64String }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const userNameFallback = name || user?.name || user?.nome || 'Jogador';
  const initials = userNameFallback
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="profile-page-wrapper">
      
      {/* CABEÇALHO DO MÓDULO */}
      <header className="profile-sticky-header">
        <div className="profile-header-container">
          <div className="profile-header-left">
            <button 
              type="button" 
              className="btn-profile-icon-back" 
              onClick={() => navigate(-1)}
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="profile-main-title">Perfil</h1>
          </div>

          <button type="button" className="btn-profile-logout" onClick={handleLogout}>
            <span className="material-symbols-outlined">logout</span> Sair
          </button>
        </div>
      </header>

      {/* PAINEL CENTRAL DE CONTEÚDO */}
      <main className="profile-main-content">
        <div className="profile-card-box">
          
          {/* BLOCO CENTRALIZADO DO AVATAR / IDENTIFICAÇÃO */}
          <div className="profile-avatar-center-section">
            <div className="profile-avatar-interactive-group">
              
              {avatarPreview ? (
                <img src={avatarPreview} alt={userNameFallback} className="profile-img-avatar" />
              ) : (
                <div className="profile-avatar-fallback-box">
                  {initials}
                </div>
              )}

              <button
                type="button"
                onClick={handleAvatarClick}
                className="btn-profile-camera-overlay"
                title="Alterar foto de perfil"
              >
                <span className="material-symbols-outlined">photo_camera</span>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="profile-hidden-file-input"
            />

            {!editing && (
              <div className="profile-text-identity-summary">
                <h2 className="profile-user-display-name">{userNameFallback}</h2>
                <p className="profile-user-display-email">
                  <span className="material-symbols-outlined">alternate_email</span>
                  {user.email || 'usuario@unifor.br'}
                </p>
                {bio && <p className="profile-user-display-bio">{bio}</p>}
              </div>
            )}
          </div>

          {/* CHAVEAMENTO CONDICIONAL DAS VIEWS DE EDITAÇÃO / DETALHES */}
          {editing ? (
            <div className="profile-inputs-form-stack">
              <div className="profile-form-field">
                <label htmlFor="form-profile-name">Nome</label>
                <input
                  id="form-profile-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="profile-native-input"
                />
              </div>

              <div className="profile-form-field">
                <label htmlFor="form-profile-bio">Biografia</label>
                <textarea
                  id="form-profile-bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Conte um pouco sobre você..."
                  rows={4}
                  className="profile-native-textarea"
                />
              </div>

              <div className="profile-form-actions-row">
                <button
                  type="button"
                  className="btn-profile-form-action variant-cancel"
                  onClick={() => {
                    setName(user.name || user.nome || '');
                    setBio(user.bio || '');
                    setAvatarPreview(user.avatar || '');
                    setEditing(false);
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn-profile-form-action variant-save"
                  onClick={handleSave}
                >
                  <span className="material-symbols-outlined">save</span> Salvar
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-static-details-stack">
              <button
                type="button"
                className="btn-profile-trigger-edit"
                onClick={() => setEditing(true)}
              >
                <span className="material-symbols-outlined">edit</span> Editar Perfil
              </button>

              <div className="profile-statistics-divider-pane">
                <h3 className="profile-section-sub-title">Estatísticas</h3>
                <div className="profile-stats-grid-row">
                  <div className="profile-stat-box-item">
                    <p className="stat-metric-value">12</p>
                    <p className="stat-metric-label">Jogos</p>
                  </div>
                  <div className="profile-stat-box-item">
                    <p className="stat-metric-value">5</p>
                    <p className="stat-metric-label">Party's</p>
                  </div>
                  <div className="profile-stat-box-item">
                    <p className="stat-metric-value">8</p>
                    <p className="stat-metric-label">Amigos</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
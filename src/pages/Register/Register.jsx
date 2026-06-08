import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../style/StyleRegister/Auth.css'; // Apontando para o CSS exclusivo
import cadastroImg from '../../imgs/CadastroImage.png';
import iconLogo from '../../imgs/IconeDado.png';

const Register = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Cadastrando:", { nome, matricula, senha });
    navigate('/');
  };

  return (
    <div className="auth-page-body">
      <div className="auth-left-side">
        <form className="auth-form-wrapper" onSubmit={handleRegister}>
          <div className="auth-logo-box">
            <img src={iconLogo} alt="ÍconeDado" />
          </div>
          <h2>Criar Conta</h2>
          <p>Junte-se à comunidade de jogadores</p>
          
          <label>Nome</label>
          <input 
            type="text" 
            placeholder="Digite seu nome" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
          
          <label>Matrícula</label>
          <input 
            type="text" 
            placeholder="Digite sua matrícula" 
            value={matricula} 
            onChange={(e) => setMatricula(e.target.value)} 
            required 
          />
          
          <label>Senha</label>
          <input 
            type="password" 
            placeholder="Digite sua senha" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
          />
          
          <button type="submit">Cadastrar</button>

          <p className="auth-link-text"> 
            Já tem uma conta?{' '}
            <Link to="/"> 
              <span className="auth-link-green">Entrar</span>
            </Link> 
          </p>
        </form>
      </div>
      
      <div className="auth-right-side" style={{ backgroundImage: `url(${cadastroImg})` }}>
        <h1>Bem-vindo ao </h1>
        <h1>Player One</h1>
        <p>Acesse milhares de jogos e encontre pessoas para jogar</p>
      </div>
    </div>
  );
};

export default Register;
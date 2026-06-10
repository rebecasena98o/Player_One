import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../style/StyleRegister/Auth.css';  // Apontando para o CSS exclusivo
import loginImg from '../../imgs/LoginImage.png';
import iconLogo from '../../imgs/IconeDado.png';

const Login = () => {
  const navigate = useNavigate();
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Tentando logar com:", matricula);
    navigate('/home');
  };

  const handleNumericChange = (setValue) => (e) => {
  const value = e.target.value;
  // O regex /\D/g significa: "Tudo o que NÃO for dígito numérico, substitua por vazio"
  const onlyNumbers = value.replace(/\D/g, ''); 
  setValue(onlyNumbers);
};


  return (
    <div className="auth-page-body">
      <div className="auth-left-side">
        <form className="auth-form-wrapper" onSubmit={handleLogin}>
          <div className="auth-logo-box">
            <img src={iconLogo} alt="ÍconeDado" />
              </div>

          <h2>Player One</h2>
          <p>Entre para acessar seu catálogo de jogos</p>
          
          <label>Matrícula</label>
          <input 
            type="text" 
            inputMode="numeric"
            placeholder="Digite sua matrícula" 
            value={matricula} 
            onChange={handleNumericChange(setMatricula)} 
            required 
          />
          
          <label>Senha</label>
          <input 
            type="password" 
            inputMode="numeric"
            placeholder="Digite sua senha" 
            value={senha} 
            onChange={handleNumericChange(setSenha)} 
            required 
          />
          
          <button type="submit"> Entrar </button>
          
          <p className="auth-link-text"> 
            Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>
          
          <p className="auth-link-text">
          </p>
        </form>
      </div>
      
      {/* CORRIGIDO: Agora a div da imagem está no lugar certo, paralela ao left-side */}
      <div className="auth-right-side" style={{ backgroundImage: `url(${loginImg})` }}>
        <h1>Conecte-se com jogadores</h1>
        <p>Organize partidas, descubra novos jogos e faça parte da comunidade</p>
      </div>
    </div>
  );
};

export default Login;
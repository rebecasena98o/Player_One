import React, { useState } from 'react';
import '../style/StyleGlobal.css';
import loginImg from '../imgs/LoginImage.png';
import iconLogo from '../imgs/IconeDado.png';


const Login = () => {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');

    return(
    <div className="container">
      <div className="left-side">
        <div className="form-wrapper">
          <div className="logo-box">
            <img src={iconLogo} alt="ÍconeDado" />
            </div>
          <h2>Player One</h2>
          <p>Entre para acessar seu catálogo de jogos</p>
          
          <label>Matrícula</label>
          <input type="text" placeholder="Digite sua matrícula" value={matricula} onChange={(e) => setMatricula(e.target.value)} />
          
          <label>Senha</label>
          <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          
          <button> Entrar </button>
          
          <p className="link-text">Não tem uma conta? <b>Cadastre-se</b></p>
          <p className="link-text link-red">Esqueci minha senha</p>
        </div>
      </div>
      
      <div className="right-side" style={{ backgroundImage: `url(${loginImg})` }}>
        <h1>Conecte-se com jogadores</h1>
        <p>Organize partidas, descubra novos jogos e faça parte da comunidade</p>
      </div>
    </div>
  );
};



export default Login;
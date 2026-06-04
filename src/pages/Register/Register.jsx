import React, { useState } from 'react';
import '../style/StyleGlobal.css';
import cadastroImg from '../imgs/CadastroImage.png';
import iconLogo from '../imgs/IconeDado.png';


const Register = () => {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <div className="container">
      <div className="left-side">
        <div className="form-wrapper">
          <div className="logo-box">
            <img src={iconLogo} alt="ÍconeDado" />
                </div>
          <h2>Criar Conta</h2>
          <p>Junte-se à comunidade de jogadores</p>
          
          <label>Nome</label>
          <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          
          <label>Matrícula</label>
          <input type="text" placeholder="Digite sua matrícula" value={matricula} onChange={(e) => setMatricula(e.target.value)} />
          
          <label>Senha</label>
          <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          
          <button>Cadastrar</button>

          <p className="link-text-cadastro"> Já tem uma conta? <span className="link-green"> Entrar </span> </p>
        </div>
      </div>
      
      <div className="right-side" style={{backgroundImage: `url(${cadastroImg})` }}>
        <h1>Bem-vindo ao </h1>
        <h1>Player One</h1>
        <p>Acesse milhares de jogos e encontre pessoas para jogar</p>
      </div>
    </div>
  );
};

export default Register;
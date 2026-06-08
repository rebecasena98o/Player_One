// src/services/JogoApi.js

// Dados falsos simulando exatamente o que o Spring Boot vai devolver baseado no seu MER
const dadosFalsosJogos = [
  {
    id: 1,
    codigoUnico: "JOG-001",
    nome: "Catan",
    imagemUrl: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=400&auto=format&fit=crop", // Substitua por URLs de capas reais depois
    statusJogo: "DISPONIVEL",
    indisponivel: false
  },
  {
    id: 2,
    codigoUnico: "JOG-002",
    nome: "W.A.R",
    imagemUrl: "https://images.unsplash.com/photo-1585504198199-20277593b94f?q=80&w=400&auto=format&fit=crop",
    statusJogo: "INDISPONIVEL",
    indisponivel: true
  },
  {
    id: 3,
    codigoUnico: "JOG-003",
    nome: "Dixit",
    imagemUrl: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?q=80&w=400&auto=format&fit=crop",
    statusJogo: "DISPONIVEL",
    indisponivel: false
  },
  {
    id: 4,
    codigoUnico: "JOG-004",
    nome: "Ticket to Ride",
    imagemUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400&auto=format&fit=crop",
    statusJogo: "DISPONIVEL",
    indisponivel: false
  }
];

export const jogoService = {
  // Simula o método HTTP GET que busca todos os jogos
  getAllGames: () => {
    return new Promise((resolve) => {
      // Simula um delay de rede de 1.5 segundos para ver o Loader rodar
      setTimeout(() => {
        resolve(dadosFalsosJogos);
      }, 1500);
    });
  }
};
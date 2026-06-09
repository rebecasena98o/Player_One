// src/services/JogoApi.js

// Dados falsos enriquecidos simulando exatamente o que o Spring Boot vai devolver baseado no seu MER
const dadosFalsosJogos = [
  {
    id: 1,
    codigoUnico: "JOG-001",
    nome: "Catan",
    imagemUrl: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=400&auto=format&fit=crop",
    statusJogo: "DISPONIVEL",
    disponivel: true,
    categoria: "Estratégia / Tabuleiro",
    faixaEtaria: "10+",
    minJogadores: 3,
    maxJogadores: 4,
    duracao: "1 a 2 horas",
    quantidadeDisponivel: 3,
    descricao: "Em Catan, os jogadores tentam ser a força dominante na ilha de Catan ao construir assentamentos, cidades e estradas. Em cada turno, dados são rolados para determinar quais recursos a ilha produz."
  },
  {
    id: 2,
    codigoUnico: "JOG-002",
    nome: "W.A.R",
    imagemUrl: "https://images.unsplash.com/photo-1585504198199-20277593b94f?q=80&w=400&auto=format&fit=crop",
    statusJogo: "INDISPONIVEL",
    disponivel: false,
    categoria: "Estratégia / Guerra",
    faixaEtaria: "14+",
    minJogadores: 3,
    maxJogadores: 6,
    duracao: "2 a 4 horas",
    quantidadeDisponivel: 0,
    descricao: "O clássico jogo de estratégia onde o mundo é o tabuleiro. Conquiste territórios, elimine seus oponentes e cumpra o seu objetivo secreto para se tornar o mestre supremo do planeta."
  },
  {
    id: 3,
    codigoUnico: "JOG-003",
    nome: "Dixit",
    imagemUrl: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?q=80&w=400&auto=format&fit=crop",
    statusJogo: "DISPONIVEL",
    disponivel: true,
    categoria: "Card Game / Party",
    faixaEtaria: "8+",
    minJogadores: 3,
    maxJogadores: 8,
    duracao: "30 minutos",
    quantidadeDisponivel: 5,
    descricao: "Um jogo de dedução poética e ilustrações fantásticas onde cada carta conta uma história. Um jogador escolhe uma carta da sua mão e dá uma dica sobre ela através de uma frase, palavra ou som."
  },
  {
    id: 4,
    codigoUnico: "JOG-004",
    nome: "Ticket to Ride",
    imagemUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400&auto=format&fit=crop",
    statusJogo: "DISPONIVEL",
    disponivel: true,
    categoria: "Estratégia / Familiar",
    faixaEtaria: "8+",
    minJogadores: 2,
    maxJogadores: 5,
    duracao: "1 hora",
    quantidadeDisponivel: 2,
    descricao: "Uma aventura ferroviária cross-country onde os jogadores coletam cartas de vários tipos de vagões de trem para reivindicar rotas ferroviárias conectando cidades através da América do Norte."
  }
];

export const jogoService = {
  // Simula o método HTTP GET que busca todos os jogos
  getAllGames: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dadosFalsosJogos);
      }, 1000); // Delay sutil de rede
    });
  },

  // ✨ NOVO MÉTODO COMPATÍVEL COM O SEU DETAIL: Busca por ID
  getGameById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Encontra o jogo convertendo o id recebido (String da URL) para Number
        const jogoEncontrado = dadosFalsosJogos.find(g => g.id === Number(id));
        
        if (jogoEncontrado) {
          resolve(jogoEncontrado);
        } else {
          reject(new Error("Jogo não encontrado na base de dados fictícia"));
        }
      }, 1000);
    });
  }
};
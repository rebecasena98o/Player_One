// =========================================================================
// 1. CONFIGURAÇÃO DO AMBIENTE (Simulação do Navegador para o Node.js)
// =========================================================================

const memoryStorage = {};
global.localStorage = {
  getItem: (key) => memoryStorage[key] || null,
  setItem: (key, value) => { memoryStorage[key] = String(value); },
  removeItem: (key) => { delete memoryStorage[key]; },
  clear: () => { for (let key in memoryStorage) delete memoryStorage[key]; }
};

global.window = {
  location: { href: '' }
};

// Configura a URL base da API (Ajuste a porta se seu FastAPI rodar em outra)
process.env.REACT_APP_API_URL = 'http://localhost:8000'; 

// =========================================================================
// 2. EXECUÇÃO DOS TESTES INTEGRADOS
// =========================================================================

async function rodarTestes() {
  console.log('🚀 Iniciando testes automatizados com Services, Factory e Builders...');

  try {
    // Importações dinâmicas dos módulos criados
    const RequestFactory = (await import('./src/utils/requestFactory.js')).default;
    const authService = (await import('./src/services/auth.service.js')).default;
    const userService = (await import('./src/services/user.service.js')).default; // <-- CORRIGIDO: Importação adicionada
    const gameService = (await import('./src/services/game.service.js')).default;
    const partyService = (await import('./src/services/party.service.js')).default;
    const auditService = (await import('./src/services/audit.service.js')).default;

    // Gerador de dados únicos para evitar colisão no banco de dados do backend
    const numUnico = Math.floor(Math.random() * 10000);
    const dadosFormularioUsuario = {
      nome: `Usuário Teste ${numUnico}`,
      email: `ludoteca_user_${numUnico}@universidade.edu.br`,
      senha: 'SenhaSuperSegura123',
      bio: 'Entusiasta de jogos de tabuleiro modernos.'
    };

    // ---------------------------------------------------------------------
    // Teste 1: Construção de Payload e Registro de Usuário (UserCreate)
    // ---------------------------------------------------------------------
    console.log('\n--------------------------------------------------');
    console.log('[Teste 1] Montando e enviando dados de cadastro de usuário...');
    
    // Utilizando o Builder através da Factory
    const usuarioPayload = RequestFactory.newUserCreate()
      .setName(dadosFormularioUsuario.nome)
      .setEmail(dadosFormularioUsuario.email)
      .setPassword(dadosFormularioUsuario.senha)
      .setDescription(dadosFormularioUsuario.bio)
      .build();

    console.log('👉 Payload gerado pelo Builder:', usuarioPayload);
    const registroResponse = await authService.register(usuarioPayload);
    console.log('✅ Usuário registrado com sucesso no backend!', registroResponse);

    // ---------------------------------------------------------------------
    // Teste 2: Autenticação OAuth2 / JWT
    // ---------------------------------------------------------------------
    console.log('\n--------------------------------------------------');
    console.log('[Teste 2] Efetuando login (Convertendo internamente para Form URL Encoded)...');
    
    const loginResponse = await authService.login(usuarioPayload.email, dadosFormularioUsuario.senha);
    console.log('✅ Token JWT obtido e armazenado no localStorage:', loginResponse.access_token);

    // ---------------------------------------------------------------------
    // Teste 3: Acesso a rotas protegidas e Atualização de Perfil (UserUpdate)
    // ---------------------------------------------------------------------
    console.log('\n--------------------------------------------------');
    console.log('[Teste 3] Atualizando perfil do usuário logado (PATCH)...');
    
    const atualizacaoPayload = RequestFactory.newUserUpdate()
      .setDescription('Nova biografia atualizada pelo teste dinâmico.')
      .build();

    const perfilAtualizado = await userService.updateProfile(atualizacaoPayload);
    console.log('✅ Perfil modificado com sucesso:', perfilAtualizado);

    // ---------------------------------------------------------------------
    // Teste 4: Criação de Jogo via Builder (GameCreate)
    // ---------------------------------------------------------------------
    console.log('\n--------------------------------------------------');
    console.log('[Teste 4] Cadastrando um novo jogo fictício...');
    
    const jogoPayload = RequestFactory.newGameCreate()
      .setName(`Catan Edição Universitária ${numUnico}`)
      .setCategory('Estratégia')
      .setMinimumAge('10')             // String sendo convertida para Number pelo Builder
      .setQuantity('3')               // String sendo convertida para Number pelo Builder
      .setPlayersRange('3', '4')      
      .setDurationRange('60', '90')
      .build();

    // Nota: Esta rota /api/v1/games/ (POST) exige privilégios Admin no backend.
    let jogoCriado = null;
    try {
      jogoCriado = await gameService.create(jogoPayload);
      console.log('✅ Jogo cadastrado com sucesso (Sua conta possui privilégio Admin):', jogoCriado);
    } catch (err) {
      if (err.response?.status === 403) {
        console.log('⚠️ Permissão negada para cadastrar jogo (Usuário recém-criado não é Admin).');
        console.log('👉 Buscando algum jogo já existente no sistema para prosseguir com o teste de Party...');
        
        try {
          const jogosExistentes = await gameService.listAvailable();
          if (jogosExistentes && jogosExistentes.length > 0) {
            jogoCriado = jogosExistentes[0];
            console.log(`✅ Jogo existente selecionado para o teste. ID: ${jogoCriado.id}`);
          }
        } catch (listErr) {
          console.log('⚠️ Não foi possível listar jogos existentes.');
        }
      } else {
        throw err;
      }
    }

    // ---------------------------------------------------------------------
    // Teste 5: Criação de Party (PartyCreate)
    // ---------------------------------------------------------------------
    console.log('\n--------------------------------------------------');
    console.log('[Teste 5] Criando uma nova Party para uma sessão de jogos...');
    
    // Se nenhum jogo pôde ser criado ou listado, usamos ID 1 simulando um ambiente populado
    const ID_DO_JOGO = jogoCriado ? jogoCriado.id : 1; 

    const partyPayload = RequestFactory.newPartyCreate()
      .setGameId(ID_DO_JOGO)
      .setDescription('Mesa aberta para jogar no bloco de tecnologia!')
      .setDate('2026-06-20') // Formato correto YYYY-MM-DD
      .setTime('14:30')      // Formato correto HH:MM
      .setLocation('Sala de Convivência Acadêmica')
      .setMaxPlayers('6')    // String convertida para Integer pelo Builder
      .build();

    console.log('👉 Payload da Party gerado pelo Builder:', partyPayload);
    const partyResponse = await partyService.create(partyPayload);
    console.log('✅ Party cadastrada com sucesso!', partyResponse);

    // ---------------------------------------------------------------------
    // Teste 6: Envio de Mensagem simplificado via Factory
    // ---------------------------------------------------------------------
    console.log('\n--------------------------------------------------');
    console.log('[Teste 6] Enviando uma mensagem no chat da Party recém-criada...');
    
    const mensagemPayload = RequestFactory.newMessageCreate('Olá pessoal, sobrou alguma vaga na mesa?');
    const mensagemResponse = await partyService.sendMessage(partyResponse.id, mensagemPayload);
    console.log('✅ Mensagem enviada e registrada no chat:', mensagemResponse);

    // ---------------------------------------------------------------------
    // Teste 7: Consulta de Auditoria com Query Params estruturados
    // ---------------------------------------------------------------------
    console.log('\n--------------------------------------------------');
    console.log('[Teste 7] Construindo filtros complexos para consulta de Auditoria...');
    
    const filtrosAuditoria = RequestFactory.newAuditFilter()
      .setPagination(0, 20)
      .filterByAction('LOGIN')
      .filterByDates('2026-01-01', '2026-12-31')
      .build();

    console.log('👉 Query parameters estruturados pelo Builder:', filtrosAuditoria);
    
    try {
      const logs = await auditService.listLogs(filtrosAuditoria);
      console.log(`✅ Sucesso ao consultar logs de auditoria. Registros encontrados: ${logs.length}`);
    } catch (err) {
      if (err.response?.status === 403) {
        console.log('⚠️ Permissão de Auditoria negada (Apenas Administradores podem visualizar estes logs).');
      } else {
        throw err;
      }
    }

    // ---------------------------------------------------------------------
    // Finalização e Limpeza
    // ---------------------------------------------------------------------
    console.log('\n--------------------------------------------------');
    console.log('[Finalizando] Efetuando logout e limpando localStorage do ambiente...');
    await authService.logout();

    console.log('\n==================================================');
    console.log('🎉 TODOS OS CONSTRUTORES, FACTORIES E SERVICES RESPONDERAM CORRETAMENTE!');
    console.log('==================================================');

  } catch (error) {
    console.error('\n❌ OCORREU UM ERRO DURANTE A VALIDAÇÃO:');
    if (error.response) {
      console.error(`Status HTTP retornado pela API: ${error.response.status}`);
      console.error('Mensagem do Pydantic/FastAPI:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Erro local no JavaScript ou rede:', error.message);
    }
    process.exit(1);
  }
}

rodarTestes();
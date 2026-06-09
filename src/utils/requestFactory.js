import { 
  GameCreateBuilder, 
  AuditFilterBuilder,
  UserCreateBuilder,
  UserUpdateBuilder,
  PartyCreateBuilder,
  PartyUpdateBuilder
} from './builders.js';

const RequestFactory = {
  // =========================================================================
  // USUÁRIOS
  // =========================================================================
  
  /**
   * Retorna um construtor limpo para criação de usuários
   * @returns {UserCreateBuilder}
   */
  newUserCreate: () => new UserCreateBuilder(),

  /**
   * Retorna um construtor limpo para atualização de perfil
   * @returns {UserUpdateBuilder}
   */
  newUserUpdate: () => new UserUpdateBuilder(),

  /**
   * Payload direto para alteração de senha
   */
  newUserChangePassword: (currentPassword, newPassword) => ({
    current_password: String(currentPassword),
    new_password: String(newPassword)
  }),

  /**
   * Payload direto para alteração de cargo (Admin)
   */
  newUserRoleUpdate: (role) => ({
    role: String(role).toUpperCase() // Atende a tipagem do Enum UserRole do backend
  }),

  // =========================================================================
  // JOGOS
  // =========================================================================

  /**
   * Retorna um construtor limpo para criação de jogos
   * @returns {GameCreateBuilder}
   */
  newGameCreate: () => new GameCreateBuilder(),

  // =========================================================================
  // PARTIES (MÁXIMO DE JOGADORES, ETC)
  // =========================================================================

  /**
   * Retorna um construtor limpo para criação de parties
   * @returns {PartyCreateBuilder}
   */
  newPartyCreate: () => new PartyCreateBuilder(),

  /**
   * Retorna um construtor limpo para atualização de parties
   * @returns {PartyUpdateBuilder}
   */
  newPartyUpdate: () => new PartyUpdateBuilder(),

  // =========================================================================
  // MENSAGENS / CHAT
  // =========================================================================

  /**
   * Instancia direta para payloads simples (Ex: Mensagem do Chat)
   */
  newMessageCreate: (content) => {
    if (!content || String(content).trim().length === 0) {
      throw new Error("O conteúdo da mensagem não pode ser vazio.");
    }
    return { content: String(content).trim() };
  },

  // =========================================================================
  // AUDITORIA
  // =========================================================================

  /**
   * Retorna um construtor limpo para filtros de auditoria
   * @returns {AuditFilterBuilder}
   */
  newAuditFilter: () => new AuditFilterBuilder(),
};

export default RequestFactory;
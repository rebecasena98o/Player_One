// ==========================================
// BUILDER PARA CADASTRO DE JOGO (GameCreate)
// ==========================================
export class GameCreateBuilder {
  constructor() {
    this.payload = {
      name: '',
      description: null,
      minimum_age: 0,
      category: '',
      quantity: 1,
      min_players: 1,
      max_players: 4,
      min_duration_minutes: 30,
      max_duration_minutes: 60,
    };
  }

  setName(name) {
    this.payload.name = String(name).trim();
    return this;
  }

  setDescription(description) {
    this.payload.description = description ? String(description).trim() : null;
    return this;
  }

  setMinimumAge(age) {
    this.payload.minimum_age = parseInt(age, 10) || 0;
    return this;
  }

  setCategory(category) {
    this.payload.category = String(category).trim();
    return this;
  }

  setQuantity(qty) {
    this.payload.quantity = parseInt(qty, 10) || 1;
    return this;
  }

  setPlayersRange(min, max) {
    this.payload.min_players = parseInt(min, 10) || 1;
    this.payload.max_players = parseInt(max, 10) || 4;
    return this;
  }

  setDurationRange(min, max) {
    this.payload.min_duration_minutes = parseInt(min, 10) || 30;
    this.payload.max_duration_minutes = parseInt(max, 10) || 60;
    return this;
  }

  build() {
    // Validação prévia no Frontend antes de disparar o Axios
    if (!this.payload.name) throw new Error("O nome do jogo é obrigatório.");
    if (!this.payload.category) throw new Error("A categoria do jogo é obrigatória.");
    if (this.payload.min_players > this.payload.max_players) {
      throw new Error("O número mínimo de jogadores não pode ser maior que o máximo.");
    }
    return this.payload;
  }
}

// ==========================================
// BUILDER PARA FILTROS DE AUDITORIA (Audit Query Params)
// ==========================================
export class AuditFilterBuilder {
  constructor() {
    this.params = {
      skip: 0,
      limit: 100,
    };
  }

  setPagination(skip = 0, limit = 100) {
    this.params.skip = parseInt(skip, 10) || 0;
    this.params.limit = Math.min(parseInt(limit, 10) || 100, 500); // Máximo 500 baseado no seu OpenAPI
    return this;
  }

  filterByEntity(entity, entityId = null) {
    if (entity) this.params.entity = String(entity).toUpperCase();
    if (entityId) this.params.entity_id = parseInt(entityId, 10);
    return this;
  }

  filterByAction(action) {
    // Valida contra o seu Enum do OpenAPI: CREATE, UPDATE, DELETE, APPROVE, REJECT, CANCEL, LOGIN, LOGOUT
    const validActions = ["CREATE", "UPDATE", "DELETE", "APPROVE", "REJECT", "CANCEL", "LOGIN", "LOGOUT"];
    if (action && validActions.includes(action.toUpperCase())) {
      this.params.action = action.toUpperCase();
    }
    return this;
  }

  filterByUser(userId) {
    if (userId) this.params.user_id = parseInt(userId, 10);
    return this;
  }

  filterByDates(dateFrom, dateTo) {
    if (dateFrom) this.params.date_from = new Date(dateFrom).toISOString();
    if (dateTo) this.params.date_to = new Date(dateTo).toISOString();
    return this;
  }

  build() {
    return this.params;
  }
}


// ==========================================
// BUILDERS DE USUÁRIO
// ==========================================

export class UserCreateBuilder {
  constructor() {
    this.payload = {
      name: '',
      email: '',
      password: '',
      description: null,
      profile_image_url: null
    };
  }

  setName(name) {
    this.payload.name = String(name).trim();
    return this;
  }

  setEmail(email) {
    this.payload.email = String(email).trim().toLowerCase();
    return this;
  }

  setPassword(password) {
    this.payload.password = String(password);
    return this;
  }

  setDescription(description) {
    this.payload.description = description ? String(description).trim() : null;
    return this;
  }

  setProfileImageUrl(url) {
    this.payload.profile_image_url = url ? String(url).trim() : null;
    return this;
  }

  build() {
    if (!this.payload.name) throw new Error("O nome completo é obrigatório.");
    if (!this.payload.email || !this.payload.email.includes('@')) throw new Error("E-mail inválido.");
    if (!this.payload.password || this.payload.password.length < 6) {
      throw new Error("A senha é obrigatória e deve conter no mínimo 6 caracteres.");
    }
    return this.payload;
  }
}

export class UserUpdateBuilder {
  constructor() {
    this.payload = {};
  }

  setName(name) {
    if (name) this.payload.name = String(name).trim();
    return this;
  }

  setDescription(description) {
    this.payload.description = description ? String(description).trim() : null;
    return this;
  }

  setProfileImageUrl(url) {
    this.payload.profile_image_url = url ? String(url).trim() : null;
    return this;
  }

  setActive(active) {
    if (typeof active === 'boolean') this.payload.active = active;
    return this;
  }

  build() {
    // Retorna apenas os campos modificados para o PATCH do endpoint /api/v1/users/me
    return this.payload;
  }
}


// ==========================================
// BUILDERS DE PARTY (Sessões de Jogos)
// ==========================================

export class PartyCreateBuilder {
  constructor() {
    this.payload = {
      game_id: 0,
      description: '',
      date: '', // formato esperado pelo backend: YYYY-MM-DD
      time: '', // formato esperado pelo backend: HH:MM ou HH:MM:SS
      location: '',
      max_players: 2
    };
  }

  setGameId(gameId) {
    this.payload.game_id = parseInt(gameId, 10) || 0;
    return this;
  }

  setDescription(description) {
    this.payload.description = String(description).trim();
    return this;
  }

  /**
   * Define a data. Aceita objetos Date ou strings no formato YYYY-MM-DD
   */
  setDate(date) {
    if (date instanceof Date) {
      this.payload.date = date.toISOString().split('T')[0];
    } else {
      this.payload.date = String(date); // Espera-se "YYYY-MM-DD" vindo do input type="date"
    }
    return this;
  }

  /**
   * Define o horário. Aceita strings no formato "HH:MM"
   */
  setTime(time) {
    this.payload.time = String(time); // Espera-se "HH:MM" vindo do input type="time"
    return this;
  }

  setLocation(location) {
    this.payload.location = String(location).trim();
    return this;
  }

  setMaxPlayers(maxPlayers) {
    this.payload.max_players = parseInt(maxPlayers, 10) || 2;
    return this;
  }

  build() {
    if (this.payload.game_id <= 0) throw new Error("Um jogo válido deve ser associado à party.");
    if (!this.payload.description) throw new Error("A descrição da party é obrigatória.");
    if (!this.payload.date) throw new Error("A data da party é obrigatória.");
    if (!this.payload.time) throw new Error("O horário da party é obrigatório.");
    if (!this.payload.location) throw new Error("O local da party é obrigatório.");
    if (this.payload.max_players <= 0) throw new Error("O número máximo de jogadores deve ser maior que zero.");
    
    return this.payload;
  }
}

export class PartyUpdateBuilder {
  constructor() {
    this.payload = {};
  }

  setDescription(description) {
    if (description) this.payload.description = String(description).trim();
    return this;
  }

  setDate(date) {
    if (date) {
      this.payload.date = date instanceof Date ? date.toISOString().split('T')[0] : String(date);
    }
    return this;
  }

  setTime(time) {
    if (time) this.payload.time = String(time);
    return this;
  }

  setLocation(location) {
    if (location) this.payload.location = String(location).trim();
    return this;
  }

  setMaxPlayers(maxPlayers) {
    if (maxPlayers) {
      const parsed = parseInt(maxPlayers, 10);
      if (parsed > 0) this.payload.max_players = parsed;
    }
    return this;
  }

  build() {
    return this.payload;
  }
}
const { registerUser, loginUser, resetUsers, validatePassword } = require('./userService');

// Resetando a lista de usuários antes de cada teste
beforeEach(() => {
  resetUsers(); 
});

describe('Validação de Senha', () => {
  test('deve validar senhas com 8 ou mais caracteres e pelo menos um número', () => {
    expect(validatePassword('password123')).toBe(true);
    expect(validatePassword('short')).toBe(false);
    expect(validatePassword('password')).toBe(false);
    expect(validatePassword('12345678')).toBe(true);
  });
});

describe('Cadastro de Usuário', () => {
    test('deve cadastrar um usuário com dados válidos', () => {
        const user = { email: 'test@example.com', password: 'password123' };
        const result = registerUser(user);
        expect(result).toEqual(expect.objectContaining({
          email: 'test@example.com',
          password: 'password123',
        }));
    });
      
    test('deve rejeitar email duplicado', () => {
        const user1 = { email: 'test@example.com', password: 'password123' };
        const user2 = { email: 'test@example.com', password: 'newpassword456' };
        registerUser(user1);
        expect(() => registerUser(user2)).toThrow('Email já cadastrado'); 
    });

    test('deve rejeitar senha curta', () => {
        const user = { email: 'test@example.com', password: 'short' };
        expect(() => registerUser(user)).toThrow('Senha inválida'); 
    });

    test('deve aceitar senha válida', () => {
        const user = { email: 'test@example.com', password: 'password123' };
        const result = registerUser(user);
        expect(result).toEqual(expect.objectContaining({
            email: 'test@example.com',
            password: 'password123',
        }));
    });
});

describe('Login de Usuário', () => {
    test('deve fazer login com credenciais corretas', () => {
        const user = { email: 'test@example.com', password: 'password123' };
        registerUser(user); 
        const loginResult = loginUser({ email: 'test@example.com', password: 'password123' });
        expect(loginResult).toEqual({ email: 'test@example.com', name: undefined });
    });

    test('deve falhar ao fazer login com senha incorreta', () => {
        const user = { email: 'test@example.com', password: 'password123' };
        registerUser(user);
        expect(() => loginUser({ email: 'test@example.com', password: 'wrongpassword' })).toThrow('Senha incorreta');
    });

    test('deve falhar ao fazer login com email não registrado', () => {
        expect(() => loginUser({ email: 'nonexistent@example.com', password: 'password123' })).toThrow('Email não registrado');
    });
});

describe('Testes de Performance', () => {
    test('deve responder a login rapidamente', async () => {
        const user = { email: 'test@example.com', password: 'password123' };
        registerUser(user);
        const start = performance.now(); 
        const loginResult = loginUser({ email: 'test@example.com', password: 'password123' });
        const end = performance.now(); 
        expect(end - start).toBeLessThan(1000); // Verifica se o tempo de resposta foi inferior a 1000ms
    });   
});

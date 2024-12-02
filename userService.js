let users = []; 

function resetUsers() {
  users = []; 
}

  // Função que valida a senha
    function validatePassword(password) {
        const regex = /^(?=.*\d).{8,}$/;
        return regex.test(password); 
    } 
  
    function registerUser({ email, password }) {
        const userExists = users.some(u => u.email === email);
        if (userExists) {
        throw new Error('Email já cadastrado');
        }

    // Validação da senha
    if (!validatePassword(password)) {
      throw new Error('Senha inválida');  
    }
  
    // Cadastro do usuário
    const newUser = { email, password };
    users.push(newUser);
    return newUser;
    }
  
    function loginUser({ email, password }) {
        const user = users.find(u => u.email === email);
        if (!user) {
        throw new Error('Email não registrado');
        }
  
        if (user.password !== password) {
        throw new Error('Senha incorreta');
        }
  
        return { email: user.email, name: user.name };
    }

module.exports = { registerUser, loginUser, resetUsers, validatePassword };

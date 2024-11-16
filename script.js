document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const createAccountBtn = document.getElementById('create-account-btn');
    const createAccountPopup = document.getElementById('create-account-popup');
    const closePopupBtn = document.getElementById('close-popup');
    const createAccountForm = document.getElementById('create-account-form');
    const newUsernameInput = document.getElementById('new-username');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const createErrorMessage = document.getElementById('create-error-message');
    const backToLogin = document.getElementById('back-to-login');
    const loginContainer = document.querySelector('.login-container');

    // Função para recuperar os usuários do LocalStorage
    function getUserFromStorage() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    // Função para salvar os usuários no LocalStorage
    function saveUserToStorage(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Função de login
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const users = getUserFromStorage();
        const user = users.find(u => u.username === usernameInput.value);

        if (!user || user.password !== passwordInput.value) {
            errorMessage.textContent = 'Usuário ou senha incorretos.';
            errorMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'none';
            alert('Login bem-sucedido!');
            localStorage.setItem('loggedInUser', usernameInput.value);  // Armazenar o usuário logado
            window.location.href = 'app.html'; // Redireciona para a página de tarefas
        }
    });

    // Exibir o popup para criar uma conta
    createAccountBtn.addEventListener('click', () => {
        createAccountPopup.style.display = 'flex';
        loginContainer.style.display = 'none';
    });

    // Fechar o popup
    closePopupBtn.addEventListener('click', () => {
        createAccountPopup.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    // Criar novo usuário
    createAccountForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const users = getUserFromStorage();
        const existingUser = users.find(u => u.username === newUsernameInput.value);

        if (existingUser) {
            createErrorMessage.textContent = 'Nome de usuário já existe.';
            createErrorMessage.style.display = 'block';
            return;
        }

        if (newPasswordInput.value !== confirmPasswordInput.value) {
            createErrorMessage.textContent = 'As senhas não coincidem.';
            createErrorMessage.style.display = 'block';
            return;
        }

        const newUser = {
            username: newUsernameInput.value,
            password: newPasswordInput.value
        };

        users.push(newUser);
        saveUserToStorage(users);
        alert('Conta criada com sucesso!');
        createAccountPopup.style.display = 'none';
        loginContainer.style.display = 'block';  // Volta para o login após criar a conta
    });

    // Função para voltar ao login sem criar a conta
    backToLogin.addEventListener('click', () => {
        createAccountPopup.style.display = 'none';
        loginContainer.style.display = 'block';
    });

});

// Verificação na página de tarefas (app.html) para garantir que o usuário está logado
if (window.location.pathname === '/app.html' && !localStorage.getItem('loggedInUser')) {
    // Se não estiver logado, redireciona para a página de login
    window.location.href = 'index.html';
}

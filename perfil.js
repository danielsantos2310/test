document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('save-profile-btn');
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profileInfo = document.getElementById('profile-info');
    
    // Carregar dados do localStorage
    const loadProfile = () => {
        const savedName = localStorage.getItem('userName');
        const savedEmail = localStorage.getItem('userEmail');
        
        if (savedName && savedEmail) {
            profileName.textContent = `Nome: ${savedName}`;
            profileEmail.textContent = `Email: ${savedEmail}`;
            profileInfo.style.display = 'block'; // Exibe a área de perfil
        }
    };

    // Salvar os dados no localStorage
    saveButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        
        if (name && email) {
            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);

            // Atualizar a exibição no perfil
            loadProfile();
        } else {
            alert("Por favor, preencha nome e email.");
        }
    });

    // Carregar os dados ao abrir a página
    loadProfile();
    
    // Logout - Remove os dados do localStorage e redireciona para o index.html
    document.getElementById('logout-btn').addEventListener('click', () => {
        // Não remover os dados do localStorage
        // localStorage.removeItem('userName');
        // localStorage.removeItem('userEmail');
        window.location.href = 'index.html'; // Redireciona para a página inicial (index.html)
    });
});

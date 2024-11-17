document.addEventListener('DOMContentLoaded', () => {
    const destinoInput = document.getElementById('destino-input');
    const addDestinoButton = document.getElementById('add-destino');
    const destinoList = document.getElementById('destino-list');
    const logoutButton = document.getElementById('logout-btn');

    // Função para salvar os destinos no localStorage
    function saveDestinos(destinos) {
        localStorage.setItem('destinos', JSON.stringify(destinos));
    }

    // Função para carregar os destinos do localStorage
    function loadDestinos() {
        const destinos = JSON.parse(localStorage.getItem('destinos')) || [];
        destinos.forEach(destino => {
            addDestinoToList(destino);
        });
    }

    // Função para adicionar um novo destino
    function addDestinoToList(destinoText) {
        const destinoItem = document.createElement('li');
        const destinoTextNode = document.createElement('span');
        destinoTextNode.textContent = destinoText;

        const removeButton = document.createElement('button');
        removeButton.textContent = '🗑️';
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', () => {
            destinoItem.remove();
            updateDestinoStatus(); // Atualiza o status após remover o destino
        });

        destinoItem.appendChild(destinoTextNode);
        destinoItem.appendChild(removeButton);

        destinoList.appendChild(destinoItem);
    }

    // Função para atualizar o status dos destinos
    function updateDestinoStatus() {
        const destinos = [];
        document.querySelectorAll('#destino-list li').forEach(destinoItem => {
            const destinoText = destinoItem.querySelector('span').textContent;
            destinos.push(destinoText);
        });
        saveDestinos(destinos);
    }

    // Função para fazer logout
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser'); // Remover usuário logado
        window.location.href = 'index.html'; // Redirecionar para o login
    });

    // Carregar destinos ao iniciar a página
    loadDestinos();

    // Adicionar novo destino
    addDestinoButton.addEventListener('click', () => {
        const destinoText = destinoInput.value.trim();
        if (destinoText) {
            addDestinoToList(destinoText);
            destinoInput.value = ''; // Limpar campo de entrada
            updateDestinoStatus();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const logoutButton = document.getElementById('logout-btn');

    // Função para salvar as tarefas no localStorage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Função para carregar as tarefas do localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToList(task.text, task.completed);
        });
    }

    // Função para adicionar uma nova tarefa
    function addTaskToList(taskText, completed = false) {
        const taskItem = document.createElement('li');
        taskItem.classList.toggle('completed', completed);

        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.checked = completed;

        taskCheckbox.addEventListener('change', () => {
            taskItem.classList.toggle('completed', taskCheckbox.checked);
            updateTaskStatus();
        });

        const taskTextNode = document.createElement('span');
        taskTextNode.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = '🗑️';
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', () => {
            taskItem.remove();
            updateTaskStatus(); // Atualiza o status após remover a tarefa
        });

        taskItem.appendChild(taskCheckbox);
        taskItem.appendChild(taskTextNode);
        taskItem.appendChild(removeButton);

        taskList.appendChild(taskItem);
    }

    // Função para atualizar o status das tarefas
    function updateTaskStatus() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(taskItem => {
            const taskText = taskItem.querySelector('span').textContent;
            const completed = taskItem.classList.contains('completed');
            tasks.push({ text: taskText, completed });
        });
        saveTasks(tasks);
    }

    // Função para fazer logout
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser'); // Remover usuário logado
        window.location.href = 'index.html'; // Redirecionar para o login
    });

    // Carregar tarefas ao iniciar a página
    loadTasks();

    // Adicionar nova tarefa
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToList(taskText);
            taskInput.value = ''; // Limpar o campo de entrada
            updateTaskStatus();  // Atualizar o status das tarefas
        }
    });
});

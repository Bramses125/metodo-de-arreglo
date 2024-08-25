
const tasks = [
    { id: 1, description: 'Comprar pan', completed: false },
    { id: 2, description: 'Hacer la compra', completed: false },
    { id: 3, description: 'Llamar al doctor', completed: false }
];

// Referencias a elementos del DOM
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const totalTasksElem = document.getElementById('total-tasks');
const completedTasksElem = document.getElementById('completed-tasks');

// Función para renderizar tareas
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.innerHTML = `
            ${task.description}
            <div class="task-actions">
                <button class="button" onclick="toggleTask(${task.id})">${task.completed ? 'No realizado' : 'Realizado'}</button>
                <button class="button1" onclick="deleteTask(${task.id})">Eliminar</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
    updateSummary();
}

// Función para agregar tarea
function addTask() {
    const description = taskInput.value.trim();
    if (description) {
        tasks.push({
            id: tasks.length ? Math.max(tasks.map(task => task.id)) + 1 : 1,
            description,
            completed: false
        });
        taskInput.value = '';
        renderTasks();
    }
}

// Función para eliminar tarea
function deleteTask(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
        renderTasks();
    }
}

// Función para marcar tarea como completada
function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

// Función para actualizar el resumen
function updateSummary() {
    totalTasksElem.textContent = tasks.length;
    completedTasksElem.textContent = tasks.filter(task => task.completed).length;
}

// Inicializar la lista con tareas iniciales
renderTasks();

// Agregar tarea al hacer click en el botón
addTaskBtn.addEventListener('click', addTask);

// También permitir agregar tarea con Enter
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
function addTask() {
  const input = document.getElementById('taskInput');
  const task = input.value.trim();
  const list = document.getElementById('taskList');

  if (task) {
    const li = document.createElement('li');
    li.textContent = task;
    list.appendChild(li);
    input.value = '';
  }
}

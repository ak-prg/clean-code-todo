const newTaskInput = document.getElementById('task-new');
const addButton = document.getElementById('add-button');
const incompleteTaskList = document.getElementById('incomplete-tasks');
const completedTaskList = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskContent) {
  const listItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  // Assign as text, not innerHTML: user input must never be parsed as HTML
  label.innerText = taskContent;
  label.className = 'task-label';

  checkBox.type = 'checkbox';

  editInput.type = 'text';
  editInput.className = 'edit-task-input';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = function () {
  if (!newTaskInput.value.trim()) return;
  const listItem = createNewTaskElement(newTaskInput.value);

  incompleteTaskList.appendChild(listItem);
  addListeners(listItem);

  newTaskInput.value = '';
};

const editTask = function () {
  const listItem = this.closest('li');
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const isInEditMode = listItem.classList.contains('edit-mode');

  if (isInEditMode) {
    label.innerText = editInput.value;
    this.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    this.innerText = 'Save';
  }

  listItem.classList.toggle('edit-mode');
};

const deleteTask = function () {
  const listItem = this.closest('li');
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
};

const toggleTaskStatus = function () {
  const listItem = this.closest('li');

  if (this.checked) completedTaskList.appendChild(listItem);
  else incompleteTaskList.appendChild(listItem);
};

const addListeners = function (listItem) {
  const checkBox = listItem.querySelector('input[type=checkbox]');
  const editButton = listItem.querySelector('button.edit');
  const deleteButton = listItem.querySelector('button.delete');

  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  checkBox.addEventListener('change', toggleTaskStatus);
};

addButton.addEventListener('click', addTask);

[...incompleteTaskList.children, ...completedTaskList.children].forEach(
  addListeners
);

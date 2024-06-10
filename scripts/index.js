document.addEventListener("DOMContentLoaded", () => {
  const todoTitleInput = document.getElementById("todo-title");
  const todoPrioritySelect = document.getElementById("todo-priority");
  const addTodoButton = document.getElementById("add-todo");
  const todoTableBody = document.getElementById("todo-table-body");

  const loadTodos = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todoTableBody.innerHTML = "";
    todos.forEach((todo, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${todo.title}</td>
                <td class="${todo.priority}-priority">${todo.priority}</td>
                <td><button class="toggle-status">${todo.status}</button></td>
                <td><button class="archive-todo">Archive</button></td>
            `;
      row
        .querySelector(".toggle-status")
        .addEventListener("click", () => toggleStatus(index));
      row
        .querySelector(".archive-todo")
        .addEventListener("click", () => archiveTodo(index));
      todoTableBody.appendChild(row);
    });
  };

  const addTodo = () => {
    const title = todoTitleInput.value.trim();
    const priority = todoPrioritySelect.value;
    if (!title) {
      alert("Todo cannot be empty!");
      return;
    }
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push({ title, priority, status: "Pending🔃" });
    localStorage.setItem("todos", JSON.stringify(todos));
    loadTodos();
    todoTitleInput.value = "";
  };

  const toggleStatus = (index) => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos[index].status =
      todos[index].status === "Pending🔃" ? "Completed✅" : "Pending🔃";
    localStorage.setItem("todos", JSON.stringify(todos));
    loadTodos();
  };

  const archiveTodo = (index) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    const archive = JSON.parse(localStorage.getItem("archive")) || [];
    const [archivedTodo] = todos.splice(index, 1);
    archive.push(archivedTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("archive", JSON.stringify(archive));
    loadTodos();
  };

  addTodoButton.addEventListener("click", addTodo);
  loadTodos();
});

document.addEventListener("DOMContentLoaded", () => {
  const filterPrioritySelect = document.getElementById("filter-priority");
  const filterStatusSelect = document.getElementById("filter-status");
  const archiveTableBody = document.getElementById("archive-table-body");

  const loadArchivedTodos = () => {
    const archive = JSON.parse(localStorage.getItem("archive")) || [];
    archiveTableBody.innerHTML = "";
    archive.forEach((todo, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${todo.title}</td>
                <td class="${todo.priority}-priority">${todo.priority}</td>
                <td>${todo.status}</td>
                <td><button class="restore-todo">Restore</button></td>
                <td><button class="delete-todo">Delete</button></td>
            `;
      row
        .querySelector(".restore-todo")
        .addEventListener("click", () => restoreArchived(index));
      row
        .querySelector(".delete-todo")
        .addEventListener("click", () => deleteArchived(index));
      archiveTableBody.appendChild(row);
    });
  };

  const filterTodos = () => {
    const priority = filterPrioritySelect.value;
    const status = filterStatusSelect.value;
    const archive = JSON.parse(localStorage.getItem("archive")) || [];
    archiveTableBody.innerHTML = "";

    archive
      .filter(
        (todo) =>
          (priority === "all" || todo.priority === priority) &&
          (status === "all" || todo.status === status)
      )
      .forEach((todo, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${todo.title}</td>
                <td class="${todo.priority}-priority">${todo.priority}</td>
                <td>${todo.status}</td>
                <td><button class="restore-todo">Restore</button></td>
                <td><button class="delete-todo">Delete</button></td>
            `;
        row
          .querySelector(".restore-todo")
          .addEventListener("click", () => restoreArchived(index));
        row
          .querySelector(".delete-todo")
          .addEventListener("click", () => deleteArchived(index));
        archiveTableBody.appendChild(row);
      });
  };

  const restoreArchived = (index) => {
    let archive = JSON.parse(localStorage.getItem("archive")) || [];
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const [restoredTodo] = archive.splice(index, 1);
    todos.push(restoredTodo);
    localStorage.setItem("archive", JSON.stringify(archive));
    localStorage.setItem("todos", JSON.stringify(todos));
    loadArchivedTodos();
  };

  const deleteArchived = (index) => {
    let archive = JSON.parse(localStorage.getItem("archive")) || [];
    archive.splice(index, 1);
    localStorage.setItem("archive", JSON.stringify(archive));
    loadArchivedTodos();
  };

  filterPrioritySelect.addEventListener("change", filterTodos);
  filterStatusSelect.addEventListener("change", filterTodos);

  loadArchivedTodos();
});

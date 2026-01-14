// DOM Elements
const titleInput = document.getElementById("taskTitle");
const categoryInput = document.getElementById("taskCategory");
const priorityInput = document.getElementById("taskPriority");
const dueDateInput = document.getElementById("taskDueDate");
const addBtn = document.getElementById("addTaskBtn");
const searchInput = document.getElementById("searchTask");
const filterCategory = document.getElementById("filterCategory");
const filterPriority = document.getElementById("filterPriority");
const themeToggle = document.getElementById("themeToggle");

// Add Task
addBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const category = categoryInput.value;
  const priority = priorityInput.value;
  const dueDate = dueDateInput.value;

  if (!title) return alert("Please enter a task title");

  TaskService.addTask({ title, category, priority, dueDate });
  renderTasks(TaskService.getTasks());
  renderStats(TaskService.getStats());

  // Reset inputs
  titleInput.value = "";
  categoryInput.value = "";
  priorityInput.value = "";
  dueDateInput.value = "";
});

// Filters
function applyFilters() {
  const tasks = TaskService.filterTasks({
    search: searchInput.value,
    category: filterCategory.value,
    priority: filterPriority.value
  });
  renderTasks(tasks);
  renderStats(TaskService.getStats());
}

searchInput.addEventListener("input", applyFilters);
filterCategory.addEventListener("change", applyFilters);
filterPriority.addEventListener("change", applyFilters);

// Dark Mode Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
});

// Initial render
renderTasks(TaskService.getTasks());
renderStats(TaskService.getStats());

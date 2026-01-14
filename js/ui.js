/**
 * UI Module
 * Renders tasks list, statistics, and handles dark mode readability
 */

/**
 * Helper: Create a badge element
 * @param {string} text - badge text
 * @param {string} lightBg - light mode background
 * @param {string} darkBg - dark mode background
 * @param {string} lightText - light mode text
 * @param {string} darkText - dark mode text
 * @returns HTMLElement
 */
function createBadge(text, lightBg, darkBg, lightText, darkText) {
  const badge = document.createElement("span");
  badge.textContent = text;
  badge.className = `${lightBg} ${darkBg} ${lightText} ${darkText} px-2 py-1 rounded-full`;
  return badge;
}

/**
 * Helper: Create priority badge with color based on level
 * @param {string} priority - Low | Medium | High
 * @returns HTMLElement
 */
function createPriorityBadge(priority) {
  const colors = {
    Low:    ["bg-green-200", "dark:bg-green-700", "text-green-800", "dark:text-green-200"],
    Medium: ["bg-yellow-200", "dark:bg-yellow-700", "text-yellow-800", "dark:text-yellow-200"],
    High:   ["bg-red-200", "dark:bg-red-700", "text-red-800", "dark:text-red-200"]
  };

  // Default to gray if priority is empty or invalid
  const selectedColors = colors[priority] || ["bg-gray-200", "dark:bg-gray-700", "text-gray-800", "dark:text-gray-100"];

  return createBadge(priority || "No Priority", ...selectedColors);
}


/**
 * Helper: Create category badge
 * @param {string} category
 * @returns HTMLElement
 */
function createCategoryBadge(category) {
  return createBadge(category, "bg-blue-200", "dark:bg-blue-700", "text-blue-800", "dark:text-blue-200");
}

/**
 * Render tasks list
 * @param {Array} tasks
 */
function renderTasks(tasks) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    // --- Main container for task ---
    const li = document.createElement("li");
    li.className = `
      flex justify-between items-center p-4 rounded-xl shadow hover:shadow-2xl transition cursor-pointer
      ${task.completed 
        ? 'bg-gray-300 dark:bg-gray-700 line-through text-gray-600 dark:text-gray-200' 
        : 'bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100'}
    `;

    // --- Task info ---
    const taskInfo = document.createElement("div");

    // Title
    const titleEl = document.createElement("h3");
    titleEl.textContent = task.title;
    titleEl.className = "font-semibold";

    // Meta info container (category, priority, due date)
    const metaEl = document.createElement("div");
    metaEl.className = "flex gap-2 mt-1 items-center text-xs";

    const categoryBadge = createCategoryBadge(task.category);
    const priorityBadge = createPriorityBadge(task.priority);

    // Due date
    const dueEl = document.createElement("span");
    dueEl.textContent = task.dueDate ? `Due: ${task.dueDate}` : "";
    dueEl.className = "text-gray-500 dark:text-gray-300";

    metaEl.append(categoryBadge, priorityBadge, dueEl);
    taskInfo.append(titleEl, metaEl);

    // --- Actions (checkbox + delete) ---
    const actions = document.createElement("div");
    actions.className = "flex items-center gap-2";

    // Complete checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.className = "w-5 h-5";
    checkbox.addEventListener("click", e => {
      e.stopPropagation();
      TaskService.toggleTask(task.id);
      renderTasks(TaskService.getTasks());
      renderStats(TaskService.getStats());
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "text-red-500 hover:text-red-700 dark:hover:text-red-400";
    deleteBtn.addEventListener("click", e => {
      e.stopPropagation();
      TaskService.deleteTask(task.id);
      renderTasks(TaskService.getTasks());
      renderStats(TaskService.getStats());
    });

    actions.append(checkbox, deleteBtn);

    // --- Assemble li ---
    li.append(taskInfo, actions);
    taskList.appendChild(li);
  });
}

/**
 * Render task statistics
 * @param {Object} stats - { total, completed, progress }
 */
function renderStats(stats) {
  document.getElementById("totalTasks").textContent = stats.total;
  document.getElementById("completedTasks").textContent = stats.completed;
  document.getElementById("tasksProgress").style.width = `${stats.progress}%`;
}

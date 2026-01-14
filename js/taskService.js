const TaskService = (() => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function addTask({ title, category, priority, dueDate }) {
    const id = Date.now();
    tasks.push({ id, title, category, priority, dueDate, completed: false });
    saveTasks();
  }

  function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
  }

  function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) task.completed = !task.completed;
    saveTasks();
  }

  function getTasks() {
    return tasks;
  }

  function filterTasks({ search = "", category = "", priority = "" }) {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category ? task.category === category : true;
      const matchesPriority = priority ? task.priority === priority : true;
      return matchesSearch && matchesCategory && matchesPriority;
    });
  }

  function getStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const progress = total ? Math.round((completed / total) * 100) : 0;
    return { total, completed, progress };
  }

  return { addTask, deleteTask, toggleTask, getTasks, filterTasks, getStats };
})();

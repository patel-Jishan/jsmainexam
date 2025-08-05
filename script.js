
var tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function displayTasks() {
  var list = document.getElementById("taskList");
  list.innerHTML = "";

  var filter = document.getElementById("filterPriority").value;
  var searchText = document.getElementById("searchInput").value.toLowerCase();

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];

    if (filter !== "all" && task.priority !== filter) {
      continue;
    }

    
    var inTitle = task.title.toLowerCase().indexOf(searchText) !== -1;
    var inDesc = task.description.toLowerCase().indexOf(searchText) !== -1;

    if (!inTitle && !inDesc) {
      continue;
    }

    
    var div = document.createElement("div");
    div.className = "task " + task.priority;

    div.innerHTML =
      "<strong>" + task.title + "</strong> - " + task.dueDate + "<br>" +
      "<small>" + task.description + "</small><br>" +
      "<div class='actions'>" +
        "<button onclick=\"editTask('" + task.id + "')\">Edit</button> " +
        "<button onclick=\"deleteTask('" + task.id + "')\">Delete</button>" +
      "</div>";

    list.appendChild(div);
  }
}


function addTask(event) {
  event.preventDefault();

  var id = document.getElementById("taskId").value;
  if (id === "") {
    id = Date.now().toString();
  }

  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  var dueDate = document.getElementById("dueDate").value;
  var priority = document.getElementById("priority").value;

  if (title === "" || dueDate === "") {
    alert("Please enter Title and Due Date");
    return;
  }

  var task = {
    id: id,
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority
  };

  var found = false;

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i] = task;
      found = true;
      break;
    }
  }

  if (!found) {
    tasks.push(task);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById("taskForm").reset();
  document.getElementById("taskId").value = "";
  displayTasks();
}


function editTask(taskId) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      var task = tasks[i];
      document.getElementById("taskId").value = task.id;
      document.getElementById("title").value = task.title;
      document.getElementById("description").value = task.description;
      document.getElementById("dueDate").value = task.dueDate;
      document.getElementById("priority").value = task.priority;
      break;
    }
  }
}


function deleteTask(taskId) {
  var newTasks = [];

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== taskId) {
      newTasks.push(tasks[i]);
    }
  }

  tasks = newTasks;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}


document.getElementById("taskForm").addEventListener("submit", addTask);
document.getElementById("filterPriority").addEventListener("change", displayTasks);
document.getElementById("searchInput").addEventListener("input", displayTasks);


displayTasks();

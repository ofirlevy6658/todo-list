class Task {
	constructor(id, name, description) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.isCompleted = false;
	}
}

class TaskList {
	constructor() {
		this.taskArr = [];
	}
	addItem(task) {
		const exist = this.taskArr.find((el) => el.id == task.id);
		if (exist) return false;
		this.taskArr.push(task);
		return true;
	}
	toggle(id) {
		this.taskArr.forEach((el) => {
			if (el.id == id) el.isCompleted = !el.isCompleted;
		});
	}
	deleteItem(id) {
		this.taskArr.forEach((el, index) => {
			if (el.id == id) {
				this.taskArr.splice(index, 1);
				return true;
			}
			return false;
		});
	}
}

//
const taskList = new TaskList();

document.querySelector(".task-btn").addEventListener("click", newTaskForm);
document.querySelector("#submit").addEventListener("click", getUserTask);
document.querySelector(".show-btn").addEventListener("click", displayTasks);
document.querySelectorAll(".check-box").forEach((el) => {
	el.addEventListener("click", checkBox);
});

function newTaskForm() {
	document.querySelector(".task-list").classList.add("hide");
	document.querySelector(".new-task").classList.remove("hide");
}
function getUserTask() {
	document.querySelector(".new-task").classList.add("hide");
	const data = document.querySelectorAll(".new-task input");
	addTask(data[0].value, data[1].value);
	data[0].value = "";
	data[1].value = "";
}
function addTask(name, discrp) {
	const task = new Task(generateId(), name, discrp);
	taskList.addItem(task);
	const showTaskDiv = document.querySelector(".task-list");
	const index = taskList.taskArr.length - 1;
	const taskStr = `<div data-id="${taskList.taskArr[index].id}">
                    <h3>${taskList.taskArr[index].name}</h3>
                    <p>${taskList.taskArr[index].description} <input type="checkbox" class="check-box" data-id="${taskList.taskArr[index].id}" ></p>
                    <button class="del-btn">Delete</button>
                    </div>`;
	const taskEl = document.createElement("div");
	taskEl.innerHTML = taskStr;
	showTaskDiv.appendChild(taskEl);
}

function generateId() {
	return Math.floor(Math.random() * 8999) + 1001;
}

function displayTasks() {
	document.querySelector(".new-task").classList.add("hide");
	const showTaskDiv = document.querySelector(".task-list");
	showTaskDiv.classList.remove("hide");
	document.querySelectorAll(".del-btn").forEach((el) => {
		el.addEventListener("click", delItem);
	});
}
function checkBox(e) {
	taskList.toggle(e.target.getAttribute("data-id"));
}

function delItem(e) {
	taskList.deleteItem(e.target.parentNode.getAttribute("data-id"));

	e.target.parentNode.remove();
}

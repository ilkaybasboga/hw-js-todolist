const todoInput = document.getElementById("todo-input");
const addBtn = document.querySelector(".add");
const todoUl = document.querySelector("#todo-ul");
const todos = document.querySelector(".todos");
const clear = document.querySelector(".clear");
const completed=document.querySelector(".completed");

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

window.addEventListener("load", () => {
  getTodoListFromLocalStorage();
});

const getTodoListFromLocalStorage = () => {
  todoList.forEach((todo) => {
    creatTodo(todo);
  });
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (todoInput.value.trim() === "") {
    alert("‼️Pleas, enter new todo text!⛔");
    return;
  }
  const newTodo = {
    id: new Date().getTime(), //uniq id oluşturma
    completed: false, //status
    text: todoInput.value, // userinput
  };
  creatTodo(newTodo);

  todoList.push(newTodo);
  //Stringfy unutma
  localStorage.setItem("todoList", JSON.stringify(todoList));
  e.target.closest("form").reset();
});

const creatTodo = (newTodo) => {
  const { id, completed, text } = newTodo;

  const li = document.createElement("li");
  li.setAttribute("id", id);

  completed ? li.classList.add("checked") : "";

  const icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-check");
  li.append(icon);

  const p = document.createElement("p");
  p.innerText = text;
  li.appendChild(p);

  const removeIcon = document.createElement("i");
  removeIcon.setAttribute("class", "fas fa-trash");
  li.append(removeIcon);

  todoUl.prepend(li);
};

todoUl.addEventListener("click",(e)=>{
  const idAttr=e.target.closest("li").getAttribute("id")
if(e.target.classList.contains("fa-check")){
e.target.parentElement.classList.toggle("checked");
todoList.map((todo)=>{
  if(todo.id==idAttr){
    todo.completed=!todo.completed
  }
  localStorage.setItem("todoList",JSON.stringify(todoList))
  showAlert("success", "successfully completed");

})
}else if(e.target.classList.contains("fa-trash")){
  e.target.parentElement.remove();
  todoList=todoList.filter((todo)=> todo.id != idAttr);
  localStorage.setItem("todoList",JSON.stringify(todoList));
  showAlert("success", "successfully deleted");
}

})

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;

  completed.appendChild(alert);

  setTimeout(function () {
    alert.remove();
  }, 1000);
}
const container = document.querySelector('.container');
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('#inputTodo');
const todoAddButton = document.querySelector('#addTodoButton');
const todoLists = document.querySelector('#lists');
const messageElement = document.querySelector('#message');



//show mwssage .

const showMessage = (text,status) =>{
    messageElement.textContent= text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(() =>{
        messageElement.textContent= '';
        messageElement.classList.remove(`bg-${status}`);


    },1000)


}



                         //create Todo./////////////

const createTodo= (todoId,todoValue) =>{
    const todoElement = document.createElement('li');

    todoElement.id = todoId;
    todoElement.classList.add('li-style');
    todoElement.innerHTML = `<span> ${todoValue}</span> 
    <span> <button class='btn' id='deleteButton'><i class="fa-solid fa-trash"></i> </button> </span>`;
    todoLists.appendChild(todoElement);

    const deleteButton = todoElement.querySelector('#deleteButton');
    deleteButton.addEventListener('click',deleteTodo);


};

                        // deleteTodo function ..

const deleteTodo = (event) => {
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
    todoLists.removeChild(selectedTodo);
    showMessage('Todo is deleted','danger');

 
    let todos = getTodosLocalStorage();
    todos=todos.filter((todo) => todo.todoId !== selectedTodo.id);
    localStorage.setItem('mytodos',JSON.stringify(todos));

};

                        //getTodosLocalStorage function created.

const getTodosLocalStorage = () =>{
    return localStorage.getItem('mytodos') ? JSON.parse(localStorage.getItem('mytodos')) : [];
}



                        //add todo.////////////////////

const addTodo = (event) =>{
    event.preventDefault();
    const todoValue = todoInput.value;

                        // console.log(todoInput.value);////////////


                       // unique id ///////////

   const  todoId = Date.now().toString();

                    //adding value to local storage...////////

   const todos = getTodosLocalStorage();
   todos.push({todoId,todoValue});
   localStorage.setItem('mytodos',JSON.stringify(todos));
   todoInput.value = '';


                       //    console.log(todoId);
   createTodo(todoId,todoValue);
   showMessage('todo is successfully add', 'success');
};

const loadTodos = () => {
    const todos =getTodosLocalStorage();
    todos.map((todo) => createTodo(todo.todoId,todo.todoValue))
};


                    //adding listener//////////

todoForm.addEventListener('submit',addTodo);
window.addEventListener('DOMContentLoaded',loadTodos);

   

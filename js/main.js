(function () {

    let todos = [];

    const bodyDay = document.querySelector('.body__day');
    const bodyDate = document.querySelector('.body__date');
    const todoAddBtn = document.querySelector('.todo__btn');
    const todoInput = document.querySelector('.todo__input');
    const todoListPending = document.querySelector('.todo__list--pending');

    const dayNames = [
        'sunday',
        'monday',
        'tuesday',
        'wensday',
        'thursday',
        'friday',
        'saturday'
    ];




    const localDb = {
        setItem(key, value) {
            value = JSON.stringify(value);
            localStorage.setItem(key, value);
        },
        getItem(key) {
            const value = localStorage.getItem(key);
            if (!value) {
                return null;
            }

            return JSON.parse(value);
        },
        removeItem(key) {
            localStorage.removeItem(key);
        }
    };

    const init = () => {
        const savedTodos = localDb.getItem('todos');
        if (savedTodos) {
            todos = savedTodos;
        }

        showDate();
        setLiseners();
        loadExistingTodos();

    };

    const loadExistingTodos = () => {
        if (todos && Array.isArray(todos)) {
            todos.forEach( todo => showTodo);
        }
    };

    const showDate = () => {
        const currentDate = new Date();
        const day = [
            currentDate.getDate(),
            currentDate.getMonth() + 1,
            currentDate.getFullYear(),
        ].map(num => num < 10 ? `0${num}` : num);
        bodyDay.textContent = dayNames[currentDate.getDay()];
        bodyDate.textContent = day.join('-');

    };

    const setLiseners = () => {
        todoAddBtn.addEventListener('click', addNewTodo);

    };

    const addNewTodo = () => {
        const value = todoInput.value;
        if (value === '') {
            alert('Please type todo!');
            return;
        }

        const todo = {
            text: value,
            done: false
        };

        todos.push(todo);

        localDb.setItem('todos', todos);

        showTodo(todo);

        todoInput.value = '';

    };

    const showTodo = todo => {
        const todoItem = document.createElement('div');
        todoListPending.appendChild(todoItem);

        todoItem.innerHTML = `
        <input type="checkbox">
        <span>${todo.text}</span>
        <button>
          <i class="fa fa-trash"></i>
        </button>                
     `;

    }



    init();
})();
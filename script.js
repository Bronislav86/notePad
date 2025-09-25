const dateInput = document.querySelector('.date-input');
const cityInput = document.querySelector('.city-input');
const weightInput = document.querySelector('.weight-input');
const addCargoButton = document.querySelector('.addCargo-button');
const cargoList = document.querySelector('.cargo-list');
let id = 0;
const taskInput = document.querySelector('.task-input');
const addTaskButton = document.querySelector('.addTask-button');
const taskList = document.querySelector('.task-list');

if (localStorage.getItem('tasks')) {
    taskList.innerHTML = localStorage.getItem('tasks');
}
if (localStorage.getItem('cargos')) {
    cargoList.innerHTML = localStorage.getItem('cargos');
}
if (localStorage.getItem('inputId')){
  id = localStorage.getItem('inputId') || 0;
}

addCargoButton.addEventListener('click', addCargoItem);
addTaskButton.addEventListener('click', addTaskAction);
taskInput.addEventListener('keydown', addTaskAction);

cargoList.addEventListener('keyup', e => {
  if(e.target.classList.contains('cargo-item_tc')){
    const liItem = e.target.closest('li')
    const input = liItem.children[3]
    input.setAttribute('value', e.target.value)
  }
  localStorage.setItem('cargos', cargoList.innerHTML);
})

cargoList.addEventListener('click', e => {
  if (e.target.classList.contains('cargo-item_done')){
    const listItem = e.target.closest('li');
    const elementsOfCargoListItems = listItem.children
    
    Array.from(elementsOfCargoListItems).forEach(el =>
      el.style.textDecoration = e.target.checked ?
      'line-through' : 'none'
      );
   }
  
  if (e.target.classList.contains('edit-cargo-button')) {
    const listItem = event.target.closest('li');
    const elementsOfCargoListItems = listItem.children
    
    for(const element of elementsOfCargoListItems){
      if(element.classList.contains('cargo-item_date')){
        const newDate = prompt('Введите новую дату', element.textContent)
        element.textContent = newDate
        };
      if(element.classList.contains('cargo-item_city')){
        const newCity = prompt('Введите новую дату', element.textContent)
        element.textContent = newCity
        };
      if(element.classList.contains('cargo-item_weight')){
        const newWeight = prompt('Введите новую дату', element.textContent)
        element.textContent = newWeight
        };
    }
  };
  
  if (e.target.classList.contains('delete-cargo-button')) {
    const listItem = event.target.closest('li');

    listItem.parentNode.removeChild(listItem);
  };
  
  localStorage.setItem('cargos', cargoList.innerHTML);
});

taskList.addEventListener('click', event => {
    if (event.target.classList.contains('delete-button')) {
        const listItem = event.target.closest('li');
      listItem.classList.add('li-out');
      setTimeout(() => {
        listItem.parentNode.removeChild(listItem);
        localStorage.setItem('tasks', taskList.innerHTML);
                 }, 500);
    }

    if (event.target.classList.contains('change-button')) {
      const listItem = event.target.closest('li');
      const listElementsOfListItem = listItem.children;
      

      for(const element of listElementsOfListItem) {
        if(element.classList.contains('task-description')) {
          const newDescription = prompt('Введите новое сожержание задачи', element.textContent);
          element.textContent = newDescription;
        }
      }
      localStorage.setItem('tasks', taskList.innerHTML);
    }
});

function addCargoItem (event) {
   const newCargo = {
          date: dateInput.value,
          city: cityInput.value,
          weight: weightInput.value,
          t_c:''
          }
     
    if (newCargo.date !== "" && newCargo.city !== "" && newCargo.weight !== "") {
        const cargoListItem = document.createElement('li');
        cargoListItem.classList.add('cargo-item');
        cargoListItem.classList.add('container');
        cargoListItem.classList.add('list-group-item');
        cargoListItem.classList.add('d-flex');
        cargoListItem.classList.add('justify-content-between');
        cargoListItem.innerHTML = `
            <div class="cargo-item_date" style="min-width: 60px">${newCargo.date}</div>
            <div class="cargo-item_city" style="width: 250px; margin-left: 20px">${newCargo.city}</div>
            <div class="cargo-item_weight" style="min-width: 30px; margin-left: 20px">${newCargo.weight} тн</div>
            <input id="${id++}" type='text' class="cargo-item_tc" style="max-width: 100px; margin-left: 20px" value="${newCargo.t_c}"/>
            <div class="contaner d-flex flex-row" style='text-align:end'>
            <div class="delete-cargo-button" style="cursor:pointer">
              <svg class="delete-cargo-button" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 14 14" width="14" height="14"><path class="delete-cargo-button" d="M13.245 1.01a.877.877 0 0 0-1.199-.304C11.931.775 9.524 2.221 7 4.637 4.476 2.221 2.069.775 1.954.707a.875.875 0 0 0-.895 1.504c.026.016 2.329 1.399 4.715 3.676-2.737 2.97-4.41 6.111-4.481 6.246a.874.874 0 1 0 1.547.817c.016-.031 1.611-3.025 4.16-5.812 2.543 2.781 4.144 5.782 4.16 5.813a.875.875 0 0 0 1.547-.817c-.071-.135-1.744-3.277-4.481-6.247 2.38-2.271 4.689-3.661 4.715-3.677a.875.875 0 0 0 .303-1.2"/></svg>
            </div>
            <div class="edit-cargo-button ms-1" style="cursor:pointer">
            <svg class="edit-cargo-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0.703 0.703" width="14" height="14"><path class="edit-cargo-button" d="M0.547 0.027 0.189 0.384A0.146 0.146 0 0 0 0.146 0.488V0.527a0.029 0.029 0 0 0 0.029 0.029h0.039a0.146 0.146 0 0 0 0.104 -0.043L0.676 0.157a0.092 0.092 0 0 0 0 -0.129 0.094 0.094 0 0 0 -0.129 0m0.088 0.088L0.277 0.472A0.088 0.088 0 0 1 0.215 0.498H0.205v-0.01a0.088 0.088 0 0 1 0.026 -0.062L0.588 0.069a0.034 0.034 0 0 1 0.046 0 0.033 0.033 0 0 1 0 0.046"/><path d="M0.674 0.263a0.029 0.029 0 0 0 -0.029 0.029V0.439h-0.117a0.088 0.088 0 0 0 -0.088 0.088v0.117H0.146a0.088 0.088 0 0 1 -0.088 -0.088V0.146a0.088 0.088 0 0 1 0.088 -0.088h0.265a0.029 0.029 0 0 0 0 -0.059H0.146a0.147 0.147 0 0 0 -0.146 0.146v0.41a0.147 0.147 0 0 0 0.146 0.146h0.332a0.146 0.146 0 0 0 0.104 -0.043l0.078 -0.078A0.146 0.146 0 0 0 0.703 0.479V0.292a0.029 0.029 0 0 0 -0.029 -0.029m-0.133 0.356a0.088 0.088 0 0 1 -0.043 0.023V0.527a0.029 0.029 0 0 1 0.029 -0.029h0.115a0.088 0.088 0 0 1 -0.023 0.043Z"/></svg>
            </div>
            <input class="cargo-item_done ms-1" type='checkbox' style="cursor:pointer"/>
            </div>
            `;
        cargoList.appendChild(cargoListItem);

        dateInput.value = '';
        cityInput.value = '';
        weightInput.value = '';

        localStorage.setItem('cargos', cargoList.innerHTML);
        localStorage.setItem('inputId', id);
    }
}

function addTaskAction (event) {
  if (event.type === "click" || (event.type === "keydown" && event.key === "Enter")) {
  const taskDescription = taskInput.value;
    if (taskDescription !== '') {
        const taskListItem = document.createElement('li');
        taskListItem.classList.add('task-item');
        taskListItem.classList.add('list-group-item');
        taskListItem.classList.add('d-flex');
        taskListItem.classList.add('justify-content-between');
        taskListItem.innerHTML = `
            <span class="task-description">${taskDescription}</span>
            <div class="btns-container align-items-center d-flex">
            <button class ="change-button btn btn-info" style="max-height: 36px">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0.844 0.844" width="18" height="18"><path d="M.656.033.227.461a.18.18 0 0 0-.051.125v.047a.035.035 0 0 0 .035.035h.047A.18.18 0 0 0 .382.617L.811.188a.11.11 0 0 0 0-.155.11.11 0 0 0-.155 0m.105.105L.333.567a.1.1 0 0 1-.075.031H.246V.586A.1.1 0 0 1 .277.511L.706.082a.04.04 0 0 1 .056 0 .04.04 0 0 1 0 .056"/><path d="M.809.316a.035.035 0 0 0-.035.035v.176H.633a.105.105 0 0 0-.105.105v.141H.176A.105.105 0 0 1 .071.668V.176A.105.105 0 0 1 .176.071h.318a.035.035 0 0 0 0-.07H.176A.176.176 0 0 0 0 .177v.492a.176.176 0 0 0 .176.176h.399A.18.18 0 0 0 .699.794L.792.701A.18.18 0 0 0 .844.575V.351A.035.035 0 0 0 .809.316M.65.743a.1.1 0 0 1-.052.028V.633A.035.035 0 0 1 .633.598h.138a.1.1 0 0 1-.028.051Z"/></svg>
            </button>
            <button class ="delete-button ms-1 btn btn-danger" style="max-height: 36px">
            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 18 18" width="18" height="18"><path d="M17.029 1.298a1.13 1.13 0 0 0-1.542-.391c-.148.088-3.242 1.948-6.488 5.054C5.754 2.855 2.659.996 2.511.908A1.125 1.125 0 0 0 1.36 2.841c.034.02 2.995 1.799 6.062 4.726-3.517 3.82-5.668 7.859-5.76 8.033a1.124 1.124 0 1 0 1.989 1.05c.021-.04 2.071-3.889 5.349-7.473 3.269 3.575 5.328 7.434 5.349 7.474a1.125 1.125 0 0 0 1.989-1.051c-.091-.174-2.243-4.213-5.761-8.032 3.06-2.92 6.029-4.707 6.062-4.727a1.125 1.125 0 0 0 .39-1.543"/></svg>
            </button>
            </div>
            `;
        taskList.appendChild(taskListItem);

        taskInput.value = '';

        localStorage.setItem('tasks', taskList.innerHTML);
    }
  }
};
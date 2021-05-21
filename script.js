// IMPORT FUNCTION, WHICH UPLOAD INITIAL PIZZAS TO LOCAL STORAGE
import { uploadInitialPizzasToLocalStorage } from './uploadInitialPizzasOnLoad.js';

//GLOBAL VARIABLES
let pizzasList = [];

// ON PAGE LOAD
window.onload = function () {
  uploadInitialPizzasToLocalStorage();

  let pizzasListFromLocalStorage = localStorage.getItem('pizzasList');
  pizzasList = JSON.parse(pizzasListFromLocalStorage);

  showPizzasInMenu();
};

//FUNCTIONS
const showPizzasInMenu = () => {
  let pizzasMenu = document.querySelector('.pizzas-menu');
  let sortValue = document.getElementById('sort').value;
  let output = '';

  sortPizzasList(sortValue);

  pizzasList.forEach((pizza) => {
    output += getPizzaNameHtml(pizza);
    output += getPizzaHeatHtml(pizza);
    output += getPizzaPriceHtml(pizza);
    output += getPizzaPhotoHtml(pizza);
    output += getPizzaToppingsHtml(pizza);
  });

  pizzasMenu.innerHTML = output;

  let deleteBtns = document.querySelectorAll('.delete-pizza-btn');
  deleteBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      deletePizza(index);
    });
  });
};

const getPizzaNameHtml = (pizza) => {
  return `<div class="pizzas-menu__item">
            <div class="pizzas-menu__item-heading">
                <div class="pizza-name-heat">
                    <h3 class="pizza-name">${pizza.name}</h3>`;
};

const getPizzaHeatHtml = (pizza) => {
  if (pizza.heat > 0) {
    return `<p class="pizza-heat">${convertHeatToIcons(pizza.heat)}</p>`;
  } else {
    return '';
  }
};

const getPizzaPriceHtml = (pizza) => {
  return `</div>
    <div class="pizza-price">
            <p>${pizza.price.toFixed(2)}</p>
     <span>&#8364;</span>
    </div>
   </div>`;
};

const getPizzaPhotoHtml = (pizza) => {
  if (pizza.photo !== '---') {
    return `
              <div class="pizzas-menu__item-photo">
                <img class="pizza-photo" src=${pizza.photo} />
              </div>
              `;
  } else {
    return `
           <div>
                <div class="pizza-default-photo">
                  <p>ITALLIAN PIZZERIA</p>
                </div>
            </div>
              `;
  }
};

const getPizzaToppingsHtml = (pizza) => {
  return `
    <div class="pizzas-menu__item-toppings">
      <p class="toppings">${pizza.toppings.join(', ')}</p>
    </div>
    <div class="delete-pizza-btn"><i class="fas fa-trash-alt"></i></div>
  </div>`;
};

const convertHeatToIcons = (heatNumberValue) => {
  switch (heatNumberValue) {
    case 1:
      return `<i class="fas fa-pepper-hot"></i>`;
    case 2:
      return `<i class="fas fa-pepper-hot"></i> <i class="fas fa-pepper-hot"></i>`;
    case 3:
      return `<i class="fas fa-pepper-hot"></i> <i class="fas fa-pepper-hot"></i> <i class="fas fa-pepper-hot"></i>`;
  }
};

const deletePizza = (btnIndex) => {
  let del = confirm('Are you sure you want to delete this pizza?');
  if (del === true) {
    pizzasList.splice(btnIndex, 1);

    localStorage.setItem('pizzasList', JSON.stringify(pizzasList));
    showPizzasInMenu();
  }
};

const sortPizzasList = (sortValue) => {
  pizzasList.sort((a, b) => {
    return a[sortValue] < b[sortValue] ? -1 : 1;
  });
};

//EVENTS

document.querySelector('.add-pizza-btn').addEventListener('click', () => {
  location.href = '/addPizza-form.html';
});

document.getElementById('sort').addEventListener('click', showPizzasInMenu);

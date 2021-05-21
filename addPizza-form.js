// IMPORT FUNCTION, WHICH UPLOAD INITIAL PIZZAS TO LOCAL STORAGE
import { uploadInitialPizzasToLocalStorage } from './uploadInitialPizzasOnLoad.js';

//GLOBAL VARIABLES
let pizzasList = [];

// ON PAGE LOAD
window.onload = function () {
  uploadInitialPizzasToLocalStorage();

  let pizzasListFromLocalStorage = localStorage.getItem('pizzasList');
  pizzasList = JSON.parse(pizzasListFromLocalStorage);
  if (pizzasList === null) return (pizzasList = []);
};

//FUNCTIONS
const addMoreToppingsInputs = () => {
  let toppingsList = document.querySelector('.pizza-toppings');
  let newToppingInput = document.createElement('input');
  newToppingInput.type = 'text';

  newToppingInput.classList.add('pizza-topping');
  newToppingInput.classList.add('form-input');
  toppingsList.appendChild(newToppingInput);
};

//--check form inputs (validations)
const checkFormInputs = () => {
  let errorMsgText = '';
  let submitErrorMsg = document.querySelector('.submit-error-msg');
  let pizzaNameInput = document.querySelector('.pizza-name');
  let pizzaPriceInput = document.querySelector('.pizza-price');
  let pizzaHeatInput = document.querySelector('.pizza-heat');
  let toppingFirstInput = document.querySelector('.topping-first');
  let toppingSecondInput = document.querySelector('.topping-second');

  let isPizzaInList = pizzasList
    .map((item) => item.name.toUpperCase())
    .indexOf(pizzaNameInput.value.toUpperCase());

  if (isPizzaInList > -1) {
    errorMsgText += 'This pizza name already exist. ';
  }

  if (
    pizzaNameInput.value === '' ||
    pizzaPriceInput.value === '' ||
    toppingFirstInput.value === '' ||
    toppingSecondInput.value === ''
  ) {
    errorMsgText +=
      'Pizza name, price and minimum two toppings are required. Please check fields. ';
  }

  if (pizzaHeatInput.value !== '') {
    if (pizzaHeatInput.value > 3 || pizzaHeatInput.value < 1) {
      errorMsgText += 'Pizza heat range 1-3.';
    }
  }

  submitErrorMsg.innerText = errorMsgText;
  return errorMsgText === '';
};

const addNewPizzaSubmit = () => {
  let newPizza = createNewPizzaObject();
  let successfullMsg = document.querySelector('.successful-submit-msg');
  pizzasList.push(newPizza);

  //setting new pizzas list at local storage
  localStorage.setItem('pizzasList', JSON.stringify(pizzasList));

  clearFormInputs();
  successfullMsg.innerText = 'Pizza added successfully!';
};

const clearFormInputs = () => {
  let formInputs = Array.from(document.querySelectorAll('.form-input'));
  formInputs.forEach((item) => {
    item.value = '';
  });
};

const createNewPizzaObject = () => {
  let newPizzaToppings = document.querySelectorAll('.pizza-topping');
  let newPizzaName = document.querySelector('.pizza-name').value;
  let newPizzaPrice = +document.querySelector('.pizza-price').value;
  let newPizzaHeat = +document.querySelector('.pizza-heat').value;
  let newPizzaPhoto = document.getElementById('pizza-photo').value;
  let toppingsArray = [];

  newPizzaToppings.forEach((item) => {
    if (item.value !== '') {
      toppingsArray.push(item.value.toLowerCase());
    }
  });

  let newPizza = {
    name:
      newPizzaName[0].toUpperCase() +
      newPizzaName.slice(1, newPizzaName.length).toLowerCase(),
    price: +newPizzaPrice.toFixed(2),
    heat: +newPizzaHeat.toFixed(),
    toppings: toppingsArray,
    photo: newPizzaPhoto,
  };

  console.log(newPizza);
  return newPizza;
};

//EVENTS
document
  .querySelector('.add-more-toppings-btn')
  .addEventListener('click', (e) => {
    e.preventDefault();
    addMoreToppingsInputs();
  });

document.querySelector('.add-pizza-btn').addEventListener('click', (e) => {
  e.preventDefault();
  if (checkFormInputs()) {
    addNewPizzaSubmit();
  }
});

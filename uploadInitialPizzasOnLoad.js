export const uploadInitialPizzasToLocalStorage = () => {
  let pizzasListFromLocalStorage = localStorage.getItem('pizzasList');
  let harcodedPizzasList = [
    {
      name: 'Bufala',
      price: 8,
      heat: 0,
      toppings: ['mozzarella', 'tomato purée', 'tomatoes', 'basil'],
      photo: './assets/pizzas-img/Bufala.png',
    },
    {
      name: 'Brooklyn',
      price: 9.5,
      heat: 1,
      toppings: ['ham', 'paprika', 'olives', 'mushrooms', 'chorizo'],
      photo: './assets/pizzas-img/Brooklyn.png',
    },
    {
      name: 'Bologneze',
      price: 10,
      heat: 3,
      toppings: ['beef', 'mozzarella', 'mushrooms', 'olives', 'jalapeno'],
      photo: './assets/pizzas-img/Bologneze.png',
    },
    {
      name: 'Saliami',
      price: 8.5,
      heat: 2,
      toppings: ['tomato sauce', 'mozzarella', 'saliami', 'mushrooms'],
      photo: './assets/pizzas-img/Saliami.png',
    },
    {
      name: 'Vegana',
      price: 8.5,
      heat: 0,
      toppings: ['tomatoes', 'paprika', 'olives', 'mushrooms', 'mozzarella'],
      photo: './assets/pizzas-img/Vegana.png',
    },
    {
      name: 'Special',
      price: 10.5,
      heat: 0,
      toppings: ['sausages', 'onions', 'cheese', 'mushrooms', 'pickles'],
      photo: './assets/pizzas-img/Special.png',
    },
  ];

  if (pizzasListFromLocalStorage === null) {
    localStorage.setItem('pizzasList', JSON.stringify(harcodedPizzasList));
  }
};

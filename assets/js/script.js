document.addEventListener("DOMContentLoaded", onLoad);
const drinksCont = document.getElementById("drinks-list");
const foodCont = document.getElementById("food-list");

let drinkNames, foodNames, specificDrink;
const cocktailName = document.getElementById("cocktail-name");
const cocktailImage = document.getElementById("cocktail-image");
const foodName = document.getElementById("food-name");
const foodImage = document.getElementById("food-image");
const drinksReviewList = document.getElementById("review-list");

function onLoad() {
  fetch("http://localhost:3000/drinks")
    .then((resp) => resp.json())
    .then((data) => {
      displayDrinks(data);
    });

  fetch("http://localhost:3000/drinks/1")
    .then((resp) => resp.json())
    .then((data) => {
      firstDisplayDrink(data);
    });

  fetch("http://localhost:3000/food")
    .then((resp) => resp.json())
    .then((data) => {
      displayFood(data);
    });

  fetch("http://localhost:3000/food/2")
    .then((resp) => resp.json())
    .then((data) => {
      firstDisplayFood(data);
    });
}

// display drinks function
function displayDrinks(drinksArr) {
  drinksCont.innerHTML = "";
  drinksArr.forEach((drinkObj) => {
    drinkNames = drinkObj.strDrink;
    drinksCont.innerHTML += `
<a href="#" class="list-group-item list-group-item-action list-group-item-dark">${drinkNames}</a>
`;
  });
specificDrink = Array.from(document.getElementsByClassName("list-group-item"));
specificDrink.forEach(drink =>{
    drink.addEventListener("click",showDrinkOnPage)
})
}
// display food function
function displayFood(foodArr) {
  foodCont.innerHTML = "";
  foodArr.forEach((foodObj) => {
    foodNames = foodObj.strCategory;
    foodCont.innerHTML += `
<a href="#" class="list-group-item list-group-item-action list-group-item-dark">${foodNames}</a>
`;
  });
}

function firstDisplayDrink(firstDrink) {
  cocktailName.textContent = firstDrink.strDrink;
  cocktailImage.src = firstDrink.strDrinkThumb;
  drinksReviewList.innerHTML = "";
  for (let i = 0; i < firstDrink.description.length; i++) {
    drinksReviewList.innerHTML += `<li>${firstDrink.description[i]}</li>`;
  }
}

function firstDisplayFood(firstFood) {
  foodName.textContent = firstFood.strCategory;
  foodImage.src = firstFood.strCategoryThumb;
}

// displaying a drink on click

function showDrinkOnPage(e){
let cocktailClicked = e.target.textContent;
fetch("http://localhost:3000/drinks")
    .then((resp) => resp.json())
    .then((data) => {
     displayCocktail(data, cocktailClicked);
    });
   
}

function displayCocktail(drinkArr,name){
let newDrink = drinkArr.find((obj)=>{
return obj.strDrink === name;
})
updatedDrink(newDrink.id)
}

function updatedDrink(id) {
    fetch(`http://localhost:3000/drinks/${id}`)
    .then((resp) => resp.json())
    .then((data) => {
      firstDisplayDrink(data);
    });
}
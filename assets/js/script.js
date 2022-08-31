document.addEventListener("DOMContentLoaded", onLoad);
const drinksCont = document.getElementById("drinks-list");
const foodCont = document.getElementById("food-list");

let drinkNames, foodNames, specificDrink;
const cocktailName = document.getElementById("cocktail-name");
const cocktailImage = document.getElementById("cocktail-image");
const foodName = document.getElementById("food-name");
const foodImage = document.getElementById("food-image");
const drinksReviewList = document.getElementById("review-list");
const drinksForm = document.getElementById("drinks-review-form");
const foodForm = document.getElementById("food-review-form");
const drinkDescription = document.getElementById("drink-review")



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
<a href="#drinks-sec" class="list-group-item list-group-item-action list-group-item-dark">${drinkNames}</a>
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
<a href="#meals" class="list-group-item list-group-item-action list-group-item-dark">${foodNames}</a>
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

drinksForm.addEventListener("submit",drinkSubmit)
foodForm.addEventListener("submit", foodSubmit)


function drinkSubmit(e){
    e.preventDefault();
    let yourReview = drinkDescription.value;
    if(yourReview !== ""){
        patchEdit(yourReview);
    }
drinksForm.reset()
}

function patchEdit(des){
   drinksReviewList.innerHTML += `<li>${des}</li>`
//    console.log(cocktailName.textContent)
fetch("http://localhost:3000/drinks")
    .then((resp) => resp.json())
    .then((data) => {
     let selectedCocktail = data.find((cocktail)=>{
return cocktail.strDrink === cocktailName.textContent
     })
     
     fetch(`http://localhost:3000/drinks/${selectedCocktail.id}`,{
        method: "PATCH",
        headers: {
            "Content-type" : "application/json",
            Accept : "application/json"
        },
        body : JSON.stringify({
            "description" : `[...${selectedCocktail.description},${des}]`
        }),
     })
     .then(resp => resp.json())
     .then(data =>{
        console.log(data)
     })
     .catch((error)=>{
        console.log(error.message)
     })
    });
}
function foodSubmit(e){
    e.preventDefault()
}

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
const foodReviewList = document.getElementById("food-review-list")
const drinkDescription = document.getElementById("drink-review");
const drinkModalLabel = document.getElementById("drinkModalLabel");
const orderFoodBtn = document.getElementById("order-food");
const foodBtnModal = document.querySelector(".foodBtnModal");
const purchaseBtn = document.getElementById("purchase-btn");
const customerFoodReview = document.getElementById("food-review")

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
  specificDrink = Array.from(
    document.getElementsByClassName("list-group-item")
  );
  specificDrink.forEach((drink) => {
    drink.addEventListener("click", showDrinkOnPage);
  });
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
  specificMeal = Array.from(document.getElementsByClassName("list-group-item"));
  specificMeal.forEach((meal) => {
    meal.addEventListener("click", showMealOnPage);
  });
}

function firstDisplayDrink(firstDrink) {
  cocktailName.textContent = firstDrink.strDrink;
  cocktailImage.src = firstDrink.strDrinkThumb;
  drinksReviewList.innerHTML = "";
  for (let i = 0; i < firstDrink.description.length; i++) {
    drinksReviewList.innerHTML += `<li>${firstDrink.description[i]} <button class = "delete-btn">Delete</button></li>`;
  }
  deleteMyParent();
  drinkModalLabel.textContent = cocktailName.textContent;
  let cost = document.getElementById("cost-amount");
  cost.textContent = firstDrink.cost;
  let idBatch = document.getElementById("id-category");
  idBatch.textContent = firstDrink.idDrink;
  document.getElementById("purchase-drink").addEventListener("click",()=>{
    purchaseMeal()   
  })
}

function firstDisplayFood(firstFood) {
  foodName.textContent = firstFood.strCategory;
  foodImage.src = firstFood.strCategoryThumb;
  foodReviewList.innerHTML = "";
    for(let i =0; i<firstFood.strCategoryDescription.length ;i++){
        foodReviewList.innerHTML += `<li>${firstFood.strCategoryDescription[i]} <button class = "delete-btn">Delete</button></li>`
    }
    deleteMyParent()
  let isDisplayed = true;
  orderFoodBtn.addEventListener("click", () => {
    if (isDisplayed) {
      foodBtnModal.style.visibility = "visible";
      isDisplayed = false;
    } else {
      foodBtnModal.style.visibility = "hidden";
      isDisplayed = true;
    }
  });
  let closeBtn = document.getElementById("closeBtn");
  closeBtn.addEventListener("click", () => {
    foodBtnModal.style.visibility = "hidden";
    isDisplayed = true;
  });
  purchaseBtn.addEventListener("click", () => {
    foodBtnModal.style.visibility = "hidden";
    isDisplayed = true;
    purchaseMeal()
  });

  document.getElementById("food-cost-amount").textContent = firstFood.cost
  document.getElementById("food-modal-name").textContent = firstFood.strCategory
}

function purchaseMeal(){
    alert("Please wait as your request is being served. Thankyou")
}
// displaying a drink on click

function showDrinkOnPage(e) {
  let cocktailClicked = e.target.textContent;
  fetch("http://localhost:3000/drinks")
    .then((resp) => resp.json())
    .then((data) => {
      displayCocktail(data, cocktailClicked);
    });
}

function displayCocktail(drinkArr, name) {
  let newDrink = drinkArr.find((obj) => {
    return obj.strDrink === name;
  });
  updatedDrink(newDrink.id);
}

function updatedDrink(id) {
  fetch(`http://localhost:3000/drinks/${id}`)
    .then((resp) => resp.json())
    .then((data) => {
      firstDisplayDrink(data);
    });
}

drinksForm.addEventListener("submit", drinkSubmit);
foodForm.addEventListener("submit", foodSubmit);

function drinkSubmit(e) {
  e.preventDefault();
  let yourReview = drinkDescription.value;
  if (yourReview !== "") {
    patchEdit(yourReview);
  }
  drinksForm.reset();
}


function patchEdit(des) {
  drinksReviewList.innerHTML += `<li>${des} <button class = "delete-btn">Delete</button></li>`;
 deleteMyParent()
  //    console.log(cocktailName.textContent)
  fetch("http://localhost:3000/drinks")
    .then((resp) => resp.json())
    .then((data) => {
      let selectedCocktail = data.find((cocktail) => {
        return cocktail.strDrink === cocktailName.textContent;
      });

      fetch(`http://localhost:3000/drinks/${selectedCocktail.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          description: [...selectedCocktail.description, des],
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
}

function showMealOnPage(e) {
  let mealClicked = e.target.textContent;
  fetch("http://localhost:3000/food")
    .then((resp) => resp.json())
    .then((data) => {
      displayMeal(data, mealClicked);
    });

  function displayMeal(dataArr, mealName) {
    let newMeal = dataArr.find((meal) => {
      return meal.strCategory == mealName;
    });

    fetch(`http://localhost:3000/food/${newMeal.id}`)
      .then((resp) => resp.json())
      .then((data) => {
        firstDisplayFood(data);
      });
  }
}
function foodSubmit(e) {
  e.preventDefault();
  let yourFoodReview = customerFoodReview.value
  postFoodReview(yourFoodReview)
  foodForm.reset();
}

function postFoodReview(myReview){
foodReviewList.innerHTML += `<li>${myReview} <button class = "delete-btn">Delete</button></li>`
deleteMyParent()
}
// slideshow animations
let slideIndex = 0;
slideShow();

function slideShow() {
  let myPics = document.getElementsByClassName("slides");
  // console.log(myPics) // returns an html collection
  for (let i = 0; i < myPics.length; i++) {
    myPics[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > myPics.length) {
    slideIndex = 1;
  }
  myPics[slideIndex - 1].style.display = "block";
  setTimeout(slideShow, 4000);
}

function deleteMyParent(){
    let newBtn = document.getElementsByClassName("delete-btn")
    for(let item of newBtn) {
      item.addEventListener("click",()=>{
        item.parentNode.remove()
      })
    }
}
let rowData = document.querySelector("#rowData");
let searchSection = document.querySelector("#searchSection");
let searchSelection =document.querySelector("#searchSelection");
let contactSelection = document.querySelector("#contactSelection");
let contactSection = document.querySelector("#contactSection");
let nameSearch =document.querySelector("#nameSearch");
let firstLetter = document.querySelector("#firstLetter");

function closeSideBar(){
    if ($("#sideBar").css("left")=="0px") {
        $("#sideBar").animate({left:`-${$(".sideItems").innerWidth()}px`},500)
    }
}
function openSideBar() {
    
        if ($("#sideBar").css("left")=="0px") {
            $("#sideBar").animate({left:`-${$(".sideItems").innerWidth()}px`},500)
        }else{
            $("#sideBar").animate({left:`0px`},500)
        };
}



$("#sideBar .sideBarHeader i").on("click", function () {
    openSideBar()
});

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loader").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})

//! search & main section =====>
searchSelection.addEventListener("click",function(){
    searchSection.classList.replace("d-none","d-flex")
    contactSection.classList.replace("d-flex","d-none")
    openSideBar()
    rowData.classList.remove("d-none")
})
nameSearch.addEventListener("keyup", function () {
    searchByName(nameSearch.value);

})
firstLetter.addEventListener("keyup", function () {
    searchByFLetter(firstLetter.value);

})
async function searchByName(data) {
    closeSideBar()
    rowData.innerHTML = ""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`)
    finalResponse = await response.json()
    if (finalResponse.meals!==null) {
        display(finalResponse.meals)
    } else {
        display=""
    }

    if (nameSearch==""||firstLetter=="") {
        display(finalResponse.meals)
    }
}
async function searchByFLetter(data) {
    closeSideBar();
    if(data==""){
        data="a"
    }
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${data}`)
    finalResponse = await response.json()

    display(finalResponse.meals)

}
function display(data) {
    let cartoona = "";

    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getDetails('${data[i].idMeal}')" class="mealDetails position-relative overflow-hidden rounded-3">
                    <img class="w-100" src="${data[i].strMealThumb}">
                    <div class="mealName  p-2 position-absolute d-flex align-items-center justify-content-center">
                        <h2>${data[i].strMeal}</h2>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}

//! <===== end section
//!====> categorySection
async function categorySection() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    finalResponse = await response.json()
    displayCategory(finalResponse.categories)
    closeSideBar()
}
async function getCatMeal(category) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    finalResponse = await response.json()


    display(finalResponse.meals.splice(0, 15))

}
function displayCategory(data) {
    let cartoona = "";

    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCatMeal('${data[i].strCategory}')" class="mealDetails position-relative overflow-hidden rounded-3">
                    <img  src="${data[i].strCategoryThumb}" class="w-100">
                    <div class="mealName position-absolute text-center p-2">
                        <h3>${data[i].strCategory}</h3>
                        <p>${data[i].strCategoryDescription.split(" ").splice(0,15).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }
    closeSideBar()
    rowData.innerHTML = cartoona
}
document.querySelector("#catSelection").addEventListener("click",function(){
    categorySection() 
    contactSection.classList.replace("d-flex","d-none")
    rowData.classList.remove("d-none")
    closeSideBar()
})
//!<===== end section


    
//? ======> areaSection
async function areaSection() {
    closeSideBar()    
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        finalResponse = await respone.json()
    
        displayArea(finalResponse.meals)
    
    
    }
async function areaMeals(data) {
        closeSideBar()
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${data}`)
        finalResponse = await response.json()
    
    
        display(finalResponse.meals)
    
    }
function displayArea(data) {
    closeSideBar()
    let cartoona = "";

    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="areaMeals('${data[i].strArea}')" class="mealDetails position-relative overflow-hidden rounded-3">
                        <i class="fa-solid fa-house"></i>
                        <h3>${data[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}

document.querySelector("#areaSelection").addEventListener("click",function(){
    contactSection.classList.replace("d-flex","d-none")
    
    closeSideBar()
    areaSection() 
    rowData.classList.remove("d-none")
})
//?<======== end section

//! ======> ingredientSection
async function ingSelection() {

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    finalResponse = await respone.json()
    displayIngredients(finalResponse.meals.splice(0,15))

}

async function ingredients(data) {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${data}`)
    finalResponse = await response.json()


    display(finalResponse.meals)

}
function displayIngredients(data) {
    let cartoona = "";
    closeSideBar()
    for (let i = 0; i < data.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="ingredients('${data[i].strIngredient}')" class="mealDetails position-relative overflow-hidden rounded-3">
                        <i class="fa-solid fa-utensils"></i>
                        <h4>${data[i].strIngredient}</h4>
                        <p>${data[i].strDescription.split(" ").splice(0,15).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}

document.querySelector("#ingSelection").addEventListener("click",function(){
    ingSelection() 
    contactSection.classList.replace("d-flex","d-none")
    closeSideBar()
    rowData.classList.remove("d-none")
})
//!<======== end section

async function getDetails(id) {
    closeSideBar()
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    finalResponse = await respone.json();
    displayMealDetails(finalResponse.meals[0])

}
function displayMealDetails(data) {
    let recipes = ``

    for (let i = 1; i <= 20; i++) {
        if (data[`strIngredient${i}`]) {
            recipes += `<h6>${data[`strMeasure${i}`]} of ${data[`strIngredient${i}`]} </h6>`
        }
    }
    let cartoona = `
     <div class="col-md-3">
          <img class="w-100 rounded-3" src="${data.strMealThumb}">
                    <h3>${data.strMeal}</h3>
        </div>
        <div class="col-md-9">
          <h3>Instructions</h3>
          <p>${data.strInstructions}</p>
          <h3 class="badge text-bg-primary">Area: ${data.strArea}</h3>
          <h3 class="badge text-bg-info">Category: ${data.strCategory}</h3>
          <h3>Recipes:</h3>
          <div>
          ${recipes}
          </div>     
          <h3 class="badge text-bg-warning">Tags: ${data.strTags}</h3>
          <div>
          <a target="_blank" href="${data.strSource}" class="btn btn-primary">Source</a>
          <a target="_blank" href="${data.strYoutube}" class="btn btn-danger">Youtube</a>
          </div>

        </div>`

    rowData.innerHTML = cartoona
}
contactSelection.addEventListener("click",function(){
    contactSection.classList.replace("d-none","d-flex")
    searchSection.classList.replace("d-flex","d-none")
    rowData.classList.add("d-none")
    closeSideBar()
})
document.addEventListener('DOMContentLoaded', function () {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const age = document.getElementById('age');
    const password = document.getElementById('password');
    const repassword = document.getElementById('repassword');
    const submitBtn = document.getElementById('submitBtn');
    const contactForm = document.getElementById('contactForm');

    function validateForm() {
        let valid = true;

        if (name.value.trim() === '') {
            valid = false;
        }

        if (email.value.trim() === '' || !email.value.includes('@')) {
            valid = false;
        }

        if (phone.value.trim() === '' || !/^\d{10}$/.test(phone.value)) {
            valid = false;
        }

        if (age.value.trim() === '' || isNaN(age.value) || age.value < 1) {
            valid = false;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password.value)) {
            valid = false;
        }

        if (repassword.value.trim() === '' || repassword.value !== password.value) {
            valid = false;
        }

        if (valid) {
            submitBtn.removeAttribute('disabled');
        } else {
            submitBtn.setAttribute('disabled', true);
        }
    }

    [name, email, phone, age, password, repassword].forEach(input => {
        input.addEventListener('input', validateForm);
    });

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!submitBtn.disabled) {
            alert('Form submitted successfully!');
            name.value='';
            email.value='';
            phone.value='';
            age.value='';
            password.value='';
            repassword.value='';

        } else {
            alert('Please fill out the form correctly.');
        }
    });
});

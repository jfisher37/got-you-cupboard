let searchInputEl = document.getElementById('search-bar');
let glutenCheckEl = document.getElementById('gluten-free');
let dairyCheckEl = document.getElementById('dairy-free');
let peanutCheckEl = document.getElementById('peanut-free');
let vegetarianCheckEl = document.getElementById('vegetarian');
let veganCheckEl = document.getElementById('vegan');
let kosherCheckEl = document.getElementById('kosher');
let searchButtonEl = document.getElementById('search-button');
let ingredientBtnsEl = document.getElementById('ingredient-btns');
let recipeAreaEl = document.getElementById('recipe-cards');
let searchAreaEl = document.getElementById('search-area');
let healthCheckEl = document.querySelectorAll('.health-check');
let lastIngredSearch = [];
let lastHealthSearch = []

// create a function to make card text smaller if string length is >25



// create a function that will pre-load last search

function loadLast(){
   console.log(JSON.parse(localStorage.getItem('lastIngredSearch')));
    let lastIngreds = JSON.parse(localStorage.getItem('lastIngredSearch'));
    let lastHealth = JSON.parse(localStorage.getItem('lastHealthSearch'));
    
    if (lastIngreds) {
        for (let i = 0; i < lastIngreds.length; i++){
        let newBtn = document.createElement("button")
        newBtn.innerHTML = lastIngreds[i];
        newBtn.setAttribute('class', 'ingredBtns')
        ingredientBtnsEl.appendChild(newBtn);
        }
    }
    if (lastHealth){
        for (let i = 0; i < lastHealth.length; i ++){
           console.log(lastHealth[i]);
           let selectedHealth = document.querySelector('[data-search =' + lastHealth[i] + ']');
           console.log(selectedHealth);
           selectedHealth.checked = true;
        }
    }
}


// create a function to push recent search info into local storage

function storeLast(){

    let ingredArr =[];
    for(let i = 0; i < ingredientBtnsEl.children.length; i++){
            ingredArr.push(ingredientBtnsEl.children[i].innerHTML)
            
    };
    let healthArr = [];
    for (let i = 0; i < healthCheckEl.length; i++){
        if (healthCheckEl[i].checked) {
            healthArr.push(healthCheckEl[i].dataset.search);

        }
     

    }
    localStorage.setItem('lastIngredSearch', JSON.stringify(ingredArr));
    localStorage.setItem('lastHealthSearch', JSON.stringify(healthArr));

    console.log(ingredArr);
    console.log(healthArr);
}


// create a function for submit for the input field that will create deletable ingredient buttons giv buttons class of "ingredBtns"
searchAreaEl.addEventListener('submit', function(e){
    e.preventDefault();
    if (searchInputEl.value){
        for(let i = 0; i < ingredientBtnsEl.children.length; i++){
            let upperIngred = ingredientBtnsEl.children[i].innerHTML.toUpperCase();
            let upperValue = searchInputEl.value.trim().toUpperCase();
            if (upperIngred === upperValue) {
                return
            } }   
        let newBtn = document.createElement("button")
        newBtn.innerHTML = searchInputEl.value.trim();
        newBtn.setAttribute('class', 'ingredBtns')
        ingredientBtnsEl.appendChild(newBtn);
        searchInputEl.value = "";
    }
})


// add event listener for ingredient buttons - if class === "ingredBtns" delete on press.

ingredientBtnsEl.addEventListener('click', function(e){
    e.stopPropagation();
    if (e.target.className === "ingredBtns") {
        e.target.remove();
    }
})

// create event listener for search button

function getApi(request) {
    fetch(request)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      console.log(data.hits[0].recipe.image);
      for (let i = 0; i < data.hits.length; i++) {
          let recipeCard = document.createElement('div');
          recipeCard.setAttribute('class', 'card');
          recipeAreaEl.appendChild(recipeCard);

          let picStyle = document.createElement('div');
          picStyle.setAttribute('class', 'card-image waves-effect waves-block waves-light');
          recipeCard.appendChild(picStyle);

          let recipePic = document.createElement('img');
          recipePic.setAttribute('src', data.hits[i].recipe.image);
          recipePic.setAttribute('class', 'activator');
          picStyle.appendChild(recipePic);

          let cardContent = document.createElement('div');
          cardContent.setAttribute('class', 'card-content brown lighten-3');
          recipeCard.appendChild(cardContent);

          let recipeTitle = document.createElement('span');
          recipeTitle.innerHTML = data.hits[i].recipe.label;
          recipeTitle.setAttribute('class', 'card-title activator grey-text text-darken-4');
          if (recipeTitle.innerHTML.length > 25){
            recipeTitle.setAttribute('style', 'font-size: 20px; line-height: 20px')
          }
          if (recipeTitle.innerHTML.length > 45){
            recipeTitle.setAttribute('style', 'font-size: 15px; line-height: 15px')
          }
          cardContent.appendChild(recipeTitle);

          let titleIcon = document.createElement('i');
          titleIcon.innerHTML = 'more_vert';
          titleIcon.setAttribute('class', 'material-icons right');
          recipeTitle.appendChild(titleIcon);

          let linkContain = document.createElement('p');
          cardContent.appendChild(linkContain);

          let recipeLink = document.createElement('a');
          recipeLink.setAttribute('href', data.hits[i].recipe.url);
          recipeLink.setAttribute('target', 'blank_');
          recipeLink.innerHTML = "Recipe Here";
          linkContain.appendChild(recipeLink);

          let cardReveal = document.createElement('div');
          cardReveal.setAttribute('class', 'card-reveal');
          recipeCard.appendChild(cardReveal);

          let revealTitle = document.createElement('span');
          revealTitle.innerHTML = 'Ingredients (' + data.hits[i].recipe.ingredients.length + '):';
          revealTitle.setAttribute('class', 'card-title grey-text text-darken-4');
          revealTitle.setAttribute('style', 'font-size: 20px;');
          cardReveal.appendChild(revealTitle);

          let revealIcon = document.createElement('i');
          revealIcon.innerHTML = 'close';
          revealIcon.setAttribute('class', 'material-icons right');
          revealTitle.appendChild(revealIcon);


          
          let ingredText = document.createElement('ol');
          cardReveal.appendChild(ingredText);

          

          for (let j = 0; j < data.hits[i].recipe.ingredients.length; j++) {
              let ingredList = document.createElement('li');
              ingredList.innerHTML = data.hits[i].recipe.ingredients[j].food;
              ingredText.appendChild(ingredList);
              
          }

          let moreMapLink = document.createElement('a');
          moreMapLink.innerHTML = "Missing Ingredients?";
          moreMapLink.setAttribute('href', './map-page.html');
          cardReveal.appendChild(moreMapLink);



          



          
      }

        let nextCard = document.createElement('div');
        nextCard.setAttribute('class', 'card');
        recipeAreaEl.appendChild(nextCard);

        let nextCardContent = document.createElement('div');
        nextCardContent.setAttribute('class', 'card-content');
        nextCard.appendChild(nextCardContent);

        let nextTitle = document.createElement('button');
        nextTitle.innerHTML = "Load More Results";
        nextTitle.setAttribute('class', 'card-title activator grey-text text-darken-4');
        nextCardContent.appendChild(nextTitle);

        nextTitle.addEventListener('click', function(e){
            e.stopPropagation();
            
            while (recipeAreaEl.hasChildNodes()){
                recipeAreaEl.removeChild(recipeAreaEl.firstChild)
            };

            let nextRequestUrl = data._links.next.href;
            console.log(nextRequestUrl);
            getApi(nextRequestUrl);
        })
      
    }
    )};

searchButtonEl.addEventListener('click', function(e){
    e.stopPropagation();

    while (recipeAreaEl.hasChildNodes()){
        recipeAreaEl.removeChild(recipeAreaEl.firstChild)
    };
   
    let ingredString =""
    for(let i = 0; i < ingredientBtnsEl.children.length; i++){
        if (i === 0) {
            ingredString+= ingredientBtnsEl.children[i].innerHTML
            console.log(ingredientBtnsEl.children[i].innerHTML);
        }
        else {
            ingredString+= '%20' + ingredientBtnsEl.children[i].innerHTML
        }
    };
    let healthString = "";
    for (let i = 0; i < healthCheckEl.length; i++){
        if (healthCheckEl[i].checked) {
            healthString += '&health=' + healthCheckEl[i].dataset.search
        }
    }
    let requestUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=' + ingredString + '&app_id=fe7e2c72&app_key=52bbe6fe9daf9dff04bec2b9b2033969' + healthString; 

    getApi(requestUrl);
    storeLast();
})

loadLast();

// create a function to put into that function that will add check box parameters to fetch request

// create a fetch function in this function, have contingencies for if the ingredients listed exist in the ingredients of any given recipe

// create a card gen function. If the conditions of the fetch request are met, create cards. 
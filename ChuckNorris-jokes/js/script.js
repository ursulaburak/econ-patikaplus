'use strict';

let category = 'dev';

const refreshQuoteButton = document.querySelector('#refreshQuote');
const submitFormButton = document.querySelector('#submitForm');
const categoryChangeForm = document.querySelector('#categoryChangeForm');

function getQuote(category) {
  const apiUrl = `https://api.chucknorris.io/jokes/random?category=${category}`;
  const chuckSaysParagraph = document.querySelector('#chuckSays');

  get(apiUrl).then(function(response) {
    chuckSaysParagraph.innerHTML = response.value;
  });
}

function getCategories() {
    const apiUrl = `https://api.chucknorris.io/jokes/categories`;
    const categorySelectLabel = document.querySelector('#categorySelectLabel');

    get(apiUrl).then(function(response) {
        const categoryList = response.filter(function(category){
            if (category != ''){
                return category;
            }
        });
        //create select element for category
        const categoryElement = document.createElement('select');
        //create the options for the select element
        categoryList.map(function(category){
            const categoryOption = document.createElement('option');
            categoryOption.value = category;
            categoryOption.text = category;
            categoryElement.appendChild(categoryOption);
        });
        categorySelectLabel.appendChild(categoryElement);
    });
}

refreshQuoteButton.addEventListener('click', function(e) {
  e.preventDefault();
  getQuote(category);
});

submitFormButton.addEventListener('click', function(e) {
  e.preventDefault();
  const categoryInput = document.querySelector('#categoryChangeForm select');

  category = categoryInput.value;
  getQuote(category);
});

getQuote(category);
getCategories();

const input = document.querySelector('input');
const submitButton = document.querySelector(".submit");
const apiAddress = 'https://swapi.co/api/people?search=';
let inputValue = '';


submitButton.onclick = function() {
  inputValue += input.value;
  apirequest(inputValue)
}

function apirequest(characterName) {
  fetch(apiAddress + characterName)
    .then(resp => resp.json())
    .then(getFilms)
    .then(movieTitle => {
      console.log(movieTitle)
      $(".print").text(movieTitle.toString( ).split(",").join(` 📽️ `))
      inputValue = '';
    })
}

function getFilms(responseAgain) {
  console.log(responseAgain.count)
  if (responseAgain.count === 1) {
    const arrOfPromises = responseAgain.results[0].films.map(newApi => {
      return fetch(newApi)
        .then(movie => movie.json())
        .then(bgy => bgy.title)
    })
    return Promise.all(arrOfPromises);
  } else {
    console.log("What the hell")
    $(".print").text(`What do you mean by ${inputValue} 🤔?`);
    inputValue = '';
  }
}


/* <---- I am leaving previous versions commented out here, because my previous attempts and way of solving this code are visible. ---->


let input = document.querySelector('input');
let submitButton = document.querySelector(".submit");
const apiAddress = 'https://swapi.co/api/people/';


submitButton.onclick = function() {
  let inputValue = '';
  inputValue += input.value;
  apirequest(inputValue)
}


function apirequest(characterName) {
  var characterPlaceInResults = 0;
  fetch(apiAddress)
    .then(resp => resp.json())
    .then(resp => resp.results.forEach(character => {
      characterPlaceInResults++
      if (character.name === characterName) {
        console.log(characterPlaceInResults)
        characterFound(characterPlaceInResults)
      }
    }))
}

function characterFound(characterId) {
  let counter = 0;
  fetch(`${apiAddress} + ${characterId}`)
    .then(response => response.json())
    .then(getFilms)
    //I know it's bad to use jquery with arrow functions, sorry about that
    .then(movieTitle => {
      console.log(movieTitle)
      $(".print").text(movieTitle.toString( ).split(",").join(` 📽️ `))
    })
    .catch(function(error) {
      console.error(error);
    });
}

function getFilms(responseAgain) {
  const arrOfPromises = responseAgain.films.map(newApi => {
    return fetch(newApi)
      .then(movie => movie.json())
      .then(bgy => bgy.title)
  })
  return Promise.all(arrOfPromises);
}



let input = document.querySelector('input');
let submitButton = document.querySelector(".submit");
const apiAddress = 'https://swapi.co/api/people/';


submitButton.onclick = function() {
  let inputValue = '';
  inputValue += input.value;
  apirequest(inputValue)
}


function apirequest(characterName) {
  var characterPlaceInResults = 0;
  fetch(apiAddress)
    .then(resp => resp.json())
    .then(resp => resp.results.forEach(character => {
      characterPlaceInResults++
      if (character.name === characterName) {
        console.log(characterPlaceInResults)
        characterFound(characterPlaceInResults)
      }
    }))
}

function characterFound(characterId) {
  let counter = 0;
  fetch(`${apiAddress} + ${characterId}`)
    .then(response => response.json())
    .then(getFilms)
    //I know it's bad to use jquery with arrow functions, sorry about that
    .then(movieTitle => {
      console.log(movieTitle)
      $(".print").text(movieTitle.toString( ).split(",").join(` 📽️ `))
    })
    .catch(function(error) {
      console.error(error);
    });
}

function getFilms(responseAgain) {
  const arrOfPromises = responseAgain.films.map(newApi => {
    return fetch(newApi)
      .then(movie => movie.json())
      .then(bgy => bgy.title)
  })
 return Promise.all(arrOfPromises);


<----- wersja 2 zapytanie do API, bez promise all -->


const apiAddress = "https://swapi.co/api/people/";

const Luke = 1;
const C3PO = 2;
const R2D2 = 3;
let moviespushed = [];

function onCharacterButtonClicked(characterId) {
  moviespushed = [];
  fetch(apiAddress + characterId)
    .then(resp => resp.json())
    .then(resp => {
        resp.films.forEach(newApi => {
          fetch(newApi)
          .then(movie => movie.json())
          .then(bgy => {
            moviespushed.push(bgy.title);
            console.log(moviespushed);
            $(".print").text(JSON.stringify(moviespushed));
          })
        })
    })
    .catch(function(error) {
    console.log(error);
    });
}


$(document).ready(function(){
  $("#1").click(() => onCharacterButtonClicked(Luke));
  $("#2").click(() => onCharacterButtonClicked(C3PO));
  $("#3").click(() => onCharacterButtonClicked(R2D2));
 });


  fetch(apiAddress2)
    .then(resp => resp.json())
    .then(resp => resp.results.forEach(character => {
      if (character.name === inputValue) {
        character.films.forEach(newestApi => {
          fetch(newestApi)
          .then(movie2 => movie2.json())
          .then(bgy => {
            moviespushed.push(bgy.title);
            $(".print").text(JSON.stringify(moviespushed));
            //$(".print").text(bgy.title.toString( ).split(",").join());
          })
        })
      }
    }))
   if (inputValue === "luke" || "luke skywalker") {
    characterId = 1;
    onCharacterButtonClicked(characterId)
  } else {
    $(".print").text(inputValue)
  }

        character.films.map(newestApi => {
          fetch(newestApi)
          .then(movie2 => movie2.json())
          .then(bgy => bgy.title)
          .then(e => {
            console.log(e)
            $(".print").text(e.toString( ).split(",").join( ' and ' ))
          })
        })
$("#submit").click(() => $(".print").text(inputValue));
*/
const input = document.querySelector('.non');
const submitButton = document.querySelector(".submit");
const forma = document.querySelector(".forma");
const chewbaccaDiv = document.querySelector(".chewbacca");
const apiAddress = 'https://swapi.co/api/people?search=';


forma.addEventListener('submit', functSubmit);

function functSubmit() {
  apirequest(input.value)
}

function apirequest(characterName) {
  if (characterName === "wookie") {
    alert('ArrRRrRrRRRrrR!')
    chewbaccaDiv.style.display = "block";
  }
  fetch(apiAddress + characterName)
    .then(resp => resp.json())
    .then(getFilms)
    .then(movieTitle => {
      console.log(movieTitle)
      if (movieTitle != undefined) {
        $(".print").text(movieTitle.toString( ).split(",").join(` 📽️ `));
      } else {
        console.log("What the hell")
        $(".print").text(`What do you mean by ${input.value} 🤔?`);
      }
    })
}

function getFilms(responseAgain) {
  console.log(responseAgain.count);
  if (responseAgain.count !== 1) {
    return undefined;
  }

  console.log(responseAgain.results[0].name)
  $(".namePrint").text(responseAgain.results[0].name)
  const arrOfPromises = responseAgain.results[0].films.map(newApi => {
    return fetch(newApi)
      .then(movie => movie.json())
      .then(bgy => bgy.title)
  })
  return Promise.all(arrOfPromises);
}
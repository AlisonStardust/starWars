const startapp = () => {

  const input = document.querySelector('.non');
  const submitButton = document.querySelector(".submit");
  const forma = document.querySelector(".forma");
  const chewbaccaDiv = document.querySelector(".chewbacca");
  const print = document.querySelector(".print");
  const namePrint = document.querySelector(".namePrint");
  const apiAddress = 'https://swapi.co/api/people?search=';


  forma.addEventListener('submit', functSubmit);

  function functSubmit(event) {
    event.preventDefault();
    apirequest(input.value)
  }

  const apirequest = (characterName) => {
    if (characterName === "wookie") {
      alert('ArrRRrRrRRRrrR!')
      chewbaccaDiv.style.display = "block";
    } else {
      fetch(apiAddress + characterName)
        .then(resp => resp.json())
        .then(getFilms)
        .then(movieTitle => {
          if (movieTitle != undefined) {
            print.innerText = movieTitle.toString( ).split(",").join(` 📽️ `);
          } else {
            print.innerText = `What do you mean by ${input.value} 🤔?`;
          }
        })
        .catch(error => console.log('Error: ', error));
    }
  }

  const getFilms = (responseAgain) => {
    console.log(responseAgain.count);
    if (responseAgain.count !== 1) {
      return undefined;
    } else {
      console.log(responseAgain.results[0].name)
      namePrint.innerText = responseAgain.results[0].name;
      const arrOfPromises = responseAgain.results[0].films.map(newApi => {
        return fetch(newApi)
          .then(movie => movie.json())
          .then(bgy => bgy.title)
      })
      return Promise.all(arrOfPromises);
    }
  }
}

startapp();
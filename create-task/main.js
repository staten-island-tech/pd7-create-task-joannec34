import "./style.css";

const DOMSelectors = {
  apiResponse: document.querySelector("#api-response"),
  results: document.querySelector("#results"),
  //buttons
  genPoke: document.querySelector("#poke-btn"),
  toggleHist: document.querySelector("#hist-btn"),
  //form
  form: document.querySelector("#form"),
  submitBtn: document.querySelector("#submit-btn"),
  userInput: document.querySelector("#user-input"),
};

const history = []; //store history of pokemon guesses

//generates a random id for a pokemon
function createId() {
  return Math.floor(Math.random() * 1000);
}

//fetch pokemon data from api
async function fetchData(id) {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

  let rawData;
  let dataObj = {};
  try {
    const response = await fetch(url);
    rawData = await response.json();
    dataObj.id = rawData.id;
    dataObj.sprite = rawData.sprites.front_default;
    dataObj.name = rawData.name;

    //display the pokemon and enable guessing
    displayPoke(dataObj);
    afterGuess(dataObj);

    console.log(dataObj);
    history.push(dataObj); //adds pokemon to the history
  } catch (error) {
    console.log(error);
  }
}
fetchData(createId()); //fetch data for pokemon on page load

//displays the pokemon on the page
function displayPoke(poke) {
  DOMSelectors.apiResponse.innerHTML = `
  <img class="hidden" src="${poke.sprite}">`;

  DOMSelectors.results.innerHTML = "";
  DOMSelectors.form.style.visibility = "visible";
}

function afterGuess(poke) {
  DOMSelectors.submitBtn.onclick = () => {
    let input = DOMSelectors.userInput.value;
    let latest = history[history.length - 1];
    //console.log(`input: ${input}`);
    //console.log(`answer: ${latest.name}`);
    if (input.includes(latest.name)) {
      //right guess
      //console.log("right");
      DOMSelectors.apiResponse.innerHTML = `<img src="${poke.sprite}">`;
      DOMSelectors.results.innerHTML = `<p>ur right yay the pokemon is ${poke.name} </p>`;
      latest.result = true; //applies true if user guesses correctly
    } else {
      //wrong guess
      //console.log("wrong");
      DOMSelectors.apiResponse.innerHTML = `<img src="${poke.sprite}">`;
      DOMSelectors.results.innerHTML = `<p>no ur wrong the pokemon is ${poke.name} </p>`;
    }

    //reset input and hide form
    DOMSelectors.userInput.value = "";
    DOMSelectors.form.style.visibility = "hidden";
  };
}

//prevents form from submitting on page reload
DOMSelectors.form.addEventListener("submit", function (e) {
  e.preventDefault();
});

//event listener for generating new pokemon
DOMSelectors.genPoke.addEventListener("click", async function (e) {
  e.preventDefault();
  await fetchData(createId());
});

//displays pokemon history and whether user guessed the pokemon correctly or not
DOMSelectors.toggleHist.onclick = () => {
  //console.log(history);
  DOMSelectors.results.innerHTML = "";
  DOMSelectors.apiResponse.innerHTML = "";
  const createhistory = function (poke) {
    if (poke.result === true) {
      DOMSelectors.apiResponse.insertAdjacentHTML(
        "beforeend",
        `<img src="${poke.sprite}" alt="">
      <p>${poke.name}, right</p>`
      );
    } else {
      DOMSelectors.apiResponse.insertAdjacentHTML(
        "beforeend",
        `<img src="${poke.sprite}" alt="">
        <p>${poke.name}, wrong</p>`
      );
    }
  };
  history.forEach((poke) => createhistory(poke));
  DOMSelectors.form.style.visibility = "hidden";
};

import "./style.css";

const DOMSelectors = {
  apiResponse: document.querySelector("#api-response"),
  results: document.querySelector("#results"),
  histResponse: document.querySelector("#hist-response"),
  //buttons
  genPoke: document.querySelector("#poke-btn"),
  genHiddenPoke: document.querySelector("#hidden-poke-btn"),
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

//fetch pokemon data from API
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

    console.log(dataObj);
    history.push(dataObj); //adds pokemon to the history
  } catch (error) {
    console.log(error);
  }
  return dataObj;
}
DOMSelectors.form.style.visibility = "hidden";

function clearBody() {
  DOMSelectors.apiResponse.innerHTML = "";
  DOMSelectors.results.innerHTML = "";
  DOMSelectors.histResponse.innerHTML = "";
}

//displays the pokemon on the page
function displayPoke(poke, condition) {
  clearBody();
  DOMSelectors.form.style.visibility = "visible";
  if (condition === "hidden") {
    DOMSelectors.apiResponse.innerHTML = `
  <img class="hidden" src="${poke.sprite}">`;
  } else {
    DOMSelectors.apiResponse.innerHTML = `
  <img src="${poke.sprite}">`;
  }
}

function afterGuess(poke) {
  DOMSelectors.submitBtn.onclick = () => {
    let input = DOMSelectors.userInput.value;
    let latest = history[history.length - 1];
    if (input.includes(latest.name)) {
      //right guess
      DOMSelectors.apiResponse.innerHTML = `<img src="${poke.sprite}">`;
      DOMSelectors.results.innerHTML = `<p>you are right! the pokemon is ${poke.name}</p>`;
      latest.result = true; //applies true if the user guesses correctly
    } else {
      //wrong guess
      DOMSelectors.apiResponse.innerHTML = `<img src="${poke.sprite}">`;
      DOMSelectors.results.innerHTML = `<p>you are wrong! the pokemon is ${poke.name}</p>`;
    }
    latest.guess = `${input}`;
    DOMSelectors.userInput.value = "";
    DOMSelectors.form.style.visibility = "hidden";
  };
}

//prevents form from submitting on page reload
DOMSelectors.form.addEventListener("submit", function (e) {
  e.preventDefault();
});

//event listeners for generating new pokemon
DOMSelectors.genPoke.addEventListener("click", async function (e) {
  e.preventDefault();
  let poke = await fetchData(createId());
  displayPoke(poke);
  afterGuess(poke);
});

DOMSelectors.genHiddenPoke.addEventListener("click", async function (e) {
  e.preventDefault();
  let poke = await fetchData(createId());
  displayPoke(poke, "hidden");
  afterGuess(poke);
});

//displays pokemon history
DOMSelectors.toggleHist.onclick = () => {
  clearBody();
  const createhistory = function (poke) {
    if (poke.result === true) {
      DOMSelectors.histResponse.insertAdjacentHTML(
        "beforeend",
        `<div class="right hist-cards">
        <img src="${poke.sprite}" alt="">
      <p>this pokemon is ${poke.name}, you were right</p>
      </div>`
      );
    } else {
      DOMSelectors.histResponse.insertAdjacentHTML(
        "beforeend",
        `<div class="wrong hist-cards">
        <img src="${poke.sprite}" alt="">
        <p>this pokemon is ${poke.name}, you were wrong</p>
        <p>your guess: ${poke.guess}</p>
        </div>`
      );
    }
  };
  history.forEach((poke) => createhistory(poke));
  DOMSelectors.form.style.visibility = "hidden";
};

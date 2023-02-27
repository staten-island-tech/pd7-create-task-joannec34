import "./style.css";

const DOMSelectors = {
  apiResponse: document.querySelector("#api-response"),
  results: document.querySelector("#results"),
  //
  genPoke: document.querySelector("#poke-btn"),
  toggleHist: document.querySelector("#hist-btn"),
  //
  form: document.querySelector("#form"),
  userInput: document.querySelector("#user-input"),
};

const history = [];

function createId() {
  return Math.floor(Math.random() * 1000);
}

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
    displayPoke(dataObj);
    afterGuess(dataObj, history);
    history.push(dataObj);
  } catch (error) {
    console.log(error);
  }
  return;
}
fetchData(createId());

function displayPoke(poke) {
  DOMSelectors.apiResponse.innerHTML = `
  <img class="hidden" src="${poke.sprite}">`;
  DOMSelectors.results.innerHTML = "";
  DOMSelectors.userInput.value = "";
  DOMSelectors.form.style.visibility = "visible";
}

function afterGuess(poke, history) {
  //ADD EVENT LISTENER ADDS MULTIPLE TIMES BAD GET RID SPLIT FCUNTION AND EVENT LISTENER UP
  DOMSelectors.form.addEventListener("submit", function (event) {
    event.preventDefault();
    let input = DOMSelectors.userInput.value;
    let latest = history[history.length - 1];
    console.log(`input: ${input}`);
    console.log(`answer: ${latest.name}`);
    if (input.includes(latest.name)) {
      console.log("right");
      DOMSelectors.apiResponse.innerHTML = `<img src="${poke.sprite}">`;
      DOMSelectors.results.innerHTML = `<p>ur right yay the pokemon is ${poke.name} </p>`;
      latest.result = true; //applies true if u get it right
    } else {
      console.log("wrong");
      DOMSelectors.apiResponse.innerHTML = `<img src="${poke.sprite}">`;
      DOMSelectors.results.innerHTML = `<p>no ur wrong the pokemon is ${poke.name} </p>`;
    }
    console.log(history);
    DOMSelectors.form.style.visibility = "hidden";
    DOMSelectors.userInput.value = "";
  });
}

DOMSelectors.genPoke.addEventListener("click", async function (e) {
  e.preventDefault();
  await fetchData(createId());
});

DOMSelectors.toggleHist.onclick = () => {
  console.log(history);
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

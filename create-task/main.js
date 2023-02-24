import "./style.css";

const DOMSelectors = {
  section: document.querySelector("#section"),
  apiResponse: document.querySelector("#api-reponse"),
  toggleHist: document.querySelector("#hist-btn"),
  userInput: document.querySelector("#user-input"),
  form: document.querySelector("#form"),
  genPoke: document.querySelector("#poke-btn"),
};

const history = [];

function createId() {
  return Math.floor(Math.random() * 150);
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
    afterGuess(dataObj);
    history.push(dataObj);
  } catch (error) {
    console.log(error);
  }
  return;
}
fetchData(createId());

function displayPoke(poke) {
  DOMSelectors.apiResponse.innerHTML = `
  <img src="${poke.sprite}">`;
}

function afterGuess(poke) {
  DOMSelectors.form.addEventListener("submit", function (event) {
    event.preventDefault();
    DOMSelectors.form.remove();
    let input = DOMSelectors.userInput.value;
    //console.log(input);
    if (poke.name.includes(`${input}`)) {
      console.log("right");
      DOMSelectors.section.innerHTML = `
      <img src="${poke.sprite}" alt="">
      <p>ur right yay the pokemon is ${poke.name} </p>`;
    } else {
      console.log("wrong");
      DOMSelectors.section.innerHTML = `
      <img src="${poke.sprite}" alt="">
      <p> ur wrong the pokemon is ${poke.name} </p>`;
    }
  });
}

DOMSelectors.genPoke.addEventListener("click", async function (e) {
  e.preventDefault();
  await fetchData(createId());
});

DOMSelectors.toggleHist.onclick = () => {
  console.log(history);
  DOMSelectors.apiResponse.innerHTML = "";
  const createhistory = function (poke) {
    DOMSelectors.apiResponse.insertAdjacentHTML(
      "beforeend",
      `<img src="${poke.sprite}" alt="">
      <p>${poke.name}</p>`
    );
  };
  history.forEach((poke) => createhistory(poke));
};

import "./style.css";

const DOMSelectors = {
  genImage: document.querySelector("#img-btn"),
  body: document.querySelector("#body"),
  section: document.querySelector("#api-reponse"),
  toggleHist: document.querySelector("#hist-btn"),
  histSection: document.querySelector("#history"),
  userInput: document.querySelector("#user-input"),
  form: document.querySelector("#form"),
  resetBtn: document.querySelector("#reset-btn"),
};

const histSection = DOMSelectors.histSection;
const history = [];

let id = Math.floor(Math.random() * 1000);
let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

async function fetchData(url, id) {
  console.log(id);
  console.log(url);
  try {
    const response = await fetch(url);
    const rawData = await response.json();
    console.log(rawData.name);
    displayPoke(rawData, DOMSelectors.section);
    afterGuess(rawData);
    console.log(rawData);
    reset();
  } catch (error) {
    console.log(error);
  }
}
fetchData(url, id);

function displayPoke(arr, div) {
  div.innerHTML = `
  <img src="${arr.sprites.front_default}">`;
}

function afterGuess(arr) {
  DOMSelectors.form.addEventListener("submit", function (event) {
    event.preventDefault();
    DOMSelectors.form.remove();
    let input = DOMSelectors.userInput.value;
    //console.log(input);
    if (arr.name.includes(`${input}`)) {
      console.log("right");
      DOMSelectors.section.innerHTML = `
      <img src="${arr.sprites.front_default}" alt="">
      <p> ur right yay the pokemon is ${arr.name} </p>`;
    } else {
      console.log("wrong");
      DOMSelectors.section.innerHTML = `
      <img src="${arr.sprites.front_default}" alt="">
      <p> ur wrong grr the pokemon is ${arr.name} </p>`;
    }
  });
}

function reset() {
  let resetBtn = document.querySelector("#reset-btn");
  console.log(resetBtn);
  resetBtn.addEventListener("click", function () {
    DOMSelectors.body.innerHTML = "";
    location.reload();
  });
}

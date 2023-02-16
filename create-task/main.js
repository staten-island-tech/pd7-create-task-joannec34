import "./style.css";

const DOMSelectors = {
  genImage: document.querySelector("#img-btn"),
  body: document.querySelector("#body"),
  section: document.querySelector("#api-reponse"),
  histBtn: document.querySelector("#hist-btn"),
  histSection: document.querySelector("#history"),
  userInput: document.querySelector("#user-input"),
  form: document.querySelector("#form"),
  resetBtn: document.querySelector("#reset-btn"),
};

const histSection = DOMSelectors.histSection;
const history = [];

let id = random();
let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

function random() {
  return Math.floor(Math.random() * 1000);
}

async function fetchData(url) {
  let rawData;
  let dataObj = {};
  try {
    const response = await fetch(url);
    rawData = await response.json();
    dataObj.id = rawData.id;
    dataObj.sprite = rawData.sprites.front_default;
    dataObj.name = rawData.name;
    /* history.push(rawData);
      console.log(history);
      console.log(rawData.name);
      displayPoke(rawData, DOMSelectors.section);
      afterGuess(rawData);
      console.log(rawData);
      reset(); */
  } catch (error) {
    console.log(error);
  }
  return;
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
      <p>ur right yay the pokemon is ${arr.name} </p>`;
    } else {
      console.log("wrong");
      DOMSelectors.section.innerHTML = `
      <img src="${arr.sprites.front_default}" alt="">
      <p> ur wrong the pokemon is ${arr.name} </p>`;
    }
  });
}

function reset() {
  let resetBtn = document.querySelector("#reset-btn");
  console.log(resetBtn);
  resetBtn.addEventListener("click", function (e) {
    e.preventDefault();
    DOMSelectors.body.innerHTML = "";
    console.log(id);
    fetchData(url, id);
  });
}

DOMSelectors.histBtn.onclick = async (e) =>
  function () {
    e.preventDefault();
    console.log("hello");
  };

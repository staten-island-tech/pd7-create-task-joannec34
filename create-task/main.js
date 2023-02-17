import "./style.css";

const DOMSelectors = {
  genImage: document.querySelector("#img-btn"),
  body: document.querySelector("#body"),
  section: document.querySelector("#api-reponse"),
  histBtn: document.querySelector("#hist-btn"),
  histSection: document.querySelector("#history"),
  userInput: document.querySelector("#user-input"),
  form: document.querySelector("#form"),
  genBtn: document.querySelector("#gen-btn"),
};

const histSection = DOMSelectors.histSection;
const history = [];

let id = random();
let url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

function random() {
  return Math.floor(Math.random() * 1000);
}

async function fetchData(url, id) {
  console.log(url);

  let rawData;
  let dataObj = {};
  try {
    const response = await fetch(url);
    rawData = await response.json();
    dataObj.id = rawData.id;
    dataObj.sprite = rawData.sprites.front_default;
    dataObj.name = rawData.name;
    // temp
    console.log(dataObj);
    displayPoke(dataObj, DOMSelectors.section);
    afterGuess(dataObj);
  } catch (error) {
    console.log(error);
  }
  return;
}
fetchData(url, id);
console.log(dataObj);

function displayPoke(obj, div) {
  div.innerHTML = `
  <img src="${obj.sprite}">`;
}
//displayPoke(dataObj, DOMSelectors.section);

function afterGuess(obj) {
  DOMSelectors.form.addEventListener("submit", function (event) {
    event.preventDefault();
    DOMSelectors.form.remove();
    let input = DOMSelectors.userInput.value;
    //console.log(input);
    if (obj.name.includes(`${input}`)) {
      console.log("right");
      DOMSelectors.section.innerHTML = `
      <img src="${obj.sprite}" alt="">
      <p>ur right yay the pokemon is ${obj.name} </p>`;
    } else {
      console.log("wrong");
      DOMSelectors.section.innerHTML = `
      <img src="${obj.sprite}" alt="">
      <p> ur wrong the pokemon is ${obj.name} </p>`;
    }
  });
}

//fix this
console.log(DOMSelectors.genBtn);
DOMSelectors.genBtn.onclick = async (e) =>
  function () {
    e.preventDefault();
    DOMSelectors.body.innerHTML = "";
    console.log(url);
    fetchData(url, id);
  };

DOMSelectors.histBtn.onclick = async (e) =>
  function () {
    e.preventDefault();
    console.log("hello");
  };

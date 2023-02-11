import "./style.css";

const DOMSelectors = {
  genImage: document.querySelector("#img-btn"),
  section: document.querySelector("#api-reponse"),
  toggleHist: document.querySelector("#hist-btn"),
  histSection: document.querySelector("#history"),
  userInput: document.querySelector("#user-input"),
  form: document.querySelector("#form"),
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
    display(rawData, DOMSelectors.section);
    afterGuess(rawData);
    console.log(rawData);
  } catch (error) {
    console.log(error);
  }
}
fetchData(url, id);

function display(arr, div) {
  div.innerHTML = `<img src="${arr.sprites.front_default}" alt="">`;
}

function afterGuess(arr) {
  DOMSelectors.form.addEventListener("submit", function (e) {
    e.preventDefault();
    let input = DOMSelectors.userInput.value;
    //console.log(input);
    if (arr.name.includes(`${input}`)) {
      console.log("right");
      DOMSelectors.section.innerHTML = `ur right yay the pokemon is ${arr.name}`;
    } else {
      console.log("wrong");
      DOMSelectors.section.innerHTML = `ur wrong grr the pokemon is ${arr.name}`;
    }
  });
}

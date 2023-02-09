import "./style.css";

const DOMSelectors = {
  genImage: document.querySelector("#img-btn"),
  section: document.querySelector("#api-reponse"),
  toggleHist: document.querySelector("#hist-btn"),
  histSection: document.querySelector("#history"),
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
    display(rawData, DOMSelectors.section);
    console.log(rawData);
  } catch (error) {
    console.log(error);
  }
}
fetchData(url, id);

function display(arr, div) {
  div.innerHTML = `<img src="${arr.sprites.front_default}" alt="">`;
}

import "./style.css";

const DOMSelectors = {
  genImage: document.querySelector("#img-btn"),
  toggleHist: document.querySelector("#hist-btn"),
  histSection: document.querySelector("#history"),
};

const histSection = DOMSelectors.histSection;
const history = [];

let url = `https://pokeapi.co/api/v2/pokemon/{${id}}/`;

async function fetchData() {
  try {
    const rawData = await fetch(url);
  } catch (error) {
    console.log(error);
  }
}

function display(arr, section) {
  section.innerHTML = "";
}

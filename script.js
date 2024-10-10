const CharacterId = document.getElementById("characterId");
const btnGo = document.getElementById("btn-go");
const Content = document.getElementById("content");
const image = document.getElementById("img");
const btnReset = document.getElementById("btn-reset");
const conteinertResult = document.getElementById("result-style");

const fetchAPI = (value) => {
  const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return result;
};

const keys = ["name", "status", "species", "gender", "origin", "episode"];
const newKeys = {
  name: "Nome:",
  status: "Status:",
  species: "Especie:",
  gender: "Genero:",
  origin: "Planeta de Origem:",
  episode: "Episodeos:",
};
const buildResult = (result) => {
  const newObject = {};
  return keys
    .map((key) => document.getElementById(key))
    .map((elem) => {
      if (
        elem.checked === true &&
        Array.isArray((result[elem.name] = result[elem.name])) === true
      ) {
        const arrayresult = result[elem.name].join("\r\n");
        const newElem = document.createElement("p");
        newElem.innerHTML = `${newKeys[elem.name]}: ${arrayresult}`;
        content.appendChild(newElem);
      } else if (elem.checked === true && elem.name === "origin") {
        const newElem = document.createElement("p");
        newElem.innerHTML = `${newKeys[elem.name]} ${result[elem.name].name}`;
        content.appendChild(newElem);
      } else if (
        elem.checked &&
        typeof (result[elem.name] = result[elem.name]) !== "object"
      ) {
        const newElem = document.createElement("p");
        newElem.innerHTML = `${newKeys[elem.name]} ${result[elem.name]}`;
        content.appendChild(newElem);
      }
    });
};

btnGo.addEventListener("click", async (event) => {
  event.preventDefault();
  if (CharacterId.value === "") {
    return (content.innerHTML = "é necessario fazer um filtro");
  }
  const result = await fetchAPI(CharacterId.value);
  if (content.firstChild === null) {
    conteinertResult.className = "result-style";
    img.src = `${result.image}`;
    buildResult(result);
  } else {
    content.innerHTML = "";
    conteinertResult.className = "result-style";
    img.src = `${result.image}`;
    buildResult(result);
  }
});
btnReset.addEventListener("click", () => location.reload());

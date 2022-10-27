const selectorPersonajes = document.getElementById("selector");

class Personajes {
  constructor(id, img, phoneImg, title, description) {
    this.id = id;
    this.img = img;
    this.phoneImg = phoneImg;
    this.title = title;
    this.description = description;
  }
}

//Obtener personajes del personajes.json
let personajes = [];

const obtenerPJS = async () => {
  const resp = await fetch("./personajes.json");
  const data = await resp.json();
  data.forEach((element) => {
    personajes.push(
      new Personajes(
        element.id,
        element.img,
        element.phoneImg,
        element.title,
        element.description
      )
    );
  });
  renderPJ();
};

obtenerPJS();

//Mostrar personajes en el selector de personaje

const renderPJ = () => {
  for (const personaje of personajes) {
    let div = document.createElement("div");
    div.innerHTML = `<button class="selectorButton" id="btn${personaje.id}">
    <img src="${personaje.img}" class="selectorImg" />
    </button>
    `;
    selectorPersonajes.append(div);

    const btn = document.getElementById(`btn${personaje.id}`);

    btn.addEventListener(`click`, () => {
      setFocus(personaje.id);
    });
  }
};

//Enfocar personaje seleccionado (Actualizar a su información)
const showcased = document.getElementById(`showcase`);

const setFocus = (id) => {
  let focusedPJ = personajes.find((element) => element.id === id);
  showcased.innerHTML = `
  <img src="${focusedPJ.img}" alt="Imagen" class="showcaseImg" id="showImg"/>
  <img src="${focusedPJ.phoneImg}" alt="Imagen" class="phoneShowcaseImg"/>
  <h1 class="showcaseTitle" id="showTitle">${focusedPJ.title}</h1>
  <p class="showcaseSubtitle" id="showSub">${focusedPJ.description}</p>`;
};

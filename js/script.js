const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const btns = document.querySelector(".buttons");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

const shiny = document.querySelector(".shiny");
const btnStats = document.querySelector(".btn__stats");
const stats = document.querySelector(".stats");

const hp = document.querySelector(".hp");
const atk = document.querySelector(".atk");
const def = document.querySelector(".def");
const satk = document.querySelector(".satk");
const sdef = document.querySelector(".sdef");
const spd = document.querySelector(".spd");

let searchPokemon = 1;

async function fetchPokemon(pokemon) {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

async function renderPokemon(pokemon) {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];

    input.value = "";
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not found!";
    pokemonNumber.innerHTML = "";
  }

  let showShiny = false;

  shiny.addEventListener("click", () => {
    showShiny = !showShiny;

    if (showShiny === true) {
      pokemonImage.src =
        data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
          "front_shiny"
        ];
    } else
      pokemonImage.src =
        data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
          "front_default"
        ];
  });

  let showStats = false;

  btnStats.addEventListener("click", () => {
    showStats = !showStats;

    if (showStats === true) {
      form.style.display = "none";
      btns.style.display = "none";
      stats.style.display = "inline-block";

      hp.innerHTML = `Hp: ${data["stats"]["0"]["base_stat"]}`;
      atk.innerHTML = `Attack: ${data["stats"]["1"]["base_stat"]}`;
      def.innerHTML = `Deffense: ${data["stats"]["2"]["base_stat"]}`;
      satk.innerHTML = `Sp. Attack: ${data["stats"]["3"]["base_stat"]}`;
      sdef.innerHTML = `Sp. Deffense: ${data["stats"]["4"]["base_stat"]}`;
      spd.innerHTML = `Speed: ${data["stats"]["5"]["base_stat"]}`;
    } else {
      form.style.display = "inline-block";
      btns.style.display = "flex";
      stats.style.display = "none";
    }
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

btnNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);

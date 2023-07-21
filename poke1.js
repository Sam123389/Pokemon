const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
const pokemon = document.getElementById('pokename')
const buttonSearch = document.getElementById('searchPokemon')
const removePokemon = document.getElementById("borrarPokemon")
const appNode = document.getElementById("app")
buttonSearch.addEventListener('click' , insertarPokemon)
removePokemon.addEventListener('click' , borrarPokemon)
function getPokemonList() {
    fetch(baseURL)
      .then(response => response.json())
      .then(data => {
        const pokemons = data.results;
        pokemons.forEach(pokemon => {
          fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => {
              const pokemonName = document.createElement('h3');
              pokemonName.innerText = pokemonData.name;
  
              const pokemonId = document.createElement('h3');
              pokemonId.innerText = `ID: ${pokemonData.id}`;
  
              const pokemonType = document.createElement('h3');
              pokemonType.innerText = `Type: ${pokemonData.types[0].type.name}`;
  
              const pokemonImage = document.createElement('img');
              pokemonImage.src = pokemonData.sprites.front_default;
  
              const card = document.createElement('div');
              card.classList.add('card');
              card.classList.add('pokemon-list-item');
              card.appendChild(pokemonImage);
              card.appendChild(pokemonName);
              card.appendChild(pokemonId);
              card.appendChild(pokemonType);
  
              const buttonDetails = document.createElement('button');
              buttonDetails.innerText = 'Detalles';
  
              const abilitiesContainer = document.createElement('div');
              abilitiesContainer.classList.add('hidden');
  
              buttonDetails.addEventListener('click', () => {
                if (abilitiesContainer.classList.contains('hidden')) {
                  abilitiesContainer.classList.remove('hidden');
                  buttonDetails.innerText = 'Ocultar detalles';
                } else {
                  abilitiesContainer.classList.add('hidden');
                  buttonDetails.innerText = 'Detalles';
                }
              });
  
              const pokemonAbilities = document.createElement('h3');
              pokemonAbilities.innerText = `Abilities: ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}`;
              abilitiesContainer.appendChild(pokemonAbilities);
  
              const pokemonStats = document.createElement('h3');
              pokemonStats.innerText = 'Stats:';
              pokemonData.stats.forEach(stat => {
                const statText = document.createElement('p');
                statText.innerText = `${stat.stat.name}: ${stat.base_stat}`;
                pokemonStats.appendChild(statText);
              });
              abilitiesContainer.appendChild(pokemonStats);
  
              const pokemonMoves = document.createElement('h3');
              pokemonMoves.innerText = 'Moves:';
              pokemonData.moves.slice(0, 5).forEach(move => {
                const moveText = document.createElement('p');
                moveText.innerText = move.move.name;
                pokemonMoves.appendChild(moveText);
              });
              abilitiesContainer.appendChild(pokemonMoves);
  
              card.appendChild(buttonDetails);
              card.appendChild(abilitiesContainer);
  
              appNode.appendChild(card);
            })
            .catch(error => {
              console.error('Error:', error);
            });
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  getPokemonList();
  
  

  function insertarPokemon() {
    const pokemonListItems = appNode.getElementsByClassName('pokemon-list-item'); 
    while (pokemonListItems.length > 0) {
      appNode.removeChild(pokemonListItems[0]);
    }
  
    window.fetch(`${baseURL}${pokemon.value.toLowerCase()}`)
      .then(response => {
        if (response.status === 404) {
          alert('Este Pokémon no está disponible');
        } else {
          return response.json();
        }
      })
      .then(responseJson => {
        const result = [];
        for (let pokemonInfo in responseJson) {
          result.push([pokemonInfo, responseJson[pokemonInfo]]);
        }
  
        console.table(result);
  
        const pokeImagen = document.createElement('img');
        pokeImagen.src = result[14][1].front_default;
        pokeImagen.alt = 'Imagen del Pokémon';
  
        const pokemonName = document.createElement('h3');
        pokemonName.innerText = `Nombre: ${result[10][1]} | ID: ${result[6][1]}`;
  
        const pokemonType = document.createElement('h3');
        pokemonType.innerText = `Tipo: ${result[16][1][0].type.name}`;
  
        const abilities = responseJson.abilities;
        const abilitiesList = document.createElement('ul');
        abilitiesList.classList.add('abilities-list');
        abilities.forEach(ability => {
          const abilityItem = document.createElement('li');
          abilityItem.innerText = `Habilidad: ${ability.ability.name}`;
          abilitiesList.appendChild(abilityItem);
        });
  
        const contenedor = document.createElement('div');
        contenedor.classList.add('card');
        contenedor.classList.add('pokemon-list-item');
        contenedor.append(pokeImagen, pokemonName, pokemonType);
  
        const buttonDetails = document.createElement('button');
        buttonDetails.innerText = 'Detalles';
        buttonDetails.addEventListener('click', () => {
          const pokeOtros = document.createElement('h4');
          pokeOtros.innerText = `Peso: ${result[17][1]} | Altura: ${result[1][1]}`;
          pokeOtros.classList.add('poke-otros');
  
          const contenedorDetalles = document.createElement('div');
          contenedorDetalles.classList.add('detalles-container');
          contenedorDetalles.append(pokeOtros, abilitiesList);
  
          contenedor.appendChild(contenedorDetalles);
        });
  
        contenedor.appendChild(buttonDetails);
  
        appNode.appendChild(contenedor);
      });
  }
  
  function mostrarMas() {
    window.fetch(`${baseURL}${pokemon.value.toLowerCase()}`)
      .then(response => {
        if (response.status === 404) {
          alert('Este Pokémon no está disponible');
        } else {
          return response.json();
        }
      }) 
      .then(responseJson => {
        const result = [];
        for (let pokemonInfo in responseJson) {
          result.push([pokemonInfo, responseJson[pokemonInfo]]);
        }
  
        console.table(result);
  
        const pokeOtros = document.createElement('h4');
        pokeOtros.innerText = `Peso: ${result[17][1]} | Altura: ${result[1][1]}`;
        pokeOtros.classList.add('poke-otros');
  
        const abilities = responseJson.abilities;
        const abilitiesList = document.createElement('ul');
        abilitiesList.classList.add('abilities-list');
        abilities.forEach(ability => {
          const abilityItem = document.createElement('li');
          abilityItem.innerText = `Habilidad: ${ability.ability.name}`;
          abilitiesList.appendChild(abilityItem);
        });
  
        const contenedor = document.createElement('div');
        contenedor.classList.add('detalles-container');
        contenedor.append(pokeOtros, abilitiesList);
  
        appNode.appendChild(contenedor);
      });
  }
  
function borrarPokemon(){
    let allPokemons = appNode.childNodes
    allPokemons = Array.from(allPokemons)

    allPokemons.forEach(pokemon => {
        pokemon.remove(pokemon)
    })
}
<template>
  <div class="home">
    <h1>All Pokémon</h1>
    <section>
      <button>Prev</button>
      <button>Next</button>

      <div>
        Results per page:
        <ul>
          <li class="selected">10</li>
          <li>20</li>
          <li>50</li>
        </ul>
      </div>
    </section>
    
    <section id='pokemon-list'>

      <router-link :to="{name: 'pokemon-detail', params: { id: pokemon.id } }" class="pokemon-card" v-for="pokemon in pokemonArray" :key="pokemon.name">
        <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"/>
        {{ pokemon.name }}
      </router-link>

    </section>

  </div>
</template>

<script>
import pokeApiService from '../services/PokeApiService'

export default {

  created() {
    pokeApiService.getMore()
      .then(response => {
        this.pokemonArray = response.data.results.map(result => {
          const indexOfPokemon = result.url.lastIndexOf('pokemon/');
          const indexOfLastSlash = result.url.lastIndexOf('/');
          const id = result.url.substring(indexOfPokemon + 8, indexOfLastSlash);

          return {
            id: id,
            name: result.name
          }
        });
      });
  },

  data() {
    return {
      pokemonArray: []
    }
  }

};
</script>

<style scoped>

#pokemon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.pokemon-card {
  border: 1px solid black;
  border-radius: 8px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

</style>
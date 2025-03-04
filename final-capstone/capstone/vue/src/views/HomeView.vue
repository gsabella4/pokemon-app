<template>
  <div class="content-box">
    <header v-if="typeId != null">
      <pokemon-type-image :type-id="typeId"/>
      <h1>Pokémon</h1>
    </header>
    <header v-else>
      <h1>All Pokémon</h1>
    </header>
    
    <paging-controls @paging-data-changed="pagingDataChanged" />
    
    <section id='pokemon-list'>
      <pokemon-card v-for="currentPokemon in pokemonArrayFiltered" :key="currentPokemon.name" :pokemon="currentPokemon" />
    </section>

  </div>
</template>

<script>
import pokeApiService from '../services/PokeApiService'
import PokemonCard from '../components/PokemonCard.vue'
import PokemonTypeImage from '../components/PokemonTypeImage.vue'
import PagingControls from '../components/PagingControls.vue'

export default {
  components: {
    PokemonTypeImage,
    PokemonCard,
    PagingControls
  },

  data() {
    return {
      paging: {
        offset: 0,
        totalCount: 0,

        resultsPerPage: {
          options: [10, 20, 50],
          selectedOption: 20
        }
      },

      pokemonArray: []
    }
  },

  methods: {
    pagingDataChanged(pagingData) {
      this.paging = pagingData;
      this.getMore();
    },

    getMore() {
      if (this.typeId != null) {
        pokeApiService.getTypeDetails(this.typeId)
          .then(response => {
            const pokemonForType = response.data.pokemon.map(obj => obj.pokemon);
            this.pokemonArray = pokemonForType.map(this.mapPokemonObjFromApi);
            this.paging.totalCount = this.pokemonArray.length;
          });
      } else {
        pokeApiService.getMore(this.paging.offset, this.paging.resultsPerPage.selectedOption)
          .then(response => {
            this.pokemonArray = response.data.results.map(this.mapPokemonObjFromApi);
            this.paging.totalCount = response.data.count;
          });
      }
    },

    mapPokemonObjFromApi(result) {
      const indexOfPokemon = result.url.lastIndexOf('pokemon/');
      const indexOfLastSlash = result.url.lastIndexOf('/');
      const id = result.url.substring(indexOfPokemon + 8, indexOfLastSlash);

      return {
        id: id,
        name: result.name
      }
    }
  },

  computed: {
    pokemonArrayFiltered() {
      if (this.typeId != null) {
        return this.pokemonArray.filter((item, index) => this.paging.offset <= index && index < this.paging.offset + this.paging.resultsPerPage.selectedOption)
      } else {
        return this.pokemonArray;
      }
    },

    typeId() {
      return this.$route.params.typeId;
    }
  }
};
</script>

<style scoped>
header {
  display: flex;
  gap: 4px;
  margin-bottom: 1.5rem;
}

#pokemon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-height: 50vh;
  overflow-y: auto;
  scrollbar-color: var(--color-poke-yellow-80) var(--color-poke-blue);
  scrollbar-width: thin;
}
</style>
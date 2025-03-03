<template>
  <div class="content-box">
    <header v-if="typeId != null">
      <pokemon-type-image :type-id="typeId"/>
      <h1>Pokémon</h1>
    </header>
    <header v-else>
      <h1>All Pokémon</h1>
    </header>
    <section id="paging-section"> <!-- Could Move paging-section into its own component -->
      <div>
        <button v-show="paging.offset > 0" @click="prevPage()">Prev</button>
        <button v-show="paging.offset + paging.resultsPerPage.selectedOption < paging.totalCount" 
          @click="nextPage()">Next</button>
      </div>

      <div id="results-per-page">
        Results per page:
        <ul>
          <li :class="{ 'selected': opt == paging.resultsPerPage.selectedOption }" 
            v-for="opt in paging.resultsPerPage.options" :key="`results-per-page-opt-${opt}`"
            @click="updateResultsPerPage(opt)">
            {{ opt }}
          </li>
        </ul>
      </div>
    </section>
    
    <section id='pokemon-list'>
      <pokemon-card v-for="currentPokemon in pokemonArrayFiltered" :key="currentPokemon.name" :pokemon="currentPokemon" />
    </section>

  </div>
</template>

<script>
import pokeApiService from '../services/PokeApiService'
import PokemonCard from '../components/PokemonCard.vue'
import PokemonTypeImage from '../components/PokemonTypeImage.vue'

export default {
  components: {
    PokemonTypeImage,
    PokemonCard
  },

  created() {

    if (this.$route.query.resultsPerPage != null) {
      if (isNaN(Number(this.$route.query.resultsPerPage))) {
        this.paging.resultsPerPage.selectedOption = Number(this.$route.query.resultsPerPage);
      }
    }

    if (this.$route.query.offset != null) {
      this.paging.offset = Number(this.$route.query.offset);
    }

    this.getMore()
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

    updateResultsPerPage(val) {
      this.paging.resultsPerPage.selectedOption = val;
      this.getMore();
      this.updateUrl();
    },

    updateUrl() {
      const queryObj = {
        resultsPerPage: this.paging.resultsPerPage.selectedOption, 
        offset: this.paging.offset
        };

      this.$router.replace({ name: this.$route.name, query: queryObj });
    },

    mapPokemonObjFromApi(result) {
      const indexOfPokemon = result.url.lastIndexOf('pokemon/');
      const indexOfLastSlash = result.url.lastIndexOf('/');
      const id = result.url.substring(indexOfPokemon + 8, indexOfLastSlash);

      return {
        id: id,
        name: result.name
      }
    },

    prevPage() {
      this.paging.offset -= this.paging.resultsPerPage.selectedOption;

      if (this.paging.offset < 0) {
        this.paging.offset = 0;
      }

      this.getMore();
      this.updateUrl();
    },

    nextPage() {
      this.paging.offset += this.paging.resultsPerPage.selectedOption;
      this.getMore();
      this.updateUrl();
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

#paging-section {
  border-bottom: 1px solid var(--color-poke-blue);
  padding-bottom: .25rem;
  margin-bottom: .25rem;

  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

#results-per-page {
  display: flex;
}

#results-per-page ul {
  display: flex;
  flex-grow: 1;
  gap: 4px;
}

#results-per-page li {
  list-style-type: none;
  border: 2px solid var(--color-poke-blue);
  border-radius: 10px;
  cursor: pointer;
  width: 35px;
  text-align: center;
}

#results-per-page li.selected {
  background-color: var(--color-poke-blue);
  color: var(--color-poke-yellow);
  cursor: default;
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
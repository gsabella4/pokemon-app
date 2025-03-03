<template>
    <div id="pokemon-detail-container" class="content-box">
        <h1>{{ pokemon.name }}</h1>

        <section>
            <img v-if="pokemon.sprites?.front_default" :src="pokemon.sprites.front_default" alt="Front Image">
            <img v-if="pokemon.sprites?.back_default" :src="pokemon.sprites.back_default" alt="Back Image">
        </section>

        <section>
            <h2>Stats</h2>
            <p>Height: {{ pokemon.height }}</p>
            <p>Weight: {{ pokemon.weight }}</p>
        </section>

        <section> 
            <h2>Evolution</h2>
            <div class="evolution-chain">
                <div class="evolution-chain-item" v-for="currentPokemon in evolutionChain" :key="currentPokemon.name">
                    <pokemon-card
                        :class="{ 'pokemon-card-active': pokemonId == currentPokemon.id }"
                        :pokemon="currentPokemon" />
                        <span v-if="currentPokemon.id != evolutionChain[evolutionChain.length - 1].id">
                            {{ currentPokemon.id >= pokemonId ? '>' : '<' }}
                        </span>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import pokeApiService from '../services/PokeApiService'
import PokemonCard from '../components/PokemonCard.vue'

export default {
    components: {
        PokemonCard
    },

    created() {
        pokeApiService.getDetailsByIdOrName(this.$route.params.id)
            .then(response => {
                this.pokemon = response.data;
            });
        
        pokeApiService.getEvolutionChain(this.pokemonId)
            .then(response => {
                let chain = response.data.chain;
                while (chain?.species != null) {
                    const pokemon = this.mapPokemonObjFromApi(chain.species);
                    this.evolutionChain.push(pokemon);
                    chain = chain.evolves_to[0];
                }
            });
    },
    
    computed: {
        pokemonId() {
            return this.$route.params.id;
        }
    },

    data() {
        return {
            evolutionChain: [],
            pokemon: {}
        }
    },

    methods: {
    mapPokemonObjFromApi(result) {
      const indexOfPokemon = result.url.lastIndexOf('pokemon-species/');
      const indexOfLastSlash = result.url.lastIndexOf('/');
      const id = result.url.substring(indexOfPokemon + 16, indexOfLastSlash);

      return {
        id: id,
        name: result.name
      }
    }

    }
};

</script>

<style scoped>

#pokemon-detail-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}

section > h2 {
    border-bottom: 1px solid var(--color-poke-blue);
    margin-bottom: .25rem;
}

.evolution-chain {
    display: flex;
    gap: 1rem;
}

.pokemon-card-active {
    color: var(--color-poke-yellow);
    background-color: var(--color-poke-blue);
}

.evolution-chain-item {
    display: flex;
    align-items: center;
    gap: .5rem;
}

</style>
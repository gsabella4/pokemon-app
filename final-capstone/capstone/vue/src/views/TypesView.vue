<template>
    <div id="type-container" class="content-box">
        <pokemon-type-image 
        class="pokemon-type"
        v-for="typeId in types" 
        :key="typeId" 
        :type-id="typeId"
        @click="goToTypeDetailsPage(typeId)"/>
    </div>
</template>

<script>
import pokeApiService from '../services/PokeApiService.js';
import PokemonTypeImage from '../components/PokemonTypeImage.vue';

export default {
  components: {
    PokemonTypeImage
  },

    created() {
        pokeApiService.getTypes().then(response => {
                const data = response.data.results;

                this.types = data.map(dataItem => {
                    const indexOfPokemon = dataItem.url.lastIndexOf('type/');
                    const indexOfLastSlash = dataItem.url.lastIndexOf('/');
                    const id = dataItem.url.substring(indexOfPokemon + 5, indexOfLastSlash);
                    
                    return id;
                });
            });
    },

    data() {
        return {
            types: []
        }
    },

    methods: {
        goToTypeDetailsPage(typeId) {
            this.$router.push({ name: 'type-details', params: {typeId: typeId }})
        }
    }
}
</script>

<style scoped>

    #type-container {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
    }

    img.pokemon-type {
        cursor: pointer;
    }

</style>
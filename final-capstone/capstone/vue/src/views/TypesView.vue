<template>
    <div id="type-container" class="content-box">
        
        <div v-for="type in types" :key="type">
            <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/colosseum/${type}.png`">
        </div>

    </div>
</template>

<script>
import pokeApiService from '../services/PokeApiService.js';

export default {
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
    }
}
</script>

<style scoped>

    #type-container {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
    }

</style>
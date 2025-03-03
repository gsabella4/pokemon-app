import axios from 'axios';

const http = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
});

export default {
    
    getDetailsByIdOrName(idOrName) {
        return http.get(`/pokemon/${idOrName}`)
    },

    getEvolutionChain(pokemonId) {
        return http.get(`/pokemon-species/${pokemonId}`)
            .then(response => {
                return http.get(response.data.evolution_chain.url);
            });
    },
    
    getMore(offset=0, limit=20) {
        return http.get(`pokemon?offset=${offset}&limit=${limit}`)
    },

    getTypes() {
        return http.get('/type?limit=21');
    },

    getTypeDetails(typeId) {
        return http.get(`/type/${typeId}`);
    }

};
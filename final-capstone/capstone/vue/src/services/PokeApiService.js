import axios from 'axios';

const http = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
});

export default {
    
    getDetailsByIdOrName(idOrName) {
        return http.get(`/pokemon/${idOrName}`)
    },
    
    getMore(offset, limit) {
        return http.get(`pokemon?offset=${offset}&limit=${limit}`)
    }

};
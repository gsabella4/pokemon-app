<template>
      <router-link :to="{name: 'pokemon-detail', params: { id: pokemon.id } }" class="pokemon-card">
        <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"/>
        {{ pokemon.name }}
      </router-link>
</template>

<script>
export default {
    props: {
        pokemon: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>

.pokemon-card {
  border: 1px solid var(--color-poke-blue);
  border-radius: 8px;
  padding: 10px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

</style>
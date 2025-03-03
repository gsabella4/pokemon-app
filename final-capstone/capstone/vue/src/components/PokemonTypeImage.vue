<template>
    <img 
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/colosseum/${typeId}.png`"/>
</template>

<script>
export default {
    props: {
        typeId: {
            type: Number,
            required: true
        }
    }
}
</script>
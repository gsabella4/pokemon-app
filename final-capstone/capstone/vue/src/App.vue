<template>
  <div id="pokemon-app">
    <nav-bar id="main-nav"/>
    <router-view :key="$route.path"/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  components : {
    NavBar
  }
}

</script>

<style>

#main-nav {
  margin-bottom: 1rem;
}

</style>
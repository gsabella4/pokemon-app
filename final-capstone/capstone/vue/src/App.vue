<template>
  <div id="pokemon-app">
    <div id="nav" class="content-box">
      <router-link v-bind:to="{ name: 'home' }">View All</router-link>&nbsp;|&nbsp;
      <router-link v-bind:to="{ name: 'types' }">View Types</router-link>&nbsp;|&nbsp;
      <router-link v-bind:to="{ name: 'logout' }" v-if="$store.state.token != ''">Logout</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>


#nav {
  margin-bottom: 1rem;
}

</style>
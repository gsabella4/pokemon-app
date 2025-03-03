<template>
 <div class="nav-wrapper">
    <div class="content-box"  v-if="$store.state.token != ''">
      <router-link v-bind:to="{ name: 'home' }">View All</router-link>&nbsp;|&nbsp;
      <router-link v-bind:to="{ name: 'types' }">View Types</router-link>&nbsp;|&nbsp;
      <router-link v-bind:to="{ name: 'logout' }">Logout</router-link>
    </div>
 </div>
</template>

<style scoped>

.nav-wrapper {
    display: flex;
    justify-content: flex-end;
}
</style>
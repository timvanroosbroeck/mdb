<script  lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/navbar/NavBar.vue'

export default {
  components: { NavBar },
  data: () => ({
    selected: 1,
    options: [
      { id: 1, icon: 'fa-solid fa-house', title: 'History', path: { name: "history" } },
      { id: 1, icon: 'fa-solid fa-house', title: 'Session', path: { name: "session" } },
      // { id: 2, icon: 'fa-solid fa-magnifying-glass', title: 'Search' },
      // { id: 3, icon: 'fa-solid fa-plus', title: 'Setting' },
      // { id: 4, icon: 'fas fa-bell', title: 'Notification' },
      // { id: 5, icon: 'fa-solid fa-gear', title: 'Setting' }
    ]
  }),
};

</script>

<template>
  <div id="container">
    <RouterView />
    <div id="footer">
      <nav-bar :options="options" v-model="selected" />
    </div>
  </div>
  <!-- <div class="container">
    <RouterView />
    <div class="footer">
      <nav-bar :options="options" v-model="selected" />
    </div>
  </div> -->
</template>

<style >

</style>

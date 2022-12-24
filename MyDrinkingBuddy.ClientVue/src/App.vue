<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/navbar/NavBar.vue'
import { useIsAuthenticated } from './resources/authentication/useIsAuthenticated';
import SignInButton from "./components/SignInButton.vue";

const isAuthenticated = useIsAuthenticated();
let selected = 1;
const options = [
  { id: 1, icon: 'fa-solid fa-house', title: 'History', path: { name: "history" } },
  { id: 1, icon: 'fa-solid fa-house', title: 'Session', path: { name: "session" } },
  // { id: 2, icon: 'fa-solid fa-magnifying-glass', title: 'Search' },
  // { id: 3, icon: 'fa-solid fa-plus', title: 'Setting' },
  // { id: 4, icon: 'fas fa-bell', title: 'Notification' },
  // { id: 5, icon: 'fa-solid fa-gear', title: 'Setting' }
];

</script>

<template>


  <div id="container" v-if="isAuthenticated">
    <RouterView />
    <div id="footer">
      <nav-bar :options="options" v-model="selected" />
    </div>
  </div>
  <div class="d-flex justify-content-center h-100" v-else>
    <div class="align-self-center">
      <div class="center-text my-2">
        <h5>My drinking buddy</h5>
      </div>
      <SignInButton />
      <div class="center-text my-2"><small>Drink responsibly</small></div>
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
.center-text {
  text-align: center;
}
</style>

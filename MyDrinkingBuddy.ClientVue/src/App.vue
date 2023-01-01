<script setup lang="ts">
import * as vue from "vue";
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/navbar/NavBar.vue'
import { useIsAuthenticated } from './resources/authentication/useIsAuthenticated';
import SignInButtonGoogle from "./components/SignInButtonGoogle.vue";
import SignInButtonMS from "./components/SignInButtonMS.vue";
import { onActivated, onBeforeMount, onMounted, ref } from 'vue';
import axios from 'axios';
import { acquireToken } from './resources/authentication/acquireToken';
import { useMsal } from './resources/authentication/useMsal';
import { useUserStore } from "./stores/user";
const { instance, inProgress } = useMsal();

const isAuthenticated = useIsAuthenticated();
const tokenAcquired = ref(false);
let selected = 1;
const options = [
  { id: 1, icon: 'fa-solid fa-house', title: 'History', path: { name: "history" } },
  { id: 1, icon: 'fa-solid fa-house', title: 'Session', path: { name: "session" }, disabled: true },
  { id: 1, icon: 'fa-solid fa-house', title: 'Profile', path: { name: "profile" } },
  // { id: 2, icon: 'fa-solid fa-magnifying-glass', title: 'Search' },
  // { id: 3, icon: 'fa-solid fa-plus', title: 'Setting' },
  // { id: 4, icon: 'fas fa-bell', title: 'Notification' },
  // { id: 5, icon: 'fa-solid fa-gear', title: 'Setting' }
];
const userStore = useUserStore();
const stopWatcher = vue.watch(inProgress, async () => {
  const token = await acquireToken(instance);
  if (token != null) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    tokenAcquired.value = true;
  }
});
onMounted(async () => {
  if (!tokenAcquired.value) {
    const token = await acquireToken(instance);
    if (token != null) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      tokenAcquired.value = true;
    }
  }
  await userStore.fetchUser();
})
</script>

<template>


  <div id="container" class="app-container" v-if="tokenAcquired">
    <RouterView />
    <div id="footer">
      <nav-bar :options="options" v-model="selected" />
    </div>
  </div>
  <div class="d-flex justify-content-center h-100 app-container" v-if="(!isAuthenticated || !tokenAcquired)">
    <div class="align-self-center">
      <div class="center-text my-2">
        <h5>My drinking buddy</h5>
      </div>
      <SignInButtonGoogle />
      <SignInButtonMS />
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

.app-container {
  max-width: 400px;
  min-width: 40vw;
}
</style>

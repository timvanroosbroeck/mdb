<script setup  lang="ts">
import SessionItem from '../components/SessionItem.vue'
import { useSessionStore } from '@/stores/session'
import { computed, onMounted } from 'vue';
import router from '@/router';


const sessionStore = useSessionStore();
const getSessions = computed(() => {
  return sessionStore.getSessions;
});

onMounted(() => {
  // store.fetchUsers();
  console.log(import.meta.env.VITE_API_URL);
  sessionStore.fetchSessions()
});
const newSession = (async () => {
  const sId = await sessionStore.createSession();
  await sessionStore.fetchSessions();
  await router.push(`/session/${sId}`);
});
</script>

<template>

  <div class="d-grid mb-2">
    <button class="btn btn-primary" type="button" @click="newSession">new session
    </button>
  </div>
  <div id="content">
    <div v-for="session in getSessions" :key="session.sessionId">
      <SessionItem :session="session"></SessionItem>
    </div>
  </div>
</template>
<style >

</style>

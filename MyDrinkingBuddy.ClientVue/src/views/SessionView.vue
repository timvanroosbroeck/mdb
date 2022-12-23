<script setup  lang="ts">
import SessionDrinkItem from '../components/SessionDrinkItem.vue'
import DrinkItem from '../components/DrinkItem.vue'
import { useDrinksStore } from '@/stores/drinks'
import { useSessionStore } from '@/stores/session'
import { computed, onMounted } from 'vue';
import { SessionDrinkDto } from '@/resources/api-clients/mdb-api-client';
import { useRoute } from "vue-router";

const store = useDrinksStore();
const route = useRoute();
const getDrinks = computed(() => {
  return store.getDrinks;
});

const sessionStore = useSessionStore();
const getSession = computed(() => {
  return sessionStore.getSession;
});
// const drinks = computed(() => {
//   return store.drinks;
// });
onMounted(async () => {
  // store.fetchUsers();
  await store.fetchDrinks();
  console.log(route?.params);
  await sessionStore.fetchSession(route?.params?.id as any);
});

// await store.fetchDrinks();
</script>

<template>
  <div id="header">
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-12">
          <div class="card-body">
            <h5>Tim Van Roosbroeck</h5>
            <!-- <h5 class="card-title">{{ getSession?. }}</h5> -->
            <div class="d-flex justify-content-between">
              <div><strong>Promile:</strong> {{ getSession?.promile?.toFixed(2) }}%</div>
              <div><strong>{{ getSession?.weight?.toFixed(0) }}Kg</strong> </div>
              <!-- <div>{{ drink?.createdOn?.format("DD/MM hh:mm") }}</div> -->
            </div>
            <div class="d-flex justify-content-between">
              <div></div>
              <div><strong>{{ getSession?.sex ? "Man" : "Vrouw" }}</strong> </div>
              <!-- <div><strong>Volume:</strong> {{ drink?.size }}ml</div> -->
              <!-- <div>{{ drink?.timeRemaining }}</div> -->
            </div>
            <!-- <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
          </div>
        </div>
      </div>
    </div>
    <div class="d-grid mb-2">
      <button class="btn btn-primary" data-bs-target="#myModal" data-bs-toggle="modal" type="button">Nieuwe
        consumptie</button>
    </div>
  </div>
  <div id="content">
    <div v-for="drink in getSession.sessionDrinks" :key="drink.sessionDrinkId">
      <SessionDrinkItem :drink="drink"></SessionDrinkItem>
    </div>
  </div>
  <div class="py-2">
    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Select drink</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" style="height: 70vh; overflow: scroll;">
            <div v-for="drink in getDrinks" :key="drink.drinkId">
              <DrinkItem :drink="drink" :session-id="getSession.sessionId"></DrinkItem>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<style >

</style>

<script setup lang="ts">
import { DrinkDto, SessionDrinkDto } from '@/resources/api-clients/mdb-api-client';
import { useSessionStore } from '@/stores/session';
import { onMounted, reactive } from 'vue';

const props = defineProps<{
    drink: DrinkDto,
    sessionId?: number
}>()
const state = reactive({ alcohol: 0, size: 0 })

const sessionStore = useSessionStore();
onMounted(() => {
    state.alcohol = props?.drink?.alcoholPercentage ?? 0;
    state.size = props?.drink?.defaultSize ?? 0;
})
const greet = () => {
    let sessionDrink = new SessionDrinkDto();
    sessionDrink.sessionId = props.sessionId;
    sessionDrink.drinkId = props.drink.drinkId;
    sessionDrink.alcoholPercentage = state.alcohol;
    sessionDrink.drinkName = props.drink.name;
    sessionDrink.size = state.size;
    sessionStore.addDrink(sessionDrink);
}
</script>
<template>
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-2">
                <img src="@/assets/pngegg.png" class="img-fluid rounded-start drink-img" alt="...">
            </div>
            <div class="col-10">
                <div class="card-body">
                    <h5 class="card-title">{{ drink?.name }}</h5>
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Alcohol</span>
                        <input type="text" class="form-control" v-model="state.alcohol"
                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                        <span class="input-group-text">%</span>
                    </div>
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Volume</span>
                        <input type="text" class="form-control" v-model="state.size" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-sm">
                        <span class="input-group-text">ml</span>
                    </div>
                    <div class="d-flex justify-content-end mt-2">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                            @click="greet">Select</button>

                    </div>
                    <!-- <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.card-body {
    padding-bottom: 0px;
}

.drink-img {
    margin: 10px;
    width: fit-content;
}
</style>
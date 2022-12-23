<script setup lang="ts">
import { DrinkDto, SessionDrinkDto } from '@/resources/api-clients/mdb-api-client';
import { useSessionStore } from '@/stores/session';

const props = defineProps<{
    drink: SessionDrinkDto
}>()
const sessionStore = useSessionStore();
const duplicate = (async () => {
    const newDrink = new SessionDrinkDto;
    newDrink.alcoholPercentage = props.drink?.alcoholPercentage;
    newDrink.drinkId = props.drink?.drinkId;
    newDrink.sessionId = props.drink?.sessionId;
    newDrink.size = props.drink?.size;
    newDrink.drinkName = props.drink?.drinkName;
    await sessionStore.addDrink(newDrink);
});
const deleteDrink = (async () => {
    await sessionStore.deleteDrink(props.drink);
    // const newDrink = new SessionDrinkDto;
    // newDrink.alcoholPercentage = props.drink?.alcoholPercentage;
    // newDrink.drinkId = props.drink?.drinkId;
    // newDrink.size = props.drink?.size;
    // await sessionStore.addDrink(newDrink);
})
</script>
<template>
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-2">
                <img src="@/assets/pngegg.png" class="img-fluid rounded-start drink-img" alt="...">
            </div>
            <div class="col-10">
                <div class="card-body">
                    <h5 class="card-title">{{ drink?.drinkName }}</h5>
                    <div class="d-flex justify-content-between">
                        <div><strong>Alcohol:</strong> {{ drink?.alcoholPercentage }}%</div>
                        <div>{{ drink?.createdOn?.format("DD/MM HH:mm") }}</div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div><strong>Volume:</strong> {{ drink?.size }}ml</div>
                        <div>{{ drink?.timeRemaining }}</div>
                    </div>

                    <div class="d-flex justify-content-end mt-2">
                        <button class="btn btn-primary my-2" @click="duplicate">Dupplicate</button>
                        <button class="btn btn-primary m-2 " @click="deleteDrink">Delete</button>
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
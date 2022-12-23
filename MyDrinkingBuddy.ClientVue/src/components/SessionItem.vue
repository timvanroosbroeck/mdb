<script setup lang="ts">
import type { SessionDto } from '@/resources/api-clients/mdb-api-client';
import router from '@/router';

const props = defineProps<{
    session: SessionDto
}>()
const goToSession = (async () => {
    await router.push(`/session/${props.session.sessionId}`);
    // await router.push({ name: `session/`, query: { sessionId: props.session } });
})
</script>
<template>
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-12">
                <div class="card-body">
                    <h5 class="card-title"> {{ session.createdOn?.format("DD/MM/YYYY HH:mm") }}</h5>
                    <div class="d-flex justify-content-between">
                        <div><strong>number of drinks:</strong> </div>
                        <div>{{ session.sessionDrinks?.length }}</div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div><strong>Max promile:</strong></div>
                        <div>x</div>
                    </div>
                    <div class="d-flex justify-content-between" v-if="session.open">
                        <div><strong>Current promile:</strong></div>
                        <div>{{ session.promile?.toFixed(2) }}</div>
                    </div>
                    <div class="d-flex justify-content-end mt-2" v-if="session.open">
                        <button class="btn btn-primary my-2" @click="goToSession">Continue</button>
                    </div>

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
<script setup lang="ts">
import type { SessionDto } from '@/resources/api-clients/mdb-api-client';
import router from '@/router';
import { useSessionStore } from '@/stores/session';

const props = defineProps<{
    session: SessionDto
}>()

const sessionStore = useSessionStore();

const goToSession = (async () => {
    await router.push(`/session/${props.session.sessionId}`);
    // await router.push({ name: `session/`, query: { sessionId: props.session } });
})

const deleteSession = (async () => {
    await sessionStore.deleteSession(props?.session?.sessionId ?? 0)
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
                    <div class="d-flex justify-content-end">
                        <button class="btn btn-primary my-2" v-if="session.open" @click="goToSession">Continue</button>
                        <button class="btn btn-primary my-2" v-else @click="goToSession">View</button>
                        <button class="btn btn-primary my-2 mx-2" v-if="(session?.sessionDrinks?.length ?? 0) === 0"
                            @click="deleteSession">Delete</button>
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
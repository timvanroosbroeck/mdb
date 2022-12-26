<script setup  lang="ts">
import { useUserStore } from '@/stores/user'
import { computed, onMounted } from 'vue';

const userStore = useUserStore();
const getUser = computed(() => {
    return userStore.getUser;
});

onMounted(async () => {
    await userStore.fetchUser()
});
const updateUser = (async () => {
    await userStore.updateUser();
});
</script>
<template>
    <div id="header">
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-12">
                    <div class="card-body">
                        <h5>{{ getUser.firstName }} {{ getUser.lastName }}</h5>
                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Weight</span>
                            <input type="number" class="form-control" v-model="getUser.weight"
                                aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                            <span class="input-group-text">Kg</span>
                        </div>
                        <div class="input-group input-group-sm mb-3">
                            <label class="input-group-text" for="inputGroupSelect01">Sex</label>
                            <select class="form-select" id="inputGroupSelect01" v-model="getUser.sex">
                                <option value="false">Female</option>
                                <option value="true">Male</option>
                            </select>
                        </div>
                        <div class="d-grid mb-2">
                            <button class="btn btn-primary" type="button" @click="updateUser">Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
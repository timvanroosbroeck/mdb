
<template>
    <!-- <button @click="login" class="btn btn-primary">Login</button> -->

    <div class="d-grid my-2">
        <button class="btn btn-primary" @click="login">Microsoft</button>

    </div>
</template>

<script setup lang="ts">
import { useMsal } from '@/resources/authentication/useMsal';
import { loginRequest } from "@/resources/authentication/authConfig";
const { instance } = useMsal();
// const loginPopup = () => {
//     instance.loginPopup(loginRequest);
// }

const login = () => {
    console.log("login");
    (<any>loginRequest).authority = import.meta.env.VITE_AZURE_AD_AUTHORITY_MS
    instance.loginRedirect(loginRequest);
}
</script>
<style  lang="scss">

</style>

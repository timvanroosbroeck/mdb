import { createApp } from "vue";
import { createPinia } from "pinia";
import "bottom-navigation-vue/dist/style.css";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.config.globalProperties.ApiUrl = "https://localhost:5001";
app.use(router);
app.mount("#app");

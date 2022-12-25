import { createApp } from "vue";
import { createPinia } from "pinia";
import "bottom-navigation-vue/dist/style.css";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./assets/main.css";
import { msalPlugin } from "./plugins/msalPlugin";
import { msalInstance } from "./resources/authentication/authConfig";
import { useIsAuthenticated } from "./resources/authentication/useIsAuthenticated";
const app = createApp(App);

app.use(createPinia());
app.use(msalPlugin, msalInstance);
app.use(router);

app.mount("#app");

import { createRouter, createWebHistory } from "vue-router";
import SessionView from "../views/SessionView.vue";
import HistoryView from "../views/HistoryView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/session/:id",
      name: "session",
      component: SessionView,
      props: true,
    },
    {
      path: "/",
      name: "history",
      component: HistoryView,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
  ],
});

export default router;

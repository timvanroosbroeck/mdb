import { DrinkDto, DrinksClient } from "@/resources/api-clients/mdb-api-client";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDrinksStore = defineStore("drinks", {
  state: () => ({
    drinks: [],
  }),
  getters: {
    getDrinks(state): DrinkDto[] {
      return state.drinks;
    },
  },
  actions: {
    async fetchDrinks() {
      try {
        const client = new DrinksClient();
        const data = await client.getAll();
        this.drinks = data as any;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

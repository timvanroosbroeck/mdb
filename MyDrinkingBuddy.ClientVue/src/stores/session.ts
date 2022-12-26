import {
  SessionClient,
  SessionDrinkDto,
  SessionDto,
} from "@/resources/api-clients/mdb-api-client";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSessionStore = defineStore("session", {
  state: () => ({
    session: new SessionDto(),
    sessions: [] as SessionDto[],
  }),
  getters: {
    getSessions(state): SessionDto[] {
      return state.sessions;
    },
    getSession(state): SessionDto {
      return state.session;
    },
    getDrinks(state): SessionDrinkDto[] {
      return state.session.sessionDrinks as any;
    },
  },
  actions: {
    async fetchSession(sessionId: number) {
      try {
        const client = new SessionClient();
        const data = await client.get(sessionId);
        this.session = data as any;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchSessions() {
      try {
        const client = new SessionClient();
        const data = await client.getAll();
        this.sessions = data;
      } catch (error) {
        console.log(error);
      }
    },
    async addDrink(drink: SessionDrinkDto) {
      try {
        const client = new SessionClient();
        await client.saveDrink(drink);
        await this.fetchSession(drink.sessionId as number);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteSession(sessionId: number) {
      const client = new SessionClient();
      await client.deleteSession(sessionId);
      await this.fetchSessions();
    },
    async deleteDrink(drink: SessionDrinkDto) {
      const client = new SessionClient();
      await client.deleteDrink(drink);
      await this.fetchSession(drink.sessionId as number);
    },
    async createSession(): Promise<number> {
      try {
        const client = new SessionClient();
        const sId = await client.newSession();
        return sId;
      } catch (error) {
        console.log(error);
      }
      return 0;
    },
  },
});

import { UserClient, UserDto } from "@/resources/api-clients/mdb-api-client";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: new UserDto(),
  }),
  getters: {
    getUser(state): UserDto {
      return state.user;
    },
  },
  actions: {
    async fetchUser() {
      const client = new UserClient();
      const data = await client.get();
      this.user = data as any;
    },

    async updateUser() {
      const client = new UserClient();
      this.user.sex = (this.user.sex as any) == "true" ? true : false;
      await client.update(this.user);
    },
  },
});

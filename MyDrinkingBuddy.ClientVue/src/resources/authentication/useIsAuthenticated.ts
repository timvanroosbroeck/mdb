import * as vue from "vue";
import { useMsal } from "./useMsal";

export function useIsAuthenticated(): vue.Ref<boolean> {
  const { accounts } = useMsal();
  const isAuthenticated = vue.ref(accounts.value.length > 0);

  vue.watch(accounts, () => {
    isAuthenticated.value = accounts.value.length > 0;
  });

  return isAuthenticated;
}

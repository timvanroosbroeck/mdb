import * as vue from "vue";
import { useMsal } from "./useMsal";

export function useIsAuthenticated(): vue.Ref<boolean> {
  const { accounts } = useMsal();
  const isAuthenticated = vue.ref(accounts.value.length > 0);
  console.log(accounts);

  vue.watch(accounts, () => {
    isAuthenticated.value = accounts.value.length > 0;
    console.log(isAuthenticated);
    console.log(accounts);
  });

  return isAuthenticated;
}

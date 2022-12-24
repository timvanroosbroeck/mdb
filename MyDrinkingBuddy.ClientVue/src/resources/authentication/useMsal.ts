import * as msalBrowser from "@azure/msal-browser";
import * as vue from "vue";

export type MsalContext = {
  instance: msalBrowser.PublicClientApplication;
  accounts: vue.Ref<msalBrowser.AccountInfo[]>;
  inProgress: vue.Ref<msalBrowser.InteractionStatus>;
};

export function useMsal(): MsalContext {
  const internalInstance = vue.getCurrentInstance();
  if (!internalInstance) {
    throw "useMsal() cannot be called outside the setup() function of a component";
  }
  const { instance, accounts, inProgress } = vue.toRefs(
    internalInstance.appContext.config.globalProperties.$msal
  );

  if (!instance || !accounts || !inProgress) {
    throw "Please install the msalPlugin";
  }

  if (inProgress.value === msalBrowser.InteractionStatus.Startup) {
    instance.value.handleRedirectPromise().catch(() => {
      // Errors should be handled by listening to the LOGIN_FAILURE event
      return;
    });
  }

  return {
    instance: instance.value,
    accounts,
    inProgress,
  };
}

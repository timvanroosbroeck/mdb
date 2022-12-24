import * as vue from "vue";
import * as msalBrowser from "@azure/msal-browser";

type AccountIdentifiers = Partial<
  Pick<msalBrowser.AccountInfo, "homeAccountId" | "localAccountId" | "username">
>;

/**
 * Helper function to determine whether 2 arrays are equal
 * Used to avoid unnecessary state updates
 * @param arrayA
 * @param arrayB
 */
function accountArraysAreEqual(
  arrayA: Array<AccountIdentifiers>,
  arrayB: Array<AccountIdentifiers>
): boolean {
  if (arrayA.length !== arrayB.length) {
    return false;
  }

  const comparisonArray = [...arrayB];

  return arrayA.every((elementA) => {
    const elementB = comparisonArray.shift();
    if (!elementA || !elementB) {
      return false;
    }

    return (
      elementA.homeAccountId === elementB.homeAccountId &&
      elementA.localAccountId === elementB.localAccountId &&
      elementA.username === elementB.username
    );
  });
}

export const msalPlugin = {
  install: (
    app: vue.App,
    msalInstance: msalBrowser.PublicClientApplication
  ) => {
    const inProgress = msalBrowser.InteractionStatus.Startup;
    const accounts = msalInstance.getAllAccounts();

    const state = vue.reactive({
      instance: msalInstance,
      inProgress: inProgress,
      accounts: accounts,
    });

    app.config.globalProperties.$msal = state;

    msalInstance.addEventCallback((message: msalBrowser.EventMessage) => {
      switch (message.eventType) {
        case msalBrowser.EventType.ACCOUNT_ADDED:
        case msalBrowser.EventType.ACCOUNT_REMOVED:
        case msalBrowser.EventType.LOGIN_SUCCESS:
        case msalBrowser.EventType.SSO_SILENT_SUCCESS:
        case msalBrowser.EventType.HANDLE_REDIRECT_END:
        case msalBrowser.EventType.LOGIN_FAILURE:
        case msalBrowser.EventType.SSO_SILENT_FAILURE:
        case msalBrowser.EventType.LOGOUT_END:
        case msalBrowser.EventType.ACQUIRE_TOKEN_SUCCESS:
        case msalBrowser.EventType.ACQUIRE_TOKEN_FAILURE:
          const currentAccounts = msalInstance.getAllAccounts();
          if (!accountArraysAreEqual(currentAccounts, state.accounts)) {
            state.accounts = currentAccounts;
          }
          break;
      }

      const status =
        msalBrowser.EventMessageUtils.getInteractionStatusFromEvent(
          message,
          state.inProgress
        );
      if (status !== null) {
        state.inProgress = status;
      }
    });
  },
};

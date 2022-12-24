import * as msalBrowser from "@azure/msal-browser";
import * as vue from "vue";
import { useMsal } from "./useMsal";

export type MsalAuthenticationResult = {
  acquireToken: Function;
  result: vue.Ref<msalBrowser.AuthenticationResult | null>;
  error: vue.Ref<msalBrowser.AuthError | null>;
  inProgress: vue.Ref<boolean>;
};

export function useMsalAuthentication(
  interactionType: msalBrowser.InteractionType,
  request:
    | msalBrowser.PopupRequest
    | msalBrowser.RedirectRequest
    | msalBrowser.SilentRequest
): MsalAuthenticationResult {
  const { instance, inProgress } = useMsal();

  const localInProgress = vue.ref<boolean>(false);
  const result = vue.ref<msalBrowser.AuthenticationResult | null>(null);
  const error = vue.ref<msalBrowser.AuthError | null>(null);

  const acquireToken = async (
    requestOverride?:
      | msalBrowser.PopupRequest
      | msalBrowser.RedirectRequest
      | msalBrowser.SilentRequest
  ) => {
    if (!localInProgress.value) {
      localInProgress.value = true;
      const tokenRequest = requestOverride || request;

      if (
        inProgress.value === msalBrowser.InteractionStatus.Startup ||
        inProgress.value === msalBrowser.InteractionStatus.HandleRedirect
      ) {
        try {
          const response = await instance.handleRedirectPromise();
          if (response) {
            result.value = response;
            error.value = null;
            return;
          }
        } catch (e) {
          result.value = null;
          error.value = e as msalBrowser.AuthError;
          return;
        }
      }

      try {
        const response = await instance.acquireTokenSilent(tokenRequest);
        result.value = response;
        error.value = null;
      } catch (e) {
        if (inProgress.value !== msalBrowser.InteractionStatus.None) {
          return;
        }

        if (interactionType === msalBrowser.InteractionType.Popup) {
          instance
            .loginPopup(tokenRequest)
            .then((response) => {
              result.value = response;
              error.value = null;
            })
            .catch((e) => {
              error.value = e;
              result.value = null;
            });
        } else if (interactionType === msalBrowser.InteractionType.Redirect) {
          await instance.loginRedirect(tokenRequest).catch((e) => {
            error.value = e;
            result.value = null;
          });
        }
      }
      localInProgress.value = false;
    }
  };

  const stopWatcher = vue.watch(inProgress, () => {
    if (!result && !error) {
      acquireToken();
    } else {
      stopWatcher();
    }
  });

  acquireToken();

  return {
    acquireToken,
    result,
    error,
    inProgress: localInProgress,
  };
}

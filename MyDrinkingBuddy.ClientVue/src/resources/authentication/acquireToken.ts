import type { PublicClientApplication } from "@azure/msal-browser";

export async function acquireToken(msalInstance: PublicClientApplication) {
  console.log(msalInstance.getAllAccounts());
  const request = {
    account: msalInstance.getAllAccounts()[0],
    scopes: ["openid", "email", "profile", import.meta.env.VITE_AZURE_AD_SCOPE],
  };
  try {
    const response = await msalInstance.acquireTokenSilent(request);
    return response.accessToken;
  } catch (error) {
    // if (error instanceof msal.InteractionRequiredAuthError) {
    //   return msalInstance.acquireTokenPopup(request).catch((popupError) => {
    //     console.error(popupError);
    //   });
    // }
    return null;
  }
}

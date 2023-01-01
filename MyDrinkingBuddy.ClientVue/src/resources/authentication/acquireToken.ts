import type {
  PublicClientApplication,
  SilentRequest,
} from "@azure/msal-browser";

export async function acquireToken(msalInstance: PublicClientApplication) {
  if (
    msalInstance.getAllAccounts()[0]?.idTokenClaims?.tfp == undefined ||
    msalInstance.getAllAccounts()[0]?.idTokenClaims?.tfp == null
  )
    return null;

  const request: SilentRequest = {
    account: msalInstance.getAllAccounts()[0],
    authority: (import.meta.env.VITE_AZURE_AD_AUTHORITY_PREFIX +
      msalInstance.getAllAccounts()[0]?.idTokenClaims?.tfp) as string,
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

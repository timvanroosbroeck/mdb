import { LogLevel, PublicClientApplication } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_AD_CLIENTID,
    // authority: import.meta.env.VITE_AZURE_AD_AUTHORITY_GOOGLE,
    knownAuthorities: ["mdbprod.b2clogin.com"],
    redirectUri: import.meta.env.VITE_AZURE_AD_REDIRECT_URI, // Must be registered as a SPA redirectURI on your app registration
    postLogoutRedirectUri: import.meta.env
      .VITE_AZURE_AD_POST_LOGOUT_REDIRECT_URI, // Must be registered as a SPA redirectURI on your app registration
  },
  cache: {
    cacheLocation: "localStorage",
  },
  system: {
    loggerOptions: {
      loggerCallback: (
        level: LogLevel,
        message: string,
        containsPii: boolean
      ) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
      logLevel: LogLevel.Warning,
    },
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ["openid", "email", import.meta.env.VITE_AZURE_AD_SCOPE],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

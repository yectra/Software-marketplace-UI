import { LogLevel } from '@azure/msal-browser';

export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_Softwaremarketplace',
  },
  authorities: {
    signUpSignIn: {
      authority:
        "https://roosyectrastore.b2clogin.com/roosYectraStore.onmicrosoft.com/B2C_1_Softwaremarketplace",
    },
  },
  authorityDomain: "roosyectrastore.b2clogin.com",
};

export const msalConfig = {
  auth: {
    clientId: "372ec708-eade-43d1-aaa8-749bf95aed73",
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: '/developer',
    postLogoutRedirectUri: '/developer',
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: any, containsPii: any) => {
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
    },
  }, 
};


export const loginRequest = {
  scopes: ["https://roosYectraStore.onmicrosoft.com/softwaremarketplace/tasks.write", "openid", "profile", "offline_access"],

};
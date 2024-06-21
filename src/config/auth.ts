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
    clientId: "600309b2-0299-4680-adf3-13895f79b9f2",
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
  scopes: ['openid', 'profile', 'https://roosYectraStore.onmicrosoft.com/600309b2-0299-4680-adf3-13895f79b9f2/user.read'], //  actual scope
};
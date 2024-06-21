import { loginRequest } from '../../config/auth';

import { PublicClientApplication, InteractionStatus } from '@azure/msal-browser';

export const signInUser = async (
  instance: PublicClientApplication, 
  inProgress: InteractionStatus, 
  isAuthenticated: boolean
) => {
  try {
    if (inProgress === InteractionStatus.None && !isAuthenticated) {
      await instance.loginRedirect(loginRequest);
    }
  } catch (e) {
    console.error('Login redirect error:', e);
  }
};

export const signOutUser = (
  instance: PublicClientApplication, 
  postLogoutRedirectUri: string = "/"
): void => {
  instance.logoutRedirect({
    postLogoutRedirectUri: postLogoutRedirectUri,
  });
};
// AuthHelper.ts
export const getUserEmailFromMsal = (accounts: any[]) => {
    if (accounts.length > 0) {
      const account = accounts[0];
      return account.username;
    }
    return '';
  };
  
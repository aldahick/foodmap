import { atom, useAtom } from "jotai";
import { IAuthTokenFragment, IPermission } from "../sdk/graphql.types";
import { isAuthorized } from "../util/permission.js";

const STORAGE_KEY = "cfbp.authToken";
const getFromStorage = () => {
  const storedValue = localStorage.getItem(STORAGE_KEY);
  if (!storedValue) {
    return;
  }
  const storedToken: IAuthTokenFragment = JSON.parse(storedValue);
  const expiresAt = new Date(storedToken.expiresAt);
  if (Date.now() > expiresAt.getTime()) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }
  return storedToken;
};

const authTokenAtom = atom<IAuthTokenFragment | undefined>(getFromStorage());

export const useAuth = () => {
  const [authToken, setAuthToken] = useAtom(authTokenAtom);

  return {
    set: (value: IAuthTokenFragment | undefined) => {
      setAuthToken(value);
      if (value) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    },
    token: authToken,
    isAuthorized: (permission: IPermission) =>
      authToken && isAuthorized(authToken.user.permissions, permission),
  };
};

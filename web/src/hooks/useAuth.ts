import { atom, useAtom } from "jotai";
import { AuthTokenFragment, Permission } from "../sdk/gql/graphql.js";
import { isAuthorized } from "../util/permission.js";

const STORAGE_KEY = "cfbp.authToken";
const getFromStorage = () => {
  const storedValue = localStorage.getItem(STORAGE_KEY);
  if (!storedValue) {
    return;
  }
  const storedToken: AuthTokenFragment = JSON.parse(storedValue);
  const expiresAt = new Date(storedToken.expiresAt);
  if (Date.now() > expiresAt.getTime()) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }
  return storedToken;
};

const authTokenAtom = atom<AuthTokenFragment | undefined>(getFromStorage());

export const useAuth = () => {
  const [authToken, setAuthToken] = useAtom(authTokenAtom);

  return {
    set: (value: AuthTokenFragment | undefined) => {
      setAuthToken(value);
      if (value) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    },
    token: authToken,
    isAuthorized: (permission: Permission) =>
      authToken && isAuthorized(authToken.user.permissions, permission),
  };
};

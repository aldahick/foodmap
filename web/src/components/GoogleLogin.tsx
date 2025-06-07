import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import googleSigninImageUrl from "../images/google-signin.svg";
import {
  IAuthTokenFragment,
  useGetAuthSsoRedirectQuery,
  useGetAuthTokenLazyQuery,
} from "../sdk/graphql.types";

const SSO_STATE_KEY = "bartop.ssoState";

export const GoogleLogin: React.FC<{
  onLogin: (token: IAuthTokenFragment) => void;
}> = ({ onLogin }) => {
  const [getAuthToken] = useGetAuthTokenLazyQuery();
  const { data } = useGetAuthSsoRedirectQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const [ssoStart, setSsoStart] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");
    const state = searchParams.get("state");
    const storedState = localStorage.getItem(SSO_STATE_KEY);
    if (!(state && token)) {
      return;
    }
    if (!storedState || state !== storedState) {
      setSearchParams({});
      return;
    }
    setSearchParams({});
    getAuthToken({ variables: { token } }).then(({ data }) => {
      if (data) {
        onLogin(data.authToken);
      }
    });
  }, [searchParams, getAuthToken, onLogin, setSearchParams]);

  useEffect(() => {
    if (data && ssoStart) {
      localStorage.setItem(SSO_STATE_KEY, data.redirect.state);
      window.location.href = data.redirect.url;
    }
  }, [data, ssoStart]);

  return (
    <button type="button" onClick={() => setSsoStart(true)}>
      <img
        className="cursor-pointer"
        src={googleSigninImageUrl}
        alt="Sign in with Google"
      />
    </button>
  );
};

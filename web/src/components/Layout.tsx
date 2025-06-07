import { ApolloProvider } from "@apollo/client";
import type React from "react";
import { useMemo } from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { getApolloClient } from "../sdk/graphql.client";

export const Layout: React.FC = () => {
  const auth = useAuth();
  const client = useMemo(
    () => getApolloClient(auth.token?.token),
    [auth.token?.token],
  );

  return (
    <ApolloProvider client={client}>
      <Outlet />
      <ToastContainer />
    </ApolloProvider>
  );
};

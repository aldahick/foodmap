import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { toast } from "react-toastify";
import { config } from "../config";

export const getApolloClient = (authToken?: string) => {
  const errorLink = new ErrorLink(({ error, operation }) => {
    console.error(`GraphQL request ${operation.operationName} failed`, {
      error,
    });
    if (error) {
      toast(error.message, { type: "error" });
    }
  });

  const httpLink = new HttpLink({
    uri: `${config.apiUrl}/graphql`,
    ...(authToken ? { headers: { Authorization: `Bearer ${authToken}` } } : {}),
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, httpLink]),
  });
};

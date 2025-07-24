import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { toast } from "react-toastify";
import { config } from "../config";

export const getApolloClient = (authToken?: string) => {
  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    console.error(`GraphQL request ${operation.operationName} failed`, {
      graphQLErrors,
      networkError,
    });
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        toast(error.message, { type: "error" });
      }
    }
    if (networkError) {
      toast(networkError.message, { type: "error" });
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

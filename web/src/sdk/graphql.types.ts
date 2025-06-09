import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: string; output: string };
};

export type IAuthRedirect = {
  __typename?: "AuthRedirect";
  state: Scalars["String"]["output"];
  url: Scalars["String"]["output"];
};

export type IAuthToken = {
  __typename?: "AuthToken";
  expiresAt: Scalars["Date"]["output"];
  token: Scalars["String"]["output"];
  user: IUser;
  userId: Scalars["ID"]["output"];
};

export type IFoodbox = {
  __typename?: "Foodbox";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  position: IPosition;
  state: IFoodboxState;
};

export type IFoodboxInput = {
  name: Scalars["String"]["input"];
  position: IPositionInput;
  state: IFoodboxState;
};

export enum IFoodboxState {
  ConfirmedEmpty = "CONFIRMED_EMPTY",
  Full = "FULL",
  ReportedEmpty = "REPORTED_EMPTY",
}

export type IMutation = {
  __typename?: "Mutation";
  deleteFoodbox: Scalars["Boolean"]["output"];
  deleteUser: Scalars["Boolean"]["output"];
  reportFoodboxEmpty: Scalars["Boolean"]["output"];
  upsertFoodbox: IFoodbox;
  upsertUser: Scalars["Boolean"]["output"];
};

export type IMutationDeleteFoodboxArgs = {
  id: Scalars["ID"]["input"];
};

export type IMutationDeleteUserArgs = {
  id: Scalars["ID"]["input"];
};

export type IMutationReportFoodboxEmptyArgs = {
  id: Scalars["ID"]["input"];
};

export type IMutationUpsertFoodboxArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  input: IFoodboxInput;
};

export type IMutationUpsertUserArgs = {
  params: IUpsertUserParams;
};

export enum IPermission {
  All = "ALL",
  Foodboxes = "FOODBOXES",
  Users = "USERS",
}

export type IPosition = {
  __typename?: "Position";
  lat: Scalars["Float"]["output"];
  lng: Scalars["Float"]["output"];
};

export type IPositionInput = {
  lat: Scalars["Float"]["input"];
  lng: Scalars["Float"]["input"];
};

export type IQuery = {
  __typename?: "Query";
  authSsoRedirect: IAuthRedirect;
  authToken: IAuthToken;
  foodboxes: IFoodbox[];
  user: IUser;
  users: IUser[];
};

export type IQueryAuthTokenArgs = {
  token: Scalars["String"]["input"];
};

export type IUpsertUserParams = {
  email: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["ID"]["input"]>;
  name: Scalars["String"]["input"];
  permissions?: InputMaybe<IPermission[]>;
};

export type IUser = {
  __typename?: "User";
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  permissions: IPermission[];
};

export type IGetAuthSsoRedirectQueryVariables = Exact<{ [key: string]: never }>;

export type IGetAuthSsoRedirectQuery = {
  __typename?: "Query";
  redirect: { __typename?: "AuthRedirect"; url: string; state: string };
};

export type IGetAuthTokenQueryVariables = Exact<{
  token: Scalars["String"]["input"];
}>;

export type IGetAuthTokenQuery = {
  __typename?: "Query";
  authToken: {
    __typename?: "AuthToken";
    expiresAt: string;
    token: string;
    user: { __typename?: "User"; permissions: IPermission[] };
  };
};

export type IAuthTokenFragment = {
  __typename?: "AuthToken";
  expiresAt: string;
  token: string;
  user: { __typename?: "User"; permissions: IPermission[] };
};

export type IGetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type IGetUsersQuery = {
  __typename?: "Query";
  users: Array<{
    __typename?: "User";
    id: string;
    name: string;
    email: string;
    permissions: IPermission[];
  }>;
};

export type IUpsertUserMutationVariables = Exact<{
  params: IUpsertUserParams;
}>;

export type IUpsertUserMutation = {
  __typename?: "Mutation";
  upsertUser: boolean;
};

export type IDeleteUserMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type IDeleteUserMutation = {
  __typename?: "Mutation";
  deleteUser: boolean;
};

export const AuthTokenFragmentDoc = gql`
    fragment AuthToken on AuthToken {
  expiresAt
  token
  user {
    permissions
  }
}
    `;
export const GetAuthSsoRedirectDocument = gql`
    query getAuthSsoRedirect {
  redirect: authSsoRedirect {
    url
    state
  }
}
    `;

/**
 * __useGetAuthSsoRedirectQuery__
 *
 * To run a query within a React component, call `useGetAuthSsoRedirectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthSsoRedirectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthSsoRedirectQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAuthSsoRedirectQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IGetAuthSsoRedirectQuery,
    IGetAuthSsoRedirectQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    IGetAuthSsoRedirectQuery,
    IGetAuthSsoRedirectQueryVariables
  >(GetAuthSsoRedirectDocument, options);
}
export function useGetAuthSsoRedirectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IGetAuthSsoRedirectQuery,
    IGetAuthSsoRedirectQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    IGetAuthSsoRedirectQuery,
    IGetAuthSsoRedirectQueryVariables
  >(GetAuthSsoRedirectDocument, options);
}
export function useGetAuthSsoRedirectSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        IGetAuthSsoRedirectQuery,
        IGetAuthSsoRedirectQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    IGetAuthSsoRedirectQuery,
    IGetAuthSsoRedirectQueryVariables
  >(GetAuthSsoRedirectDocument, options);
}
export type GetAuthSsoRedirectQueryHookResult = ReturnType<
  typeof useGetAuthSsoRedirectQuery
>;
export type GetAuthSsoRedirectLazyQueryHookResult = ReturnType<
  typeof useGetAuthSsoRedirectLazyQuery
>;
export type GetAuthSsoRedirectSuspenseQueryHookResult = ReturnType<
  typeof useGetAuthSsoRedirectSuspenseQuery
>;
export type GetAuthSsoRedirectQueryResult = Apollo.QueryResult<
  IGetAuthSsoRedirectQuery,
  IGetAuthSsoRedirectQueryVariables
>;
export const GetAuthTokenDocument = gql`
    query getAuthToken($token: String!) {
  authToken(token: $token) {
    ...AuthToken
  }
}
    ${AuthTokenFragmentDoc}`;

/**
 * __useGetAuthTokenQuery__
 *
 * To run a query within a React component, call `useGetAuthTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGetAuthTokenQuery(
  baseOptions: Apollo.QueryHookOptions<
    IGetAuthTokenQuery,
    IGetAuthTokenQueryVariables
  > &
    (
      | { variables: IGetAuthTokenQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IGetAuthTokenQuery, IGetAuthTokenQueryVariables>(
    GetAuthTokenDocument,
    options,
  );
}
export function useGetAuthTokenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IGetAuthTokenQuery,
    IGetAuthTokenQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IGetAuthTokenQuery, IGetAuthTokenQueryVariables>(
    GetAuthTokenDocument,
    options,
  );
}
export function useGetAuthTokenSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        IGetAuthTokenQuery,
        IGetAuthTokenQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    IGetAuthTokenQuery,
    IGetAuthTokenQueryVariables
  >(GetAuthTokenDocument, options);
}
export type GetAuthTokenQueryHookResult = ReturnType<
  typeof useGetAuthTokenQuery
>;
export type GetAuthTokenLazyQueryHookResult = ReturnType<
  typeof useGetAuthTokenLazyQuery
>;
export type GetAuthTokenSuspenseQueryHookResult = ReturnType<
  typeof useGetAuthTokenSuspenseQuery
>;
export type GetAuthTokenQueryResult = Apollo.QueryResult<
  IGetAuthTokenQuery,
  IGetAuthTokenQueryVariables
>;
export const GetUsersDocument = gql`
    query getUsers {
  users {
    id
    name
    email
    permissions
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IGetUsersQuery,
    IGetUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IGetUsersQuery, IGetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IGetUsersQuery,
    IGetUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IGetUsersQuery, IGetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export function useGetUsersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<IGetUsersQuery, IGetUsersQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<IGetUsersQuery, IGetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>;
export type GetUsersSuspenseQueryHookResult = ReturnType<
  typeof useGetUsersSuspenseQuery
>;
export type GetUsersQueryResult = Apollo.QueryResult<
  IGetUsersQuery,
  IGetUsersQueryVariables
>;
export const UpsertUserDocument = gql`
    mutation upsertUser($params: UpsertUserParams!) {
  upsertUser(params: $params)
}
    `;
export type IUpsertUserMutationFn = Apollo.MutationFunction<
  IUpsertUserMutation,
  IUpsertUserMutationVariables
>;

/**
 * __useUpsertUserMutation__
 *
 * To run a mutation, you first call `useUpsertUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertUserMutation, { data, loading, error }] = useUpsertUserMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useUpsertUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IUpsertUserMutation,
    IUpsertUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IUpsertUserMutation, IUpsertUserMutationVariables>(
    UpsertUserDocument,
    options,
  );
}
export type UpsertUserMutationHookResult = ReturnType<
  typeof useUpsertUserMutation
>;
export type UpsertUserMutationResult =
  Apollo.MutationResult<IUpsertUserMutation>;
export type UpsertUserMutationOptions = Apollo.BaseMutationOptions<
  IUpsertUserMutation,
  IUpsertUserMutationVariables
>;
export const DeleteUserDocument = gql`
    mutation deleteUser($id: ID!) {
  deleteUser(id: $id)
}
    `;
export type IDeleteUserMutationFn = Apollo.MutationFunction<
  IDeleteUserMutation,
  IDeleteUserMutationVariables
>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IDeleteUserMutation,
    IDeleteUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IDeleteUserMutation, IDeleteUserMutationVariables>(
    DeleteUserDocument,
    options,
  );
}
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>;
export type DeleteUserMutationResult =
  Apollo.MutationResult<IDeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<
  IDeleteUserMutation,
  IDeleteUserMutationVariables
>;

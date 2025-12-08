/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
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
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: string; output: string };
};

export type AuthRedirect = {
  __typename?: "AuthRedirect";
  state: Scalars["String"]["output"];
  url: Scalars["String"]["output"];
};

export type AuthToken = {
  __typename?: "AuthToken";
  expiresAt: Scalars["Date"]["output"];
  token: Scalars["String"]["output"];
  user: User;
  userId: Scalars["ID"]["output"];
};

export type Foodbox = {
  __typename?: "Foodbox";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  position: Position;
  state: FoodboxState;
};

export type FoodboxInput = {
  name: Scalars["String"]["input"];
  position: PositionInput;
  state: FoodboxState;
};

export enum FoodboxState {
  ConfirmedEmpty = "CONFIRMED_EMPTY",
  Full = "FULL",
  ReportedEmpty = "REPORTED_EMPTY",
}

export type Mutation = {
  __typename?: "Mutation";
  deleteFoodbox: Scalars["Boolean"]["output"];
  deleteUser: Scalars["Boolean"]["output"];
  reportFoodboxEmpty: Scalars["Boolean"]["output"];
  upsertFoodbox: Foodbox;
  upsertUser: Scalars["Boolean"]["output"];
};

export type MutationDeleteFoodboxArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteUserArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationReportFoodboxEmptyArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationUpsertFoodboxArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  input: FoodboxInput;
};

export type MutationUpsertUserArgs = {
  params: UpsertUserParams;
};

export enum Permission {
  All = "ALL",
  Foodboxes = "FOODBOXES",
  Users = "USERS",
}

export type Position = {
  __typename?: "Position";
  lat: Scalars["Float"]["output"];
  lng: Scalars["Float"]["output"];
};

export type PositionInput = {
  lat: Scalars["Float"]["input"];
  lng: Scalars["Float"]["input"];
};

export type Query = {
  __typename?: "Query";
  authSsoRedirect: AuthRedirect;
  authToken: AuthToken;
  foodboxes: Foodbox[];
  user: User;
  users: User[];
};

export type QueryAuthTokenArgs = {
  token: Scalars["String"]["input"];
};

export type UpsertUserParams = {
  email: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["ID"]["input"]>;
  name: Scalars["String"]["input"];
  permissions?: InputMaybe<Permission[]>;
};

export type User = {
  __typename?: "User";
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  permissions: Permission[];
};

export type GetAuthSsoRedirectQueryVariables = Exact<{ [key: string]: never }>;

export type GetAuthSsoRedirectQuery = {
  __typename?: "Query";
  redirect: { __typename?: "AuthRedirect"; url: string; state: string };
};

export type GetAuthTokenQueryVariables = Exact<{
  token: Scalars["String"]["input"];
}>;

export type GetAuthTokenQuery = {
  __typename?: "Query";
  authToken: { __typename?: "AuthToken" } & {
    " $fragmentRefs"?: { AuthTokenFragment: AuthTokenFragment };
  };
};

export type AuthTokenFragment = {
  __typename?: "AuthToken";
  expiresAt: string;
  token: string;
  user: { __typename?: "User"; permissions: Permission[] };
} & { " $fragmentName"?: "AuthTokenFragment" };

export type GetFoodboxesQueryVariables = Exact<{ [key: string]: never }>;

export type GetFoodboxesQuery = {
  __typename?: "Query";
  foodboxes: Array<{
    __typename?: "Foodbox";
    id: string;
    name: string;
    state: FoodboxState;
    position: { __typename?: "Position"; lat: number; lng: number };
  }>;
};

export type UpsertFoodboxMutationVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]["input"]>;
  input: FoodboxInput;
}>;

export type UpsertFoodboxMutation = {
  __typename?: "Mutation";
  upsertFoodbox: {
    __typename?: "Foodbox";
    id: string;
    name: string;
    state: FoodboxState;
    position: { __typename?: "Position"; lat: number; lng: number };
  };
};

export type DeleteFoodboxMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteFoodboxMutation = {
  __typename?: "Mutation";
  deleteFoodbox: boolean;
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = {
  __typename?: "Query";
  users: Array<{
    __typename?: "User";
    id: string;
    name: string;
    email: string;
    permissions: Permission[];
  }>;
};

export type UpsertUserMutationVariables = Exact<{
  params: UpsertUserParams;
}>;

export type UpsertUserMutation = {
  __typename?: "Mutation";
  upsertUser: boolean;
};

export type DeleteUserMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteUserMutation = {
  __typename?: "Mutation";
  deleteUser: boolean;
};

export const AuthTokenFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AuthToken" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AuthToken" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "expiresAt" } },
          { kind: "Field", name: { kind: "Name", value: "token" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "permissions" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AuthTokenFragment, unknown>;
export const GetAuthSsoRedirectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getAuthSsoRedirect" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            alias: { kind: "Name", value: "redirect" },
            name: { kind: "Name", value: "authSsoRedirect" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "state" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAuthSsoRedirectQuery,
  GetAuthSsoRedirectQueryVariables
>;
export const GetAuthTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getAuthToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "token" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "authToken" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "token" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "token" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "AuthToken" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AuthToken" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AuthToken" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "expiresAt" } },
          { kind: "Field", name: { kind: "Name", value: "token" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "permissions" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAuthTokenQuery, GetAuthTokenQueryVariables>;
export const GetFoodboxesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getFoodboxes" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "foodboxes" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "position" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "lat" } },
                      { kind: "Field", name: { kind: "Name", value: "lng" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "state" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetFoodboxesQuery, GetFoodboxesQueryVariables>;
export const UpsertFoodboxDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "upsertFoodbox" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "FoodboxInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "upsertFoodbox" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "position" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "lat" } },
                      { kind: "Field", name: { kind: "Name", value: "lng" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "state" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpsertFoodboxMutation,
  UpsertFoodboxMutationVariables
>;
export const DeleteFoodboxDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteFoodbox" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteFoodbox" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteFoodboxMutation,
  DeleteFoodboxMutationVariables
>;
export const GetUsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getUsers" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "users" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "permissions" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const UpsertUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "upsertUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "params" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpsertUserParams" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "upsertUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "params" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "params" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpsertUserMutation, UpsertUserMutationVariables>;
export const DeleteUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;

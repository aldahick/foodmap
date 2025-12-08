/* eslint-disable */

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import * as types from "./graphql";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "query getAuthSsoRedirect {\n  redirect: authSsoRedirect {\n    url\n    state\n  }\n}\n\nquery getAuthToken($token: String!) {\n  authToken(token: $token) {\n    ...AuthToken\n  }\n}\n\nfragment AuthToken on AuthToken {\n  expiresAt\n  token\n  user {\n    permissions\n  }\n}": typeof types.GetAuthSsoRedirectDocument;
  "query getFoodboxes {\n  foodboxes {\n    id\n    name\n    position {\n      lat\n      lng\n    }\n    state\n  }\n}\n\nmutation upsertFoodbox($id: ID, $input: FoodboxInput!) {\n  upsertFoodbox(id: $id, input: $input) {\n    id\n    name\n    position {\n      lat\n      lng\n    }\n    state\n  }\n}\n\nmutation deleteFoodbox($id: ID!) {\n  deleteFoodbox(id: $id)\n}": typeof types.GetFoodboxesDocument;
  "query getUsers {\n  users {\n    id\n    name\n    email\n    permissions\n  }\n}\n\nmutation upsertUser($params: UpsertUserParams!) {\n  upsertUser(params: $params)\n}\n\nmutation deleteUser($id: ID!) {\n  deleteUser(id: $id)\n}": typeof types.GetUsersDocument;
};
const documents: Documents = {
  "query getAuthSsoRedirect {\n  redirect: authSsoRedirect {\n    url\n    state\n  }\n}\n\nquery getAuthToken($token: String!) {\n  authToken(token: $token) {\n    ...AuthToken\n  }\n}\n\nfragment AuthToken on AuthToken {\n  expiresAt\n  token\n  user {\n    permissions\n  }\n}":
    types.GetAuthSsoRedirectDocument,
  "query getFoodboxes {\n  foodboxes {\n    id\n    name\n    position {\n      lat\n      lng\n    }\n    state\n  }\n}\n\nmutation upsertFoodbox($id: ID, $input: FoodboxInput!) {\n  upsertFoodbox(id: $id, input: $input) {\n    id\n    name\n    position {\n      lat\n      lng\n    }\n    state\n  }\n}\n\nmutation deleteFoodbox($id: ID!) {\n  deleteFoodbox(id: $id)\n}":
    types.GetFoodboxesDocument,
  "query getUsers {\n  users {\n    id\n    name\n    email\n    permissions\n  }\n}\n\nmutation upsertUser($params: UpsertUserParams!) {\n  upsertUser(params: $params)\n}\n\nmutation deleteUser($id: ID!) {\n  deleteUser(id: $id)\n}":
    types.GetUsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query getAuthSsoRedirect {\n  redirect: authSsoRedirect {\n    url\n    state\n  }\n}\n\nquery getAuthToken($token: String!) {\n  authToken(token: $token) {\n    ...AuthToken\n  }\n}\n\nfragment AuthToken on AuthToken {\n  expiresAt\n  token\n  user {\n    permissions\n  }\n}",
): (typeof documents)["query getAuthSsoRedirect {\n  redirect: authSsoRedirect {\n    url\n    state\n  }\n}\n\nquery getAuthToken($token: String!) {\n  authToken(token: $token) {\n    ...AuthToken\n  }\n}\n\nfragment AuthToken on AuthToken {\n  expiresAt\n  token\n  user {\n    permissions\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query getFoodboxes {\n  foodboxes {\n    id\n    name\n    position {\n      lat\n      lng\n    }\n    state\n  }\n}\n\nmutation upsertFoodbox($id: ID, $input: FoodboxInput!) {\n  upsertFoodbox(id: $id, input: $input) {\n    id\n    name\n    position {\n      lat\n      lng\n    }\n    state\n  }\n}\n\nmutation deleteFoodbox($id: ID!) {\n  deleteFoodbox(id: $id)\n}",
): (typeof documents)["query getFoodboxes {\n  foodboxes {\n    id\n    name\n    position {\n      lat\n      lng\n    }\n    state\n  }\n}\n\nmutation upsertFoodbox($id: ID, $input: FoodboxInput!) {\n  upsertFoodbox(id: $id, input: $input) {\n    id\n    name\n    position {\n      lat\n      lng\n    }\n    state\n  }\n}\n\nmutation deleteFoodbox($id: ID!) {\n  deleteFoodbox(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query getUsers {\n  users {\n    id\n    name\n    email\n    permissions\n  }\n}\n\nmutation upsertUser($params: UpsertUserParams!) {\n  upsertUser(params: $params)\n}\n\nmutation deleteUser($id: ID!) {\n  deleteUser(id: $id)\n}",
): (typeof documents)["query getUsers {\n  users {\n    id\n    name\n    email\n    permissions\n  }\n}\n\nmutation upsertUser($params: UpsertUserParams!) {\n  upsertUser(params: $params)\n}\n\nmutation deleteUser($id: ID!) {\n  deleteUser(id: $id)\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

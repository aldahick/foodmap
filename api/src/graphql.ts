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
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: Date; output: Date };
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

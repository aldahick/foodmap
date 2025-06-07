import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "gql/**",
  config: {
    maybeValue: "T | undefined",
    typesPrefix: "I",
    scalars: {
      Date: "Date",
    },
  },
  hooks: {
    afterAllFileWrite: "biome check --write --unsafe",
  },
  generates: {
    "src/graphql.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        gqlImport: "graphql-request#gql",
      },
    },
  },
};
export default config;

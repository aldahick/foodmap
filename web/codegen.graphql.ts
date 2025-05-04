import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../api/gql/**",
  config: {
    maybeValue: "T | undefined",
    typesPrefix: "I",
    scalars: {
      Date: "string",
    },
  },
  hooks: {
    afterAllFileWrite: "biome check --write --unsafe",
  },
  generates: {
    "src/sdk/graphql.types.ts": {
      documents: ["gql/**", "../api/gql/**"],
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};
export default config;

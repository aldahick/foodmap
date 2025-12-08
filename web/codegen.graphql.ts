import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../api/gql/**",
  documents: ["./gql/**", "../api/gql/**"],
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
    "src/sdk/gql/": {
      documents: ["gql/**", "../api/gql/**"],
      preset: "client",
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
      },
    },
  },
};
export default config;

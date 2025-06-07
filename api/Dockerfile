FROM node:22-alpine AS base

WORKDIR /foodmap
RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY api/package.json ./

FROM base AS builder

RUN pnpm install
WORKDIR /foodmap/api

COPY api/.swcrc api/nest-cli.json api/package.json api/tsconfig.json ./
COPY api/gql gql
COPY api/src src

RUN pnpm build

FROM base AS server

RUN pnpm install --prod && pnpm store prune
WORKDIR /foodmap/api

COPY --from=builder /foodmap/api/package.json ./
COPY --from=builder /foodmap/api/dist dist
COPY --from=builder /foodmap/api/gql gql

CMD ["node", "--enable-source-maps", "dist/main.js"]

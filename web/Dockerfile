# Make sure to build this image using the root context, not "web" context
FROM node:22-alpine AS base

WORKDIR /foodmap
RUN npm i -g pnpm@^10
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY web/package.json ./web/

FROM base AS builder

RUN pnpm install
WORKDIR /foodmap/web

COPY web/tsconfig.json web/vite.config.ts web/index.html ./
# COPY web/public public
COPY web/src src

ARG MAPS_KEY
ENV VITE_GOOGLE_MAPS_API_KEY=${MAPS_KEY}

RUN pnpm build

FROM base AS server

RUN npm i -g serve
WORKDIR /foodmap/web

COPY --from=builder /foodmap/web/dist dist
# COPY --from=builder /foodmap/web/public public

CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:3000"]

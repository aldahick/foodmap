# foodmap

This is the live-updated foodbox map for the Community Food Box Project, in Indianapolis.

Currently under development, so not publicly available anywhere (yet).

The frontend is written in Typescript, with React. The backend is also written in Typescript, with Nest.JS.

## Development

1. Set up a Postgres database & user for development.
2. Copy `.env.example` to `.env` in both `api` and `web`. Fill them out appropriately.
3. Do `pnpm dev`, either at the workspace level to run both `api` and `web`, or in one of the individual package dirs.
4. Visit http://localhost:3000 for the frontend, and use http://localhost:3005 for the backend.

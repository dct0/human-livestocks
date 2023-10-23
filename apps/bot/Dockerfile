FROM node:lts-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS builder
# RUN apk add --no-cache libc6-compat
# RUN apk update
RUN pnpm add -g turbo
COPY . .
RUN turbo prune bot --docker

FROM base AS installer
# RUN apk add --no-cache libc6-compat
# RUN apk update
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml .
RUN pnpm install
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm run db:generate
RUN pnpm turbo run build --filter=bot...

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 discordjs
RUN adduser --system --uid 1001 discordjs
USER discordjs
COPY --from=installer /app .

CMD node apps/bot/dist/index.js
FROM node:lts-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app


FROM base AS libc
RUN apk add --no-cache libc6-compat
RUN apk update


FROM libc AS builder
RUN pnpm add -g turbo

COPY . .
RUN turbo prune bot --docker


FROM libc AS installer
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml .
RUN pnpm i --frozen-lockfile

COPY --from=builder /app/out/full/ .
COPY turbo.json .
RUN pnpm run db:generate
RUN pnpm turbo run build --filter=bot...

FROM libc AS proddeps
ENV NODE_ENV=production
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml .
RUN pnpm i --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN pnpm run db:generate

FROM base AS runner
LABEL org.opencontainers.image.source="https://github.com/dct0/human-livestocks"
# ENV NODE_ENV=production

RUN addgroup --system --gid 1001 discordjs
RUN adduser --system --uid 1001 discordjs
USER discordjs

COPY --from=proddeps /app/node_modules ./node_modules
WORKDIR /app/apps/bot
COPY --from=proddeps /app/apps/bot/package.json .
COPY --from=proddeps /app/apps/bot/node_modules ./node_modules
COPY --from=installer /app/apps/bot/dist ./dist

CMD pnpm start
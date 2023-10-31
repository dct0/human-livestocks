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
RUN turbo prune web --docker


FROM libc AS installer
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml .
RUN pnpm i --frozen-lockfile

ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM
ARG TURBO_TOKEN
ENV TURBO_TOKEN=$TURBO_TOKEN

COPY --from=builder /app/out/full/ .
COPY turbo.json .
RUN pnpm run db:generate
RUN pnpm turbo run build --filter=web...


FROM base AS runner
LABEL org.opencontainers.image.source="https://github.com/for-the-bit/human-livestocks"
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nextjs \
    && adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.mjs .
COPY --from=installer /app/apps/web/package.json .
COPY --from=installer --chown=nextjs:nextjs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nextjs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nextjs /app/apps/web/public ./apps/web/public

CMD node apps/web/server.js
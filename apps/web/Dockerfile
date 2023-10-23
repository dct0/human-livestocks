FROM node:lts-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# RUN yarn global add turbo
RUN pnpm add -g turbo
COPY . .
RUN turbo prune web --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
COPY .gitignore .
COPY --from=builder /app/out/json/ .
# COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/out/pnpm-lock.yaml .
# RUN yarn install
RUN pnpm install
COPY --from=builder /app/out/full/ .
# RUN yarn turbo run build --filter=web...
# RUN pnpm run db:generate
RUN pnpm turbo run build --filter=web...

FROM base AS runner
LABEL org.opencontainers.image.source="https://github.com/dct0/human-livestocks"
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nextjs
RUN adduser --system --uid 1001 nextjs
USER nextjs
COPY --from=installer /app/apps/web/next.config.mjs .
COPY --from=installer /app/apps/web/package.json .
COPY --from=installer --chown=nextjs:nextjs /app/apps/web/.next/standalone .next/standalone
COPY --from=installer --chown=nextjs:nextjs /app/apps/web/.next/static ./.next/static
COPY --from=installer --chown=nextjs:nextjs /app/apps/web/public ./public

# CMD yarn start
CMD tail -f /dev/null
# CMD node apps/web/server.js
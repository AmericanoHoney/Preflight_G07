# syntax=docker/dockerfile:1

############################
# 1) Build Stage
############################
FROM node:22-alpine AS builder
ARG NEXT_PUBLIC_ENDPOINT
ENV NEXT_PUBLIC_ENDPOINT=${NEXT_PUBLIC_ENDPOINT}

RUN apk add --no-cache libc6-compat && corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

############################
# 2) Run Stage
############################
FROM node:22-alpine AS runner
ARG NEXT_PUBLIC_ENDPOINT
ENV NEXT_PUBLIC_ENDPOINT=${NEXT_PUBLIC_ENDPOINT}
ENV NODE_ENV=production
ENV PORT=4000

RUN apk add --no-cache libc6-compat && corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
# Only prod deps are needed to run "next start"
RUN pnpm install --prod --frozen-lockfile

# Build outputs
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
# (Copying next.config.* into runner is not required for "next start")
# COPY --from=builder /app/next.config.ts next.config.ts

EXPOSE 4000
CMD ["pnpm", "start", "-p", "4000"]

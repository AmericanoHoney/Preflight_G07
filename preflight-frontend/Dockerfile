# syntax=docker/dockerfile:1

# 1) deps
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat && corepack enable
WORKDIR /src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 2) build (bake NEXT_PUBLIC_* for client code)
FROM node:22-alpine AS builder
ARG NEXT_PUBLIC_ENDPOINT
ENV NEXT_PUBLIC_ENDPOINT=${NEXT_PUBLIC_ENDPOINT}
RUN apk add --no-cache libc6-compat && corepack enable
WORKDIR /src/app
COPY --from=deps /src/app/node_modules ./node_modules
COPY . .
RUN yarn build

# 3) run
FROM node:22-alpine AS runner
WORKDIR /src/app
ENV NODE_ENV=production
ENV PORT=4300
# copy build output + runtime deps
COPY --from=builder /src/app/.next ./.next
COPY --from=builder /src/app/public ./public
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile
EXPOSE 4300
CMD ["yarn","start","-p","4300"]

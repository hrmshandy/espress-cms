FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy root workspace files
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
# Copy the app's package.json
COPY apps/admin/package.json apps/admin/
# Copy packages' package.json
COPY packages/ui/package.json packages/ui/
COPY packages/database/package.json packages/database/
COPY packages/eslint-config/package.json packages/eslint-config/
COPY packages/typescript-config/package.json packages/typescript-config/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the app
RUN pnpm --filter @turborepo-cms/admin build

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxt
USER nuxt

COPY --from=builder --chown=nuxt:nodejs /app/apps/admin/.output ./

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["node", "./server/index.mjs"]

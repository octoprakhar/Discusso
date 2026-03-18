## Let's see multi stage docker image
## Stage 1: First install dependencies
FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

## Stage 2: Build the app
FROM node:22-slim AS builder
WORKDIR /app
## Copy node_modules from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .
## This creates the .next/standalone folder
RUN npm run build

## Stage 3: Ghe Runner
FROM node:22-slim AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# We ONLY copy the bare essentials from the 'builder' stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# Next.js standalone mode creates a 'server.js' file
CMD ["node", "server.js"]

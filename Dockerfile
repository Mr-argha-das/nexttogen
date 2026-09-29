# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies (use lockfile if present for reproducible installs)
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy source and build
COPY . .
RUN npm run build

# ---- Run stage ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Only what we need at runtime
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Persistent data lives here — mount a volume at /app/.data to keep it
RUN mkdir -p /app/.data
VOLUME ["/app/.data"]

EXPOSE 3000
ENV PORT=3000
CMD ["npm", "run", "start"]

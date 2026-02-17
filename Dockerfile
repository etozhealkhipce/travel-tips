###################
# DEPS
###################
FROM node:22-alpine AS deps
WORKDIR /deps
COPY package.json package-lock.json ./
RUN npm ci

###################
# BUILD
###################
FROM node:22-alpine AS build
WORKDIR /build
ENV NODE_ENV production

COPY --from=deps /deps/node_modules ./node_modules
COPY . .
RUN npm run build

###################
# FINAL
###################
FROM node:22-alpine AS final
WORKDIR /app

# Copy built files
COPY --from=build /build/dist ./dist
COPY --from=build /build/package.json ./
COPY --from=build /build/node_modules ./node_modules

# Start SSR server
CMD ["node", "./dist/cli/index"]

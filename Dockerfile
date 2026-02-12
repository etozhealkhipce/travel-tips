FROM node:22-alpine as base
FROM nginx:alpine as nginx

###################
# DEPS
###################

FROM base AS deps
WORKDIR /deps

COPY package.json package.lock* ./

RUN npm ci

###################
# BUILD
###################

FROM base AS build
WORKDIR /build

ENV NODE_ENV production

COPY --from=deps /deps/node_modules ./node_modules
COPY . .

RUN npm run build

###################
# FINAL
###################

FROM nginx AS final
WORKDIR /final

RUN apk update
RUN apk add nginx

COPY --from=build /build/dist ./
COPY --from=build /build/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
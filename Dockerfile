FROM node:16.20-alpine AS build
WORKDIR /app
RUN npm install -g pnpm
RUN apk add --update python3 make g++ sqlite && rm -rf /var/cache/apk/*
COPY . .
RUN pnpm i --frozen-lockfile
RUN pnpm build

FROM node:16.20-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
RUN apk add --update sqlite && rm -rf /var/cache/apk/*
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/views ./views
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]
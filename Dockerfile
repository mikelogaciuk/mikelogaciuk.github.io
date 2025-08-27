FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .
ENV NODE_OPTIONS=--max-old-space-size=3072
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/.output ./.output

# ENV PORT=3000
# EXPOSE 3000

# CMD ["node", "server/index.mjs"]
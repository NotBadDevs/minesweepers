FROM node:lts AS build
WORKDIR /app
COPY package*.json lerna.json ./
COPY client ./client
COPY server ./server
COPY shared ./shared
RUN npm ci && npm run build

FROM node:lts-alpine
WORKDIR /app
RUN npm i -g serve concurrently
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/client/dist ./client
COPY --from=build /app/server/dist ./
CMD concurrently -k -p "[{name}]" -n "FE,BE" -c "cyan.bold,green.bold" "serve -s -n -p 80 client" "node server"

EXPOSE 80 3111

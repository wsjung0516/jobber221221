FROM node:14.17.0-alpine as node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build --prod=true

FROM nginx:1.20.1
COPY --from=node /app/dist/my-first-angular-app /usr/share/nginx/html
EXPOSE 4200:80
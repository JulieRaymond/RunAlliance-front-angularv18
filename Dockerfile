FROM node:18 AS build

LABEL authors="jraymond"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build -- --configuration production

FROM nginx:alpine

COPY --from=build /app/dist/run-alliance-front-angularv18 /usr/share/nginx/html

EXPOSE 80

FROM node:18 AS build-stage

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build --configuration production

FROM nginx:alpine AS production-stage

COPY --from=build-stage /usr/src/app/dist/run-alliance-front-angularv18 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

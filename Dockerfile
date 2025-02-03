# Étape 1 : Construction de l'application Angular
FROM node:16 AS build

LABEL authors="jraymond"

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Effectuer le build de l'application Angular
RUN npm run build --configuration production

# Étape 2 : Serveur léger pour déployer l'application
FROM nginx:alpine

# Copier les fichiers construits depuis l'étape de build
COPY --from=build /app/dist/run-alliance-front-angularv18 /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

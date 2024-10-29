# Utilise l'image officielle de Node.js version v18 sur Alpine
FROM node:18-alpine

# Installe des paquets nécessaires
RUN apk add --no-cache file imagemagick

# Définit le répertoire de travail dans le conteneur
WORKDIR /home/node/app

# Crée le répertoire pour node_modules et définit les permissions
RUN mkdir -p node_modules && chown -R node:node /home/node/app

# Copie package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Génère le client Prisma
RUN npx prisma generate

# Copie le reste de l'application (y compris src et autres fichiers)
COPY . .

# Compile le code TypeScript
RUN npm run build

# Supprime le dossier src pour alléger l'image (optionnel)
RUN rm -rf ./src

# Expose le port que ton application utilise
EXPOSE 4000

# Commande pour démarrer l'application
CMD ["npm", "start"]

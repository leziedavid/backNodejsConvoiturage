# Étape de build : Utilise node:18.18.0 pour construire l'application
FROM node:18.18.0 as builder

# Crée le répertoire de travail dans le conteneur
WORKDIR /home/node/app

# Copie package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste de l'application (y compris src et autres fichiers)
COPY . .

# Génère le client Prisma
RUN npx prisma generate

# Compile le code TypeScript
RUN npm run build

# Supprime le dossier src pour alléger l'image (optionnel)
RUN rm -rf ./src


# Étape finale : Utilise une image plus légère pour la production
FROM node:18-alpine

# Crée le répertoire de travail dans le conteneur
WORKDIR /home/node/app

# Crée le répertoire pour node_modules et définit les permissions de manière sécurisée
RUN mkdir -p node_modules && chown -R node:node /home/node/app

# Copie uniquement le nécessaire depuis l'étape de build (dépendances et build)
COPY --from=builder /home/node/app /home/node/app

# Expose le port que ton application utilise
EXPOSE 4000

# Commande pour démarrer l'application
CMD ["npm", "start"]

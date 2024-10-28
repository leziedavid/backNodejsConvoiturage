# Utilise l'image officielle de Node.js version 18 comme image de base
FROM node:18

# Définit le répertoire de travail à /app
WORKDIR /app

# Copie des fichiers de dépendance
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tous les fichiers de l'application dans le conteneur
COPY . .

# Vérifie que @prisma/client est installé
RUN npm list @prisma/client

# Exécute la commande de build TypeScript
RUN npm run build

# Change les permissions pour éviter les problèmes d'exécution
RUN chown -R node:node /app

# Expose le port 3000
EXPOSE 3000

# Définit l'utilisateur non-root
USER node

# Commande pour démarrer l'application
CMD ["node", "dist/index.js"]

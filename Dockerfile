# Utilise l'image officielle de Node.js version 18 comme image de base
FROM node:18

# Définit le répertoire de travail à /app
WORKDIR /app

# Copie les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installe les dépendances de l'application
RUN npm install

# Copie tous les fichiers de l'application dans le conteneur
COPY . .

# Exécute la commande de build TypeScript
RUN npm run build

# Expose le port 3000
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "dist/api.js"]

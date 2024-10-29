# Utilise l'image officielle de Node.js version 18.19.0
FROM node:18.19.0

# Définit le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste de l'application
COPY . .

# Compile le code TypeScript si nécessaire
RUN npx tsc

# Expose le port que ton application utilise
EXPOSE 4000

# Commande pour démarrer l'application
CMD ["node", "dist/app.js"]

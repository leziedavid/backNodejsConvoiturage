# Utilise l'image officielle de Node.js
FROM node:22.9.0

# Définit le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste de l'application
COPY . .

# Compile le code TypeScript
RUN npx tsc

# Expose le port que ton application utilise
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "dist/app.js"]

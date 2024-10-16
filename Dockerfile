# Étape 1 : Construction de l'application
FROM node:18 AS builder

# Définit le répertoire de travail
WORKDIR /app

# Copie le fichier package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le code source
COPY . .

# Compile le code TypeScript
RUN npm run build

# Étape 2 : Création de l'image de production
FROM node:18

# Définit le répertoire de travail
WORKDIR /app

# Copie seulement les fichiers nécessaires de l'étape de construction
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Installe les dépendances de production
RUN npm install --only=production

# Expose le port que l'application va utiliser
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "dist/app.js"]
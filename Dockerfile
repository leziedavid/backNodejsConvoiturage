# Étape 1 : Utiliser une image de base Node.js 18
FROM node:18 AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de package
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Compiler le code TypeScript
RUN npm run build

# Étape 2 : Création de l'image de production
FROM node:18 AS production

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires depuis l'étape de build
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm install --only=production

# Exposer le port sur lequel l'application écoutera
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "dist/app.js"]

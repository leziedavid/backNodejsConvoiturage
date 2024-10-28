# Étape 1 : Utiliser une image de base Node.js
FROM node:18 AS build

# Étape 2 : Définir le répertoire de travail
WORKDIR /usr/src/app

# Étape 3 : Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le reste du code
COPY . .

# Étape 6 : Compiler le code TypeScript
RUN npm run build

# Étape 7 : Étape finale - utiliser une image Node.js légère pour la production
FROM node:18 AS production

# Étape 8 : Définir le répertoire de travail
WORKDIR /usr/src/app

# Étape 9 : Copier les fichiers compilés et les dépendances depuis l'étape de build
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./

# Étape 10 : Installer les dépendances en production
RUN npm install --only=production

# Étape 11 : Copier les uploads, mais seulement si le dossier n'existe pas
COPY --from=build /usr/src/uploads ./uploads

# Étape 12 : Vérifier si le dossier uploads existe et le créer s'il n'existe pas
RUN if [ ! -d ./uploads ]; then mkdir ./uploads; fi

# Étape 13 : Exposer le port de l'application (à adapter si nécessaire)
EXPOSE 3000

# Étape 14 : Commande pour démarrer l'application
CMD ["node", "dist/app.js"]

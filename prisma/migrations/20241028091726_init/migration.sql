-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "photo_url" TEXT,
    "contact_number" TEXT,
    "address" TEXT,
    "bio" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_login" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "verification_status" TEXT NOT NULL,
    "token" TEXT,
    "wallet_id" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trajet" (
    "id" TEXT NOT NULL,
    "utilisateur_id" TEXT NOT NULL,
    "point_depart" JSONB NOT NULL,
    "ville_depart" TEXT NOT NULL DEFAULT 'ABIDJAN',
    "point_arrivee" JSONB NOT NULL,
    "ville_arrivee" TEXT NOT NULL DEFAULT 'AGBOVILLE',
    "temps_depart_prevu" TIMESTAMP(3) NOT NULL,
    "temps_arrivee_prevu" TIMESTAMP(3) NOT NULL,
    "duree_estimee" INTEGER NOT NULL,
    "distance_estimee" DOUBLE PRECISION NOT NULL,
    "tempsDistance" TEXT,
    "etat_trajet" TEXT NOT NULL,
    "historique_position" JSONB,
    "mode_transport" TEXT NOT NULL,
    "nombre_de_places" INTEGER NOT NULL,
    "price" DOUBLE PRECISION,
    "vehicule_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trajet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commande" (
    "id" TEXT NOT NULL,
    "numeroCommande" TEXT NOT NULL DEFAULT 'DEFAULT_VALUE',
    "trajet_id" TEXT NOT NULL,
    "utilisateur_id" TEXT NOT NULL,
    "conducteur_id" TEXT NOT NULL,
    "point_prise_en_charge" JSONB,
    "point_depose" JSONB,
    "temps_prise_en_charge" TIMESTAMP(3) NOT NULL,
    "temps_depose" TIMESTAMP(3) NOT NULL,
    "statut_commande" TEXT NOT NULL,
    "montant" DOUBLE PRECISION,
    "mode_paiement" TEXT,
    "commentaires_instructions" TEXT,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modification" TIMESTAMP(3) NOT NULL,
    "historique_statuts" JSONB,
    "evaluations" JSONB,
    "date_action" TIMESTAMP(3),

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arret" (
    "id" TEXT NOT NULL,
    "trajet_id" TEXT NOT NULL,
    "nom" JSONB NOT NULL,
    "ville" TEXT NOT NULL DEFAULT 'AGBOVILLE',
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Arret_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReponseConducteur" (
    "id" TEXT NOT NULL,
    "commande_id" TEXT NOT NULL,
    "conducteur_id" TEXT NOT NULL,
    "temps_reponse" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statut_reponse" TEXT NOT NULL,
    "commentaires" TEXT,

    CONSTRAINT "ReponseConducteur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicule" (
    "id" TEXT NOT NULL,
    "utilisateur_id" TEXT NOT NULL,
    "marque" TEXT NOT NULL,
    "modele" TEXT NOT NULL,
    "annee" INTEGER NOT NULL,
    "plaque" TEXT NOT NULL,
    "couleur" TEXT,
    "permis" TEXT,
    "carte_grise" TEXT,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sujet" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "dateEnvoi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "reponse" TEXT NOT NULL,
    "dateAjout" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlansTarifaires" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "products" TEXT,
    "subscribers" TEXT,
    "basicAnalytics" BOOLEAN NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlansTarifaires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "About" (
    "id" TEXT NOT NULL,
    "libelle" TEXT,
    "name" TEXT,
    "description" TEXT,
    "image" TEXT,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "balance" DECIMAL(10,2) NOT NULL DEFAULT 0.0,
    "currency_id" TEXT NOT NULL DEFAULT 'FCFA',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rechargement" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "wallet_id" TEXT NOT NULL,
    "utilisateur_id" TEXT NOT NULL,

    CONSTRAINT "Rechargement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solde" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "montant" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "commandeId" TEXT NOT NULL,

    CONSTRAINT "Solde_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_user_id_key" ON "Wallet"("user_id");

-- AddForeignKey
ALTER TABLE "Trajet" ADD CONSTRAINT "Trajet_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trajet" ADD CONSTRAINT "Trajet_vehicule_id_fkey" FOREIGN KEY ("vehicule_id") REFERENCES "Vehicule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_trajet_id_fkey" FOREIGN KEY ("trajet_id") REFERENCES "Trajet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_conducteur_id_fkey" FOREIGN KEY ("conducteur_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arret" ADD CONSTRAINT "Arret_trajet_id_fkey" FOREIGN KEY ("trajet_id") REFERENCES "Trajet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReponseConducteur" ADD CONSTRAINT "ReponseConducteur_commande_id_fkey" FOREIGN KEY ("commande_id") REFERENCES "Commande"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReponseConducteur" ADD CONSTRAINT "ReponseConducteur_conducteur_id_fkey" FOREIGN KEY ("conducteur_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicule" ADD CONSTRAINT "Vehicule_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rechargement" ADD CONSTRAINT "Rechargement_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rechargement" ADD CONSTRAINT "Rechargement_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solde" ADD CONSTRAINT "Solde_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solde" ADD CONSTRAINT "Solde_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "Commande"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

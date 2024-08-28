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

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commande" (
    "id" TEXT NOT NULL,
    "trajet_id" TEXT NOT NULL,
    "utilisateur_id" TEXT NOT NULL,
    "conducteur_id" TEXT NOT NULL,
    "point_prise_en_charge" JSONB NOT NULL,
    "point_depose" JSONB NOT NULL,
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

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trajet" (
    "id" TEXT NOT NULL,
    "utilisateur_id" TEXT NOT NULL,
    "point_depart" JSONB NOT NULL,
    "point_arrivee" JSONB NOT NULL,
    "temps_depart_prevu" TIMESTAMP(3) NOT NULL,
    "temps_arrivee_prevu" TIMESTAMP(3) NOT NULL,
    "duree_estimee" INTEGER NOT NULL,
    "distance_estimee" DOUBLE PRECISION NOT NULL,
    "etat_trajet" TEXT NOT NULL,
    "historique_position" JSONB,
    "mode_transport" TEXT NOT NULL,

    CONSTRAINT "Trajet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arret" (
    "id" TEXT NOT NULL,
    "trajet_id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Arret_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReponseConducteur" (
    "id" TEXT NOT NULL,
    "commande_id" TEXT NOT NULL,
    "conducteur_id" TEXT NOT NULL,
    "temps_reponse" TIMESTAMP(3) NOT NULL,
    "statut_reponse" TEXT NOT NULL,
    "commentaires" TEXT,

    CONSTRAINT "ReponseConducteur_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_trajet_id_fkey" FOREIGN KEY ("trajet_id") REFERENCES "Trajet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_conducteur_id_fkey" FOREIGN KEY ("conducteur_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trajet" ADD CONSTRAINT "Trajet_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arret" ADD CONSTRAINT "Arret_trajet_id_fkey" FOREIGN KEY ("trajet_id") REFERENCES "Trajet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReponseConducteur" ADD CONSTRAINT "ReponseConducteur_commande_id_fkey" FOREIGN KEY ("commande_id") REFERENCES "Commande"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReponseConducteur" ADD CONSTRAINT "ReponseConducteur_conducteur_id_fkey" FOREIGN KEY ("conducteur_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

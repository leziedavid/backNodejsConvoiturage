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

-- AddForeignKey
ALTER TABLE "Vehicule" ADD CONSTRAINT "Vehicule_utilisateur_id_fkey" FOREIGN KEY ("utilisateur_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

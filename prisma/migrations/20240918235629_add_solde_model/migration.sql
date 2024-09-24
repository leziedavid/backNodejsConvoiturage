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

-- AddForeignKey
ALTER TABLE "Solde" ADD CONSTRAINT "Solde_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solde" ADD CONSTRAINT "Solde_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "Commande"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

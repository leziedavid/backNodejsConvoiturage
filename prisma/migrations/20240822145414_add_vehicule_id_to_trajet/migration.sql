-- AlterTable
ALTER TABLE "Trajet" ADD COLUMN     "vehicule_id" TEXT;

-- AddForeignKey
ALTER TABLE "Trajet" ADD CONSTRAINT "Trajet_vehicule_id_fkey" FOREIGN KEY ("vehicule_id") REFERENCES "Vehicule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

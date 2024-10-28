/*
  Warnings:

  - You are about to drop the column `vehicule_id` on the `Trajet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trajet" DROP CONSTRAINT "Trajet_vehicule_id_fkey";

-- AlterTable
ALTER TABLE "Trajet" DROP COLUMN "vehicule_id";

-- CreateTable
CREATE TABLE "_TrajetVehicule" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TrajetVehicule_AB_unique" ON "_TrajetVehicule"("A", "B");

-- CreateIndex
CREATE INDEX "_TrajetVehicule_B_index" ON "_TrajetVehicule"("B");

-- AddForeignKey
ALTER TABLE "_TrajetVehicule" ADD CONSTRAINT "_TrajetVehicule_A_fkey" FOREIGN KEY ("A") REFERENCES "Trajet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TrajetVehicule" ADD CONSTRAINT "_TrajetVehicule_B_fkey" FOREIGN KEY ("B") REFERENCES "Vehicule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

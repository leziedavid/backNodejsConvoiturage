/*
  Warnings:

  - You are about to drop the `_TrajetVehicule` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `vehicule_id` to the `Trajet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TrajetVehicule" DROP CONSTRAINT "_TrajetVehicule_A_fkey";

-- DropForeignKey
ALTER TABLE "_TrajetVehicule" DROP CONSTRAINT "_TrajetVehicule_B_fkey";

-- AlterTable
ALTER TABLE "Trajet" ADD COLUMN     "vehicule_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_TrajetVehicule";

-- AddForeignKey
ALTER TABLE "Trajet" ADD CONSTRAINT "Trajet_vehicule_id_fkey" FOREIGN KEY ("vehicule_id") REFERENCES "Vehicule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

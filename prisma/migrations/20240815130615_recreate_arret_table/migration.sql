/*
  Warnings:

  - Changed the type of `nom` on the `Arret` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Arret" DROP COLUMN "nom",
ADD COLUMN     "nom" JSONB NOT NULL;

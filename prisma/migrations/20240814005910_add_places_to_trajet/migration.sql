/*
  Warnings:

  - Added the required column `nombre_de_places` to the `Trajet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trajet" ADD COLUMN     "nombre_de_places" INTEGER NOT NULL;

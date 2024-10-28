-- AlterTable
ALTER TABLE "Commande" ALTER COLUMN "point_prise_en_charge" DROP NOT NULL,
ALTER COLUMN "point_depose" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Trajet" ADD COLUMN     "price" DOUBLE PRECISION;

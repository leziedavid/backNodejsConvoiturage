/*
  Warnings:

  - You are about to drop the `Currency` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_currency_id_fkey";

-- AlterTable
ALTER TABLE "Wallet" ALTER COLUMN "currency_id" SET DEFAULT 'FCFA';

-- DropTable
DROP TABLE "Currency";

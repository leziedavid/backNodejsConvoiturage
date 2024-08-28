-- CreateTable
CREATE TABLE "PlansTarifaires" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "products" TEXT,
    "subscribers" TEXT,
    "basicAnalytics" BOOLEAN NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlansTarifaires_pkey" PRIMARY KEY ("id")
);

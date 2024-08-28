-- CreateTable
CREATE TABLE "About" (
    "id" TEXT NOT NULL,
    "libelle" TEXT,
    "name" TEXT,
    "description" TEXT,
    "image" TEXT,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

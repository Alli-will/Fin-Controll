-- CreateTable
CREATE TABLE "Contas" (
    "id" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Contas_pkey" PRIMARY KEY ("id")
);

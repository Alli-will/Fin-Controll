/*
  Warnings:

  - Added the required column `categoria` to the `Contas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formapgto` to the `Contas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contas" ADD COLUMN     "categoria" TEXT NOT NULL,
ADD COLUMN     "formapgto" TEXT NOT NULL;

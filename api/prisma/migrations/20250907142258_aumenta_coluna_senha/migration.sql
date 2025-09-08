/*
  Warnings:

  - You are about to alter the column `email` on the `pacientes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "pacientes" ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "senha" SET DATA TYPE TEXT;

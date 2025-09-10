/*
  Warnings:

  - The `tipo` column on the `consultas` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('PRESENCIAL', 'ONLINE');

-- AlterTable
ALTER TABLE "consultas" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "Tipo" NOT NULL DEFAULT 'PRESENCIAL';

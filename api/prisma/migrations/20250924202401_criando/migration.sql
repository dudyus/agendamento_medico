/*
  Warnings:

  - The primary key for the `admins` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `senha` on the `admins` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(60)`.

*/
-- DropForeignKey
ALTER TABLE "consultas" DROP CONSTRAINT "consultas_admin_id_fkey";

-- AlterTable
ALTER TABLE "admins" DROP CONSTRAINT "admins_pkey",
ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nivel" SMALLINT NOT NULL DEFAULT 2,
ADD COLUMN     "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "senha" SET DATA TYPE VARCHAR(60),
ADD CONSTRAINT "admins_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "admins_id_seq";

-- AlterTable
ALTER TABLE "consultas" ALTER COLUMN "admin_id" DROP NOT NULL,
ALTER COLUMN "admin_id" SET DATA TYPE VARCHAR(36);

-- AlterTable
ALTER TABLE "profissionais" ADD COLUMN     "admin_id" VARCHAR(36),
ADD COLUMN     "destaque" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "profissionais" ADD CONSTRAINT "profissionais_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

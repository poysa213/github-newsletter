/*
  Warnings:

  - You are about to drop the column `Type` on the `Subscriber` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscriber" DROP COLUMN "Type",
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'DAILY';

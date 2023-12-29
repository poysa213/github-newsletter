/*
  Warnings:

  - Made the column `email` on table `Subscriber` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Subscriber" ALTER COLUMN "email" SET NOT NULL;

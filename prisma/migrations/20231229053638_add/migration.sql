/*
  Warnings:

  - Added the required column `description` to the `Repository` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Repository" ADD COLUMN     "description" TEXT NOT NULL;

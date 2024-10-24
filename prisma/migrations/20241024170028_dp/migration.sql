/*
  Warnings:

  - Added the required column `image` to the `Cat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cat" ADD COLUMN     "image" TEXT NOT NULL;

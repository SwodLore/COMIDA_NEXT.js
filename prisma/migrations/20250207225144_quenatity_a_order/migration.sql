/*
  Warnings:

  - Added the required column `quantity` to the `OrderProucts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderProucts" ADD COLUMN     "quantity" INTEGER NOT NULL;

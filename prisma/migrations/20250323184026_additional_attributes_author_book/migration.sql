-- AlterTable
ALTER TABLE "Author" ADD COLUMN "bio" TEXT;
ALTER TABLE "Author" ADD COLUMN "birthDate" DATETIME;
ALTER TABLE "Author" ADD COLUMN "deathDate" DATETIME;
ALTER TABLE "Author" ADD COLUMN "image" TEXT;

-- AlterTable
ALTER TABLE "Book" ADD COLUMN "cover" TEXT;

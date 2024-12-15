ALTER TABLE "Category" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "Category" CASCADE;--> statement-breakpoint
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_categoryId_Category_id_fk";
--> statement-breakpoint
ALTER TABLE "Chapter" ADD COLUMN "category_type" varchar(256);--> statement-breakpoint
ALTER TABLE "Chapter" DROP COLUMN "categoryId";--> statement-breakpoint
ALTER TABLE "Item" DROP COLUMN "type";
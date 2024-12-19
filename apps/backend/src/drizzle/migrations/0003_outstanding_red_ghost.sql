ALTER TABLE "Item_Cost" DROP CONSTRAINT "Item_Cost_item_id_Item_id_fk";
--> statement-breakpoint
ALTER TABLE "Item" ALTER COLUMN "mainImage" SET DATA TYPE varchar(1024);--> statement-breakpoint
ALTER TABLE "Item" ALTER COLUMN "otherImages" SET DATA TYPE varchar(1024)[];
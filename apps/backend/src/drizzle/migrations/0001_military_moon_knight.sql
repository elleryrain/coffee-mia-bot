ALTER TABLE "Item_Cost" ADD CONSTRAINT "Item_Cost_item_id_Item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."Item"("id") ON DELETE no action ON UPDATE no action;
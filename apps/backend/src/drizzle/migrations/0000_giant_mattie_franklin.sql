CREATE TABLE "Category" (
	"id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "Category_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(512) NOT NULL,
	"icon" varchar(512)
);
--> statement-breakpoint
CREATE TABLE "Chapter" (
	"id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "Chapter_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(512) NOT NULL,
	"description" varchar(1024),
	"categoryId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Grain_Item_Cost" (
	"id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "Grain_Item_Cost_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"cost" integer NOT NULL,
	"weight" integer NOT NULL,
	"grainItemId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Gringing_Type" (
	"id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "Gringing_Type_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(512) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Item_Characteristics" (
	"item_id" integer PRIMARY KEY NOT NULL,
	"region" varchar(512),
	"country" varchar(512),
	"roasting" varchar(512),
	"cultivation" varchar(512),
	"height" integer,
	"quality" varchar(512)
);
--> statement-breakpoint
CREATE TABLE "Item_Cost" (
	"item_id" integer PRIMARY KEY NOT NULL,
	"cost" integer NOT NULL,
	"discount_cost" integer
);
--> statement-breakpoint
CREATE TABLE "Item" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Item_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(512) NOT NULL,
	"mainImage" varchar(512) NOT NULL,
	"otherImages" varchar(512)[] NOT NULL,
	"description" varchar(1024),
	"descriptors" varchar(512)[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Item_Chapter" (
	"id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "Item_Chapter_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"itemId" integer NOT NULL,
	"chapterId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Item_Order" (
	"id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "Item_Order_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"itemId" integer NOT NULL,
	"grindingTypeItem" integer,
	"grainCostItemId" integer,
	"orderId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Order" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Order_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User_Favorite_Item" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "User_Favorite_Item_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"itemId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" integer PRIMARY KEY NOT NULL,
	"first_name" varchar(512),
	"last_name" varchar(512)
);
--> statement-breakpoint
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_categoryId_Category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Grain_Item_Cost" ADD CONSTRAINT "Grain_Item_Cost_grainItemId_Item_id_fk" FOREIGN KEY ("grainItemId") REFERENCES "public"."Item"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Item_Characteristics" ADD CONSTRAINT "Item_Characteristics_item_id_Item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."Item"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Item_Cost" ADD CONSTRAINT "Item_Cost_item_id_Item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."Item"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Item_Chapter" ADD CONSTRAINT "Item_Chapter_itemId_Item_id_fk" FOREIGN KEY ("itemId") REFERENCES "public"."Item"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Item_Chapter" ADD CONSTRAINT "Item_Chapter_chapterId_Chapter_id_fk" FOREIGN KEY ("chapterId") REFERENCES "public"."Chapter"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Item_Order" ADD CONSTRAINT "Item_Order_itemId_Item_id_fk" FOREIGN KEY ("itemId") REFERENCES "public"."Item"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Item_Order" ADD CONSTRAINT "Item_Order_grindingTypeItem_Gringing_Type_id_fk" FOREIGN KEY ("grindingTypeItem") REFERENCES "public"."Gringing_Type"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Item_Order" ADD CONSTRAINT "Item_Order_grainCostItemId_Grain_Item_Cost_id_fk" FOREIGN KEY ("grainCostItemId") REFERENCES "public"."Grain_Item_Cost"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Item_Order" ADD CONSTRAINT "Item_Order_orderId_Order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_Favorite_Item" ADD CONSTRAINT "User_Favorite_Item_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User_Favorite_Item" ADD CONSTRAINT "User_Favorite_Item_itemId_Item_id_fk" FOREIGN KEY ("itemId") REFERENCES "public"."Item"("id") ON DELETE no action ON UPDATE no action;
CREATE TABLE "income" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"emoji" varchar(10) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"expense_date" date NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "expenses" ADD COLUMN "emoji" varchar(10) NOT NULL;--> statement-breakpoint
ALTER TABLE "income" ADD CONSTRAINT "income_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" DROP COLUMN "description";
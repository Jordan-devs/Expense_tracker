ALTER TABLE "expenses" ADD COLUMN "transaction_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "income" ADD COLUMN "transaction_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "expenses" DROP COLUMN "expense_date";--> statement-breakpoint
ALTER TABLE "income" DROP COLUMN "expense_date";
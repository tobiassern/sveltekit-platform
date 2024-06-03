DROP INDEX IF EXISTS `tenants_db_url_unique`;--> statement-breakpoint
DROP INDEX IF EXISTS `tenants_db_name_unique`;--> statement-breakpoint
ALTER TABLE `tenants` DROP COLUMN `db_url`;--> statement-breakpoint
ALTER TABLE `tenants` DROP COLUMN `db_name`;--> statement-breakpoint
ALTER TABLE `tenants` DROP COLUMN `vapid_server_public_key`;--> statement-breakpoint
ALTER TABLE `tenants` DROP COLUMN `vapid_server_private_key`;
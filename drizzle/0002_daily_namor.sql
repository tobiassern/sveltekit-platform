CREATE TABLE `tenant_users` (
	`tenant_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`role` text NOT NULL,
	PRIMARY KEY(`tenant_id`, `user_id`),
	FOREIGN KEY (`tenant_id`) REFERENCES `tenants`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `tenants` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`domain` text,
	`slut` text NOT NULL,
	`db_url` text NOT NULL,
	`db_name` text NOT NULL,
	`vapid_server_public_key` text,
	`vapid_server_private_key` text,
	`logo_square_url` text,
	`logo_url` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tenants_domain_unique` ON `tenants` (`domain`);--> statement-breakpoint
CREATE UNIQUE INDEX `tenants_slut_unique` ON `tenants` (`slut`);--> statement-breakpoint
CREATE UNIQUE INDEX `tenants_db_url_unique` ON `tenants` (`db_url`);--> statement-breakpoint
CREATE UNIQUE INDEX `tenants_db_name_unique` ON `tenants` (`db_name`);
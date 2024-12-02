ALTER TABLE `user` RENAME COLUMN `id` TO `user_id`;--> statement-breakpoint
ALTER TABLE `user` RENAME COLUMN `emailVerified` TO `email_verified`;--> statement-breakpoint
ALTER TABLE `account` DROP FOREIGN KEY `account_userId_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `authenticator` DROP FOREIGN KEY `authenticator_userId_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `session` DROP FOREIGN KEY `session_userId_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `user` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `user` ADD PRIMARY KEY(`user_id`);--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_userId_user_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`user_id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `authenticator` ADD CONSTRAINT `authenticator_userId_user_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`user_id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_userId_user_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`user_id`) ON DELETE cascade ON UPDATE no action;
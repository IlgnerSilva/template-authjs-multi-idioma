ALTER TABLE `account` RENAME COLUMN `userId` TO `_user_id`;--> statement-breakpoint
ALTER TABLE `account` RENAME COLUMN `providerAccountId` TO `provider_account_id`;--> statement-breakpoint
ALTER TABLE `authenticator` RENAME COLUMN `credentialID` TO `credential_id`;--> statement-breakpoint
ALTER TABLE `authenticator` RENAME COLUMN `userId` TO `_user_id`;--> statement-breakpoint
ALTER TABLE `authenticator` RENAME COLUMN `providerAccountId` TO `provider_account_id`;--> statement-breakpoint
ALTER TABLE `authenticator` RENAME COLUMN `credentialPublicKey` TO `credential_public_key`;--> statement-breakpoint
ALTER TABLE `authenticator` RENAME COLUMN `credentialDeviceType` TO `credential_device_type`;--> statement-breakpoint
ALTER TABLE `authenticator` RENAME COLUMN `credentialBackedUp` TO `credential_backed_up`;--> statement-breakpoint
ALTER TABLE `session` RENAME COLUMN `sessionToken` TO `session_token`;--> statement-breakpoint
ALTER TABLE `session` RENAME COLUMN `userId` TO `_user_id`;--> statement-breakpoint
ALTER TABLE `authenticator` DROP INDEX `authenticator_credentialID_unique`;--> statement-breakpoint
ALTER TABLE `account` DROP FOREIGN KEY `account_userId_user_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `authenticator` DROP FOREIGN KEY `authenticator_userId_user_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `session` DROP FOREIGN KEY `session_userId_user_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `account` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `authenticator` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `session` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `account` ADD PRIMARY KEY(`provider`,`provider_account_id`);--> statement-breakpoint
ALTER TABLE `authenticator` ADD PRIMARY KEY(`_user_id`,`credential_id`);--> statement-breakpoint
ALTER TABLE `session` ADD PRIMARY KEY(`session_token`);--> statement-breakpoint
ALTER TABLE `authenticator` ADD CONSTRAINT `authenticator_credential_id_unique` UNIQUE(`credential_id`);--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account__user_id_user_user_id_fk` FOREIGN KEY (`_user_id`) REFERENCES `user`(`user_id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `authenticator` ADD CONSTRAINT `authenticator__user_id_user_user_id_fk` FOREIGN KEY (`_user_id`) REFERENCES `user`(`user_id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session__user_id_user_user_id_fk` FOREIGN KEY (`_user_id`) REFERENCES `user`(`user_id`) ON DELETE cascade ON UPDATE no action;
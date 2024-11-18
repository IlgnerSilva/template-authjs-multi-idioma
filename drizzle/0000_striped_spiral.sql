-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `account` (
	`userId` varchar(10) NOT NULL,
	`type` varchar(10) NOT NULL,
	`provider` varchar(20) NOT NULL,
	`providerAccountId` varchar(10) NOT NULL,
	`refresh_token` varchar(200),
	`access_token` varchar(200),
	`expires_at` int,
	`token_type` varchar(20),
	`scope` varchar(200),
	`id_token` varchar(200),
	`session_state` varchar(200),
	CONSTRAINT `account_provider_providerAccountId` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `authenticator` (
	`credentialID` varchar(10) NOT NULL,
	`userId` varchar(10) NOT NULL,
	`providerAccountId` varchar(10) NOT NULL,
	`credentialPublicKey` varchar(200) NOT NULL,
	`counter` int NOT NULL,
	`credentialDeviceType` varchar(20) NOT NULL,
	`credentialBackedUp` int NOT NULL,
	`transports` varchar(200) NOT NULL,
	CONSTRAINT `authenticator_userId_credentialID` PRIMARY KEY(`userId`,`credentialID`),
	CONSTRAINT `authenticator_credentialID_unique` UNIQUE(`credentialID`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(50) NOT NULL,
	`userId` varchar(10) NOT NULL,
	`expires` int NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(10) NOT NULL,
	`name` varchar(50),
	`email` varchar(50),
	`emailVerified` int,
	`image` text,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(50) NOT NULL,
	`token` varchar(50) NOT NULL,
	`expires` int NOT NULL,
	CONSTRAINT `verificationToken_identifier_token` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `authenticator` ADD CONSTRAINT `authenticator_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;
*/
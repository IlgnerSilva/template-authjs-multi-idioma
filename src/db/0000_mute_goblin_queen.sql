CREATE TABLE `users` (
	`user_id` varchar(36) NOT NULL DEFAULT '9dad3a9d-0cf2-4156-994f-5f76ab9e2083',
	`email` varchar(255) NOT NULL,
	`name` varchar(255),
	`password_hash` varchar(255),
	`email_verified` boolean DEFAULT false,
	`two_factor_authentication` boolean DEFAULT false,
	`provider` varchar(15),
	`provider_user_id` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`image` varchar(255),
	CONSTRAINT `users_user_id` PRIMARY KEY(`user_id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);

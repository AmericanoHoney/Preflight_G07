CREATE TABLE `mytodo_natrada` (
	`id` char(36) NOT NULL,
	`todo_text` varchar(255) NOT NULL,
	`is_done` boolean DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `mytodo_natrada_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `storestock`;
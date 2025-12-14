CREATE TABLE `timbrature` (
	`ID_Timbratura` integer PRIMARY KEY NOT NULL,
	`CodDipendente` integer,
	`Data` integer NOT NULL,
	`Ora` integer NOT NULL,
	`CodTerminale` text,
	`Causale` text,
	`CodUsr` integer,
	`OpID` integer NOT NULL,
	`OpWhen` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `todos` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`title` text NOT NULL,
	`completed` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
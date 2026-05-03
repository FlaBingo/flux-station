CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"role" varchar(50) DEFAULT 'Operator',
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "machine_models" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"model_url" varchar(500) NOT NULL,
	"type" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "machines" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"org_id" integer NOT NULL,
	"model_id" integer,
	"status" varchar(50) DEFAULT 'Active'
);
--> statement-breakpoint
CREATE TABLE "sensor_mappings" (
	"id" serial PRIMARY KEY NOT NULL,
	"machine_id" integer,
	"label" varchar(100) NOT NULL,
	"type" varchar(50) NOT NULL,
	"position_x" real DEFAULT 0,
	"position_y" real DEFAULT 0,
	"position_z" real DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "sensor_logs" (
	"id" bigint PRIMARY KEY NOT NULL,
	"mapping_id" integer NOT NULL,
	"value" real NOT NULL,
	"timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "maintenance_alerts" (
	"id" serial PRIMARY KEY NOT NULL,
	"machine_id" integer NOT NULL,
	"type" varchar(100) NOT NULL,
	"severity" varchar(50) NOT NULL,
	"message" varchar(500),
	"is_resolved" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "repair_tickets" (
	"id" serial PRIMARY KEY NOT NULL,
	"machine_id" integer NOT NULL,
	"alert_id" integer,
	"assigned_user_id" integer,
	"status" varchar(50) DEFAULT 'Open',
	"description" varchar(1000)
);
--> statement-breakpoint
CREATE TABLE "partnerships" (
	"id" serial PRIMARY KEY NOT NULL,
	"requesting_org_id" integer NOT NULL,
	"receiving_org_id" integer NOT NULL,
	"status" varchar(50) DEFAULT 'Pending'
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "machines" ADD CONSTRAINT "machines_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "machines" ADD CONSTRAINT "machines_model_id_machine_models_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."machine_models"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sensor_mappings" ADD CONSTRAINT "sensor_mappings_machine_id_machines_id_fk" FOREIGN KEY ("machine_id") REFERENCES "public"."machines"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sensor_logs" ADD CONSTRAINT "sensor_logs_mapping_id_sensor_mappings_id_fk" FOREIGN KEY ("mapping_id") REFERENCES "public"."sensor_mappings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "maintenance_alerts" ADD CONSTRAINT "maintenance_alerts_machine_id_machines_id_fk" FOREIGN KEY ("machine_id") REFERENCES "public"."machines"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repair_tickets" ADD CONSTRAINT "repair_tickets_machine_id_machines_id_fk" FOREIGN KEY ("machine_id") REFERENCES "public"."machines"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repair_tickets" ADD CONSTRAINT "repair_tickets_alert_id_maintenance_alerts_id_fk" FOREIGN KEY ("alert_id") REFERENCES "public"."maintenance_alerts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repair_tickets" ADD CONSTRAINT "repair_tickets_assigned_user_id_users_id_fk" FOREIGN KEY ("assigned_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "partnerships" ADD CONSTRAINT "partnerships_requesting_org_id_organizations_id_fk" FOREIGN KEY ("requesting_org_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "partnerships" ADD CONSTRAINT "partnerships_receiving_org_id_organizations_id_fk" FOREIGN KEY ("receiving_org_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "mapping_idx" ON "sensor_logs" USING btree ("mapping_id");--> statement-breakpoint
CREATE INDEX "time_idx" ON "sensor_logs" USING btree ("timestamp");
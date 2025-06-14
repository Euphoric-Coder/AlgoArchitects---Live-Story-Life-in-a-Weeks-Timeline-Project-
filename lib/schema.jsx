import { pgTable, varchar, uuid, boolean, jsonb } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: varchar("fullName").notNull(),
  email: varchar("email").notNull().unique(),
  profileImage: varchar("profileImage"),
  username: varchar("username"),
  gender: varchar("gender"),
  dob: varchar("dob"),
  weeksLived: varchar("weeksLived"),
  bio: varchar("bio"),
  location: varchar("location"),
  linkedInUrl: varchar("linkedInUrl"),
  websites: jsonb("websites"),
  hasOnboarded: boolean("hasOnboarded").notNull().default(false),
});

export const Events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  year: varchar("year").notNull(),
  week: varchar("week").notNull(),
  type: varchar("type").notNull(),
  title: varchar("title").notNull(),
  description: varchar("description"),
  icon: varchar("icon"),
  color: varchar("color"),
  bgColor: varchar("bgColor"),
  createdBy: varchar("createdBy").notNull(),
});

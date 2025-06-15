import { pgTable, varchar, uuid, boolean, jsonb, text } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: varchar("fullName").notNull(),
  email: varchar("email").notNull().unique(),
  profileImage: varchar("profileImage"),
  username: varchar("username"),
  gender: varchar("gender"),
  dob: varchar("dob"),
  bio: varchar("bio"),
  location: varchar("location"),
  linkedInUrl: varchar("linkedInUrl"),
  websites: jsonb("websites"),
  hasOnboarded: boolean("hasOnboarded").notNull().default(false),
  autoSeededHistoricalEvents: boolean("autoSeededHistoricalEvents")
    .notNull()
    .default(false),
});

export const Events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  year: varchar("year").notNull(),
  date: varchar("date").notNull(),
  week: varchar("week").notNull(),
  type: varchar("type").notNull(),
  title: varchar("title").notNull(),
  description: varchar("description"),
  coverImage: varchar("coverImage"),
  coverImageId: varchar("coverImageId"),
  notes: varchar("notes"),
  icon: varchar("icon"),
  color: varchar("color"),
  links: jsonb("links"),
  createdBy: varchar("createdBy").notNull(),
});

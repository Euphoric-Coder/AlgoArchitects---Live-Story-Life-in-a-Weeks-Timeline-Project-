import { pgTable, varchar, uuid, boolean, jsonb } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: varchar("fullName").notNull(),
  email: varchar("email").notNull().unique(),
  profileImage: varchar("profileImage"),
  username: varchar("username"),
  gender: varchar("gender"),
  age: varchar("age"),
  bio: varchar("bio"),
  location: varchar("location"),
  linkedInUrl: varchar("linkedInUrl"),
  websites: jsonb("websites"),
  aboutMe: jsonb("aboutMe"),
  preferences: jsonb("preferences"),
  hasOnboarded: boolean("hasOnboarded").notNull().default(false),
});

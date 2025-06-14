import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Zap,
  Heart,
  GraduationCap,
  Briefcase,
  MapPin,
  Award,
  Users,
  Plane,
  Globe,
  Plus,
} from "lucide-react";
import { db } from "@/lib/dbConfig";
import { Events, Users as UsersTable } from "@/lib/schema";
import { eq } from "drizzle-orm";

// Add user to DB
export async function GET() {
  const iconMap = {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Zap,
    Heart,
    GraduationCap,
    Briefcase,
    MapPin,
    Award,
    Users,
    Plane,
    Globe,
    Plus,
  };

  try {
    const user = await currentUser();

    const email = user.emailAddresses[0]?.emailAddress;

    const userData = await db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.email, email));

    const eventData = await db
      .select()
      .from(Events)
      .where(eq(Events.createdBy, email));


    return NextResponse.json({
        user: userData[0] || null,
        events: eventData || [],
    });
  } catch (error) {
    console.error("Error adding user to DB:", error);
    return NextResponse.json(
      { error: "Failed to add user to DB", userAdded: false, error: error },
      { status: 500 }
    );
  }
}

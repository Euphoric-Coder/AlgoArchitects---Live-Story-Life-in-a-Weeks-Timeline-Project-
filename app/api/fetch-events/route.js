import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/dbConfig";
import { Events } from "@/lib/schema";
import { eq } from "drizzle-orm";

// Add user to DB
export async function GET() {
  try {
    const user = await currentUser();

    const email = user.emailAddresses[0]?.emailAddress;

    const eventData = await db
      .select()
      .from(Events)
      .where(eq(Events.createdBy, email));

    return NextResponse.json(eventData);
  } catch (error) {
    console.error("Error adding user to DB:", error);
    return NextResponse.json(
      { error: "Failed to add user to DB", userAdded: false, error: error },
      { status: 500 }
    );
  }
}

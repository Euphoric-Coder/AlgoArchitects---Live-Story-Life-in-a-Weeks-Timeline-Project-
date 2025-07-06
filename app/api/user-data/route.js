import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/dbConfig";
import { Users } from "@/lib/schema";
import { eq } from "drizzle-orm";

// Add user to DB
export async function GET() {
  try {
    const user = await currentUser();

    const email = user.emailAddresses[0]?.emailAddress;

    const userData = await db
      .select()
      .from(Users)
      .where(eq(Users.email, email));

    return NextResponse.json(userData[0]);
  } catch (error) {
    console.error("Error adding user to DB:", error);
    return NextResponse.json(
      { error: "Failed to add user to DB", userAdded: false, error: error },
      { status: 500 }
    );
  }
}

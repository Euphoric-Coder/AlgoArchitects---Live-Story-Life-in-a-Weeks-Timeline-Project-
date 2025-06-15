import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { Users } from "@/lib/schema";
import { db } from "@/lib/dbConfig";
import { sendEmail } from "@/lib/sendEmail";
import LiveStoryWelcomeEmail from "@/emails/WelcomeEmail";

// Add user to DB
export async function GET() {
  try {
    const user = await currentUser();

    const email = user.emailAddresses[0]?.emailAddress;
    const fullName = user.firstName + " " + (user.lastName || "");
    const profileImage = user.imageUrl;

    // Check if user exists in DB
    const existingUser = await db
      .select()
      .from(Users)
      .where(eq(Users.email, email));

    if (existingUser.length === 0) {
      // Insert new user in DB
      await db.insert(Users).values({
        fullName: fullName,
        email: email,
        profileImage: profileImage,
      });

      // Send Welcome Email
      await sendEmail({
        from: "Live Story Team <onboarding@resend.dev>",
        to: email,
        subject:
          "Welcome to Live Story! Your timeline begins now",
        react: LiveStoryWelcomeEmail({
          username: user.firstName.split(" ")[0],
        }),
      });
    }

    return NextResponse.json({
      message: "User initialized successfully",
      userAdded: true,
      isOnboarded: existingUser[0].hasOnboarded,
    });
  } catch (error) {
    console.error("Error adding user to DB:", error);
    return NextResponse.json(
      { error: "Failed to add user to DB", userAdded: false, error: error },
      { status: 500 }
    );
  }
}

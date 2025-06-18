"use server";

import { Resend } from "resend";

export async function sendEmail({ from, to, subject, react }) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  console.log(process.env.RESEND_API_KEY);

  console.log(from, to, subject, react);
  console.log(resend);

  try {
    const data = await resend.emails.send({
      from,
      to,
      subject,
      react,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

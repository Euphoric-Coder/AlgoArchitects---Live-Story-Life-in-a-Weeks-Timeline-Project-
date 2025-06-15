import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

// Environment variables
const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE;
const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

export default function LifeInWeeksWelcomeEmail({ username = "Explorer" }) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Live Story — Your Timeline of Memories!</Preview>
      <Tailwind>
        <Body className="bg-[#f3f4f6] font-sans">
          <Container className="mx-auto w-full max-w-[600px] p-6 text-center bg-white shadow-md rounded-lg">
            {/* Logo */}
            <Section>
              <Link href={`${WEBSITE_URL}`}>
                <Img
                  src="https://ik.imagekit.io/5zzchrjn8/CoverImages/logo.png?updatedAt=1749956362707"
                  width="60"
                  height="60"
                  alt="Live Story Logo"
                  className="mx-auto"
                />
              </Link>
            </Section>

            {/* Welcome Text */}
            <Section className="mt-4">
              <Text className="text-3xl font-extrabold text-[#1d4ed8]">
                Welcome, {username}! 🎉
              </Text>
              <Text className="text-lg text-gray-700 mt-2 leading-relaxed">
                You’ve just unlocked your life’s timeline!{" "}
                <strong>Live Story</strong> turns every week of your life
                into a memory, a story, a journey.
              </Text>
              <Text className="text-lg text-gray-700 mt-2 leading-relaxed">
                Start adding your personal milestones, world events, and
                unforgettable memories — all in one beautiful, interactive
                timeline.
              </Text>
            </Section>

            {/* CTA Button */}
            <Section className="mt-6">
              <Button
                href={`${WEBSITE_URL}/dashboard`}
                className="bg-[#2563eb] text-white text-lg font-bold px-6 py-3 rounded-lg inline-block shadow-md hover:bg-[#1e40af] transition"
              >
                View Your Timeline
              </Button>
            </Section>

            {/* Signature */}
            <Section className="mt-6">
              <Text className="text-lg font-semibold text-gray-800 mt-4">
                Here’s to the moments that made you who you are. <br />— The
                Live Story Team
              </Text>
            </Section>

            {/* Help Section */}
            <Section className="mt-8 bg-[#eff6ff] p-6 rounded-lg">
              <Text className="text-xl font-bold text-[#1d4ed8]">
                Have questions or ideas?
              </Text>
              <Text className="text-lg text-gray-700 mt-2">
                We’re just an email away! Reach out to us:
              </Text>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-2xl font-bold text-[#2563eb] bg-white px-4 py-2 rounded-lg inline-block mt-3 shadow-md hover:bg-gray-100 transition"
              >
                {SUPPORT_EMAIL}
              </a>
            </Section>

            {/* Footer */}
            <Hr className="my-6 border-gray-300" />
            <Text className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Live Story. All rights
              reserved.
              <br />
              Visit us at{" "}
              <a
                href={WEBSITE_URL}
                className="text-[#2563eb] font-semibold hover:underline"
              >
                {WEBSITE_URL}
              </a>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

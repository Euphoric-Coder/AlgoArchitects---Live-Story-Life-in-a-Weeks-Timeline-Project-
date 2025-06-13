"use client";

import { ModeToggle } from "@/components/theme-btn";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import React from "react";

const page = () => {
  const { isSignedIn } = useUser();

  return (
    <div>
      page
      <ModeToggle />
      {isSignedIn ? (
        <div>
          <UserButton />
          <Button asChild>
            <SignOutButton />
          </Button>
        </div>
      ) : (
        <Button asChild>
          <SignInButton />
        </Button>
      )}
    </div>
  );
};

export default page;

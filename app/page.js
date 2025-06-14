"use client";

import { ModeToggle } from "@/components/theme-btn";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
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
      <Image src={"/logo.png"} alt="logo" width={100} height={100} className="" />
    </div>
  );
};

export default page;

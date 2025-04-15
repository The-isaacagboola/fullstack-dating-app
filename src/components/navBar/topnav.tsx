import Link from "next/link";
import React from "react";
import NavLinks from "./navLinks";
import { auth } from "@/auth";

const TopNav = async () => {
  const session = await auth();

  return (
    <div className="flex justify-between text-xl items-center">
      <h1 className="text-2xl font-semibold">
        <Link href={"/"}>MatchMe</Link>
      </h1>

      <NavLinks session={session?.user} />
    </div>
  );
};

export default TopNav;

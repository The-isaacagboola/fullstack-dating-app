import Link from "next/link";
import React from "react";
import NavLinks from "./navLinks";
import { auth } from "@/auth";
import UserMenu from "./userMenu";
import { headers } from "next/headers";

const TopNav = async () => {
  const session = await auth();
  const headersList = await headers();
  const pathname = headersList.get("x-next-url");
  console.log(pathname);

  return (
    <div className="flex justify-between text-xl items-center mt-5 mb-8">
      <h1 className="text-2xl font-semibold">
        <Link href={"/"}>MatchMe</Link>
      </h1>

      <NavLinks />

      {session && session.user ? (
        <UserMenu session={session.user} />
      ) : (
        <div className="flex gap-4">
          <button className={`${pathname == "/login" ? "text-red-500 " : ""}`}>
            <Link href={"/login"}>Login</Link>
          </button>
          <button
            className={`${pathname == "/register" ? "text-red-500 " : ""}`}
          >
            <Link href={"/register"}>Register</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default TopNav;

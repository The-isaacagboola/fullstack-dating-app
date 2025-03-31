"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center  gap-10 w-[40%] justify-between">
      <ul className="flex gap-2">
        <li
          className={`${
            pathname == "/matches" ? "text-green-700 font-semibold" : ""
          }`}
        >
          <Link href={"/matches"}>Matches</Link>
        </li>
        <li
          className={`${
            pathname == "/friends" ? "text-green-700 font-semibold" : ""
          }`}
        >
          <Link href={"/friends"}> Lists</Link>
        </li>
        <li
          className={`${
            pathname == "/messages" ? "text-green-700 font-semibold" : ""
          }`}
        >
          <Link href={"/messages"}>Messages</Link>
        </li>
      </ul>

      <div className="flex gap-4">
        <button
          className={`${
            pathname == "/login" ? "text-green-700 font-semibold" : ""
          }`}
        >
          <Link href={"/login"}>Login</Link>
        </button>
        <button
          className={`${
            pathname == "/register" ? "text-green-700 font-semibold" : ""
          }`}
        >
          <Link href={"/register"}>Register</Link>
        </button>
      </div>
    </div>
  );
};

export default NavLinks;

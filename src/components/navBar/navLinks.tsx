"use client";
import Link from "next/link";
import React, { useState } from "react";

const NavLinks = () => {
  const [active, setActive] = useState("/active");
  return (
    <ul className="flex gap-2">
      <li
        onClick={() => setActive("/matches")}
        className={`${
          active == "/matches" ? "text-green-700 font-semibold" : ""
        }`}
      >
        <Link href={"/matches"}>Matches</Link>
      </li>
      <li
        onClick={() => setActive("/friends")}
        className={`${
          active == "/friends" ? "text-green-700 font-semibold" : ""
        }`}
      >
        <Link href={"/friends"}> Lists</Link>
      </li>
      <li
        onClick={() => setActive("/messages")}
        className={`${
          active == "/messages" ? "text-green-700 font-semibold" : ""
        }`}
      >
        <Link href={"/messages"}>Messages</Link>
      </li>
    </ul>
  );
};

export default NavLinks;

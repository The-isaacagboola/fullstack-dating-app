"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type UserProp = {
  name: string;
  email: string;
  image: null | string;
  id: string;
};

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="gap-2 hidden md:flex">
      <li className={`${pathname == "/matches" ? "text-red-500 " : ""}`}>
        <Link href={"/matches"}>Matches</Link>
      </li>
      <li className={`${pathname == "/members" ? "text-red-500 " : ""}`}>
        <Link href={"/members"}> Lists</Link>
      </li>
      <li className={`${pathname == "/messages" ? "text-red-500 " : ""}`}>
        <Link href={"/messages"}>Messages</Link>
      </li>
    </ul>
  );
};

export default NavLinks;

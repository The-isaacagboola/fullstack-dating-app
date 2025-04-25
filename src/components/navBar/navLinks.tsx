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
      <li className={`${pathname == "/members" ? "text-red-500 " : ""}`}>
        <Link href={"/members"}>Matches</Link>
      </li>
      <li className={`${pathname == "/lists" ? "text-red-500 " : ""}`}>
        <Link href={"/lists?type=source"}> Lists</Link>
      </li>
      <li className={`${pathname == "/messages" ? "text-red-500 " : ""}`}>
        <Link href={"/messages?container=inbox"}>Messages</Link>
      </li>
    </ul>
  );
};

export default NavLinks;

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "./userMenu";

export type UserProp = {
  name: string;
  email: string;
  image: null | string;
  id: string;
};

const NavLinks = ({ session }: { session: UserProp }) => {
  const pathname = usePathname();

  return (
    <div className="flex items-center  gap-10 w-[60%] justify-between">
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

      {session ? (
        <UserMenu session={session} />
      ) : (
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
      )}
    </div>
  );
};

export default NavLinks;

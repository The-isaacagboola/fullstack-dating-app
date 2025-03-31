import Link from "next/link";
import React from "react";
import NavLinks from "./navLinks";
import profileImage from "@/app/favicon.ico";
import Image from "next/image";

const TopNav = () => {
  return (
    <div className="flex justify-between text-xl">
      <h1 className="text-2xl font-semibold">
        <Link href={"/"}>MatchMe</Link>
      </h1>

      <NavLinks />

      <div className="w-10 cursor-pointer">
        <Image src={profileImage} alt="profile image" />
      </div>
    </div>
  );
};

export default TopNav;

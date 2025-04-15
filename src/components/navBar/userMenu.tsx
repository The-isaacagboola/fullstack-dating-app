"use client";
import { useState } from "react";
import { UserProp } from "./navLinks";
import Image from "next/image";
import profileImage from "./avatardefault_92824.webp";
import Link from "next/link";
import SignOutButton from "../signOutButton";

const UserMenu = ({ session }: { session: UserProp }) => {
  const [showDropDn, setShowDropDn] = useState(true);
  const toggleDropDn = () => setShowDropDn((prev) => !prev);
  return (
    <div>
      <div className="w-10" tabIndex={0} onBlur={() => setShowDropDn(false)}>
        <Image
          src={session.image || profileImage}
          alt="profile image"
          className="cursor-pointer"
          onClick={toggleDropDn}
        />

        {showDropDn && (
          <div className="absolute flex flex-col gap-3 w-[200px] right-10 p-4">
            <p>Signed in as {session.name}</p>

            <Link href={"/"} className="inline-flex">
              Edit Profile
            </Link>

            <SignOutButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;

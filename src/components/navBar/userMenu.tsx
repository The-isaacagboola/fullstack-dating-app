"use client";
import { useEffect, useRef, useState } from "react";
import { UserProp } from "./navLinks";
import Image from "next/image";
import profileImage from "./avatardefault_92824.webp";
import Link from "next/link";
import SignOutButton from "../signOutButton";

const UserMenu = ({ session }: { session: UserProp }) => {
  const [showDropDn, setShowDropDn] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleDropDn = () => setShowDropDn((prev) => !prev);

  useEffect(() => {
    function closeDropDownByClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowDropDn(false);
      }
    }
    document.addEventListener("mousedown", closeDropDownByClick);

    return () =>
      document.removeEventListener("mousedown", closeDropDownByClick);
  }, []);
  return (
    <div>
      <div className="w-10">
        <Image
          src={session.image || profileImage}
          alt="profile image"
          className="cursor-pointer"
          onClick={toggleDropDn}
        />

        {showDropDn && (
          <div
            ref={menuRef}
            className="absolute flex flex-col gap-3 w-[200px] right-10 p-4 mt-3"
          >
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

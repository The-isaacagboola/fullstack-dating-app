"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import profileImage from "./avatardefault_92824.webp";
import SignOutButton from "../signOutButton";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserMenu = ({ session }: { session: any }) => {
  const [showDropDn, setShowDropDn] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
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
          className="cursor-pointer rounded-full"
          onClick={toggleDropDn}
          width={50}
          height={50}
        />

        {showDropDn && (
          <div
            ref={menuRef}
            className="absolute z-[1000] rounded-lg bg-white from-red-200 to-red-white text-black flex flex-col gap-3 w-[220px] right-10 p-4 mt-3"
          >
            <p className="font-medium">Signed in as {session.name}</p>

            <div
              onClick={() => {
                setShowDropDn(false);
                router.push("/members/edit");
              }}
              className="inline-flex cursor-pointer"
            >
              Edit Profile
            </div>

            <SignOutButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;

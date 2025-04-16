"use client";
import Image from "next/image";
import { Member } from "../actions/memberActions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { calculateAge } from "@/lib/helpers";

const MemberSideBar = ({ member }: { member: Member }) => {
  const path = usePathname();
  const basePath = `/members/${member.userId}`;
  console.log(path);
  const links = [
    {
      title: "Profile",
      url: basePath,
    },
    {
      title: "Photos",
      url: `${basePath}/photos`,
    },
    {
      title: "Chat",
      url: `${basePath}/chat`,
    },
  ];

  return (
    <div className="flex flex-col justify-between min-h-[600px] py-4 px-7  text-lg rounded-xl shadow-xl bg-gray-700/10">
      <div className="flex flex-col items-center w-full">
        <Image
          alt="profile image"
          src={member.image || "/images/user.png"}
          width={100}
          height={100}
          className="rounded-full mt-4"
        />
        <div className="w-full text-center pb-2 border-b-2 border-gray-400/20">
          <h1 className="font-medium mt-2">
            {member.name}, {calculateAge(member.dateOfBirth)}
          </h1>
          <p className="text-gray-400">
            {member.city}, {member.country}
          </p>
        </div>

        <div className="w-full mt-8 flex flex-col gap-3">
          {links.map((link) => (
            <p
              key={link.title}
              className={`${
                path === link.url ? "text-gray-500 font-medium text-xl" : ""
              }`}
            >
              <Link href={link.url}>{link.title}</Link>
            </p>
          ))}
        </div>
      </div>

      <Link
        href={"/members"}
        className="text-center cursor-pointer border-gray-600 p-2 rounded-xl border w-full"
      >
        Go Back
      </Link>
    </div>
  );
};

export default MemberSideBar;

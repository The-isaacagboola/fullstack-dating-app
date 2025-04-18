import React, { ReactNode } from "react";
import MemberSideBar from "../memberSideBar";
import { getMemberById } from "@/app/actions/memberActions";
import { getAuthUserId } from "@/app/actions/authActions";

const Layout = async ({ children }: { children: ReactNode }) => {
  const userId = await getAuthUserId();
  const { member, error } = await getMemberById(userId);

  if (error) {
    return <div>{error}</div>;
  }

  if (!member) {
    return <div>User does not exist</div>;
  }

  const basePath = `/members/edit`;
  const links = [
    {
      title: "Profile",
      url: basePath,
    },
    {
      title: "Update Photos",
      url: `${basePath}/photos`,
    },
  ];

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3 mr-6">
        <MemberSideBar links={links} member={member} />
      </div>
      <div className="col-span-9 py-4 px-7 text-lg rounded-xl shadow-xl bg-gray-700/10">
        {children}
      </div>
    </div>
  );
};

export default Layout;

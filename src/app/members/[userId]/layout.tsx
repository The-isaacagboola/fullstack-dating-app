import React, { ReactNode } from "react";
import MemberSideBar from "../memberSideBar";
import { getMemberById } from "@/app/actions/memberActions";

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { userId: string };
}) => {
  const { userId } = await params;
  const { member, error } = await getMemberById(userId);

  if (error) {
    return <div>{error}</div>;
  }

  if (!member) {
    return <div>User does not exist</div>;
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3 mr-6">
        <MemberSideBar member={member} />
      </div>
      <div className="col-span-9 py-4 px-7 text-lg rounded-xl shadow-xl bg-gray-700/10">
        {children}
      </div>
    </div>
  );
};

export default Layout;

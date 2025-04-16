import React from "react";
import { getMembers } from "../actions/memberActions";
import MemberCard from "./MemberCard";

const FriendsPage = async () => {
  const members = await getMembers();

  if (!members) {
    return (
      <div>
        <h1>No members available</h1>
      </div>
    );
  }

  return (
    <div className="container mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <MemberCard key={member.id} memberData={member} />
      ))}
    </div>
  );
};

export default FriendsPage;

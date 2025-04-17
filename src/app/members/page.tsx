import React from "react";
import { getMembers } from "../actions/memberActions";
import MemberCard from "./MemberCard";
import { fetchCurrentUserLikeIDs } from "../actions/likeActions";

const FriendsPage = async () => {
  const { members, error } = await getMembers();
  const likeIds = await fetchCurrentUserLikeIDs();

  if (error) {
    return <div>Error : {error}</div>;
  }

  if (!members || members.length === 0) {
    return (
      <div>
        <h1>No members available</h1>
      </div>
    );
  }

  return (
    <div className="container grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-5">
      {members.map((member) => (
        <MemberCard key={member.id} memberData={member} likeIds={likeIds} />
      ))}
    </div>
  );
};

export default FriendsPage;

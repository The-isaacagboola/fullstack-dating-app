import React from "react";
import {
  fetchCurrentUserLikeIDs,
  fetchLikedMembers,
} from "../actions/likeActions";
import MemberCard from "../members/MemberCard";
import Link from "next/link";
import { NextPage } from "next";

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}
const Links = [
  {
    id: 1,
    title: "Members i have liked",
    type: "source",
  },
  {
    id: 2,
    title: "Members that like me",
    type: "target",
  },
  {
    title: "Mutual likes",
    id: 3,
    type: "mutual",
  },
];

const ListsPage: NextPage<PageProps> = async ({ searchParams }) => {
  const type = searchParams?.type || "source";
  const members = await fetchLikedMembers(type || "source");
  const likedIDs = await fetchCurrentUserLikeIDs();

  return (
    <div className="">
      <div className="inline-flex text-center text-white mb-4 gap-1 p-[6px] py-2 bg-red-500/50 rounded transition-all">
        {Links.map((link) => (
          <Link
            className={`rounded  py-1 px-2 ${
              type === link.type ? "bg-white text-black" : ""
            }`}
            key={link.id}
            href={`/lists?type=${link.type}`}
          >
            {link.title}
          </Link>
        ))}
      </div>
      {members.length > 0 ? (
        <div className="container grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-5">
          {members.map((member) => (
            <MemberCard
              likeIds={likedIDs}
              memberData={member}
              key={member.id}
            />
          ))}
        </div>
      ) : (
        <div>No members present for this filter </div>
      )}
    </div>
  );
};

export default ListsPage;

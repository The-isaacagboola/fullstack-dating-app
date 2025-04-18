"use client";

import { toggleLikeMember } from "@/app/actions/likeActions";
import { useRouter } from "next/navigation";
import { AiFillHeart } from "react-icons/ai";

interface Prop {
  targetId: string;
  hasLiked: boolean;
}
const LikeUserButton = ({ targetId, hasLiked }: Prop) => {
  const router = useRouter();

  async function toggleLike() {
    await toggleLikeMember(targetId, hasLiked);
    router.refresh();
  }
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleLike();
      }}
      className={`absolute flex items-center justify-center right-2 top-2 transition-all hover:opacity-80 cursor-pointer ${
        hasLiked ? "bg-red-200" : "bg-black/10"
      } p-1 rounded-full`}
    >
      <AiFillHeart color={hasLiked ? "#E31B23" : "#999999"} size={20} />
    </div>
  );
};

export default LikeUserButton;

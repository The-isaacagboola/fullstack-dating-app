import Image from "next/image";
import { calculateAge } from "@/lib/helpers";
import Link from "next/link";
import LikeUserButton from "@/components/LikeButton";

interface Props {
  memberData: {
    id: string;
    image: string;
    name: string;
    userId: string;
    gender: string;
    dateOfBirth: Date;
    created: Date;
    updated: Date;
    description: string;
    city: string;
    country: string;
  };
  likeIds: string[];
}

const MemberCard = async ({ memberData, likeIds }: Props) => {
  console.log(likeIds, memberData.id);
  const liked = !!likeIds.includes(memberData.userId);
  return (
    <Link
      href={`/members/${memberData.userId}`}
      className="relative group h-[300px] text-black rounded-xl overflow-hidden"
    >
      <Image
        src={memberData.image || "/images/user.png"}
        alt="user profile picture"
        className="object-cover aspect-square group-hover:scale-105 transition-all"
        fill
      />
      <LikeUserButton hasLiked={liked} targetId={memberData.userId} />

      <div className="absolute z-[1000] bottom-0 pl-3 shadow-sm w-full pb-4 bg-gradient-to-b from-transparent to-white border-none">
        <p className="font-medium text-lg">
          <span>{memberData.name}, </span>
          <span>{calculateAge(memberData.dateOfBirth)}</span>
        </p>
        <p>{memberData.city}</p>
      </div>
    </Link>
  );
};

export default MemberCard;

import Image from "next/image";
import { calculateAge } from "@/lib/helpers";

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
}

const MemberCard = ({ memberData }: Props) => {
  return (
    <div className="relative w-full h-[250px] text-black rounded-t-xl overflow-hidden">
      <Image
        src={memberData.image || "/images/user.png"}
        alt="user profile picture"
        className=" object-cover  "
        fill
      />

      <div className="absolute z-[1000] bottom-0 pl-3 shadow-sm w-full pb-4 bg-gradient-to-t from-black/90 to-transparent">
        <p className="font-medium text-lg">
          <span>{memberData.name}, </span>
          <span>{calculateAge(memberData.dateOfBirth)}</span>
        </p>
        <p>{memberData.city}</p>
      </div>
    </div>
  );
};

export default MemberCard;

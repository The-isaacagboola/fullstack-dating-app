import { Photo } from "@prisma/client";
import { GoStarFill } from "react-icons/go";
import { ImSpinner3 } from "react-icons/im";
export type Loading = {
  state: boolean;
  id?: string;
  type?: "mainImg" | "delete" | null;
};
export default function StarButton({
  loading,
  mainImageUrl,
  photo,
}: {
  loading: boolean;
  mainImageUrl: string;
  photo: Photo;
}) {
  return (
    <div>
      {loading ? (
        <ImSpinner3 size={20} fill="#808080" className="spin-item" />
      ) : (
        <GoStarFill
          size={20}
          fill={mainImageUrl === photo.url ? "#FFB923" : "#808080"}
        />
      )}
    </div>
  );
}

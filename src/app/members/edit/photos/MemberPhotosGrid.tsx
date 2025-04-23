"use client";
import { deleteImage, setMainImage } from "@/app/actions/userActions";
import MemberImage from "@/components/MemberImage";
import { Photo } from "@prisma/client";
import { useRouter } from "next/navigation";
// import { MouseEvent } from "react";
import { GoStarFill } from "react-icons/go";
import { RiDeleteBinFill } from "react-icons/ri";
import { toast } from "react-toastify";

const MemberPhotosGrid = ({
  photos,
  mainImageUrl,
}: {
  photos: Photo[];
  mainImageUrl: string;
}) => {
  const router = useRouter();
  const handleImageDelete = async (photo: Photo) => {
    await deleteImage(photo);
    toast.success("Image deleted successfully");
    router.refresh();
  };
  const handleMainImageSelection = async (photo: Photo) => {
    if (photo.url !== mainImageUrl) {
      await setMainImage(photo);
      router.refresh();
    } else toast.done("Already chosen as display picture");
  };

  return (
    <div className="flex gap-3 relative">
      {photos.map((photo) => (
        <div key={photo.id} className="object-cover   cursor-pointer relative">
          <MemberImage key={photo.id} photo={photo} />
          <div className="absolute flex justify-between z-[1000] top-2 w-full px-2">
            <div
              className="p-1 bg-white rounded-full"
              onClick={() => handleMainImageSelection(photo)}
            >
              <GoStarFill
                size={20}
                fill={mainImageUrl === photo.url ? "#FFB923" : "#808080"}
              />
            </div>

            <div
              className="p-1 bg-white rounded-full"
              onClick={() => handleImageDelete(photo)}
            >
              <RiDeleteBinFill size={20} fill="#FF0000" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberPhotosGrid;

"use client";
import { deleteImage, setMainImage } from "@/app/actions/userActions";
import DeleteButton from "@/components/DeleteButton";
import MemberImage from "@/components/MemberImage";
import StarButton, { Loading } from "@/components/StarButton";
import { Photo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const MemberPhotosGrid = ({
  photos,
  mainImageUrl,
}: {
  photos: Photo[];
  mainImageUrl: string;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<Loading>({
    state: false,
    id: "",
    type: null,
  });

  const handleImageDelete = async (photo: Photo) => {
    if (photo.url === mainImageUrl)
      return toast.info("Cannot delete main display image.");
    try {
      setLoading({ type: "delete", state: true, id: photo.id });
      await deleteImage(photo);
      toast.success("Image deleted successfully");
      setLoading({ type: null, state: false, id: "" });
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete image. Try again");
      setLoading({ type: null, state: false, id: "" });
    }
    router.refresh();
  };

  const handleMainImageSelection = async (photo: Photo) => {
    if (photo.url !== mainImageUrl) {
      try {
        setLoading({ type: "mainImg", state: true, id: photo.id });
        await setMainImage(photo);
        router.refresh();
      } catch (error) {
        console.log(error);
        setLoading({ type: null, state: false, id: "" });
        toast.error("Please try again");
      }
      setLoading({ type: null, state: false, id: "" });
    } else toast.done("Already chosen as display picture");
  };

  return (
    <div className="flex gap-3 relative">
      {photos.map((photo) => (
        <div key={photo.id} className="object-cover   cursor-pointer relative">
          <MemberImage key={photo.id} photo={photo} />
          <div className="absolute flex justify-between z-[1000] top-2 w-full px-2">
            <div
              className="p-1 bg-white opacity-60 transition-all hover:opacity-100 rounded-full"
              onClick={() => handleMainImageSelection(photo)}
            >
              <StarButton
                loading={
                  loading.state &&
                  loading.id === photo.id &&
                  loading.type === "mainImg"
                }
                mainImageUrl={mainImageUrl}
                photo={photo}
              />
            </div>

            <div
              className="p-1 bg-white opacity-60 transition-all hover:opacity-100 rounded-full"
              onClick={() => handleImageDelete(photo)}
            >
              <DeleteButton
                loading={
                  loading.state &&
                  loading.id === photo.id &&
                  loading.type === "delete"
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberPhotosGrid;

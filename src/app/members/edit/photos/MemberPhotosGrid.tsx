import { Photo } from "@prisma/client";
import Image from "next/image";

const MemberPhotosGrid = ({
  photos,
  mainImageUrl,
}: {
  photos: Photo[];
  mainImageUrl: string;
}) => {
  return (
    <div className="grid grid-cols-5 gap-3">
      {photos.map((photo) => (
        <Image
          key={photo.id}
          alt="User images"
          src={photo.url}
          className="aspect-square object-cover rounded-full cursor-pointer"
          width={90}
          height={90}
        />
      ))}
    </div>
  );
};

export default MemberPhotosGrid;

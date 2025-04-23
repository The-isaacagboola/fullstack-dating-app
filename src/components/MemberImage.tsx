"use client";
import { Photo } from "@prisma/client";
import Image from "next/image";
import { CldImage } from "next-cloudinary";

const MemberImage = ({ photo }: { photo: Photo }) => {
  if (photo.publicId) {
    return (
      <CldImage
        src={photo.publicId}
        alt="member uploaded image"
        width={150}
        height={150}
        className="object-cover w-full h-full rounded-xl"
      />
    );
  } else
    return (
      <Image
        alt="User images"
        src={photo.url || "/images/user.png"}
        className="aspect-square object-cover rounded-xl"
        width={150}
        height={150}
      />
    );
};

export default MemberImage;

import { getMemberPhotosByID } from "@/app/actions/memberActions";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import Image from "next/image";

const PhotosPage = async ({ params }: { params: { userId: string } }) => {
  const { userId } = await params;
  const { photos, error } = await getMemberPhotosByID(userId);

  if (error) {
    return <div>{error} </div>;
  }
  if (!photos) {
    return <div> No Images Available</div>;
  }

  return (
    <CardInnerWrapper header={"Photos"}>
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
    </CardInnerWrapper>
  );
};

export default PhotosPage;

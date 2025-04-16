import { getMemberPhotosByID } from "@/app/actions/memberActions";
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
    <div className="w-full">
      <div className="w-full mt-3 pb-2 mb-4 border-b-2 border-gray-400/20">
        <h1 className="text-2xl font-medium">Photos</h1>
      </div>
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
    </div>
  );
};

export default PhotosPage;

import { getAuthUserId } from "@/app/actions/authActions";
import {
  getMemberById,
  getMemberPhotosByID,
} from "@/app/actions/memberActions";
import MemberPhotosGrid from "./MemberPhotosGrid";
import MemberPhotoUpload from "./MemberPhotoUpload";

const PhotosPage = async () => {
  const userId = await getAuthUserId();
  const { member } = await getMemberById(userId);

  const { photos, error } = await getMemberPhotosByID(userId);
  if (error) {
    return (
      <div>
        Unable to fetch user photos. Please check your internet and try again
      </div>
    );
  }

  if (member === null) {
    return <div>User not found</div>;
  }

  if (photos == null) {
    return <div>No images uploaded</div>;
  }

  return (
    <div className="w-full">
      <div className="w-full mt-3 pb-2 mb-4 border-b-2 border-gray-400/20">
        <h1 className="text-2xl font-medium">Profile</h1>
      </div>
      <div className="mt-6">
        <MemberPhotoUpload />
        <MemberPhotosGrid photos={photos} mainImageUrl={member.image} />
      </div>
    </div>
  );
};

export default PhotosPage;

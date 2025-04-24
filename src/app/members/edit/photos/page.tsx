import { getAuthUserId } from "@/app/actions/authActions";
import {
  getMemberById,
  getMemberPhotosByID,
} from "@/app/actions/memberActions";
import MemberPhotosGrid from "./MemberPhotosGrid";
import MemberPhotoUpload from "./MemberPhotoUpload";
import CardInnerWrapper from "@/components/CardInnerWrapper";

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
    <CardInnerWrapper header={"Update Photos"}>
      <div className="mt-6">
        <MemberPhotoUpload />
        <MemberPhotosGrid photos={photos} mainImageUrl={member.image} />
      </div>
    </CardInnerWrapper>
  );
};

export default PhotosPage;

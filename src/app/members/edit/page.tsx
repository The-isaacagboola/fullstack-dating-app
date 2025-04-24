import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberById } from "@/app/actions/memberActions";
import EditProfileForm from "./EditForm";
import CardInnerWrapper from "@/components/CardInnerWrapper";

export default async function EditProfilePage() {
  const userId = await getAuthUserId();
  const { member, error } = await getMemberById(userId);

  if (error || !member) {
    return <div>Unable to get user profile. Please try again</div>;
  }

  return (
    <CardInnerWrapper header={"Edit Profile"}>
      <div className="mt-6">
        <EditProfileForm member={member} />
      </div>
    </CardInnerWrapper>
  );
}

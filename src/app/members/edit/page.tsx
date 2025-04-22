import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberById } from "@/app/actions/memberActions";
import EditProfileForm from "./EditForm";

export default async function EditProfilePage() {
  const userId = await getAuthUserId();
  const { member, error } = await getMemberById(userId);

  if (error || !member) {
    return <div>Unable to get user profile. Please try again</div>;
  }

  return (
    <div className="w-full">
      <div className="w-full mt-3 pb-2 mb-4 border-b-2 border-gray-400/20">
        <h1 className="text-2xl font-medium">Profile</h1>
      </div>
      <div className="mt-6">
        <EditProfileForm member={member} />
      </div>
    </div>
  );
}

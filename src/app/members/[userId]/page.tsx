import { getMemberById } from "@/app/actions/memberActions";

const MemberProfilePage = async ({
  params,
}: {
  params: { userId: string };
}) => {
  const { userId } = await params;
  const { member, error } = await getMemberById(userId);

  if (error) {
    return <div>Unable to fetch user profile. Please try again </div>;
  }

  if (!member) {
    return <div>User does not exist</div>;
  }

  return (
    <div className="w-full">
      <div className="w-full mt-3 pb-2 mb-4 border-b-2 border-gray-400/20">
        <h1 className="text-2xl font-medium">Profile</h1>
      </div>
      <div>
        <p>{member.description}</p>
      </div>
    </div>
  );
};

export default MemberProfilePage;

import { getMemberById } from "@/app/actions/memberActions";
import CardInnerWrapper from "@/components/CardInnerWrapper";

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
    <CardInnerWrapper header={"Profile"}>
      <div>
        <p>{member.description}</p>
      </div>
    </CardInnerWrapper>
  );
};

export default MemberProfilePage;

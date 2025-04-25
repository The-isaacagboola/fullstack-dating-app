import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import MessageBox from "./MessageBox";
import { getAuthUserId } from "@/app/actions/authActions";

const ChatPage = async ({ params }: { params: { userId: string } }) => {
  const { userId } = await params;
  const authUserId = await getAuthUserId();
  const { error, messages } = await getMessageThread(userId);

  return (
    <CardInnerWrapper
      header={"Chat"}
      footer={<ChatForm recipientId={userId} />}
    >
      {error ? (
        <div>Error fetching chat history</div>
      ) : (
        <div className="grid grid-cols-10">
          {messages && messages.length > 0 ? (
            messages.map((message) => (
              <MessageBox
                key={message.id}
                message={message}
                author={message.senderId === authUserId}
              />
            ))
          ) : (
            <p>No messages</p>
          )}
        </div>
      )}
    </CardInnerWrapper>
  );
};

export default ChatPage;

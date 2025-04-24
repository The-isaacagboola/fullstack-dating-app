import { Prisma } from "@prisma/client";
import { format } from "date-fns";
export const calculateAge = (dob: Date) => {
  return new Date().getFullYear() - dob.getFullYear();
};

export type MessageWithSenderRecipient = Prisma.MessageGetPayload<{
  select: {
    id: true;
    text: true;
    created: true;
    dateRead: true;
    sender: {
      select: {
        userId: true;
        name: true;
        image: true;
      };
    };
    recipient: {
      select: {
        userId: true;
        name: true;
        image: true;
      };
    };
  };
}>;
export function formatShortDateTime(date: Date) {
  return format(date, "dd MM yy h:mm:a");
}
export function mapMessageToMessageDTO(message: MessageWithSenderRecipient) {
  return {
    id: message.id,
    text: message.text,
    created: formatShortDateTime(message.created),
    dateRead: message.dateRead ? formatShortDateTime(message.dateRead) : null,
    senderId: message.sender?.userId,
    senderName: message.sender?.name,
    senderImage: message.sender?.image,
    recipientId: message.recipient?.userId,
    recipientName: message.recipient?.name,
    recipientImage: message.recipient?.image,
  };
}

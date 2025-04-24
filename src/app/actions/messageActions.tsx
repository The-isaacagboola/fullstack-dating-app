"use server";

import { messageSchema, MessageSChema } from "@/lib/schemas/schema";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/prisma";
import { mapMessageToMessageDTO } from "@/lib/helpers";

export async function createMessage(recipientId: string, data: MessageSChema) {
  try {
    const senderId = await getAuthUserId();

    const validated = messageSchema.safeParse(data);

    if (!validated.success) {
      return {
        status: "error",
        error: validated.error.errors,
      };
    }

    const message = await prisma.message.create({
      data: {
        text: data.text,
        senderId,
        recipientId,
      },
    });

    return {
      success: true,
      data: message,
    };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Someting went wrong. Try again" };
  }
}

export async function getMessageThread(recipientId: string) {
  try {
    const userId = await getAuthUserId();
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, recipientId, senderDeleted: false },
          {
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      orderBy: {
        created: "asc",
      },
      select: {
        id: true,
        text: true,
        created: true,
        dateRead: true,
        sender: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
        recipient: {
          select: {
            userId: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return {
      error: false,
      messages: messages.map((message) => mapMessageToMessageDTO(message)),
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      messages: null,
    };
  }
}

"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function getMembers() {
  const session = await auth();

  if (!session?.user) return null;

  try {
    return await prisma.member.findMany({
      where: {
        NOT: {
          userId: session.user.id,
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

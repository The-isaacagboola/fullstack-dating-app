"use server";

import { EditProfileType } from "@/lib/schemas/schema";
import { prisma } from "@/prisma";
import { getAuthUserId } from "./authActions";

export const updateMemberProfile = async (
  data: EditProfileType,
  nameUpdated: boolean
) => {
  try {
    const userId = await getAuthUserId();

    if (nameUpdated) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: { name: data.name },
      });
    }

    await prisma.member.update({
      where: { userId },
      data,
    });

    return { error: false, message: "Profile updated successfully" };
  } catch (error) {
    console.log(error);
    throw { error: true, message: "Error updating Profile" };
  }
};

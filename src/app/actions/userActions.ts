"use server";
import { prisma } from "@/prisma";
import { getAuthUserId } from "./authActions";
import { Photo } from "@prisma/client";

export async function addImage(url: string, publicId: string) {
  try {
    const userId = await getAuthUserId();
    console.log("userId::::::::::", userId);
    return prisma.member.update({
      where: { userId: userId },
      data: {
        photos: {
          create: {
            url,
            publicId,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function setMainImage(photo: Photo) {
  try {
    // if (!photo.isApproved) throw new Error('Only approved photos can be set to main image')
    const userId = await getAuthUserId();

    await prisma.user.update({
      where: { id: userId },
      data: { image: photo.url },
    });

    return prisma.member.update({
      where: { userId },
      data: { image: photo.url },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

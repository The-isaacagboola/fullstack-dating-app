"use server";
import { prisma } from "@/prisma";
import { getAuthUserId } from "./authActions";
import { Photo } from "@prisma/client";
import { cloudinary } from "@/lib/cloudinary";

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
    await cloudinary.v2.uploader.destroy(publicId);
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

export async function deleteImage(photo: Photo) {
  const userId = await getAuthUserId();
  if (userId !== photo.memberId) {
    return new Error("Images cannot be deleted by third-parties");
  } else {
    try {
      if (photo.publicId) {
        await cloudinary.v2.uploader.destroy(photo.publicId);
      }
      return await prisma.member.update({
        where: {
          userId,
        },
        data: {
          photos: {
            delete: { id: photo.id },
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export async function getUserInfoForNav() {
  try {
    const userId = await getAuthUserId();
    return prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, image: true },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

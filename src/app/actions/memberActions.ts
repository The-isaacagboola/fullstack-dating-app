"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export interface Member {
  name: string;
  id: string;
  userId: string;
  image: string;
  gender: string;
  dateOfBirth: Date;
  created: Date;
  updated: Date;
  description: string;
  city: string;
  country: string;
}
export interface Photo {
  id: string;
  url: string;
  publicId: string | null;
  memberId: string;
}

type GetMembersResponse = {
  members: Member[] | null;
  error: string | null;
};

export async function getMembers(): Promise<GetMembersResponse> {
  const session = await auth();

  if (!session?.user)
    return { members: null, error: "User not authenticated. Please log in" };

  try {
    const members = await prisma.member.findMany({
      where: {
        NOT: {
          userId: session.user.id,
        },
      },
    });
    return { members, error: null };
  } catch (error) {
    console.log(error);
    return {
      members: null,
      error:
        "Failed to fetch members list. Please check your internet and try again",
    };
  }
}

type GetById = {
  member: Member | null;
  error: boolean;
};
type GetPhotosId = {
  photos: Photo[] | null;
  error: string | null;
};

export async function getMemberById(id: string): Promise<GetById> {
  try {
    const member = await prisma.member.findUnique({
      where: {
        userId: id,
      },
    });
    return { error: false, member };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      member: null,
    };
  }
}

export async function getMemberPhotosByID(
  userId: string
): Promise<GetPhotosId> {
  try {
    const member = await prisma.member.findUnique({
      where: {
        userId,
      },
      select: { photos: true },
    });

    if (member === null || member.photos.length === 0) {
      return { photos: null, error: "No images available" };
    }

    return { photos: member.photos, error: null };
  } catch (error) {
    console.log(error);
    return { photos: null, error: "" };
  }
}

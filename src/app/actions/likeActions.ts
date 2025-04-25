"use server";
import { prisma } from "@/prisma";
import { getAuthUserId } from "./authActions";

export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
  try {
    const userId = await getAuthUserId();

    if (isLiked) {
      await prisma.like.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: userId,
            targetUserId,
          },
        },
      });
    } else {
      await prisma.like.create({
        data: {
          sourceUserId: userId,
          targetUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchCurrentUserLikeIDs() {
  try {
    const userId = await getAuthUserId();
    const likeIds = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
      select: { targetUserId: true },
    });
    return likeIds.map((like) => like.targetUserId);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchLikedMembers(type = "source") {
  try {
    const userId = await getAuthUserId();

    switch (type) {
      case "source":
        return await fetchSourceLikes(userId);
      case "target":
        return await fetchTargetLikes(userId);
      case "mutual":
        return await fetchMutualLikes(userId);
      default:
        return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function fetchSourceLikes(userId: string) {
  try {
    const sourceLikes = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
      select: {
        targetMember: true,
      },
    });
    return sourceLikes.map((like) => like.targetMember);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function fetchTargetLikes(userId: string) {
  try {
    const likes = await prisma.like.findMany({
      where: {
        targetUserId: userId,
      },
      select: {
        sourceMember: true,
      },
    });
    return likes.map((like) => like.sourceMember);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function fetchMutualLikes(userId: string) {
  try {
    const likedMembers = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
      select: { targetUserId: true },
    });
    const likedIds = likedMembers.map((member) => member.targetUserId);

    const mutualList = await prisma.like.findMany({
      where: {
        AND: [{ targetUserId: userId }, { sourceUserId: { in: likedIds } }],
      },
      select: {
        sourceMember: true,
      },
    });
    return mutualList.map((item) => item.sourceMember);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

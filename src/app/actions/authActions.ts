"use server";

import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/prisma";
import {
  LoginSchema,
  registerSchema,
  RegisterSchema,
} from "@/lib/schemas/schema";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export async function signInUser(data: LoginSchema) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { status: "success", data: "Logged in" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Invalid credentials" };
        default:
          return {
            status: "error",
            error:
              "Something went wrong. Please check your internet and try again",
          };
      }
    } else {
      return { status: "error", error: "Something else went wrong" };
    }
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: "" });
}

export async function registerUser(data: RegisterSchema) {
  try {
    const validated = registerSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { name, email, password } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) return { status: "error", error: "User already exists" };

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
    });

    return { status: "success", data: user };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({ where: { id } });
}

export async function getAuthUserId() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorised");
  }

  return userId;
}

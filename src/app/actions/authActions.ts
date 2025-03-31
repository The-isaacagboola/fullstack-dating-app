"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/prisma";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export type LoginSchema = {
  email: string;
  password: string;
};

export type RegisterSchema = {
  name: string;
  email: string;
  password: string;
};

export async function signInUser(data: LoginSchema) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { status: "success", data: "Logged in" };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Invalid credentials" };
        default:
          return { status: "error", error: "Something went wrong" };
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
    const validated = data.email && data.name && data.password;

    if (!validated) {
      return { status: "error", error: "An empty required data provided" };
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
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

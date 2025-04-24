import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const memberEditSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

export const messageSchema = z.object({
  text: z.string().min(1, { message: "Message content is required" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type EditProfileType = z.infer<typeof memberEditSchema>;
export type MessageSChema = z.infer<typeof messageSchema>;

import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "./app/actions/authActions";
import { compare } from "bcryptjs";

interface CredentialsType {
  email: string;
  password: string;
}

const isValidCredentials = (
  creds: Partial<CredentialsType>
): creds is CredentialsType => {
  return typeof creds.email === "string" && typeof creds.password === "string";
};

export default {
  providers: [
    Credentials({
      name: "credentials",
      async authorize(creds) {
        if (!isValidCredentials(creds)) return null;

        const { email, password } = creds as CredentialsType;
        const user = await getUserByEmail(email);

        if (!user) return null;

        const verifyUser = await compare(password, user.passwordHash);

        if (!verifyUser) return null;

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

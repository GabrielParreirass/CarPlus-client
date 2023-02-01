import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "NextAuthCredentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.users.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (user) {
          const passwordMatch = await bcrypt.compare(
            credentials!.password,
            user.password
          );
          if (passwordMatch) {
            return {email:user.email ,name:user.username, image:"xxxx", id:user.id};
          }else{
            throw new Error("Authentication failed");
          }
        } else {
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  pages: {
    error: "/auth/error",
  },
};

export default NextAuth(authOptions);

import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const authOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    
    
    ),
    CredentialsProvider({
      name: "NextAuthCredentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        const user = await prisma.users.findFirst({
          where:{
            email: credentials?.email,
            password: credentials?.password
          }
        })


        if(user){
          console.log(user)
          return user
        }else{
          throw new Error("Authentication failed")
        }

      },
    }),
  ],
  pages:{
    error:"/auth/error"
  }


};

export default NextAuth(authOptions);

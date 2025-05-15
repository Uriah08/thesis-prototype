import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import { findUserById } from "./schemas";

export const {
    handlers: { GET, POST },
    auth
} = NextAuth({
    callbacks: {
        async session({ token, session }) {
          if(session.user && token.sub){
            session.user.id = token.sub
          }
          return session
        },
        async jwt({token}){
          if(!token.sub) return token   
            const user = await findUserById(token.sub)
            if(!user) return token         
          return token
        }
      },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig
})
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

export default NextAuth({
    // Configure one or more authentication providers
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {
          if (account.provider === "google") {
              if(!profile.email.endsWith("iiitp.ac.in"))
              return false;
              console.log(profile.email)
              return true;
            // return profile.email_verified && profile.email.endsWith("@example.com")
          }
          return true // Do different verification for other providers that don't have `email_verified`
        },
      }
})
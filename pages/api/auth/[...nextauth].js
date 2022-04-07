import GoogleProvider from 'next-auth/providers/google';
import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';
import Admin from '../../../models/admin'
import dbConnect from '../../../lib/dbConnect';
export default NextAuth({
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ account, profile }) {
      console.log(profile)
      if (account.provider === 'google') {
        // if (!profile.email.endsWith('iiitp.ac.in')) return false;
        return true;
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({ token }) {
      if (token) {
        await dbConnect();
        const result = await Admin.findOne({ email: token.email })
        if (result) {
          token.role = result.role;
        }
        else {
          token.role = "student"
        }
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      if (session) {
        await dbConnect();
        const result = await Admin.findOne({ email: token.email })
        if (result) {
          session.user.role = result.role;
        }
        else {
          session.user.role = "student"
        }
      }
      return session
    }
  }
});

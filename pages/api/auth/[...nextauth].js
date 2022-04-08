import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import databaseConnect from '../../../lib/databaseConnect';
import clientPromise from '../../../lib/mongodb';
import Admin from '../../../models/admin';
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
    async signIn({ profile }) {
      console.log(profile);
      // if (account.provider === 'google') {
      //   // if (!profile.email.endsWith('iiitp.ac.in')) return false;
      //   return true;
      // }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({ token }) {
      if (token) {
        await databaseConnect();
        const result = await Admin.findOne({ email: token.email });
        token.role = result ? result.role : 'student';
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      if (session) {
        await databaseConnect();
        const result = await Admin.findOne({ email: token.email });
        session.user.role = result ? result.role : 'student';
      }
      return session;
    }
  }
});

import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import InstagramProvider from 'next-auth/providers/instagram';
import { connectToDb } from '@utils/database';
import User from '@models/user';
const handler = NextAuth({
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
      FacebookProvider({
         clientId: process.env.FACEBOOK_CLIENT_ID,
         clientSecret: process.env.FACEBOOK_CLIENT_SECRET
      }),
      InstagramProvider({
         clientId: process.env.INSTAGRAM_CLIENT_ID,
         clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
      })
   ],
   callbacks: {
      async session({ session }) {
         const sessionUser = await User.findOne({ email: session.user.email });
         session.user.id = sessionUser._id.toString();
         return session;
      },
      async signIn({ profile }) {
         try {
            await connectToDb();

            const userExists = await User.findOne({ email: profile.email });
            if (!userExists) {
               await User.create({
                  email: profile.email,
                  username: profile.name,
                  image: profile.picture
               });
            }
            if (userExists) {
               console.log(userExists);
            }
            return true;
         } catch (error) {
            console.log(error);
            return false;
         }
      }
   }
});

export { handler as GET, handler as POST };

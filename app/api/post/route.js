import { connectToDb } from '@utils/database';
import Post from '@models/post';
import { headers } from 'next/headers';
export const GET = async (request) => {
   const headersList = headers();
   const referer = headersList.get('referer');
   try {
      await connectToDb();

      const posts = await Post.find({}).populate('creator');
      return new Response(JSON.stringify(posts), {
         status: 200,
         headers: {
            referer: referer,
            'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate'
         }
      });
   } catch (error) {
      return new Response(
         JSON.stringify('Failed top fetch all posts', { status: 500 })
      );
   }
};

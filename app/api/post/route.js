import { connectToDb } from '@utils/database';
import Post from '@models/post';
export const GET = async (request) => {
   try {
      await connectToDb();
      const posts = await Post.find({}).sort({ _id: -1 }).populate('creator');

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

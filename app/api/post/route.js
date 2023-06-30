import { connectToDb } from '@utils/database';
import Post from '@models/post';
export const GET = async (request) => {
   try {
      await connectToDb();
      const posts = await Post.find({}).sort({ _id: -1 }).populate('creator');

      // return new Response(JSON.stringify(posts), { status: 200 });
      const response = new Response(JSON.stringify(posts), {
         status: 200
      });

      // Add a unique identifier to the URL to force a cache-busting reload
      const url = new URL(request.url);
      url.searchParams.set('t', Date.now());
      response.headers.set(
         'Cache-Control',
         'no-cache, no-store, must-revalidate'
      );
      response.headers.set('Pragma', 'no-cache');
      response.headers.set('Expires', '0');
      response.headers.set('Location', url.toString());

      return response;
   } catch (error) {
      return new Response(
         JSON.stringify('Failed top fetch all posts', { status: 500 })
      );
   }
};

import { connectToDb } from '@utils/database';
import Post from '@models/post';
export const POST = async (req) => {
   const {
      userId,
      color,
      dimensions,
      price,
      tel,
      info,
      type,
      location,
      date,
      manufacturer
   } = await req.json();
   try {
      await connectToDb();
      const newPost = new Post({
         creator: userId,
         color,
         info,
         tel,
         price,
         dimensions,
         type,
         location,
         date,
         manufacturer
      });
      console.log(newPost);
      await newPost.save();
      return new Response(JSON.stringify(newPost), {
         status: 201
      });
   } catch (error) {
      console.log(error);
      return new Response('Failed to create new post', { status: 500 });
   }
};

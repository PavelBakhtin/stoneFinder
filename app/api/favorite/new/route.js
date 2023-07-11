import { connectToDb } from '@utils/database';
import Favorite from '@models/favorite';

export const POST = async (req) => {
   const { userId } = await req.json();
   try {
      await connectToDb();
      const newFavorite = new Favorite({
         creator: userId,
         favorite: []
      });

      await newFavorite.save();
      return new Response(JSON.stringify(newFavorite), {
         status: 201
      });
   } catch (error) {
      console.log(error);
      return new Response('Failed to create new post', { status: 500 });
   }
};

import { connectToDb } from '@utils/database';
import Favorite from '@models/favorite';

export const GET = async (request, { params }) => {
   try {
      await connectToDb();
      const favorites = await Favorite.find({ creator: params.id })
         .sort({ _id: -1 })
         .populate('creator');

      return new Response(JSON.stringify(favorites), { status: 200 });
   } catch (error) {
      return new Response(
         JSON.stringify('Failed to fetch all favorites', { status: 500 })
      );
   }
};

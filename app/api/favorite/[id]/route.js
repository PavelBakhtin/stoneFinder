import { connectToDb } from '@utils/database';
import Favorite from '@models/favorite';

export const GET = async (request, { params }) => {
   try {
      await connectToDb();
      const favorites = await Favorite.findOne({ creator: params.id });

      return new Response(JSON.stringify(favorites), { status: 200 });
   } catch (error) {
      return new Response(
         JSON.stringify('Failed top fetch all favorites', { status: 500 })
      );
   }
};

export const DELETE = async (request, { params }) => {
   try {
      await connectToDb();

      await Favorite.findByIdAndRemove(params.id);

      return new Response('Favorite deleted successfully', { status: 200 });
   } catch {
      return new Response(
         JSON.stringify('Failed to delete Favorite', { status: 500 })
      );
   }
};

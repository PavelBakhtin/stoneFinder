import { Schema, models, model } from 'mongoose';

const FavoriteSchema = new Schema({
   creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
   favorite: [
      {
         type: String
      }
   ]
});
const Favorite = models.Favorite || model('Favorite', FavoriteSchema);
export default Favorite;

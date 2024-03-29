import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
   email: {
      type: String,
      Unique: [true, 'email already exists'],
      required: [true, 'email is required']
   },
   username: {
      type: String,
      required: [true, 'Username is required!']
      // match: [
      // 	/^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      // 	"Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
      // ],
   },
   image: {
      type: String
   },
   favorites: {
      type: Array
   }
});
const User = models.User || model('User', UserSchema);

export default User;

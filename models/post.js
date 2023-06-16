import { Schema, models, model } from "mongoose";

const PostSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	material: {
		type: String,
		requires: [true, "material is required"],
	},
	dimensions: {
		type: String,
		requires: [true, "Dimensions are required"],
	},
	price: {
		type: String,
		requires: [true, "Price is required"],
	},
	tel: {
		type: String,
		requires: [true, "Tel is required"],
	},
	info: {
		type: String,
		requires: [false],
	},
	type: {
		type: String,
		requires: [true],
	},
	location: {
		type: String,
		requires: [false],
	},
});

const Post = models.Post || model("Post", PostSchema);
export default Post;

import { connectToDb } from "@utils/database";
import Post from "@models/post";

export const GET = async (request, { params }) => {
	try {
		await connectToDb();

		const posts = await Post.find({ creator: params.id }).sort({_id:-1}).populate("creator");
	
		return new Response(JSON.stringify(posts), { status: 200 });
	} catch (error) {
		return new Response(
			JSON.stringify("Failed top fetch all posts", { status: 500 })
		);
	}
};

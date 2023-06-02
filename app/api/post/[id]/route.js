import { connectToDb } from "@utils/database";
import Post from "@models/post";

export const GET = async (request, { params }) => {
	try {
		await connectToDb();

		const post = await Post.findById(params.id);
		if (!post) {
			return new Response("post not found", { status: 404 });
		}
		return new Response(JSON.stringify(post), { status: 200 });
	} catch (error) {
		return new Response(
			JSON.stringify("Failed to fetch all posts", { status: 500 })
		);
	}
};

export const PATCH = async (request, { params }) => {
	const { material, info, tel, price, dimensions, location } =
		await request.json();
	try {
		await connectToDb();

		const existingPost = await Post.findById(params.id);

		if (!existingPost) {
			return new Response("Post not found", { status: 404 });
		}

		existingPost.material = material;
		existingPost.dimensions = dimensions;
		existingPost.price = price;
		existingPost.tel = tel;
		existingPost.info = info;
		existingPost.info = location;
		await existingPost.save();

		return new Response(JSON.stringify(existingPost), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response(
			JSON.stringify("Failed to update post", { status: 500 })
		);
	}
};

export const DELETE = async (request, { params }) => {
	try {
		await connectToDb();

		await Post.findByIdAndRemove(params.id);

		return new Response("Post deleted successfully", { status: 200 });
	} catch {
		return new Response(
			JSON.stringify("Failed to delete post", { status: 500 })
		);
	}
};

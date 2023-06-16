import { connectToDb } from "@utils/database";
import Post from "@models/post";
export const POST = async (req) => {
	const { userId, material, dimensions, price, tel, info, type, location } =
		await req.json();
	try {
		await connectToDb();
		const newPost = new Post({
			creator: userId,
			material,
			info,
			tel,
			price,
			dimensions,
			type,
			location,
		});
		console.log(tel)
		await newPost.save();
		return new Response(JSON.stringify(newPost), {
			status: 201,
		});
	} catch (error) {
		console.log(error);
		return new Response("Failed to create new post", { status: 500 });
	}
};

import mongoose from "mongoose";
let isConnected = false;
export const connectToDb = async () => {
	mongoose.set("strictQuery", true);
	if (isConnected) {
		return;
	}
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: "stone-leftovers",
			useNewUrlPArser: true,
			useUnifiedTopology: true,
		});
		isConnected = true;
		console.log("MongDb connected");
	} catch (error) {}
};

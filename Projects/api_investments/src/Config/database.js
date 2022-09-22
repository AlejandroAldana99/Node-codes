// Data Base Connector
import mongoose from "mongoose";

// URL Definition
const dbURL = process.env.DB_HOST + process.env.DB_NAME;

// Init Data Base
const initDB = async () => {
	try {
		await mongoose.connect(dbURL, { useNewUrlParser : true, useUnifiedTopology : true })
		
		console.log("[Server] Connected")

		process.on("SIGINT", () => {
			mongoose.connection.close(() => {
				console.log("Disconnected");
				process.exit(0)
			});
		}); 
	} catch (err) {
		
	}
};

export default initDB;

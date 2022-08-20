const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./utils/config");
const mongoose = require("mongoose");
const routes = require("./utils/routes");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const connectMongo = async () => {
	try {
		await mongoose.connect(config.dbUrl);
		console.log("MongoDB connected successfully");
	} catch (error) {
		console.log("Error in connection to DB", error);
	}
};

// app.get("/", (req, res) => {
// 	res.send("Hello, world!");
// });

app.listen(config.port, async () => {
	console.log(
		`Server running on port ${config.port} (i.e) http://localhost:${config.port}`
	);
	await connectMongo();
	await routes(app);
});

module.exports = app;

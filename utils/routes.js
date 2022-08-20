const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function routes(app) {
	// health check api
	app.get("/", (req, res) => {
		res.send("Web-Chat-Server running!");
	});

	// signup api
	app.post("/signup", (req, res) => {
		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 10),
			avatar_url: req.body.avatar_url,
			designation: req.body.designation,
			company: req.body.company,
			gender: req.body.gender,
		});
		newUser.save((err) => {
			if (err) {
				return res.status(400).json({
					title: "Error",
					error: "Email already in use",
				});
			}
			return res.status(200).json({
				title: "User registered successfully",
			});
		});
	});

	// login api
	app.post("/login", (req, res) => {
		User.findOne({ email: req.body.email }, (err, user) => {
			if (err)
				return res.status(500).json({
					title: "Server error",
				});
			if (!user) {
				return res.status(400).json({
					title: "User not found, try signing up",
					error: "No such user",
				});
			}
			if (!bcrypt.compareSync(req.body.password, user.password)) {
				return res.status(401).json({
					title: "Login failed",
					error: "Invalid username or password",
				});
			}
			// authentication is done provide them a token
			let token = jwt.sign({ userId: user._id }, "secretkey");
			return res.status(200).json({
				title: "Login successful",
				user: user,
				token: token,
			});
		});
	});

	// get all users api
	app.get("/getAllUsers", (req, res) => {
		User.find({}, (err, users) => {
			res.status(200).json({
				title: "All users fetched successfully",
				users: users,
			});
		});
	});
}

module.exports = routes;

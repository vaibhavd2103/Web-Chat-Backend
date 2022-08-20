const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	email: {
		unique: true,
		type: String,
	},
	password: String,
	avatar_url: String,
	gender: String,
	designation: String,
	company: String,
	friends: Array,
});

const User = mongoose.model("User", userSchema);
module.exports = User;

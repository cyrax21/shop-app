const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
	try {
		const { email, password, passwordVerify } = req.body;

		if (!email || !password || !passwordVerify) {
			return res
				.status(400)
				.json({ errorMessage: "Please enter all required credentials" });
		}

		if (password.length < 4) {
			return res.status(400).json({
				errorMessage: "Please enter password of atleast 4 characters",
			});
		}

		if (password !== passwordVerify) {
			return res
				.status(400)
				.json({ errorMessage: "Please enter same password twice" });
		}

		// Search in database whether account with same email exist or not
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res
				.status(400)
				.json({ errorMessage: "User with same email already exists" });
		}

		// hash the password
		const salt = await bcrypt.genSalt(); // generate salt
		const passwordHash = await bcrypt.hash(password, salt);

		// save the new user account in database
		const newUser = new User({
			email,
			passwordHash,
		});

		const savedUser = await newUser.save(); // save the new user account in database

		// Sign the token
		const token = jwt.sign(
			{
				user: savedUser._id,
			},
			`${process.env.JWT_SECRET}`
		);

		// Send the cookie in httpOnly
		res.cookie("token", token, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
		});

		res.status(200).json(savedUser);
	} catch (e) {
		console.log(e);
		res.status(500).send("Register Error");
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Validation
		if (!email || !password) {
			return res
				.status(400)
				.json({ errorMessage: "Please enter all required credentials" });
		}

		// Check if user exists or not
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res.status(400).json({ errorMessage: "Wrong email/password" });
		}

		// Match the given password with the original password
		const passwordCorrect = await bcrypt.compare(
			password,
			existingUser.passwordHash
		);

		if (!passwordCorrect) {
			return res.status(400).json({ errorMessage: "Wrong email/password" });
		}

		// Sign the token
		const token = jwt.sign(
			{
				user: existingUser._id,
			},
			`${process.env.JWT_SECRET}`
		);

		// Send the cookie in httpOnly
		res.cookie("token", token, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
		});

		res.send("User LoggedIn (sent u a user token)");
	} catch (e) {
		console.log(e);
		res.status(500).send("Login Error");
	}
});

router.get("/logout", (req, res) => {
	res
		.cookie("token", "", {
			httpOnly: true,
			expires: new Date(0),
			secure: true,
			sameSite: "none",
		})
		.send("Sign out");

	res.status(200).send("Logged Out Successfully !");
});

router.get("/loggedIn", (req, res) => {
	try {
		const token = req.cookies.token;

		if (!token) return res.status(200).json(false);

		jwt.verify(token, process.env.JWT_SECRET);

		res.send(true);
	} catch (e) {
		console.error(e);
		res.status(200).json(false);
	}
});

module.exports = router;

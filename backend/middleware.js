const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
	try {
		const token = req.cookies.token;

		if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

		// if user is verified it will throw the payload (here it user._id)
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verified.user;

		next();
	} catch (err) {
		console.log(err);
		res.status(401).json({ errorMessage: "Unauthorized User" });
	}
};

module.exports = { isLoggedIn };

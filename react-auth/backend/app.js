const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config(); // To access the secret using process.env
const cookieParser = require("cookie-parser");

mongoose
	.connect("mongodb://localhost:27017/react-auth", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB is connected"))
	.catch((err) => console.log(err));

// Helps to parse the req data
app.use(express.json()); 
app.use(cookieParser());

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

app.use(authRoutes);
app.use(productRoutes);

app.listen(3006, () => {
	console.log("listening on port 3006");
});

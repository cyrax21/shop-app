const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/product");
const seedDB = require("./seed");
require("dotenv").config(); // To access the secret using process.env
const cookieParser = require("cookie-parser");

mongoose
	.connect("mongodb://localhost:27017/shopkart-app", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
	})
	.then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));

// seedDB(); // execute once

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");


app.use(express.json());
app.use(cookieParser());

app.get('/hi', async (req, res) => {
    res.status(200).send("Hello from Backend");
})

// Using the routes
app.use(authRoutes);
app.use(productRoutes);




app.listen(3003, () => {
	console.log("Server listening on port : 3003");
});

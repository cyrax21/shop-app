const express = require("express");
const router = express();
const Product = require("../models/product");
const Review = require("../models/review");

// Getting all the products
router.get("/products", async (req, res) => {
	try {
		const products = await Product.find({});
		res.json(products);
	} catch (e) {
		console.log("Error in Getting Product");
	}
});

// Add a new Product at database
router.post("/products", async (req, res) => {
	const products = await Product.create(req.body);

	res.status(200).json(products);
});

// Getting the specific products
router.get("/products/:id", async (req, res) => {
	const product = await Product.findById(req.params.id).populate("reviews");

	res.json(product);
});

// Getting the product data to edit it Editing a product
router.get("/products/:id/edit", async (req, res) => {
	const product = await Product.findById(req.params.id);

	res.json(product);
});

// patch route to edit the product data in database
router.patch("/products/:id", async (req, res) => {
	const updatedProduct = await Product.findByIdAndUpdate(
		req.params.id,
		req.body
	);

	res.json(updatedProduct);
});

//delete a product from database
router.delete("/products/:id", async (req, res) => {
	await Product.findByIdAndDelete(req.params.id);

	res.json("deleted");
});

router.post("/products/:id/review", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		const review = new Review({
			...req.body,
		});

		product.reviews.push(review);

		await review.save();
		await product.save();

		res.status(200).json(product);
	} catch (e) {
		console.log("Error in creating this review");
	}
});

module.exports = router;

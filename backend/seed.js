const mongoose = require('mongoose');
const Product = require('./models/product');

const products = [
    {
        name: "Drone",
        price: "9000",
        img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRyb25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        desc: "Some quick example text to build on the card title and make up the bulk of the card",
    },
    {
        name: "Iphone",
        price: "60000",
        img: "https://images.unsplash.com/photo-1587831991059-40958cea9ca5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGlwaG9uZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        desc: "Some quick example text to build on the card title and make up the bulk of the card",
    },
    {
        name: "Laptop",
        price: "37000",
        img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGxhcHRvcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        desc: "Some quick example text to build on the card title and make up the bulk of the card",
    },
    {
        name: "Shoes",
        price: "1500",
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2hvZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        desc: "Some quick example text to build on the card title and make up the bulk of the card",
    },
    {
        name: "Glasses",
        price: "450",
        img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2xhc3Nlc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        desc: "Some quick example text to build on the card title and make up the bulk of the card",
    },
]

// Used to insert the info into the database
async function seedDB(){

    await Product.insertMany(products); // Inserting many item into the db
    console.log("DB seeded");

}

module.exports = seedDB;
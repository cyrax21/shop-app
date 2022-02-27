const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../../../backend/middleware');


router.get('/products', isLoggedIn, (req, res) => {
    
    

    res.send("Sending you all the products");
})




module.exports = router;
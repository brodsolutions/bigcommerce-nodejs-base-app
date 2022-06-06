const express = require("express"),
  router = express.Router(),
  BigCommerce = require("../src/bigcommerce");
  require('dotenv').config();

router.get("/", (req, res, next) => {
  try {
    const bigCommerce = new BigCommerce({
      secret: process.env.CLIENT_SECRET,
      responseType: "json",
    });
    res.bc = bigCommerce.verify(req.query["signed_payload"]);
    next()
  } catch (err) {
    console.log(err);
  }
});
router.get("/", (req, res, next) => {
  try {
    const bigCommerce = new BigCommerce({
      clientId: process.env.CLIENT_ID,
      accessToken: process.env.ACCESS_TOKEN,
      storeHash: res.bc.store_hash,
      responseType: 'json'
    });
    
    bigCommerce.get('/orders')
      .then(data => {
        res.render("welcome", { title: "Welcome Load!", data: JSON.stringify(data[0]) });
        // Catch any errors, or handle the data returned
      });
  } catch (err) {
    next(err);
  }
});
module.exports = router;

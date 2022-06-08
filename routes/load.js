const express = require("express"),
  router = express.Router(),
  BigCommerce = require("../src/bigcommerce");
  require('dotenv').config();
  /* 
  Do we have to Verify with bigcommerce? not technically
  Used to identify Users
  https://developer.bigcommerce.com/docs/ZG9jOjEyNDcxODE-handling-callbacks#identifying-users
  */ 

// Verify Signed Payload first
router.get("/", (req, res, next) => {
  try {
    const bigCommerce = new BigCommerce({
      secret: process.env.CLIENT_SECRET,
      responseType: "json",
    });
    res.bc = bigCommerce.verify(req.query["signed_payload"]);
    if(res.bc.store_hash && process.env.ACCESS_TOKEN){
      next();
    } else {
      console.log('store hash nor access token exist');
    }
  } catch (err) {
    console.log(err);
  }
});
// Visit Next Route
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
      });
  } catch (err) {
    next(err);
  }
});
module.exports = router;

const express = require("express"),
  router = express.Router(),
  BigCommerce = require("../src/bigcommerce");
  require('dotenv').config();
const bigCommerce = new BigCommerce({
  secret: process.env.CLIENT_SECRET,
  responseType: "json",
});

router.get("/", (req, next) => {
  try {
    const data = bigCommerce.verify(req.query["signed_payload"]);
    console.log(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const express = require("express"),
  router = express.Router(),
  BigCommerce = require("../src/bigcommerce");
  require('dotenv').config();
const bigCommerce = new BigCommerce({
  secret: process.env.CLIENT_SECRET,
  responseType: "json",
});

router.get("/", (req, res, next) => {
  try {
    res.render("welcome", { title: "Welcome to Index.js" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

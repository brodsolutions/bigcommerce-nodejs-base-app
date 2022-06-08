const express = require("express"),router = express.Router(),BigCommerce = require("../src/bigcommerce"),fs = require('fs');
require('dotenv').config();
const bigCommerce = new BigCommerce({
  clientId: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET,
  callback: process.env.CALLBACK_URL,
  responseType: "json",
});
router.get('/', (req, res, next) => {
  bigCommerce.authorize(req.query)
  .then(data => fs.appendFile('.env', 'ACCESS_TOKEN='+JSON.stringify(data.access_token), function (err) {
    if (err) return console.log(err);
    console.log('added AccessToken to .env');
    // Redirect to Load = stalls on Verify
    // setTimeout(() => {
    //   res.redirect('/load');
    // }, 2000);
    
  }))
  //.then(data => {res.render("welcome", { title: "Welcome!", data: JSON.stringify(data) });})
  .catch(next);
  
  });

module.exports = router;

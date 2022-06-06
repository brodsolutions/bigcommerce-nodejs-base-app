const express = require("express"),
  router = express.Router(),
  BigCommerce = require("../src/bigcommerce");

 const fs = require('fs');
 require('dotenv').config();

const bigCommerce = new BigCommerce({
  clientId: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET,
  callback: process.env.CALLBACK_URL,
  responseType: "json",
});

router.get('/', (req, res, next) => {
  console.log('tanner')
  bigCommerce.authorize(req.query)
  .then(data => fs.appendFile('.env', 'STORE_HASH='+JSON.stringify(data.context).slice(7)+'\r\n'+'ACCESS_TOKEN='+JSON.stringify(data.access_token), function (err) {
    if (err) return console.log(err);
    console.log('added StoreHash and AccessToken to .env');
  }))
    .then(data => res.render('authorization', { title: 'Authorized!', data: JSON.stringify(data) }))
    //.then(data => console.log(data))
    //.catch(next);
  });

module.exports = router;

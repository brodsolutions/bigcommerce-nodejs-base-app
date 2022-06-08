const express = require('express'), app = express(), fs = require('fs'), https = require('https');
// Files for Requests
var index = require('./routes/index')
var auth = require('./routes/auth')
var load = require('./routes/load')
var uninstall = require('./routes/uninstall')
// Set Express Routes to Files
app.set('view engine', 'hbs')
app.use('/', index)
app.use('/auth', auth)
app.use('/load', load)
app.use('/uninstall', uninstall)
// Listen on Localhost:4000
https.createServer({
    // localhost https
    key: fs.readFileSync("/Users/tmac/localhost-key.pem"),
    cert: fs.readFileSync("/Users/tmac/localhost.pem"),
  },app)
  .listen(4000, ()=>{console.log('server is runing at port 4000')});
app.listen(3000)
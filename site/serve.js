
var express = require('express');
var hbs = require('hbs');
var port = process.env.PORT || 7777;

/**
 * Serve.
 */

express()
  .engine('html', hbs.__express)
  .set('views', __dirname)
  .use('/build', express.static(__dirname + '/build'))
  .get('*', function (req, res, next) {
    res.render('index.html');
  })
  .listen(port, function () {
    console.log('Listening on port ' + port + '...');
  });
/*eslint-disable no-console */
var express = require('express')
var rewrite = require('express-urlrewrite')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config')

var app = express()

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/build/js',
  stats: {
    colors: true
  },
  watchOptions: {
    aggregateTimeout: 500,
    poll: true
  }
}))

var fs = require('fs')
var path = require('path')


// app.use(function(req, res, next) {

//     console.log(req.url)
//     console.log(/\/[^.]+/.test(req.url))
//   if (/\/[^.]+$/.test(req.url)) {
//     req.url = '/index.html';
//   }

//   next();
// });
app.use(rewrite(/\/[^.]+$/, '/index.html'))
// app.get(/\/[^.]+$/, rewrite('/index.html'))

app.use(express.static(__dirname + '/public'))

app.listen(4000, '0.0.0.0', function () {
  console.log('Server listening on http://localhost:4000, Ctrl+C to stop')
})

var webpack = require('webpack')

module.exports = {
    // entry: "./public/js/common.js",
    entry: {
        app: ["./app/js/main.jsx"]
    },
    output: {
        path: __dirname + '/public/build/js/',
        filename: "[name].bundle.js",
        publicPath: '/build/js',
        sourceMapFilename: '[file].map'
    },
    module: {
        loaders: [
            { test: /\.scss$/, loader: 'style!raw!autoprefixer?{browsers:["safari >= 7", "Firefox 15", "ie >= 8", "chrome >= 34"]}!sass' },
            { test: /\.css$/, loader: 'style!raw' },
            { test: /\.(png|gif|jpg)$/, loader: 'file?name=img/[name].[ext]&path=../../img/[name].[ext]' },
            // { test: /\.png$/, loader: 'url?mimetype=image/png&limit=500' },
            { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel'}
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
              'NODE_ENV': '"production"'
          }
        })
    ]
};

// ------------------------------------------------------------------------------
// webpack.config.js
//
// Configure webpack to setup assets for website and Vue application.
// ------------------------------------------------------------------------------

// Node modules
const webpack = require('webpack');
const path = require('path');

// ------------------------------------------------------------------------------
// Webpack plugins
// ------------------------------------------------------------------------------

const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Copy index.html to public directory
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body'
});

// Export all bundled styles to external file in public directory.
const ExtractCSSTextPlugin = new ExtractTextPlugin('styles.css');

// ------------------------------------------------------------------------------
// Export webpack configuration
// ------------------------------------------------------------------------------

module.exports = {
    entry: [ './client/app/app.js', './client/styles/styles.scss' ],
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: '/assets/', // get all assets from publicPath (js, css, img, etc.)
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ 'css-loader', 'sass-loader' ]
                })
            }
        ]
    },
    plugins: [ HTMLWebpackPluginConfig, ExtractCSSTextPlugin ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue'
        }
    },
    devtool: '#eval-source-map'
};

// ------------------------------------------------------------------------------


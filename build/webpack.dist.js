'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('deep-assign');
const webpack = require('webpack');

const options = require('./options');
const base = require('./webpack.base.js');

const config = merge(base, {
    entry: options.paths.resolve('src/index.js'),
    output: {
        filename: options.isProduction ? 'rhinos-ui.min.js' : 'rhinos-ui.js',
        path: options.paths.output.main,
        library: 'RhinosUI',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: options.banner,
            raw: true,
            entryOnly: true
        }),
        new ExtractTextPlugin({
            filename: options.isProduction ? 'rhinos-ui.min.css' : 'rhinos-ui.css'
        })
    ]
});

if (options.isProduction) {
    config.plugins = config.plugins.concat([
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        // Set the production environment
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),

        // Minify with dead-code elimination
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]);
}

module.exports = config;

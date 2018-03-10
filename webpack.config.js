'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {

    context: __dirname + '\\development',

    entry: {
        //bundle: './js/app.jsx',
        discoverBundle: './js/discover.jsx',
        //styles: './css/app.css'
    },

    output: {
        filename: '[name].js',
        path: __dirname + '\\public\\build',
        publicPath: "/build/",
        library: '[name]'
    },

    watch: NODE_ENV === 'development',


    resolve: {
        extensions: [' ', '.js', '.jsx']
    },

    devtool: NODE_ENV ==='development' ? 'source-map' : false,


    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                use:{
                    loader: "babel-loader",
                    options: {
                        presets: ['env', 'react', 'stage-0']
                    }
                }
            },
            // {
            //     test: /\.scss$/,
            //     loader: ExtractTextPlugin.extract('style-loader', 'css-loader!resolve-url!sass-loader?sourceMap')
            // },
            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: ['css-loader']
            //     })
            // },

            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('bundle.css', {
            allChunks: true
        })
    ]
};



if (NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // don't show unreachable variables etc
                warnings:     false,
                drop_console: true,
                unsafe:       true
            }
        })
    );
}
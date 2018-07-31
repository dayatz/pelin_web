var webpack = require('webpack');
var BASE_URL = "http://103.28.52.56:7000";
//var BASE_URL = 'http://localhost:8000';

module.exports = {
    entry: {
        'app': [
            './src/main.js'
        ]
        // 'vendor': [
        //     'react',
        //     'react-dom',
        //     'react-router',
        //     'redux',
        //     'redux-promise',
        //     'redux-thunk',
        //     'react-redux',
        //     'history',
        //     'axios',
        //     'material-ui',
        //     'react-tap-event-plugin',
        //     'moment'
        // ]
    },
    output: {
        filename: './build/[name].js',
        publicPath: BASE_URL + '/media/assets/'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/,
                include: /src/
            },
            {
                test: /\.css?$/,
                loader: 'style!css',
                exclude: /node_modules/
            },
            { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader: "file" }
        ]
    }

    // plugins: [
    //     new webpack.DefinePlugin({
    //         'process_env': {
    //             'NODE_ENV': JSON.stringify('production')
    //         },
    //     }),
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: true
    //         }
    //     }),
    //     // new webpack.optimize.CommonsChunkPlugin('vendor', 'build/vendor.js'),
    // ]
}

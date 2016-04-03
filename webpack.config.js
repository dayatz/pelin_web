var webpack = require('webpack');

module.exports = {
    entry: {
        'app': [
            'webpack-dev-server/client?http://localhost:9000',
            'webpack/hot/only-dev-server',
            './src/main.js'
        ]
    },
    output: {
        filename: './build/app.js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/
            }
        ]
    }
}

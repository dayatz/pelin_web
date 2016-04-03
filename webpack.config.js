module.exports = {
    entry: 'src/main.js',
    output: {
        filename: 'build/app.js'
    },
    resolve: {
        extensions: ['', 'js']
    },
    module: {
        loaders: [
            {test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/}
        ]
    }
}

const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'game.js',
        sourceMapFilename: 'game.map.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    },
                },
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                },
            },
        ],
    },
    devtool: 'source-map',
}
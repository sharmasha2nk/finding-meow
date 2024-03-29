var path = require('path');

module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'sourcemaps',
    cache: true,
    mode: 'production',
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    module: {
        rules: [{
                test: /\.css$/i,
                loader: 'css-loader'
            },
            {
                test: /\.svg$/,
                loader: 'file-loader'
            }, {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        "plugins": [
                            ["@babel/plugin-proposal-class-properties", { "loose": true }]
                          ]
                    }
                }]
            }
        ]
    }
};
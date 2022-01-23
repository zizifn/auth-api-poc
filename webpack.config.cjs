const path = require('path');
module.exports = {
    entry: "./public/javascripts/document-load.js",
    output: {
        path: path.resolve(__dirname, 'public/javascripts'),
        filename: 'document-load-build.js'
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     use:
            //     {
            //         loader: "babel-loader",
            //         options: {
            //             // include: __dirname + '/src',
            //             presets: ["@babel/preset-env"]
            //         }
            //     }

            // }
        ]
    },
    plugins: [
    ]
};
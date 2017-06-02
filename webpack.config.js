const path = require("path");
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require("copy-webpack-plugin");


const clientConfig = {
    target: 'web',
    entry: {
        client_app: [
            "./client/client_app.js"
        ]
    }
    , output: {
        path: __dirname + '/dist/client',
        filename: "[name].js"
    },

};
const serverConfig = {
    target: 'async-node',
    node: {
        __dirname: false,
        __filename: false,
    },
    entry: {
        app: ["./src/app2.js"]
    }
    , output: {
        path: __dirname + '/dist',
        filename: "[name].js"
    },
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|node-occ)/,
                //xxloader: 'babel-loader?{ "stage": 0, "optional": ["runtime"] }'
            }
        ]
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.js",})
        new CopyWebpackPlugin([

              {from: "./src/views", to: /* dist/*/"views"},
              {from: "./public", to: /* dist/*/"public"},
              //
          ]

        )
    ]

};
//https://robertknight.github.io/posts/webpack-dll-plugins/
module.exports = [ serverConfig, clientConfig];

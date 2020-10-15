const path = require('path');
const webpack = require('webpack');

const config = {
    mode: 'development',
    node: {
        fs: "empty",
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.jison$/,
                use: [
                    {
                        loader: path.resolve('./jison-loader.js'),
                    }
                ]
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jison'],
    },
};



const jisonConfig = Object.assign({}, config, {
    name: "jison-config",
    entry: "./src/calc.jison",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'calcParser.js',
        library: 'calc',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
});
const nodesConfig = Object.assign({}, config,{
    name: "nodes-config",
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'nodes.js',
        library: 'ast',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
});

// Return Array of Configurations
module.exports = [
    jisonConfig, nodesConfig,
];
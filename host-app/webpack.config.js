const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    output: {
        publicPath: 'http://localhost:3000/',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'host',
            remotes: {
                // mfeOne: 'mfeOne@http://localhost:3001/remoteEntry.js',
                // mfeTwo: 'mfeTwo@http://localhost:3002/remoteEntry.js',
                // mfeThree: 'mfeThree@http://localhost:3003/remoteEntry.js'
            },
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: '^19.1.0',
                    strictVersion: true,
                    eager: true,
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: '^19.1.0',
                    strictVersion: true,
                    eager: true,
                },
            },
        }),
        new HtmlWebpackPlugin({ template: './public/index.html' }),
    ],
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    output: {
        publicPath: 'http://localhost:3001/',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        port: 3001,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, // 👈 добавлено
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules\/(?!(react-datepicker)\/).*/, // ⚠️ разрешить react-datepicker
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'mfeOne',
            filename: 'remoteEntry.js',
            exposes: {
                './App': './src/App',
            },
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: '^19.1.0',
                    strictVersion: true,
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: '^19.1.0',
                    strictVersion: true,
                },
            },
        }),
        new HtmlWebpackPlugin({ template: './public/index.html' }),
    ],
};

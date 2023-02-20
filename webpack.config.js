/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const routes = ['index', 'blog', 'projects']

let htmlwebpackplugins = []
let chunks = {}
let rewrites = []

routes.forEach((route) => {
    htmlwebpackplugins.push(
        new HtmlWebpackPlugin({
            template: './src/views/' + route + '/' + route + '.html',
            minify: false,
            filename: route + '.html',
            chunks: [route]
        }),
    )
    chunks[route] = './src/views/' + route + '/' + route + '.ts'
    rewrites.push({ from: '/' + route, to: '/' + route + '.html' })
})

module.exports = {
    entry: chunks,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    'css-loader',
                    'resolve-url-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|json)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(stl|gltf|obj)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '/assets/objects'
                        }
                    }
                ]
            }
        ],
    },
    resolve: {
        alias: {
            three: path.resolve('./node_modules/three')
        },
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()]
    },
    plugins: htmlwebpackplugins.concat([
        new HtmlWebpackPartialsPlugin({
            path: path.join(__dirname, './src/views/partials/nav.html'),
            location: 'navigation',
            template_filename: '*'
        }),
        new HtmlWebpackPartialsPlugin({
            path: path.join(__dirname, './src/views/partials/footer.html'),
            location: 'customfooter',
            template_filename: '*'
        }),
        new MiniCssExtractPlugin({
            filename: 'main.[contenthash].css',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: './src', to: './', globOptions: {
                        ignore: ['**/assets/**', '**/css/**', '**.html', '**.ts']
                    },
                    noErrorOnMissing: true
                }
            ],
        }),]
    ),
    devtool: 'source-map',
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[name].[contenthash][ext][query]',
        clean: true
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    devServer: {
        static: './',
        port: 8080,
        host: '0.0.0.0',
        historyApiFallback: {
            rewrites: rewrites
        }
    },
}
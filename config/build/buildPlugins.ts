import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import Dotenv from 'dotenv-webpack'
import { type BuildOptions } from './types/config'

export function buildPlugins(options: BuildOptions): webpack.WebpackPluginInstance[] {
    const { paths, isDev, envPath } = options
    const { html } = paths
    const plugins = [
        new HtmlWebpackPlugin({
            template: html
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name][contenthash:8].css',
            chunkFilename: 'css/[name][contenthash:8].css'
        }),
        new Dotenv({
            path: envPath,
            systemvars: false,
            safe: true,
          }),
        new webpack.DefinePlugin({
            API_URL: JSON.stringify(process.env.API_URL),
            MEDIA_STORAGE_URL: JSON.stringify(process.env.MEDIA_STORAGE_URL),
            IS_DEV: JSON.stringify(process.env.IS_DEV)
        })

    ]

    if (isDev) {
        plugins.push(new webpack.HotModuleReplacementPlugin())
        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: false
        }))
    }

    return plugins
}

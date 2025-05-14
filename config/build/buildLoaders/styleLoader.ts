import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export const buildStyleLoaders = (isDev: boolean) => {
    const cssloader = {
        test: /\.css$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: /\.module.css$/i,
                        localIdentName: isDev
                            ? '[path][name]__[local]--[hash:base64:8]'
                            : '[hash:base64:8]'
                    }
                }
            }
        ]
    }
    const scssloader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                        localIdentName: isDev
                            ? '[path][name]__[local]--[hash:base64:5]'
                            : '[hash:base64:8]'
                    }
                }
            },
            'sass-loader'
        ]
    }

    return [scssloader, cssloader]
}

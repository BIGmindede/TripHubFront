import type webpack from 'webpack'
import path from 'path'
import { type BuildPaths } from 'build/types/config'
import { buildStyleLoaders } from 'build/buildLoaders/styleLoader'
import { buildSvgLoader } from 'build/buildLoaders/svgLoader'
import { type RuleSetRule } from 'webpack'
import { buildFontsLoader } from 'build/buildLoaders/fontsLoader'

interface sbWpConf {
    config: webpack.Configuration
}

export default ({ config }: sbWpConf) => {
    const paths: BuildPaths = {
        entry: '',
        build: '',
        html: '',
        src: path.resolve(__dirname, '..', '..', 'src')
    }
    config.resolve?.modules?.push(paths.src)
    config.resolve?.extensions?.push('.ts', '.tsx')

    config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i }
        }
        return rule
    })

    config.module?.rules?.push(buildFontsLoader())
    config.module?.rules?.push(...buildStyleLoaders(true))
    config.module?.rules?.push(buildSvgLoader())

    return config
}

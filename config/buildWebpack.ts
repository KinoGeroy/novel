import webpack from "webpack";
import {buildDevServer} from "./buildDevServer";
import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";
import {BuildOptions} from "./types/types";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import path from "path";

export function buildWebpack (options: BuildOptions): webpack.Configuration {
    const {mode, paths} = options;
    const isDev = mode === 'development';

    return {
        entry: paths.entry,
        mode: mode ?? 'development',

            output: {
                path: paths.output,
                filename: '[name].[contenthash].js',
                clean: true,
                assetModuleFilename: path.join('assets', '[name].[contenthash][ext]')
            },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
        devServer: isDev ? buildDevServer(options) : undefined,

        optimization: {
            minimizer: [
                new ImageMinimizerPlugin({
                    minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                        options: {
                            plugins: [
                                ['gifsicle', { interlaced: true }],
                                ['mozjpeg', { progressive: true }],
                                ['pngquant', { optimizationLevel: 5 }],
                                ['svgo', { name: 'preset-default' }],
                            ],
                        },
                    },
                }),
            ],
        },
    }
}
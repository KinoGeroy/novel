import webpack, {Configuration} from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

export function buildPlugins({mode, paths, platform}: BuildOptions): Configuration['plugins'] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({template: paths.html}),
        new webpack.DefinePlugin({
            __PLATFORM__: JSON.stringify(platform),
            __ENV__: JSON.stringify(mode),
        })
    ]

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin());
        plugins.push(new ReactRefreshPlugin());
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename:  "css/[name].[contenthash].css",
            chunkFilename: "css/[name].[contenthash].css",
        }));
        plugins.push(new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(paths.src, 'json'),
                    to: path.resolve(paths.output, 'json'),
                },
                {
                    from: path.resolve(__dirname, '../public/assets'), // Путь к папке с изображениями
                    to: path.resolve(__dirname, '../build/assets'), // Папка, куда будут копироваться изображения
                },
            ]
        }));

    }

    return plugins;
}
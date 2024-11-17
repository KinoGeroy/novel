import path from 'path';
import webpack from 'webpack';
import {buildWebpack} from "./config/buildWebpack";
import {BuildMode, BuildPaths, BuildPlatform} from "./config/types/types";

interface EnvVariables{
    mode?: BuildMode;
    port?: number;
    platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    }

    return buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,
        platform: env.platform ?? 'desktop',
    });
}
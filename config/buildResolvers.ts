import {Configuration} from "webpack";
import {BuildOptions} from "./types/types";

export function buildResolvers (options: BuildOptions): Configuration['resolve'] {//options: BuildOptions
    return {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            '@': options.paths.src,
        }
    };
}
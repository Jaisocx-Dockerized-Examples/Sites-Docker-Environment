"use strict";
// the hardcoded copy of .mjs file
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { getWebpackAliases } from "./webpackAliases.js";
let fileName = fileURLToPath(import.meta.url);
let currentDir = path.resolve(fileName);
let projectRoot = path.resolve(currentDir, "../../../");
let webpackAliasesResolved = getWebpackAliases(projectRoot);
export let WebpackAliases = {
    resolve: {
        alias: Object.assign({}, webpackAliasesResolved),
    },
};
//# sourceMappingURL=webpack.aliases.mjs.map
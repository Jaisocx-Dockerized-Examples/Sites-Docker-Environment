// the hardcoded copy of .ts file
import * as path from "node:path";
import * as fs from "node:fs";
export function getWebpackAliases(packageRoot) {
    const PROJECT_ROOT_PLACEHOLDER = "${packageRoot}/";
    const WEBPACK_ALIASES_JSON__FILENAME = "webpack.aliases.json";
    const WEBPACK_ALIASES_JSON__CHARSET = "utf8";
    const CHAR_ZERO_LEN = "";
    const webpackAliasesJsonPath = path.resolve(packageRoot, WEBPACK_ALIASES_JSON__FILENAME);
    // Read and parse the JSON file
    const json = fs.readFileSync(webpackAliasesJsonPath, WEBPACK_ALIASES_JSON__CHARSET);
    const aliases = JSON.parse(json);
    console.info(aliases);
    const webpackAliasesResolved = {};
    for (const propName in aliases) {
        const aliasPath = aliases[propName];
        const pathReplaced = aliasPath.replace(PROJECT_ROOT_PLACEHOLDER, CHAR_ZERO_LEN);
        const pathResolved = path.resolve(packageRoot, pathReplaced);
        webpackAliasesResolved[propName] = pathResolved;
    }
    // let webpackAliases = {
    //   resolve: {
    //     alias: { ...webpackAliasesResolved },
    //   },
    // };
    return webpackAliasesResolved;
}
//# sourceMappingURL=webpackAliases.js.map
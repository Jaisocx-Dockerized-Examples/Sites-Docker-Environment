"use strict";
// the hardcoded copy of .ts file
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebpackAliases = getWebpackAliases;
const path = __importStar(require("node:path"));
const fs = __importStar(require("node:fs"));
function getWebpackAliases(packageRoot) {
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
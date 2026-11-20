"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const css_importer_1 = require("@jaisocx/css-importer");
const argv = process.argv.slice(2);
// Get command-line arguments starting from index 2
const commandArgs = {
    ProjectRoot: "",
    BuildData: "",
    PackagesPath: ""
};
argv.forEach((arg) => {
    let [key, value] = arg.split("=");
    key = key.replace("--", "");
    commandArgs[key] = value ? value.replace(/(^"|"$)/g, "") : "";
    // Remove quotes if any
});
console.log("commandArgs", commandArgs);
const buildDataPath = node_path_1.default.resolve(commandArgs.ProjectRoot, commandArgs.BuildData);
if (false === node_fs_1.default.existsSync(buildDataPath)) {
    throw new Error(`BuildData.json not available at path: ${buildDataPath}`);
}
const packagesPath = node_path_1.default.resolve(commandArgs.ProjectRoot, commandArgs.PackagesPath);
if (false === node_fs_1.default.existsSync(packagesPath)) {
    throw new Error(`modulesPath not available at path: ${packagesPath}`);
}
const cssCleanStartPath = node_path_1.default.resolve(commandArgs.ProjectRoot, "ts/cloned_repos/jaisocx_sitestools/libraries/sites_tools/js_tools/CssTableOrdered");
if (false === node_fs_1.default.existsSync(cssCleanStartPath)) {
    throw new Error(`cssCleanStartPath not available at path: ${cssCleanStartPath}`);
}
console.log("cssCleanStartPath", cssCleanStartPath);
const webpackAliasesPath = node_path_1.default.resolve(cssCleanStartPath, "webpack.aliases.json");
if (false === node_fs_1.default.existsSync(webpackAliasesPath)) {
    throw new Error(`webpackAliasesPath not available at path: ${webpackAliasesPath}`);
}
console.log("webpackAliasesPath", webpackAliasesPath);
const cssFilePath = node_path_1.default.resolve(cssCleanStartPath, "MediaAndStyles/css_table_ordered_main_webpack.css");
if (false === node_fs_1.default.existsSync(cssFilePath)) {
    throw new Error(`cssFilePath not available at path: ${cssFilePath}`);
}
console.log("cssFilePath", cssFilePath);
const cssTargetFilePath = node_path_1.default.resolve(cssCleanStartPath, "MediaAndStyles/css_table_ordered_main_resolved2.css");
if (true === node_fs_1.default.existsSync(cssTargetFilePath)) {
    node_fs_1.default.unlinkSync(cssTargetFilePath);
    console.log("cssTargetFilePath deleted", cssTargetFilePath);
}
node_fs_1.default.writeFileSync(cssTargetFilePath, "", { encoding: "ascii" });
if (false === node_fs_1.default.existsSync(cssTargetFilePath)) {
    throw new Error(`cssTargetFilePath not available at path: ${cssTargetFilePath}`);
}
else {
    console.log("cssTargetFilePath created", cssTargetFilePath);
}
console.log("cssTargetFilePath", cssTargetFilePath);
let cssImporter = new css_importer_1.CssImporter();
cssImporter
    .setPackagePath(cssCleanStartPath)
    .setCssFilePath(cssFilePath)
    .setCssTargetFilePath(cssTargetFilePath)
    .build()
    .then((result) => {
    console.log("css importer build result", result);
});
//# sourceMappingURL=debug_and_test.js.map
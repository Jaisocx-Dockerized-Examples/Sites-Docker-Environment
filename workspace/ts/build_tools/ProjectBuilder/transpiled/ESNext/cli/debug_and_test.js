import * as path from "node:path";
import * as fs from "node:fs";
import { CssImporter } from "@jaisocx/css-importer";
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
const buildDataPath = path.resolve(commandArgs.ProjectRoot, commandArgs.BuildData);
if (false === fs.existsSync(buildDataPath)) {
    throw new Error(`BuildData.json not available at path: ${buildDataPath}`);
}
const packagesPath = path.resolve(commandArgs.ProjectRoot, commandArgs.PackagesPath);
if (false === fs.existsSync(packagesPath)) {
    throw new Error(`modulesPath not available at path: ${packagesPath}`);
}
const cssCleanStartPath = path.resolve(commandArgs.ProjectRoot, "Jaisocx_SitesTools/libraries/sites_tools/js_tools/CssTableOrdered");
if (false === fs.existsSync(cssCleanStartPath)) {
    throw new Error(`cssCleanStartPath not available at path: ${cssCleanStartPath}`);
}
console.log("cssCleanStartPath", cssCleanStartPath);
const webpackAliasesPath = path.resolve(cssCleanStartPath, "webpack.aliases.json");
if (false === fs.existsSync(webpackAliasesPath)) {
    throw new Error(`webpackAliasesPath not available at path: ${webpackAliasesPath}`);
}
console.log("webpackAliasesPath", webpackAliasesPath);
const cssFilePath = path.resolve(cssCleanStartPath, "MediaAndStyles/css_table_ordered_main_webpack.css");
if (false === fs.existsSync(cssFilePath)) {
    throw new Error(`cssFilePath not available at path: ${cssFilePath}`);
}
console.log("cssFilePath", cssFilePath);
const cssTargetFilePath = path.resolve(cssCleanStartPath, "MediaAndStyles/css_table_ordered_main_resolved2.css");
if (true === fs.existsSync(cssTargetFilePath)) {
    fs.unlinkSync(cssTargetFilePath);
    console.log("cssTargetFilePath deleted", cssTargetFilePath);
}
fs.writeFileSync(cssTargetFilePath, "", { encoding: "ascii" });
if (false === fs.existsSync(cssTargetFilePath)) {
    throw new Error(`cssTargetFilePath not available at path: ${cssTargetFilePath}`);
}
else {
    console.log("cssTargetFilePath created", cssTargetFilePath);
}
console.log("cssTargetFilePath", cssTargetFilePath);
let cssImporter = new CssImporter();
cssImporter
    .setPackagePath(cssCleanStartPath)
    .setCssFilePath(cssFilePath)
    .setCssTargetFilePath(cssTargetFilePath)
    .build()
    .then((result) => {
    console.log("css importer build result", result);
});
//# sourceMappingURL=debug_and_test.js.map
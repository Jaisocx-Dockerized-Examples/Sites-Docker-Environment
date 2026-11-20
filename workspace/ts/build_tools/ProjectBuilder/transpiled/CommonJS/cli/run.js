"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const ProjectBuilder_js_1 = require("../lib/ProjectBuilder.js");
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
// console.log(
//   "commandArgs",
//   commandArgs
// );
const buildDataPath = node_path_1.default.resolve(commandArgs.ProjectRoot, commandArgs.BuildData);
if (false === node_fs_1.default.existsSync(buildDataPath)) {
    throw new Error(`BuildData.json not available at path: ${buildDataPath}`);
}
const packagesPath = node_path_1.default.resolve(commandArgs.ProjectRoot, commandArgs.PackagesPath);
if (false === node_fs_1.default.existsSync(packagesPath)) {
    throw new Error(`modulesPath not available at path: ${packagesPath}`);
}
const buildDataJson = node_fs_1.default.readFileSync(node_path_1.default.resolve(commandArgs.ProjectRoot, commandArgs.BuildData), "utf8");
const buildData = JSON.parse(buildDataJson);
// console.log(
//   "buildDataPath",
//   buildDataPath
// );
// console.log(
//   "buildData",
//   buildData
// );
// console.log(
//   "packagesPath",
//   packagesPath
// );
const builder = new ProjectBuilder_js_1.ProjectBuilder();
builder
    .setIsLocalDevelopment(1)
    .setAbsolutePathToProjectRoot(commandArgs.ProjectRoot)
    .setRelativePathFromRootTsConfigCatalogPath("/opt/jaisocx/sites_docker_environment/workspace/ts")
    .setRelativePathFromRootLintCatalog(".")
    .setRelativePathFromRootWww("cloned_repos/jaisocx_sitestools")
    .setBuildCjsCatalogName("transpiled/CommonJS")
    .setBuildEsmCatalogName("transpiled/ESNext")
    .setBuildSimpleCatalogName("transpiled/Simple")
    .build(buildData);
//# sourceMappingURL=run.js.map
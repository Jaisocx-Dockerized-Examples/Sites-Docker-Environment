import * as fs from "node:fs";
import * as path from "node:path";
import { ProjectBuilder } from "../lib/ProjectBuilder.js";
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
const buildDataPath = path.resolve(commandArgs.ProjectRoot, commandArgs.BuildData);
if (false === fs.existsSync(buildDataPath)) {
    throw new Error(`BuildData.json not available at path: ${buildDataPath}`);
}
const packagesPath = path.resolve(commandArgs.ProjectRoot, commandArgs.PackagesPath);
if (false === fs.existsSync(packagesPath)) {
    throw new Error(`modulesPath not available at path: ${packagesPath}`);
}
const buildDataJson = fs.readFileSync(path.resolve(commandArgs.ProjectRoot, commandArgs.BuildData), "utf8");
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
const builder = new ProjectBuilder();
builder
    .setIsLocalDevelopment(1)
    .setAbsolutePathToProjectRoot(commandArgs.ProjectRoot)
    .setRelativePathFromRootTsConfigCatalogPath("/opt/jaisocx/sites_tools/workspace/ts")
    .setRelativePathFromRootLintCatalog(".")
    .setRelativePathFromRootWww("Jaisocx_SitesTools")
    .setBuildCjsCatalogName("transpiled/CommonJS")
    .setBuildEsmCatalogName("transpiled/ESNext")
    .setBuildSimpleCatalogName("transpiled/Simple")
    .build(buildData);
//# sourceMappingURL=run.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectBuilder = void 0;
const child_process_1 = require("child_process");
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_util_1 = require("node:util");
const json5_1 = __importDefault(require("json5"));
const css_importer_1 = require("@jaisocx/css-importer");
class ProjectBuilder {
    constructor() {
        this.isLocalDevelopment = 1;
        this.textEncoder = (new node_util_1.TextEncoder());
        this.textDecoder = (new node_util_1.TextDecoder());
        this.cssImporters = new Array();
        this.absolutePathToProjectRoot = "";
        this.relativePathFromRootTsConfigCatalogPath = "";
        this.absolutePathFromRootTsConfigCatalogPath = "";
        this.relativePathFromRootLintCatalog = "";
        this.absolutePathFromRootLintCatalog = "";
        this.relativePathFromRootWww = "";
        this.absolutePathFromRootWww = "";
        this.buildCjsCatalogName = "";
        this.buildEsmCatalogName = "";
        this.buildSimpleCatalogName = "";
    }
    getIsLocalDevelopment() {
        return this.isLocalDevelopment;
    }
    setIsLocalDevelopment(isLocalDevelopment) {
        this.isLocalDevelopment = isLocalDevelopment;
        return this;
    }
    setAbsolutePathToProjectRoot(projectRoot) {
        this.absolutePathToProjectRoot = projectRoot;
        return this;
    }
    setAbsolutePath(propertyName, relativePath) {
        if (!this.absolutePathToProjectRoot) {
            throw new Error("The Absolute Path to Project root is not specified!!!");
        }
        // @ts-ignore
        this[propertyName] = node_path_1.default.resolve(this.absolutePathToProjectRoot + "/" + relativePath);
        return this;
    }
    setRelativePathFromRootTsConfigCatalogPath(relativePath) {
        this.relativePathFromRootTsConfigCatalogPath = relativePath;
        this.setAbsolutePath("absolutePathFromRootTsConfigCatalogPath", relativePath);
        return this;
    }
    setRelativePathFromRootLintCatalog(relativePath) {
        this.relativePathFromRootLintCatalog = relativePath;
        this.setAbsolutePath("absolutePathFromRootLintCatalog", relativePath);
        return this;
    }
    setRelativePathFromRootWww(relativePath) {
        this.relativePathFromRootWww = relativePath;
        this.setAbsolutePath("absolutePathFromRootWww", relativePath);
        return this;
    }
    setBuildCjsCatalogName(catalogName) {
        this.buildCjsCatalogName = catalogName;
        return this;
    }
    setBuildEsmCatalogName(catalogName) {
        this.buildEsmCatalogName = catalogName;
        return this;
    }
    setBuildSimpleCatalogName(catalogName) {
        this.buildSimpleCatalogName = catalogName;
        return this;
    }
    build(dataJson) {
        if (!dataJson.packages || 0 === dataJson.packages.length) {
            throw new Error("no packages array set in BuildData.json");
        }
        const packages = [
            ...dataJson.packages.filter((packageJson) => {
                let cssImporterConf = packageJson["css-importer"];
                let filterBy = (packageJson.build === true) ||
                    ((cssImporterConf !== undefined) &&
                        (cssImporterConf.build === true));
                return filterBy;
            })
        ];
        if (!packages || 0 === packages.length) {
            throw new Error("no packages marked to build in the BuildData.json");
        }
        for (let packageJson of packages) {
            this.buildPackage(packageJson, dataJson);
        }
    }
    buildPackage(packageJson, dataJson) {
        let timeStamp = (new Date()).toISOString();
        console.log("\n\n\n===============================");
        console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${dataJson["npm-registry-name"]}/${packageJson.name})]`);
        console.log("===============================\n");
        let packagePath = node_path_1.default.resolve(this.absolutePathFromRootWww, packageJson.path);
        let cssImporterConf = packageJson["css-importer"];
        let withCssImporter = ((cssImporterConf !== undefined) && (cssImporterConf.build === true));
        let justWithCssImporter = ((packageJson.build === false) && (withCssImporter === true));
        if (withCssImporter === true) {
            timeStamp = (new Date()).toISOString();
            console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${dataJson["npm-registry-name"]}/${packageJson.name})] [Action (packing css)]`);
            this.cssImporterRun(cssImporterConf, packagePath);
        }
        if (justWithCssImporter === true) {
            return 3;
        }
        // install or link npm dependencies
        timeStamp = (new Date()).toISOString();
        console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${dataJson["npm-registry-name"]}/${packageJson.name})] [Action (Calling npm dependencies install)]`);
        this.installPackageDependencies(packageJson, packagePath);
        // console output list of files in the package src catalog
        this.command(packagePath, "ls -lahrts src");
        if (dataJson["prettify-typescript"] === true) {
            timeStamp = (new Date()).toISOString();
            console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${dataJson["npm-registry-name"]}/${packageJson.name})] [Action (Prettifying TypeScript code)] [Path (${packagePath})]`);
            // this.prettifyWithEslint (
            //  packagePath,
            //  `${packagePath}/src/**/*.ts`
            // );
        }
        timeStamp = (new Date()).toISOString();
        console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${dataJson["npm-registry-name"]}/${packageJson.name})] [Action (ESNext Transpiling TypeScript code)] [Path (${packagePath})]`);
        // transpile modern node version compatible
        const tsconfigESNextName = "tsconfig.ESNext.json";
        const tsconfigESNextPath = `${this.absolutePathToProjectRoot}/${tsconfigESNextName}`;
        this.transpileTypescriptSourcesWithPath(packagePath, tsconfigESNextPath);
        timeStamp = (new Date()).toISOString();
        console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${dataJson["npm-registry-name"]}/${packageJson.name})] [Action (CommonjS Transpiling TypeScript code)] [Path (${packagePath})]`);
        // transpile legacy node versions compatible
        const tsconfigCommonJSName = "tsconfig.CommonJS.json";
        const tsconfigCommonJSPath = `${this.absolutePathToProjectRoot}/${tsconfigCommonJSName}`;
        this.transpileTypescriptSourcesWithPath(packagePath, tsconfigCommonJSPath);
        // link this package for usage in local development in other .ts files
        if (this.getIsLocalDevelopment()) {
            timeStamp = (new Date()).toISOString();
            console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${dataJson["npm-registry-name"]}/${packageJson.name})] [Action (npm link package ${packageJson.name} for local usage with other)]`);
            this.command(packagePath, "npm link");
        }
        // building simple .js files to use in example.hml via <script src="...js"
        if (packageJson["build-simple-enable"] === true) {
            timeStamp = (new Date()).toISOString();
            console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${dataJson["npm-registry-name"]}/${packageJson.name})] [Action (building simple .js for usage in .html in script tag as src)]`);
            this.buildSimple(packageJson, packagePath).then((n) => {
                console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${dataJson["npm-registry-name"]}/${packageJson.name})] [Action (Simple .js finish)]`);
                return n;
            });
        }
        return 2;
    }
    installPackageDependencies(packageJson, packagePath) {
        let dependencyCatalogPath = "";
        let localDependency = null;
        let timeStamp = "";
        const dependencies = packageJson["dependencies"];
        if (dependencies && dependencies.length > 0) {
            timeStamp = (new Date()).toISOString();
            console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${packageJson.name})] [Action (Installing npm dependencies)] [Path (${packagePath}...)]`);
            if (this.getIsLocalDevelopment()) {
                timeStamp = (new Date()).toISOString();
                console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${packageJson.name})] [Action (Local dev mode npm link method chosen)]`);
                const localDependenciesNames = [];
                for (localDependency of dependencies) {
                    dependencyCatalogPath = node_path_1.default.resolve(this.absolutePathFromRootWww, localDependency.path);
                    timeStamp = (new Date()).toISOString();
                    console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${packageJson.name})] [Action (cd; npm link in catalog)] [Path (${dependencyCatalogPath})]`);
                    this.command(dependencyCatalogPath, `cd "${dependencyCatalogPath}"; npm link`);
                    localDependenciesNames.push(localDependency.name);
                }
                const packagesToLinkJoined = localDependenciesNames.join(" ");
                const npmLinkCommand = `cd "${packagePath}"; npm link ${packagesToLinkJoined}`;
                console.log(`${npmLinkCommand}]`);
                this.command(packagePath, npmLinkCommand);
            }
            else {
                timeStamp = (new Date()).toISOString();
                console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${packageJson.name})] [No Action (npm install from npm registry)]`);
                //for (dependencyName of dependencies) {
                //dependencyCatalogPath = rootPath + dependencyCatalogPath;
                //execSync('npm run build', { cwd: packagePath, stdio: 'inherit', , shell: '/usr/bin/env bash' }); // Run the build command
                //}
            }
        }
        else {
            timeStamp = (new Date()).toISOString();
            console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${packageJson.name})] [Info (No dependencies were set in BuildData.json)]`);
        }
    }
    async buildSimple(packageJson, packagePath) {
        //let buildFileName: any = '';
        let buildCatalogPath = "";
        //let buildFilePath: any = '';
        let buildSimpleCatalogPath = "";
        //let buildSimpleFilePath: any = '';
        const buildFiles = packageJson["build-files"];
        let timeStamp = "";
        if (!buildFiles || (0 === buildFiles.length)) {
            timeStamp = (new Date()).toISOString();
            throw new Error(`Jaisocx Project Builder [${timeStamp}] [Package (${packageJson.name})] [Errpr (no "build-files" array found for building Simple)]`);
        }
        buildCatalogPath = packagePath + "/" + this.buildEsmCatalogName;
        if (false === node_fs_1.default.existsSync(buildCatalogPath)) {
            timeStamp = (new Date()).toISOString();
            throw new Error(`Jaisocx Project Builder [${timeStamp}] [Package (${packageJson.name})] [Errpr (no build catalog found: ${buildCatalogPath})]`);
        }
        buildSimpleCatalogPath = packagePath + "/" + this.buildSimpleCatalogName;
        if (false === node_fs_1.default.existsSync(buildSimpleCatalogPath)) {
            this.command(packagePath, `mkdir -p "${buildSimpleCatalogPath}"`);
        }
        for (const buildFileName of buildFiles) {
            const buildFilePath = buildCatalogPath + "/" + buildFileName;
            const buildSimpleFilePath = buildSimpleCatalogPath + "/" + buildFileName;
            if (true === node_fs_1.default.existsSync(buildSimpleFilePath)) {
                this.command(packagePath, `rm "${buildSimpleFilePath}"`);
            }
            const fileSimplePathDir = node_path_1.default.parse(buildSimpleFilePath).dir;
            if (false === node_fs_1.default.existsSync(fileSimplePathDir)) {
                this.command(packagePath, `mkdir -p "${fileSimplePathDir}"`);
            }
            let fileTranspiledBitsBuf = node_fs_1.default.readFileSync(buildFilePath);
            let findIndexOpts = {
                "tokens": [
                    "\n",
                    "export class "
                ],
                "bbTokens": [],
                "firstByte": 13,
                "lookupBbuf": fileTranspiledBitsBuf
            };
            findIndexOpts.bbTokens = findIndexOpts.tokens.map((ci_token) => {
                let locci_bbToken = this.textEncoder.encode(ci_token);
                return locci_bbToken;
            });
            findIndexOpts.firstByte = findIndexOpts.bbTokens[0][0];
            let classExportIndexOf = fileTranspiledBitsBuf.findIndex((inci_tokenByte, inci_index, 
            // @ts-ignore
            inci_payload) => {
                // @ts-ignore
                let locci_tokenFirstByte = this.firstByte;
                // @ts-ignore
                let locci_firstTokenEquals = (inci_tokenByte === locci_tokenFirstByte);
                if (locci_firstTokenEquals === false) {
                    return false;
                }
                // @ts-ignore
                let locci_tokenBuf = this.bbTokens[1];
                let locci_tokenLen = locci_tokenBuf.length;
                // @ts-ignore
                let locci_lookupBuf = this.lookupBbuf;
                let locci_lookupSubarray = locci_lookupBuf.subarray((inci_index + 1), (inci_index + locci_tokenLen));
                /* let locci_tokenAsText: string = ( new TextDecoder() ).decode (
                    locci_tokenBuf
                );
                let locci_lookupSubarrayAsText: string = ( new TextDecoder() ).decode (
                    locci_lookupSubarray
                ); */
                let locci_tokenFound = locci_tokenBuf.every((inciB_Byte, inciB_index) => {
                    let locci_byteEquals = (inciB_Byte === locci_lookupSubarray[inciB_index]);
                    return locci_byteEquals;
                });
                return locci_tokenFound;
            }, findIndexOpts);
            let isFilewriteError = false;
            try {
                node_fs_1.default.writeFileSync(buildSimpleFilePath, "");
            }
            catch (errFileWrite) {
                isFilewriteError = true;
                console.log(errFileWrite);
            }
            if (isFilewriteError === true) {
                throw new Error("Couldn't write file");
            }
            let loc_fileHandle = null;
            const fileAddOpenMode = "a";
            // const fileAddNReadOpenMode: string = "a+";
            let isFileHandleOpenError = false;
            try {
                loc_fileHandle = await node_fs_1.default.promises.open(buildSimpleFilePath, fileAddOpenMode);
            }
            catch (errFileOpen) {
                isFileHandleOpenError = true;
                console.log(errFileOpen);
            }
            if (isFileHandleOpenError === true) {
                try {
                    // @ts-ignore
                    await loc_fileHandle.close();
                }
                catch (errFileHanldeClose) {
                    console.log(errFileHanldeClose);
                }
                throw new Error("Couldn't open file handle");
            }
            isFilewriteError = false;
            try {
                // @ts-ignore
                let loc_fwrite = await loc_fileHandle.write(fileTranspiledBitsBuf, 0, (fileTranspiledBitsBuf.byteLength - classExportIndexOf - 1), classExportIndexOf);
                console.log(loc_fwrite);
            }
            catch (errWrite) {
                isFilewriteError = true;
                console.log(errWrite);
            }
            try {
                // @ts-ignore
                await loc_fileHandle.close();
            }
            catch (errFileHanldeClose) {
                console.log(errFileHanldeClose);
            }
            if (isFilewriteError === true) {
                throw new Error("Simple build file couldn't be written.");
            }
        }
        return 1;
    }
    /**
     *
     * @param confNodeCss: any|undefined = packageJson["css-importer"];
     * @param packagePath
     */
    cssImporterRun(confNodeCss, packagePath) {
        // console.info(
        //   confNodeCss,
        //   packagePath
        // );
        let cssImporter = new css_importer_1.CssImporter();
        cssImporter
            .setDebug(false)
            .setPackagePath(packagePath)
            .setCssFilePath(node_path_1.default.resolve(packagePath, confNodeCss.cssFilePath))
            .setCssTargetFilePath(node_path_1.default.resolve(packagePath, confNodeCss.cssTargetFilePath))
            .build().then((result) => {
            console.log(`css importer built ${packagePath}: ${result}`);
        });
        this.cssImporters.push(cssImporter);
    }
    transpileTypeScriptSources(tsconfigCatalogPath, tsconfigFileName) {
        const consoleCommand = `cd "${tsconfigCatalogPath}" && tsc -p "${tsconfigFileName}"`;
        return this.command(tsconfigCatalogPath, consoleCommand);
    }
    transpileTypescriptSourcesWithPath(packagePath, tsconfigPath) {
        const tsconfigJson = node_fs_1.default.readFileSync(tsconfigPath);
        const tsconfig = json5_1.default.parse(tsconfigJson);
        const compilerOptions = tsconfig["compilerOptions"];
        if (!compilerOptions) {
            throw new Error(`Typescript config file has no compilerOptions, or was not found at: ${tsconfigPath}`);
        }
        const transpileOptions = [];
        for (let compilerOptionName in compilerOptions) {
            let tsConfigOptionValue = compilerOptions[compilerOptionName];
            let compilerOptionValue = "";
            if (Array.isArray(tsConfigOptionValue) === true) {
                tsConfigOptionValue = compilerOptions[compilerOptionName].join(", ");
            }
            else {
                tsConfigOptionValue = compilerOptions[compilerOptionName];
            }
            compilerOptionValue = ['"', tsConfigOptionValue, '"'].join("");
            transpileOptions.push(`--${compilerOptionName} ${compilerOptionValue}`);
        }
        const filesAndCatalogsList = node_fs_1.default.readdirSync(`${packagePath}/src`, { recursive: true });
        if (!filesAndCatalogsList || filesAndCatalogsList.length === 0) {
            return null;
        }
        const filesList = filesAndCatalogsList.filter((filePath) => {
            let extensionStart = filePath.lastIndexOf(".") + 1;
            let extension = filePath.substring(extensionStart);
            let isTypescript = ((extension === "ts") || (extension === "tsx") || (extension === "js") || (extension === "mjs") || (extension === "cjs"));
            if (isTypescript === false) {
                return isTypescript;
            }
            const absPath = `${packagePath}/src/${filePath}`;
            let isFiltered = node_fs_1.default.lstatSync(absPath).isFile();
            return isFiltered;
        });
        // const packagePathRelative = packagePath.replace(
        //   `${this.absolutePathToProjectRoot}/`,
        //   "");
        //const filesListJoinedString: any = `${packagePathRelative}/src/` + filesList.join(` ${packagePathRelative}/src/`);
        const filesListJoinedString = "\"./src/" + filesList.join("\" \"./src/") + "\"";
        const transpileOptionsString = transpileOptions.join(" ");
        // cd packagePath ensures usage of package.json installed deps for this exact subpackage.
        const transpileCommand = `cd "${packagePath}"; npx tsc ${filesListJoinedString} ${transpileOptionsString}`;
        console.log({ transpileCommand });
        return this.command(`${packagePath}`, transpileCommand);
    }
    command(configCatalogPath, consoleCommand) {
        let result = null;
        try {
            result = (0, child_process_1.execSync)(consoleCommand, this.getSpawnSyncPayload(configCatalogPath));
        }
        catch (e) {
            result = e;
        }
        return result;
    }
    getSpawnSyncPayload(contextRoot) {
        return {
            cwd: contextRoot,
            stdio: "inherit",
            shell: "bash"
            // shell: '/bin/bash',
            // env: { ...process.env, PATH: (process.env.PATH + ':/usr/local/bin:/usr/bin:/bin') }
        };
    }
}
exports.ProjectBuilder = ProjectBuilder;
//# sourceMappingURL=ProjectBuilder.js.map
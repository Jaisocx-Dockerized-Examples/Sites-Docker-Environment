import { execSync } from "child_process";
import path from "node:path";
import fs from "node:fs";

// import { Buffer } from "node:buffer";
// import { Stats } from "node:fs";
import { FileHandle } from "node:fs/promises";
import { TextDecoder, TextEncoder } from "node:util";

import JSON5 from "json5";
import { IDependency } from "./types.js";
import { CssImporter } from "@jaisocx/css-importer";



export class ProjectBuilder {
  isLocalDevelopment: number;

  textEncoder: TextEncoder;
  textDecoder: TextDecoder;

  cssImporters: CssImporter[];

  absolutePathToProjectRoot: any;

  relativePathFromRootTsConfigCatalogPath: any;
  absolutePathFromRootTsConfigCatalogPath: any;

  relativePathFromRootLintCatalog: any;
  absolutePathFromRootLintCatalog: any;

  relativePathFromRootWww: any;
  absolutePathFromRootWww: any;

  buildCjsCatalogName: any;
  buildEsmCatalogName: any;
  buildSimpleCatalogName: any;



  constructor() {
    this.isLocalDevelopment = 1;
    this.textEncoder = ( new TextEncoder() );
    this.textDecoder = ( new TextDecoder() );

    this.cssImporters = new Array() as CssImporter[];

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



  getIsLocalDevelopment(): number {
    return this.isLocalDevelopment;
  }



  setIsLocalDevelopment(isLocalDevelopment: number): ProjectBuilder {
    this.isLocalDevelopment = isLocalDevelopment;


    return this;
  }



  setAbsolutePathToProjectRoot(projectRoot: any): ProjectBuilder {
    this.absolutePathToProjectRoot = projectRoot;


    return this;
  }



  setAbsolutePath(
    propertyName: any,
    relativePath: any
  ): ProjectBuilder {
    if (!this.absolutePathToProjectRoot) {
      throw new Error("The Absolute Path to Project root is not specified!!!");
    }


    // @ts-ignore
    this[propertyName] = path.resolve(
      this.absolutePathToProjectRoot + "/" + relativePath
    );


    return this;
  }



  setRelativePathFromRootTsConfigCatalogPath(relativePath: any): ProjectBuilder {
    this.relativePathFromRootTsConfigCatalogPath = relativePath;
    this.setAbsolutePath(
      "absolutePathFromRootTsConfigCatalogPath",
      relativePath
    );


    return this;
  }



  setRelativePathFromRootLintCatalog(relativePath: any): ProjectBuilder {
    this.relativePathFromRootLintCatalog = relativePath;
    this.setAbsolutePath(
      "absolutePathFromRootLintCatalog",
      relativePath
    );


    return this;
  }



  setRelativePathFromRootWww(relativePath: any): ProjectBuilder {
    this.relativePathFromRootWww = relativePath;
    this.setAbsolutePath(
      "absolutePathFromRootWww",
      relativePath
    );


    return this;
  }



  setBuildCjsCatalogName(catalogName: any): ProjectBuilder {
    this.buildCjsCatalogName = catalogName;


    return this;
  }



  setBuildEsmCatalogName(catalogName: any): ProjectBuilder {
    this.buildEsmCatalogName = catalogName;


    return this;
  }



  setBuildSimpleCatalogName(catalogName: any): ProjectBuilder {
    this.buildSimpleCatalogName = catalogName;


    return this;
  }



  build ( dataJson: any ): any {
    if (!dataJson.packages || 0 === dataJson.packages.length) {
      throw new Error("no packages array set in BuildData.json");
    }

    const packages: any[] = [
      ...dataJson.packages.filter(
        (packageJson: any) => {
          let cssImporterConf: any = packageJson["css-importer"];

          let filterBy: boolean = ( packageJson.build === true ) ||
          (
            ( cssImporterConf !== undefined ) &&
            ( cssImporterConf.build === true )
          );


          return filterBy;
        }
      )
    ];

    if (!packages || 0 === packages.length) {
      throw new Error("no packages marked to build in the BuildData.json");
    }

    for (let packageJson of packages) {
      this.buildPackage(
        packageJson,
        dataJson
      );
    }
  }



  buildPackage (
    packageJson: any,
    dataJson: any
  ): number {
    let timeStamp: any = (new Date()).toISOString();

    console.log("\n\n\n===============================");
    console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${dataJson["npm-registry-name"]}/${packageJson.name})]`);
    console.log("===============================\n");

    let packagePath: any = path.resolve (
      this.absolutePathFromRootWww,
      packageJson.path
    );

    let cssImporterConf: any = packageJson["css-importer"];
    let withCssImporter: boolean = ( ( cssImporterConf !== undefined ) && ( cssImporterConf.build === true ) );
    let justWithCssImporter: boolean = ( ( packageJson.build === false ) && ( withCssImporter === true ) );

    if ( withCssImporter === true ) {
      timeStamp = (new Date()).toISOString();
      console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${dataJson["npm-registry-name"]}/${packageJson.name})] [Action (packing css)]`);
      this.cssImporterRun (
        cssImporterConf,
        packagePath
      );
    }

    if ( justWithCssImporter === true ) {
      return 3;
    }


    // install or link npm dependencies
    timeStamp = (new Date()).toISOString();
    console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${dataJson["npm-registry-name"]}/${packageJson.name})] [Action (Calling npm dependencies install)]`);
    this.installPackageDependencies (
      packageJson,
      packagePath
    );


    // console output list of files in the package src catalog
    this.command (
      packagePath,
      "ls -lahrts src"
    );

    if ( dataJson["prettify-typescript"] === true ) {
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
    const tsconfigESNextName: any = "tsconfig.ESNext.json";
    const tsconfigESNextPath: any = `${this.absolutePathToProjectRoot}/${tsconfigESNextName}`;
    this.transpileTypescriptSourcesWithPath(
      packagePath,
      tsconfigESNextPath
    );



    timeStamp = (new Date()).toISOString();
    console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${dataJson["npm-registry-name"]}/${packageJson.name})] [Action (CommonjS Transpiling TypeScript code)] [Path (${packagePath})]`);

    // transpile legacy node versions compatible
    const tsconfigCommonJSName: any = "tsconfig.CommonJS.json";
    const tsconfigCommonJSPath: any = `${this.absolutePathToProjectRoot}/${tsconfigCommonJSName}`;
    this.transpileTypescriptSourcesWithPath(
      packagePath,
      tsconfigCommonJSPath
    );



    // link this package for usage in local development in other .ts files
    if (this.getIsLocalDevelopment()) {
      timeStamp = (new Date()).toISOString();
      console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${dataJson["npm-registry-name"]}/${packageJson.name})] [Action (npm link package ${packageJson.name} for local usage with other)]`);
      this.command(
        packagePath,
        "npm link"
      );
    }


    // building simple .js files to use in example.hml via <script src="...js"
    if ( packageJson["build-simple-enable"] === true ) {
      timeStamp = (new Date()).toISOString();
      console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${dataJson["npm-registry-name"]}/${packageJson.name})] [Action (building simple .js for usage in .html in script tag as src)]`);
      this.buildSimple (
        packageJson,
        packagePath
      ).then( ( n: number) => {
          console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${dataJson["npm-registry-name"]}/${packageJson.name})] [Action (Simple .js finish)]`);
          return n;
      } );
    }


    return 2;
  }



  installPackageDependencies(
    packageJson: any,
    packagePath: any
  ): void {
    let dependencyCatalogPath: any = "";
    let localDependency: IDependency|null = null;
    let timeStamp: string = "";

    const dependencies: IDependency[]|null = packageJson["dependencies"];

    if (dependencies && dependencies.length > 0) {
      timeStamp = (new Date()).toISOString();
      console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${packageJson.name})] [Action (Installing npm dependencies)] [Path (${packagePath}...)]`);

      if (this.getIsLocalDevelopment()) {
        timeStamp = (new Date()).toISOString();
        console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${packageJson.name})] [Action (Local dev mode npm link method chosen)]`);

        const localDependenciesNames: any[] = [];

        for (localDependency of dependencies) {
          dependencyCatalogPath = path.resolve (
            this.absolutePathFromRootWww,
            localDependency.path
          );

          timeStamp = (new Date()).toISOString();
          console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${packageJson.name})] [Action (cd; npm link in catalog)] [Path (${dependencyCatalogPath})]`);
          this.command(
            dependencyCatalogPath,
            `cd "${dependencyCatalogPath}"; npm link`
          );
          localDependenciesNames.push(localDependency.name);
        }

        const packagesToLinkJoined: any = localDependenciesNames.join(" ");
        const npmLinkCommand: any = `cd "${packagePath}"; npm link ${packagesToLinkJoined}`;
        console.log(`${npmLinkCommand}]`);
        this.command(
          packagePath,
          npmLinkCommand
        );

      } else {
        timeStamp = (new Date()).toISOString();
        console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${packageJson.name})] [No Action (npm install from npm registry)]`);

        //for (dependencyName of dependencies) {
        //dependencyCatalogPath = rootPath + dependencyCatalogPath;
        //execSync('npm run build', { cwd: packagePath, stdio: 'inherit', , shell: '/usr/bin/env bash' }); // Run the build command
        //}
      }
    } else {
      timeStamp = (new Date()).toISOString();
      console.log(`Jaisocx Project Builder [${timeStamp}] [Package (${packageJson.name})] [Info (No dependencies were set in BuildData.json)]`);
    }
  }



  async buildSimple (
    packageJson: any,
    packagePath: any
  ): Promise<number> {

    //let buildFileName: any = '';
    let buildCatalogPath: any = "";


    //let buildFilePath: any = '';
    let buildSimpleCatalogPath: any = "";


    //let buildSimpleFilePath: any = '';
    const buildFiles: any[]|undefined = packageJson["build-files"];

    let timeStamp: string = "";

    if (!buildFiles || (0 === buildFiles.length)) {
      timeStamp = (new Date()).toISOString();
      throw new Error(`Jaisocx Project Builder [${timeStamp}] [Package (${packageJson.name})] [Errpr (no "build-files" array found for building Simple)]`);
    }

    buildCatalogPath    = packagePath + "/" + this.buildEsmCatalogName;

    if (false === fs.existsSync(buildCatalogPath)) {
      timeStamp = (new Date()).toISOString();
      throw new Error(`Jaisocx Project Builder [${timeStamp}] [Package (${packageJson.name})] [Errpr (no build catalog found: ${buildCatalogPath})]`);
    }
    buildSimpleCatalogPath = packagePath + "/" + this.buildSimpleCatalogName;

    if (false === fs.existsSync(buildSimpleCatalogPath)) {
      this.command(
        packagePath,
        `mkdir -p "${buildSimpleCatalogPath}"`
      );
    }

    for (const buildFileName of buildFiles) {
      const buildFilePath: any        = buildCatalogPath + "/" + buildFileName;
      const buildSimpleFilePath: any  = buildSimpleCatalogPath + "/" + buildFileName;

      if (true === fs.existsSync(buildSimpleFilePath)) {
        this.command(
          packagePath,
          `rm "${buildSimpleFilePath}"`
        );
      }

      const fileSimplePathDir: any = path.parse(buildSimpleFilePath).dir;

      if (false === fs.existsSync(fileSimplePathDir) ) {
        this.command(
          packagePath,
          `mkdir -p "${fileSimplePathDir}"`
        );
      }


      let fileTranspiledBitsBuf: Uint8Array = fs.readFileSync( buildFilePath );

      let findIndexOpts: any = {
        "tokens": [
            "\n",
            "export class "
        ],
        "bbTokens": [],
        "firstByte": 13,
        "lookupBbuf": fileTranspiledBitsBuf
      };

      findIndexOpts.bbTokens = findIndexOpts.tokens.map (
          ( ci_token: string ) => {
              let locci_bbToken: Uint8Array = this.textEncoder.encode( ci_token );
              return locci_bbToken;
          }
      );
      findIndexOpts.firstByte = findIndexOpts.bbTokens[0][0];

      let classExportIndexOf: number = fileTranspiledBitsBuf.findIndex (
          (
              inci_tokenByte: number,
              inci_index: number,
              // @ts-ignore
              inci_payload: Uint8Array<ArrayBufferLike>
          ): boolean => {
              // @ts-ignore
              let locci_tokenFirstByte: number = this.firstByte;

              // @ts-ignore
              let locci_firstTokenEquals: boolean = ( inci_tokenByte === locci_tokenFirstByte );

              if ( locci_firstTokenEquals === false ) {
                return false;
              }


              // @ts-ignore
              let locci_tokenBuf: Uint8Array = this.bbTokens[1];
              let locci_tokenLen: number = locci_tokenBuf.length;

              // @ts-ignore
              let locci_lookupBuf: Uint8Array = this.lookupBbuf;
              let locci_lookupSubarray: Uint8Array = locci_lookupBuf.subarray (
                  ( inci_index + 1 ),
                  ( inci_index + locci_tokenLen ),
              );


              /* let locci_tokenAsText: string = ( new TextDecoder() ).decode (
                  locci_tokenBuf
              );
              let locci_lookupSubarrayAsText: string = ( new TextDecoder() ).decode (
                  locci_lookupSubarray
              ); */


              let locci_tokenFound: boolean = locci_tokenBuf.every (
                  (
                      inciB_Byte: number,
                      inciB_index: number
                  ): boolean => {
                      let locci_byteEquals: boolean = ( inciB_Byte === locci_lookupSubarray[ inciB_index ] );
                      return locci_byteEquals;
                  }
              );


              return locci_tokenFound;
          },
          findIndexOpts
        );



        let isFilewriteError: boolean = false;
        try {
            fs.writeFileSync (
                buildSimpleFilePath,
                ""
            );
        } catch ( errFileWrite ) {
            isFilewriteError = true;
            console.log( errFileWrite );
        }

        if ( isFilewriteError === true ) {
            throw new Error( "Couldn't write file" );
        }



        let loc_fileHandle: FileHandle|null = null;
        const fileAddOpenMode: string = "a";
        // const fileAddNReadOpenMode: string = "a+";
        let isFileHandleOpenError: boolean = false;

        try {
            loc_fileHandle = await fs.promises.open (
                buildSimpleFilePath,
                fileAddOpenMode
            );
        } catch ( errFileOpen ) {
            isFileHandleOpenError = true;
            console.log ( errFileOpen );
        }

        if ( isFileHandleOpenError === true ) {
            try {
                // @ts-ignore
                await loc_fileHandle.close();
            } catch ( errFileHanldeClose ) {
                console.log ( errFileHanldeClose );
            }

            throw new Error( "Couldn't open file handle" );
        }



        isFilewriteError = false;
        try {
            // @ts-ignore
            let loc_fwrite: { bytesWritten: number, buffer: Uint8Array<ArrayBufferLike> } = await loc_fileHandle.write (
                fileTranspiledBitsBuf,
                0,
                ( fileTranspiledBitsBuf.byteLength - classExportIndexOf - 1 ),
                classExportIndexOf
            );
            console.log ( loc_fwrite );

        } catch ( errWrite ) {
            isFilewriteError = true;
            console.log ( errWrite );
        }

        try {
            // @ts-ignore
            await loc_fileHandle.close();
        } catch ( errFileHanldeClose ) {
            console.log ( errFileHanldeClose );
        }

        if ( isFilewriteError === true ) {
            throw new Error( "Simple build file couldn't be written." );
        }

    }


    return 1;
  }


  /**
   *
   * @param confNodeCss: any|undefined = packageJson["css-importer"];
   * @param packagePath
   */
  cssImporterRun (
    confNodeCss: any,
    packagePath: any
  ) {

    // console.info(
    //   confNodeCss,
    //   packagePath
    // );
    let cssImporter: CssImporter = new CssImporter();
    cssImporter
      .setDebug( false )
      .setPackagePath( packagePath )
      .setCssFilePath( path.resolve(
        packagePath,
        confNodeCss.cssFilePath
      ) )
      .setCssTargetFilePath( path.resolve(
        packagePath,
        confNodeCss.cssTargetFilePath
      ) )
      .build().then( ( result: number ) => {
        console.log(`css importer built ${packagePath}: ${result}`);
      });

    this.cssImporters.push( cssImporter );
  }



  transpileTypeScriptSources (
    tsconfigCatalogPath: any,
    tsconfigFileName: any
  ): any {
    const consoleCommand: any = `cd "${tsconfigCatalogPath}" && tsc -p "${tsconfigFileName}"`;

    return this.command (
      tsconfigCatalogPath,
      consoleCommand
    );
  }



  transpileTypescriptSourcesWithPath (
    packagePath: any,
    tsconfigPath: any
  ): any {
    const tsconfigJson: any = fs.readFileSync(tsconfigPath);
    const tsconfig: any = JSON5.parse(tsconfigJson);
    const compilerOptions: any = tsconfig["compilerOptions"];

    if (!compilerOptions) {
      throw new Error(`Typescript config file has no compilerOptions, or was not found at: ${tsconfigPath}` );
    }
    const transpileOptions: any[] = [];

    for (let compilerOptionName in compilerOptions) {
      let tsConfigOptionValue: any = compilerOptions[compilerOptionName];
      let compilerOptionValue: string = "";
      if ( Array.isArray( tsConfigOptionValue ) === true ) {
          tsConfigOptionValue = compilerOptions[compilerOptionName].join( ", " );
      } else {
          tsConfigOptionValue = compilerOptions[compilerOptionName];
      }

      compilerOptionValue = [ '"',  tsConfigOptionValue, '"' ].join( "" );

      transpileOptions.push(`--${compilerOptionName} ${compilerOptionValue}` );
    }

    const filesAndCatalogsList: any[] = fs.readdirSync (
      `${packagePath}/src`,
      {recursive: true}
    )  as string[];

    if (!filesAndCatalogsList || filesAndCatalogsList.length === 0) {
      return null;
    }

    const filesList: any[] = filesAndCatalogsList.filter((filePath) => {
      let extensionStart: number = filePath.lastIndexOf( "." ) + 1;
      let extension: string = filePath.substring( extensionStart );

      let isTypescript: boolean = ( ( extension === "ts" ) || ( extension === "tsx" ) || ( extension === "js" ) || ( extension === "mjs" ) || ( extension === "cjs" ) );

      if ( isTypescript === false ) {
        return isTypescript;
      }

      const absPath: any = `${packagePath}/src/${filePath}`;
      let isFiltered: boolean = fs.lstatSync(absPath).isFile();


      return isFiltered;
    });


    // const packagePathRelative = packagePath.replace(
    //   `${this.absolutePathToProjectRoot}/`,
    //   "");
    //const filesListJoinedString: any = `${packagePathRelative}/src/` + filesList.join(` ${packagePathRelative}/src/`);
    const filesListJoinedString: any = "\"./src/" + filesList.join("\" \"./src/") + "\"";
    const transpileOptionsString: any = transpileOptions.join(" ");


    // cd packagePath ensures usage of package.json installed deps for this exact subpackage.
    const transpileCommand: any = `cd "${packagePath}"; npx tsc ${filesListJoinedString} ${transpileOptionsString}`;
    console.log( { transpileCommand } );

    return this.command (
      `${packagePath}`,
      transpileCommand
    );
  }



  command (
    configCatalogPath: any,
    consoleCommand: any
  ): any {
    let result: any = null;
    try {
      result = execSync(
        consoleCommand,
        this.getSpawnSyncPayload(configCatalogPath)
      );
    } catch (e: any) {
      result = e;
    }


    return result;
  }



  getSpawnSyncPayload(contextRoot: any): any {
    return {
      cwd: contextRoot,
      stdio: "inherit",
      shell: "bash"


      // shell: '/bin/bash',
      // env: { ...process.env, PATH: (process.env.PATH + ':/usr/local/bin:/usr/bin:/bin') }
    };
  }

}






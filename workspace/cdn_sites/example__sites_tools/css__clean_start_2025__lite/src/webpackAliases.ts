// the hardcoded copy of .ts file

import * as path from "node:path";
import * as fs from "node:fs";


export function getWebpackAliases( packageRoot: any ): any {
  const PROJECT_ROOT_PLACEHOLDER: any = "${packageRoot}/";
  const WEBPACK_ALIASES_JSON__FILENAME: any = "webpack.aliases.json";
  const WEBPACK_ALIASES_JSON__CHARSET: any = "utf8";
  const CHAR_ZERO_LEN: any = "";

  const webpackAliasesJsonPath: any = path.resolve(
    packageRoot,
    WEBPACK_ALIASES_JSON__FILENAME
  );


  // Read and parse the JSON file
  const json: any = fs.readFileSync(
    webpackAliasesJsonPath,
    WEBPACK_ALIASES_JSON__CHARSET
  );

  const aliases: any = JSON.parse(json);

  console.info(aliases);

  const webpackAliasesResolved: any = {};

  for (const propName in aliases) {
    const aliasPath: any = aliases[propName];

    const pathReplaced: any = aliasPath.replace(
      PROJECT_ROOT_PLACEHOLDER,
      CHAR_ZERO_LEN
    );

    const pathResolved: any = path.resolve(
      packageRoot,
      pathReplaced
    );

    webpackAliasesResolved[propName] = pathResolved;

  }


  // let webpackAliases = {
  //   resolve: {
  //     alias: { ...webpackAliasesResolved },
  //   },
  // };
  return webpackAliasesResolved;

}


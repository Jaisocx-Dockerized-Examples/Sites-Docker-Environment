// the hardcoded copy of .cjs file

const fs = require("node:fs");
const path = require("node:path");
const getWebpackAliases = require("./webpackAliases.js");



// Get the filename and directory in a CommonJS-compatible way
const fileName = __filename;
const currentDir = path.resolve(__dirname);
const projectRoot = path.resolve(currentDir, "../../../");



let webpackAliasesResolved = getWebpackAliases( projectRoot );

// Exporting the WebpackAliases object
module.exports = {
  WebpackAliases: {
    resolve: {
      alias: { ...webpackAliasesResolved },
    },
  },
};

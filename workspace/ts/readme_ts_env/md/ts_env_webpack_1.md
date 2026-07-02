
![../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg](../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg)

# how to develop with webpack:

  [HOME](./README.md)



## For what the Webpack

The Webpack tool is for making Javascript and Styles .css files of Your project to one bundle.js JavaScript file, this can be referenced on a site in a .html doc like this:

```
<script src="bundle.js"></script>
```

When installing a sites tool via `npm install <PackageName>`, You are not sure, how the styles .css files and JavaScript files were referenced in the .html doc, when the developer tested her/his sites tool.

1. when with the cdn-like url with the domain name like this : `<link rel="stylesheet" href="https://sandbox.brightday.email/a-sites-tool/styles/style.css">`, this will work good,
however when You publish on Your domain, then You will need replace all these urls, if You don't want to rely on the cdn in Your project.

2. when with the url starts with the Slash symbol like this: `<link rel="stylesheet" href="/a-sites-tool/styles/style.css">`, this works well, too, however urls with the Slash symbol on start mean this is the same url on Your server, too, after domain name. And when the styles file is published on Your sites endpoint on another url, the sites tool will not work, since the styles file will not be loaded in the browser.

3. the relative urls work too, however when the .html doc on Your site is on another url, than the styles file in the package, this relative urls will not work, neither.

For example, a sites tool .html was:

`https://sandbox.brightday.email/a-sites-tool-example/`

and the styles file:

`https://sandbox.brightday.email/a-sites-tool-example/styles/style.css`

and on .html was referenced with the relative url:

`styles/style.css`

this was all fine,

and when installed from npm the tool, and Your .html doc is on the same url:

`https://sandbox.brightday.email/a-sites-tool-example/`

however the new sites tool You publish on another url:

`https://sandbox.brightday.email/my-installed-packages/a-new-sites-tool/styles/style.css`

then the relative url will not work.



### How the Webpack solves this urls problem

The Webpack tool tells to define the aliases in Your project.

In Workspace, the aliases for the webpack are set in the file `${PackageRoot}/webpack.aliases.json` like this:

```
{
  "@jaisocx-css-clean-start-MediaAndStyles": "${packageRoot}/MediaAndStyles/"
}
```

With the aliases `@a-sites-tool-styles` or `@a-sites-tool-mini-images`, You can prefix all urls in Your html, css and js code.

for example in .css:
```
@import url("@a-sites-tool-styles/theme-night-mode.css");
```

Then, when the Webpack builds a js project, it can resolve the urls all the best way, finds the files and builds one bundle.js file with all them. And then You can include the bundle.js file in the .html doc and all resources will be available in the browser, when the site has loaded.

Also, when You install the package via `yarn install "PackageName"` or `npm install "PackageName"`, You use their package aliases names and can load their styles, too, and the Webpack will add all styles of all imported tools to Your bundle.js


### conf for the Webpack

path: `${PackagRoot}/webpack.config.mjs`

For example, in Workspace when importing `@jaisocx/tree` in `ExampleTree` package: `workspace/ts/cloned_repos/jaisocx_sitestools/webpack_builds/ExampleTree/webpack.config.mjs`

the webpack aliases You can import for the webpack here:

```
...
import { WebpackAliases as CleanStartWebpackAliases } from '@jaisocx/css-clean-start/WebpackAliases';
import { WebpackAliases as TreeWebpackAliases } from '@jaisocx/tree/WebpackAliases';
```


when have imported aliases, You need to add to all aliases, used in Webpack build.
The lines in this webpack.config.mjs:
`alias: {`
```
  // line 23
  resolve: {
    alias: {
      ...CleanStartWebpackAliases.resolve.alias,
      ...TreeWebpackAliases.resolve.alias,
    },
    extensions: [".js", ".json", ".css"],
    fallback: {
      "path": "path-browserify",
    },
  },

```



## 1. build a project valid for webpack when `npm install` this package later in another project

To use the rich webpack feature aliases, set this folders structure and these predefined files for Your new package, like in this package.


### 1.1. ${PackageRoot}/webpack.aliases.json
```
{
  "@jaisocx-css-clean-start-MediaAndStyles": "${packageRoot}/MediaAndStyles/"
}
```


### 1.2. ${PackageRoot}/src/* files like in this package every:
1. index.ts
2. webpackAliases.ts
3. webpack.aliases.cjs
4. webpack.aliases.mjs


### 1.3 import styles in a .ts or .js file like this:

**TypeScript** entry file: `${packageRoot}/src/index.ts`

**Styles** entry file: `${packageRoot}/MediaAndStyles/clean-start-main-webpack.css`

```
// in .ts entry file index.ts

import "@jaisocx-css-clean-start-MediaAndStyles/clean-start-main-webpack.css"
```



### 1.4. workspace project `BuildData.json` minimal conf:
```
{
  "npm-registry-name": "@jaisocx",
  "packages": [
    {
      "path": "templates/ResponsiveAndValidForWebpackWhenNpmInstall",
      "name": "template-css-clean-start",
      "build": true,
      "build-simple-enable": true,
      "dependencies": [],
      "build-files": [
        "index.js",
        "webpackAliases.js",
        "webpack.aliases.mjs",
        "webpack.aliases.cjs"
      ]
    },
```


### 1.5. this package `${PackageRoot}/package.json` minimal conf:
```
{
  "author": "Author",
  "name": "@jaisocx/template-css-clean-start",
  "version": "1.3.5",
  "keywords": [
    "css tool",
    "clean start"
  ],
  "publishConfig": {
    "access": "public"
  }
  "private": false,
  "description": "The template to start a tool for sites, applied responsive view in browsers on all devices",
  "type": "module",
  "main": "./transpiled/CommonJS/index.js",
  "types": "./transpiled/ESNext/index.d.ts",
  "module": "./transpiled/ESNext/index.js",
  "exports": {
    ".": {
      "import": "./transpiled/ESNext/index.js",
      "require": "./transpiled/CommonJS/index.js"
    },
    "./WebpackAliases": {
      "import": "./transpiled/ESNext/webpack.aliases.mjs",
      "require": "./transpiled/CommonJS/webpack.aliases.cjs"
    }
  },
  "files": [
    "README.md",
    "webpack.aliases.json", // the file sets the webpack aliases to resolve urls of styles and bound resources like media and fonts
    "MediaAndStyles/",
    "transpiled/CommonJS",
    "transpiled/ESNext",
    "transpiled/Simple"
  ]
}
```


### 1.6 Build Your package first before use and publishing to npm registry

In the workspace project `BuildData.json` active this package for build: `"build": `**true**

```
    {
      "path": "templates/ResponsiveAndValidForWebpackWhenNpmInstall",
      "name": "template-css-clean-start",
      "build": true,
      ...
```


When **Docker Compose** is on,
In Terminal, cd to Workspace root, paste and Enter:

`./buildPackages.sh`



Bugfix until the build works without exceptions, and rerun buildPackages.sh

Then can use and publish to npm registry too.

The use of the built package is in the doc point 2. below.






## 2. Use the installed by Yarn or Npm js package in Your Typescript or Javascript package


### 2.a. You may use this template package to start a new package from scratch.

Just save a copy in the `${Workspace}/workspace/ts/cloned_repos/jaisocx_sitestools/packages` folder.



### 2.b. install a package from npm registry to node_modules

For example, when You published before with rules in this doc point 1. a package named `@jaisocx/template-css-clean-start`

When **Docker Compose** is on,
to run a script in the node docker service, first enter the node docker service like this: in Terminal, cd to Workspace root, paste and Enter:
```
docker compose exec ts bash
```

Then, in the same Terminal Tab, however already in the docker volume of the node service "ts", this was mapped in `${Workspace}/docker-compose.yml`
```
# 1. navigate to Your new package folder in the node service volume:
cd /opt/jaisocx/sites_docker_environment/workspace/ts/cloned_repos/jaisocx_sitestools/packages/<YourNewPackage>

# 2. install the npm package
npm install "@jaisocx/template-css-clean-start"
```


### 2.c. import styles in a .ts or .js file like this:

**TypeScript** entry file: `${packageRoot}/src/index.ts`

In the installed package, the code is here: `${packageRoot}/node_modules/@jaisocx/template-css-clean-start`

```
// in .ts entry file index.ts

import "@jaisocx/template-css-clean-start";
```



### 2.d. import js classes in a .ts file

**TypeScript** entry file: `${packageRoot}/src/index.ts`

Note: in the package @jaisocx/template-css-clean-start there was no js classes, however this is just an example of the import of a js class from the installed package.

Assuming, in the installed package entry file index.ts, the js class `AnyClass` was exported, then it will be accessible in Your code like this:
```
import { AnyClass } from "@jaisocx/template-css-clean-start";

(window as any).AnyClass = AnyClass;
```



### 2.e. or, import js classes in a .js file

```
import { AnyClass } from "@jaisocx/template-css-clean-start";

window.AnyClass = AnyClass;
```



### 2.f. The .json file with paths alias, used for webpack builds:

in the npm installed package, the json with aliases is here:
```
node_modules/@jaisocx/template-css-clean-start/webpack.aliases.json
```


### 2.g. the entry styles .css file, imported in `${packageRoot}/src/index.ts` with the webpack alias

The alias was defined in the package in the `webpack.aliases.json`:
```
"@jaisocx-css-clean-start-MediaAndStyles": "${packageRoot}/MediaAndStyles/"
```

and the styles file was imported in that package in the `src/index.ts` file:
```
import "@jaisocx-css-clean-start-MediaAndStyles/clean-start-main-webpack.css"
```

When the package was installed to Your package with `npm install`, the styles .css file, this is imported in Your new package via `import "@jaisocx/template-css-clean-start";` is here:

```
node_modules/@jaisocx/template-css-clean-start/MediaAndStyles/clean-start-main-webpack.css
```



### 2.h. this styles import statement in the installed package, with webpack alias, was here:
```
// in file: ${packageRoot}/node_modules/@jaisocx/template-css-clean-start/transpiled/ESNext/index.js

import "@jaisocx-css-clean-start-MediaAndStyles/clean-start-main-webpack.css"
```


### 2.i. transpile new package like in the point 1.6 above

`./buildPackages.sh`



### 2.j. append development npm packages in the `${PackageRoot}/package.json` and npm script to build a bundle.js with the Webpack

I have planned to place centrally in the Workspace project the npm deps and the config files for the Webpack library, too, like I already have done for the Typescript and the Eslint in the Workspace. However for now, every pack still has the local copies of the same npm dependencies for a webpack build in the node_modules folder in every package, since the workaround with the Webpack was new to me. I used before the entire install of a rich JS and PHP Frameworks for a WebApplication, and developed one project many months. This project is not a web app, but an example of building reusable js libraries of not many code lines, for the later install via npm or yarn.

```
 "scripts": {
    "webpack": "webpack"
  },
  "optionalDependencies": {
    "@jaisocx/template-css-clean-start": "^1.5.x" // the version number is here just an example
  },
  "devDependencies": {
    "css-loader": "^7.1.2",
    "file-loader": "^6.2.0",
    "postcss-loader": "^8.1.1",
    "postcss-url": "^10.1.3",
    "style-loader": "^4.0.0",
    "ts-loader": "^9.5.1",
    "typescript": "^5.7.x",
    "webpack": "^5.96.1",
    "webpack-cli": "^5.1.4"
  },
```


### 2.k. install development npm packages

To start the docker services, if not started:
```
docker compose up -d
```


When **Docker Compose** is on,
to run a script in the node docker service, first enter the node docker service like this: in Terminal, cd to Workspace root, paste and Enter:
```
docker compose exec ts bash
```

Then You may install the packages

```
# 1. navigate to Your new package folder in the node service volume:
cd /opt/jaisocx/sites_docker_environment/workspace/ts/cloned_repos/jaisocx_sitestools/packages/<YourNewPackage>

# 2. install development npm packages
npm install
```




### 2.l. make new file on path `${PackageRoot}/webpack.config.mjs`

This file is the standard webpack.config.js file,
and just the import statements for the Webpack aliases and their assignments in the `resolve.alias` config's prop are up to webpack build. The best, later this file will be placed centrally, too. And the example of a package with all configs and npm dependencies for the Typescript, the Eslint and the Webpack, and local node_modules folder, is of use for sure.

```
// this webpack config is to build this package with webpack.

import * as path from "node:path";
import { fileURLToPath } from "node:url";
// import * as pathBrowserify from "path-browserify";
import postcssUrl from "postcss-url";

// when using aliases from other jaisocx tool,
// Use like in workspace/ts/cloned_repos/jaisocx_sitestools/webpack_builds/ExampleCssCleanStartWebpack:
import { WebpackAliases } from '@jaisocx/template-css-clean-start/WebpackAliases';

// when building with the Webpack and using the aliases of this package, then:
// import { WebpackAliases } from "transpiled/ESNext/webpack.aliases.mjs";


let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

console.info(path.resolve(__dirname));
console.log( WebpackAliases );


export default {
  entry: './transpiled/ESNext/index.js', // Entry point for your transpiled code
  output: {
    filename: 'Your-package-bundle.js', // Output bundle name
    path: path.resolve(__dirname, 'transpiled/webpack'),
  },
  resolve: {
    alias: {
      ...WebpackAliases.resolve.alias,
    },
    extensions: [".js", ".json", ".css"],
    fallback: {
      "path": "path-browserify",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  postcssUrl({
                    url: 'rebase', // Rewrite URLs relative to the final CSS file
                  }),
                ],
              },
            },
          },
        ], // Use these loaders for CSS files
      },
      {
        test: /\.(webp|png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
        type: 'asset/resource', // Handles images and fonts
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        type: 'asset/resource', // Use Webpack 5's native asset modules for images
        generator: {
          filename: 'MediaAndStyles/fonts/[name][ext]', // Define output path for MediaAndStyles
        },
      },
      {
        test: /\.(webp|png|jpg|gif|svg)$/,
        type: 'asset/resource', // Use Webpack 5's native asset modules for images
        generator: {
          filename: 'MediaAndStyles/images/[name][ext]', // Define output path for MediaAndStyles
        },
      },
    ],
  },
  mode: 'production', // Set mode (development | production)
};

```


### 2.m. build with the Webpack

When **Docker Compose** is on, if not entered the node docker service,
to run a script in the node docker service, first enter the node docker service like this: in Terminal, cd to Workspace root, paste and Enter:
```
docker compose exec ts bash
```

Then You may build Your new package with Webpack

```
# 1. navigate to Your new package folder in the node service volume:
cd /opt/jaisocx/sites_docker_environment/workspace/ts/cloned_repos/jaisocx_sitestools/packages/<YourNewPackage>

# 2. start building with Webpack:
npm run webpack --config=webpack.config.mjs
```



### 2.n. Where the bundle.js resides

in the point **2.l** above You have the lines `filename:...` and `path: ...`.

the path will be `${PackageRoot}/${path}/${filename}`
```
export default {
  entry: './transpiled/ESNext/index.js', // Entry point for your transpiled code
  output: {
    filename: 'Your-package-bundle.js', // Output bundle name
    path: path.resolve(__dirname, 'transpiled/webpack'), // path of the bundle.js
  },

```


the **bundle.js** file resides here:
```
${PackageRoot}/transpiled/webpack/Your-package-bundle.js
```




## 3. How to use the bundle.js by the Webpack in html

**A.** If You built with webpack the installed CSS tool,
the styles will apply when You set the css classes,
defined in the imported package, to according html nodes in your .html

For example, when using CssCleanStart,
on the &lt;html&gt; tag there css class `workspace` is to apply like this:

```
<html class="workspace long theme-lightmode">
```


If example.html is on path `${PackageRoot}/example.html`,
the **url of the bundle.js** will be:

```
transpiled/webpack/Your-package-bundle.js
```



**B.** I You imported a JS tool, You have in the example above in the index.ts file set the imported classes available:

```
import { AnyClass } from "@jaisocx/the-installed-package";

(window as any).AnyClass = AnyClass;
```


In Your .html You can now access this imported js class like this:

```
<script>
document.addEventListener('DOMContentLoaded', () => {

  let anyClass = new AnyClass();
  anyClass.someProp = "some value";
  anyClass.someMethod("some arg");

});
</script>
```



**C.** example of usage of the `@jaisocx/tree` package here:
```
<html>
  <head>
    <title>Tree Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- the path to webpack built bundle.js here: -->
    <script src="webpack_builds/ExampleTree/transpiled/webpack/example-tree-bundle.js"></script>
  </head>
  <body>

    <h1>Tree example</h1>

    <!-- Tree javascript class will append in this html node the html to render the json -->
    <div id="tree-holder"></div>

    <script>

      // a js function declared
      function renderDataLikeTree( data ) {
        let tree = new Tree();
        tree
          .setMainHtmlNodeId("tree-holder")
          .setNodesWithIcons(true)
          .setNodesOpenedMode(TreeConstants.NodesOpenedMode.ALL_SHOWN)
          .setRenderingMode(TreeConstants.RenderingMode.Ease)
          .render( data );
      }

      // This statement invokes code,
      // when the browser loads the site and may access loaded styles,
      // js classes, and knows this html doc nodes.
      // Otherwise, the js engine might not know about
      // some js classes and functions and html nodes.
      document.addEventListener('DOMContentLoaded', () => {

        // get data from a https endpoint:
        fetch("https://api.artic.edu/api/v1/artworks")
          .then( response => response.json() )
          .then( data => renderDataLikeTree( data ) );

      });
    </script>
  </body>
</html>

```




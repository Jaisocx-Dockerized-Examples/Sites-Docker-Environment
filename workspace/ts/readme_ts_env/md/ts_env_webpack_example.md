
![../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg](../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg)

# WEBPACK

  [README.md HOME](./README.md)



## THE WEBPACK EXAMPLE

`workspace/ts/Jaisocx_SitesTools/webpack_builds/ExampleTree`

## Status of webpack support in this project

- Under development, however the example is working well.
- Centrally it is **not enabled**, the `build-webpack/bundle.js` is **not** being produced now by **ProjectBuilder** in each example module.

- It seems, `index.ts` for import statements in other `.ts` files must be different, than `bundle.ts` file, used to build a webpack's `bundle.js` to include in a `.html` page in `<script src="..../bundle.js">`.



### what does Webpack produce?

`workspace/ts/Jaisocx_SitesTools/webpack_builds/ExampleTree/transpiled/webpack/bundle.js`

is usable in a static `.html` page even, after each webpack rebuild, too.


usage of this `bundle.js` in a static `.html` page:

```
  <script src="webpack_builds/ExampleTree/transpiled/webpack/bundle.js"></script>

...

  <body>

    <div id="tree-holder-configured"></div>

    <script>
      document.addEventListener('DOMContentLoaded', () => {

        const tree = new Tree();
        tree
          .setMainHtmlNodeId("tree-holder-configured")
          .load('https://api.artic.edu/api/v1/artworks');

      });
    </script>
```



## CDN, Styles and Themes

The bundle.js may be published on Your cdn endpoint on Your demand for CSS themes of CSS and JS tools, too.

Then the css className applied in html, turns on the CSS Theme, even when one `bundle.js` is referenced in the .html doc with the `script` tag.

```
<html>
<head>
<script src="https://cdn.sitesdevs.com/bundles/sites-tool-themes-bundle.js"></script>
</head>
<body>

<!-- via css class name You may turn on every theme imported in the sites-tool-themes-bundle.js
When the bundle.js includes imported themes, just the typing in the css class name other theme class name will update the site's theme in browser's tab after site reload.
-->
<sites-tool class="sites-tool theme-nightmode theme-rich-fonts">
...
</sites-tool>
</body>
</html>
```




#### the webpack.aliases.json example

```
{
  "@base-sites-tool-webpack-alias-styles": "${packageRoot}/MediaAndStyles/"
}
```


#### the package.json solution to declare webpack aliases to be vailable for Webpack in the importing packages.

```
"exports": {
  ".": {
    "import": "./transpiled/ESNext/index.js",
    "require": "./transpiled/CommonJS/index.js"
  },
  "./WebpackAliases": {
    "import": "./transpiled/ESNext/webpack.aliases.mjs",
    "require": "./transpiled/CommonJS/webpack.aliases.cjs"
  }
}
```



#### BuildData.json in the field "build-files" hardcoded webpack.* files.

```
{
  "path": "sites_tools/css_tools/CssCleanStart",
  "name": "css-clean-start",
  "build": true,
  "build-simple-enable": false,
  "css-importer": {
    "build": true,
    "cssFilePath": "MediaAndStyles/clean-start-main-webpack.css",
    "cssTargetFilePath": "MediaAndStyles/clean-start-main-resolved.css"
  },
  "dependencies": [],
  "build-files": [
    "index.js",
    "webpackAliases.js",
    "webpack.aliases.mjs",
    "webpack.aliases.cjs"
  ]
}
```

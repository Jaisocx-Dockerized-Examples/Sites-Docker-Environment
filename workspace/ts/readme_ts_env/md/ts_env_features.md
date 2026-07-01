
![../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg](../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg)


# Features in this Project

[README.md HOME](./README.md)


1. The infrastructure for **development of Typescript libraries**.

2. The intercative **sites tools** packages in `workspace/ts/cloned_repos/jaisocx_sitestools` catalog, however still under development.

3. **Dockerized services**, to use in development:

  3.1. HTTPS server, serving volumes `workspace/ts/cloned_repos/jaisocx_sitestools` and `workspace/php`, with the **brightday.email** wildcard TLS cert, valid til November 2025. Locally, when set some subdomain entry of `brightday.email` domain in `/etc/hosts` file, this is helpful to test with valid **https endpoints**. And in the config file `docker/https/conf/http-conf.xml`, don't set the domain name `sandbox.brightday.email` for Your local tests, this is reserved already, here are the examples published.

  3.2. **JWT protection** feature for **https** endpoints under **Jaisocx** dockerized service `https`.

  3.3. **NodeJS 23** dockerized volume with services:

  3.4. **node** command line interface. node --version: v23.11.0.

  3.5. **npm** command line interface. npm --version: 10.9.2.

  3.6. **yarn@4.9.1** package manager is installed in the node docker service, however is not used by ProjectBuilder. You are free to rebuild the PackageBuilder to use yarn. I shall note to develop .env setting for the choice of npm or yarn.

  3.7. **Express@5.1.0** NodeJS Framework example application in `workspace/ts/express/app` http://localhost:3000/

  3.8. **Node http server** endpoint http://localhost:8083/, serving volume `workspace/ts`.

  3.9. Backend interpreting language **PHP 8.4** dockerized service
     with **XDebug** installed and configured, to use with Jaisocx https server, serving volume `workspace/php`, too.

  3.10. **MySQL Database** dockerized service, e.g. to test Typescript tools, rendering JSON data, by delivering JSON http responses, built by backend scripting languages, read tables records from a database.



## Features ready to use, however will be upgraded later for sure.

1. Typescript: central config to transpile typescript code and the central transpiler node dependencies `node_modules` folder once.

2. Code prettifier: Eslint central config and addons examples.

3. Webpack: templates and examples of config files and npm packages folders, documentation.

4. Dockerized services: node, php, https endpoint, database.

5. Themes development examples in several Sites Tools.

  5.1. Tooltip

  5.2. Tree

  5.3. CssCodeSnippet

  5.4. CssTable

6. EmailHtmlInliner to set inline styles to html before send via email.

7. Base ts packages published on npm to install via Yarn and Npm.

    7.1. EventEmitter

    7.2. TemplateRenderer

    7.3. FileWriter

    7.4. ObjData

    7.5. Text (Just one method, and for now may be used like the example of a package of static methods just like a namespace for reusable code blocks)

    7.6. CssHtml: package with several methods for working with css.

    7.7. TokensParser ( The package with base methods to parse one art of text data formats )

    7.8. CssImporter



## Not tested features, however are in development tasks.

  1. Base typescript classes inheritance considering the required methods and methods args in Base classes. For example, class ContextMenu extends Tooltip {}.

  2. packages/Api. Used in one example .html, for now I didn't find no documented infos whether I tested this package with CORS and every other https feature and http request method and request payload art. Just an example for ObjData.



## NPM Packages in development, not ready

  1. SiteToolAutomation. Primary in development, not updated longer ago, due to development of related classes in other packages.

  2. CssCleanStart is aimed for the foreseen html nodes syles when coding html and viewing the site in browser whether the markup implements the design. When tested the SiteToolAutomation package on site with CssCleanStart, then several not exact dimensions in @media queries implemented in CssCleanStart were encountered, and now the new feature in the SiteToolAutomation produces the automated set of .css files by .json data with more precise dimensions (is under minor bugfixing). The number of @media queries ( over 20 ), when seems overflowing for a Site or a Tool, may be easily encommented in the main importing .css file with symbols /**/, and the ready now CssImporter package solves the feel of .css imports overflow in Browsers' Dev Console Netwok Tab, when loading a site with CssCleanStart on it. This feature of the CssImporter to load just one .css file or one bundle.js with the CssCleanStart and other SitesTools and Themes is available, however a config or tool to fine tune easily the set of .css files imported and packed with CssImporter and Webpack was not set to dev tasks neither was started.

  3. sites_tools/css_tools/404 is the first template for the set of automated sites responses. This may be a 100vh 100% template for entire browser tab sized responsive static cached pages to avoid blank screens of responses to the unhandled requests, server responses about errors or requests being processed confirmations like "file upload done". Waits for the SiteToolAutomation to start writing with the bugfixed responsive feature of the CssCleanStart.

  4. ImprovedTemplateRenderer, will be used to improve rendering json and objdata by SitesTools.

  5. WorkspaceTreeWalker. The recursion is a hard coding task. Even few standard reusable solutions published may save up development cost. When, with aim of the finer programming model, developed standard callbacks for just 3 well known json data arts to render with templates, the encountered bugs of renderer were not tracked, even when debugged the code, and for now one datatype still is rendered with the implemented callback not the right way. The development is postponed, unfortunately, due to lack of ideas to bugfix these 3 standard callbacks. Once solved, these standard callbacks will solve rendering task of the most arts of json data. The multilevel arrays of objects have to be declared in templates with simple html snippets, and rendered with often similar logics. Later, when developing new SitesTools, the further callbacks to render new encountered json data arts have to be easily added, or overridden or implemented in extending classes. And for now (about js Table and refined TemplateRenderer with WorkspaceTreeWalker) the tables normally render more than 3 levels of tags: table, rows, cells, cell data, cell labels, cell rendering config infos objects. However the template may be the very ease html snippet. The rich templating engines give more freedom in coding, and this package will solve once rendering of 3 json data arts, and these jsons are very very often. A simple solution for let say 70% of tasks is good. And for the very hard tasks, understood, other expensive tools are used with rich features, taking into account the size of install required. The example may be a Database Server Setup and js instruction array.find() to solve the task finding a value in a dataset.

  6. Table. Waits for ImprovedTemplateRenderer and WorkspaceTreeWalker.



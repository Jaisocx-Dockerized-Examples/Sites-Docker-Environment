
![../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg](../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg)

# NEWS
  > **🗓 Updated**: Sun. 26 apr. 2026 03:35:43

  [📙 HOME](./../../README.md)

---


  - 🗓 26 April 2026 **Sites Tools updated**

  - 🗓 21 April 2026 **README about Deployments and README's**: workarounds, tips and tricks: [📙 readme/md/ts_env_workarounds_publishing_bibliotheques.md](./ts_env_workarounds_publishing_bibliotheques.md)

  - 🗓 18 April 2026 **Software_Labels Preview**: [📙 cdn/images/software_labels/README.md](./../../../cdn/software_labels/README.md)



---

## News: 🗓 30th of January 2026

Dockerized service Jaisocx_SitesServer gitignored conf for published folders.

copy **http-conf.example.xml** to **http-conf.xml**

```bash

  cd "./docker/Jaisocx_SitesServer/conf"
  cp "http-conf.example.xml" "http-conf.xml"
  
```


Later in plan same for **server.properties** at `docker/Jaisocx_SitesServer/etc/server.properties`

---



## News: 🗓 24th of January 2026

Dockerized service `ts` updated. Needs cleanup and new start.


workspace/ts/**.env.dynamic**

```bash

export   start_node_https=true
export ...
...
...

```

---



After new ts starts **the first time**,
it **takes several minutes** to install js packages
for transpiler and other libraries to `workspace/ts/node_modules`

```bash

docker compose stop ts

### cleans up previous install and caches in docker volumes of ts service
docker compose rm ts --volumes

### builds
docker compose build ts

### starts ts
docker compose up ts -d

```




## News: 🗓 18th of January 2026

### 1. Wildcard TLS for domain [basetasks.site](https://basetasks.site/)

  I've purchased new domain name **basetasks.site** and wildcard TLS cert valid until end of **year 2026**.

  **Installed** the TLS Cert for **Jaisocx** and **Node https** with **Express**.



### 2. TLS Command line

  [📙 ./cmd/https_keys/README.md](./../../cmd/https_keys/README.md)



### 3. Express with https and cors

  Few js code snippets in
  [workspace/ts/express/src/secure_server.js](../../workspace/ts/express/src/secure_server.js):
  1. Cors with allowed domain regexp in `.env.allow-origin`
  2. Https
  3. Json sent from local filesystem
  4. Json sent compressed




  Local link:
  [https://local.basetasks.site:9443/](https://local.basetasks.site:9443/)




## News: 03rd of January 2026

### 1. New example page for local preview.

GitHub link:
[sites_tools/media_tools/JscImages_mini_datatypes_base/unicode.preview.html](https://github.com/Jaisocx-Tools/Jaisocx_SitesTools/tree/main/sites_tools/media_tools/JscImages_mini_datatypes_base/unicode.preview.html)

The same link on local install:
[sites_tools/media_tools/JscImages_mini_datatypes_base/unicode.preview.html](workspace/ts/cloned_repos/jaisocx_sitestools/libraries/sites_tools/media_tools/JscImages_mini_datatypes_base/unicode.preview.html)



### 2. New package for command line shell
The very nice example
to invoke **in console a typescript file**,
written for a custom use of a javascript package,
installed to `node_modules`.

```bash
    ### You need custom script for package @jaisocx/css-importer
    ### Invokes in console like this:
$_ ./cmd/cssImporter.sh --debug
```

#### The documentation, linked in README.md:

**G) Command Line G1) Bash example with node debug**

GitHub link:
[console/JsInvoke/README.md](https://github.com/Jaisocx-Tools/Jaisocx_SitesTools/tree/main/console/JsInvoke/README.md)

The same link on local install:
[console/JsInvoke/README.md](./../../workspace/ts/cloned_repos/jaisocx_sitestools/console/JsInvoke/README.md)




## News: 22nd of December 2025

For now in reconstruction, I appologize.

Promised to align the few preview .html pages accordingly. 

The reconstruction aimed to apply for all sites tools the normal previews already available for @jaisocx/css-table,
prove and code review of base packages like css-importer where bugs were found,
review of unused numbers of hardcopies of deps installed for every package preview several times,
bugfixes in ESlint plugin for code formatting.

I dropped all examples first 
and was occupied with the code review and refactoring 
in order to enable somehow normal previews for packages installed to node_modules.

for now I guess most of sites tools available with yarn add or npm i remained as pair of weeks before.

1. in the bash script "./setup_Jaisocx_SitesTools.sh" fast added several calls to install node_modules for the preview after have cloned Jaisocx_SitesTools

2. TypeScript development enabled with just One single dockerized service "ts" 
     where NodeJS is installed, 
     along with flat http and secured https endpoints examples,
     and the Express http endpoint example for coding backend tasks in JavaScript or TypeScript both.
     The thing is, for Typescript Node docker service is needed first.
     The ts docker service allows work with http in browser having instlled just one single docker service.

3. Nevertheless, I've tested dockerized Jaisocx https endpoint, it has worked.
     On Your demand, Jaisocx docker service costs 200MB Java install in JDK Docker image and several MB Jaisocx install.



## News: 24th of September 2025


### 1. Preview feature refined for The JS Sites Tool Tree

`@jaisocx/tree@2.2.18`



### 2. new doc on harddrive space and traffic save-up

- [preloader_font_loading_once.md](./preloader_font_loading_once.md)



### 3. new doc on URLs theory. 

Of great use for Webpack and @jaisocx/css-importer

- [urls.md](./urls.md)



### 4. new doc on the Timeline of the Protocol HTTP for Sites Browsers and Servers

- [http_timeline.md](./http_timeline.md)



## News: 21st of August 2025


### 1. Sites Tools Preview Command Line Tool

The new bash script to install with npm 
and preview in browser a sites tool's index.preview.html

#### Read docs

- [cmd.md](./cmd.md)

- [Docs are here: install_sites_tool_with_preview.md](./install_sites_tool_with_preview.md)


#### Try

You need to change the path where to install a sites tool, the last arg `"/home/user/projects/preview"`

```bash
./cmd/install_and_view_sites_tool.sh "@jaisocx/css-table-ordered" "latest" "/home/user/projects/preview"
```





## News: 21st of June 2025

### ResponsiveSizes updated

#### Notice

The example html site shows when a `mobile s` portrait,

then the same mobile when turned, very oft not the `mobile s`, can be tablet sm landscape or other.

Please, regard these sizes names for the site quality improves and bugfixes to know the @media query name and .css file, and not the mobile device size. Displays may be same thin, however longer.



`workspace/ts/cloned_repos/jaisocx_sitestools/packages/ResponsiveSizes`

[https://sandbox.brightday.email/ExampleSimple_ResponsiveSizes.html](https://sandbox.brightday.email/ExampleSimple_ResponsiveSizes.html)




The nice idea of an advice now, is not to adjust the sizes of `SitesToolAutomation` in several .json files variants, but to keep for good on a cdn of me and Yours, to have the standard doc to relay later on. This .json dataset was asked in Chat GPT site, and the most infos used by the Chat, are the gathered standards infos in the internet, published since longer ago.


[https://sandbox.brightday.email/packages/SitesToolAutomation/responsive_sizes_user_friendly_view.html](https://sandbox.brightday.email/packages/SitesToolAutomation/responsive_sizes_user_friendly_view.html)




### SitesToolAutomation

#### Very easy to gen new .css files set for a sites tool responsive feature quality assurance and fine tuning.

```bash
./genSiteToolTemplate.sh --sitesToolName=CssCleanStart --cssOrJsTool=css --template="data/templates/ResponsiveTemplate.template" --withSizesCssConstants=true --withConstantsImportLine=true
```


the new package `workspace/ts/cloned_repos/jaisocx_sitestools/packages/SitesToolAutomation` produces .css file set, similar to CssCleanStart, however the responsive sizes are set in a .json file.

[https://sandbox.brightday.email/packages/SitesToolAutomation/responsive_sizes_user_friendly_view.html](https://sandbox.brightday.email/packages/SitesToolAutomation/responsive_sizes_user_friendly_view.html)

The CssCleanStart will be bugfixed, rebuilt and updated soon.






### CssToolTemplate

the first try to produce the new project template for a css sites tool with the new *SitesToolAutomation*.

ready to use, however the SitesToolAutomation will gen later normally the new css sites tool with all files:

. package.json

. entry in BuildData.json

. webpack infrastructure files and webpack.alias.json

. MediaAndStyles base theme and responsive .css files set

. src/index.ts with styles imported

. .css resolved styles built with CssImporter








## News: 13th of May 2025

#### 1. To apply new npm tools:
**SASS** and **LESS** Styles preprocessors and
**Vitest Testing Framework**,
You need to update in Your project ts dockerized service and
install new npm development dependencies:

```
docker compose rm ts
docker compose build ts
docker compose up ts -d


docker compose exec ts bash
cd /opt/jaisocx/sites_docker_environment/workspace/ts
npm install
```



#### 3. SASS and LESS Style Preprocessors applied in this project

*Example usage in .ts code:*

```
import "./styles/main.scss"; // for SASS
import "./styles/main.less"; // for LESS
```




## News: 12th of May 2025

1. Datasets published for Sites quality improvals, to use on CDN too, to lookup countries codes and languages names and codes.


[https://sandbox.brightday.email/CharsetsDetectionRelevantDatasetsPreview.html](https://sandbox.brightday.email/CharsetsDetectionRelevantDatasetsPreview.html)




2. Upgraded typescript packages to the newest ver.

To update Your project:

```
docker compose exec ts bash
cd /opt/jaisocx/sites_docker_environment/workspace/ts
npm install
```



## News: May 2025.

1. New npm Package **EmailHtmlInliner** `@jaisocx/email-html-inliner` and site to watch The Inliner in action: [https://sandbox.brightday.email/sites_tools/js_tools/EmailHtmlInliner/EmailHtmlInliner_Images.html](https://sandbox.brightday.email/sites_tools/js_tools/EmailHtmlInliner/EmailHtmlInliner_Images.html)


2. Stricter tsconfig.json rules. Checks unused variables. Wen You have to invoke the callback and don't use the callback's in arg, the workaround is to prefix the method's in arg name with the underscore symbol.

```
addEventHandler(
  eventName,
  ( _eventName: string, payload: any ) => {

    // the _eventName var is never written in this callback.
    // when not _ prefixed, the tsc typescript transpiler throws exception and exits.

    console.log( payload );
  }
);
```


3. Since now this project is of great use when You **develop and push to npm CSS tools and themes**, too, thanks to the new features `css-importer` and fine tuning of package.json working examples and project's config for Webpack builds.


4. How to build **Your CDN example** with The [Jaisocx.com](https://jaisocx.com/) Sites Server in `docker-compose.yml` and `docker/https/conf/http-conf.xml`


5. **Renamings**: in the www folder, the most `examples` were moved to the new `webpack_builds`. Why: the examples were just the webpack builds with no other features or funcs. That is why they are just webpack builds as they are.

    5.1. In ts packages, renamed were:

    5.1. `assets` -> `MediaAndStyles`. **Assets** is the keyword in Online Banking apps. **Styles** is the keyword in Sites development since 1990th.

    5.2. `build` -> `transpiled`. **Transpile** is the keyword of The Typescript Language, and **build** is the keyword of The Webpack Tool.



6. **Fine Tuning ProjectBuilder's Config**. In the config file `BuildData.json` there are new features to fine tune the ts build.

    6.1. `build-simple-enable` works. Turns on writes .js files listed in `"build-files"`. Path is: `${packageRoot}/transpiled/Simple`.

    6.2. `css-importer`: packs on demand all .css files to one `"cssTargetFilePath"`, if all other .css files were referenced in the `"cssFilePath"` via @import url("styles-filename.css");



### 7. The new template "ResponsiveAndValidForWebpackWhenNpmInstall"


`workspace/ts/cloned_repos/jaisocx_sitestools/templates/ResponsiveAndValidForWebpackWhenNpmInstall`


Just **copy paste** to start a **new** npm ts | js package **from scratch**. There are just package.json and .js files for the webpack feature.


This template is developed for the nice workaround to publish on **npm webpack aliases** when aimed to set this npm package available in other ts tools for builds there with The Webpack to `bundle.js`, when installed there this package via **npm install**.


Why good to use this template for SitesTools: whenever You planned to import there styles or not, later the imported .css files, images, themes and fonts may be installed and noone knew before. The few .js and .json files in this template will no harm the new package size too extensive.




## News in March 2025.

1. docker service `ts` was upgraded to v`23.11.0`, npm v`10.9.2` (I experiensed best performance and the documentation tells about new typescript files run feature available after v23.6.0) You need to rebuild the `ts` service.
```
docker compose stop ts
docker compose rm ts
docker compose build ts
docker compose up ts -d
```


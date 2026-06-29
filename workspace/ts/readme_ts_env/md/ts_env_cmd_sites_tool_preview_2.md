
![../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg](../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg)


# PREVIEW Of Sites Tools, Published For Npm Or Yarn

  [README.md HOME](./README.md)


## The Aim Of The Setup

To preview the sites tool when installed via `npm i` or `yarn add`




### Preface

A sites tool, published on npm,
may be installed via npm or yarn to a js single page application,
built with js frameworks like React, Angular, Vue3, NextJS 
with a js framework single base component for a sites tool
implementing a base interface in the namespace of a js sites tools developer or company.

Js|Ts developers prefer to keep npm repos registry well seeing 
when navigating and installing other sites tools 
and for own company marketing and pr purposes.

The npm and yarn repos registry has the rules:

1. to publish `README.md`. We publish for preview one more in addition: `index.example.html`
2. to avoid or minimize publishing other files than json conf, css and js code.


When having tested sites tools, I've encountered and implemented 
several efficiency optimization workarounds,
like these:

1. traffic cost `save up` (prevented, on single site load, loading several times the same fonts and images);

2. foreseen `timestamps of loading` resources like images and fonts (prevented interactivity layout jumps);

3. fallback urls for `node_modules` after npm install --install-strategy=hoisted, when installed just one npm package. The relative nested level of `node_modules` path is not to foresee;

4. fallback urls bugfixes for the cases, when a cdn isn't responding or the internet connectivity isn't there (when installed a sites tool via npm, and other time later tried to preview the sites tool without internet connection).




### Example Flow:

1. install `npm i @jaisocx/tree`

2. open `node_modules/@jaisocx/tree`. in FileSystem Explorer the folder `node_modules/@jaisocx/tree`

3. open `index.example.html`.

   3.1. in the FileSystem Explorer, 
       open by tap or mouse double click `index.example.html`,
       or with context menu `Open with...` and choose the browser to open this file with.

   3.2. if having the folder published with a sites server on url `https://your-domain/cdn/sites-tools/`, 
       navigate in browser:

```
https://your-domain/cdn/sites-tools/node_modules/@jaisocx/tree/index.example.html
```



In both cases, 3.1. and 3.2, the sites tool example is being shown the right way, 
like the sites tools developer has had tested before has published to npm.








### Preview .html Modes

#### 1. Production Mode

*index.example.html*, *tree_preview_prod.html*

The production mode preview may be opened in browser both in `local file system` with fs path and `sites server` with url.

For this purpose, the fallback relative urls task was solved.

##### 1.1 fallback urls workarounds:
    
    1.1.1 node_modules
    
    1.1.2. cdn not responding npm package with base resources like images and fonts.
    
    1.1.3. DOMContentLoaded resolved when loaded with fallback urls after DOMContentLoaded.


##### 1.2. traffic save up workarounds:
    
    1.2.1. @jaisocx/preloader for single load.



##### 1.3. cdn not responding workarounds for @jaisocx/preloader ( and when preview offline):
    
    1.3.1. preventing blocking of the site render, the cleanup script to delete cdn preload links 
    
    1.3.2. preventing default font, for a not loaded font from cdn, have set the fallback fonts names in styles.


##### 1.4. request events number minimized.

    1.4.1. sites tool's base styles are loaded with one ..._resolved_minimal.css file



#### 2. Development Mode

*tree_preview_dev.html*

html file for testing and tryout purposes in development mode: 
        
    2.1. without heavy scripts load for preloads and fallback urls.
    
    2.2. loading styles in relative mode, You see every of 30 files in the filesets for the responsive feature
    
    2.3. loading js classes in simple mode ( the easiest to view in browser's dev console legacy legacy mode ).




### Problems Solved

#### Sites tools preview problems

1. Preview of a sites tool and of source code was not easy.

2. When a cdn is not responding or the internet isn't turned on, 
    the sites tool has to look good, nevertheless.


#### The normal and rare sites and sites tools problems need optimization and fine-tuning.

1. the css and js sources were not to view easy and transparent.

2. The fonts are not explicitly loaded 
    and may fallback to default fonts, if not installed on a client device OS.

3. Same media files like images and fonts are loaded several times with traffic unneeded cost.

4. When the efficient pattern LazyLoad is turned on in a client browser, 
    some resources are loading in browser later 
    in unexpected for testers and surfers timestamps,
    and interactivity layout jumps may occure.

5. when having installed a sites tool with npm, 
    the relative paths to styles and scripts don't work,  
    since the relative paths in `node_modules` may be one or two levels above, 
    or inside the `node_modules` two levels deep.

6. fonts and media like images in npm packages examples 
    are in most cases not loading, since cdn url has changed, 
    or viewing the example offline.


### Friendly Greetings

Have a nice day and stay in touch,

Elias Jaisocx.com Software Architect and Developer



![../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg](../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg)

# The Aim Of The Setup

  [HOME](./README.md)


#### QA Notice

The live install for tests, whether one can profit in development and the feedback already have shown:

1. the need to rename and align similarly methods and props, in order to rename once and to keep same for the longer period, and later, when starting a new tool, to align the new tools to the already proved development patterns in this project. 

2. the responsive feature needs a lot of attention and lot of coding and documenting time. 




## Reusability

Building Project to keep availble reusable ts | js packages for good. You are free to use for Your code as well, and just like a project infrastructure, too.




## TS | JS development infrastructure 

### TS Transpiler conf and ProjectBuilder

#### Legacy CommonJS
#### ESNext
#### Webpack bundle.js
#### Simple ( &lt;script src="SitesTool.js"&gt; )


### Prettifier



### Workarounds for:


#### EntryLevel is easy.

For a SitesTool ( Install | Try | Test | Try to Modify | Modify | Use on Your Site), to miminize the Entry Level required


It is easy to open in browser an .html page with a transpiled SitesTool.

1. in FilesExplorer -> open with... 

2. in the dockerized https endpoints in this project


Among ESNext and ComomonJS, typescript sites tools .ts classes are transpiled to .js files, that they can be set on site via 

```
<script src="packages/SitesTool.js">/script> 
```





#### Npm

##### Local and installed npm dependencies

typescript modules development, local and published to npm registry

The project was started to provide the modular typescript development,
with the ability to keep source code well structured in npm registry,
however being able to develop a new typescript tool,
and at once fix bugs or add new features in other own typescript modules, published on npm registry,
keeping dependencies not broken and centralized.



#### Webpack

#### Responsive

#### Themes

#### JS Frameworks

##### JS Frameworks BaseComponent for ts SiteTools.

Aimed no concurrency to frameworks, rather to develop a very easy workaround and a ts interface, when instantiating the Angular, Vue3 and React components by one component class in every framework, and a ts tool installed via yarn or npm install. At this timestamp, I didn't align the few Sites Tools (Tooltip, Tree, CodeSnippet) to the standard interface and standard .get...() .set...() methods, .render() and .load() methods' input args, taking into account every https feature and CORS and Authorization; standard methods namings for js interactive tools for the events targets html elems, themes support. For now I tried the very few not similar ts tools, and already see several improvals to be done. 















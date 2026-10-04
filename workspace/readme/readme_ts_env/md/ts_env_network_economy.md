
`typescript environment`


![../../../cdn/software_labels/docker/softlabel_docker.svg](../../../cdn/software_labels/docker/softlabel_docker.svg)
![../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg](../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg)

[HOME Docker for a Site](./../../../../README.md)


[HOME Docker for a Site Typescript Environment](../../../../README_typescript_environment.md)


[HOME Typescript Environment](./README.md)





# Network economy


## The aim of the setup
> 💡 For user experience, sites design implementation quality and network economy.



### No request 

#### 1. Cached ressources no request

**Caching** https **response headers**,
along with a **cdn url**,
**both**, in the **preloadig link** 
and in the **loading link** 
or **loading @import** statement in styles,
tell to a browser **not to request** cached files,
for the network economy.



1. **Caching https response headers** `Expires`

2. **cdn url** `https://cdn.domain.com/...`

3. **preloadig link** `<link rel="preload" href="https://cdn.domain.com/..." />`

4. **loading link** `<link rel="stylesheet" href="https://cdn.domain.com/..." />`

5. **loading @import in styles** `@import url("https://cdn.domain.com/...");`

6. **loading @import in styles** `@font-face { font-family: "font"; src: url("https://cdn.domain.com/.../font.woff"; ... }`





#### 2. OS preinstalled fonts no request

OS preinstalled fonts don't require loading from sites server over network.
   The OS preinstalled fonts to set for rendering in browser,
   require similar fallback fonts preinstalled on every other OS' for the best site user experience.
   I've engineered pair of themes for 4 font familie groups: Sans-Serif, Serif, Monospace, Handwrite.

**Local link**:  🌐  **Sites Tools via Statique http**  [http://local.basetasks.site:8085/html_examples_sites_tools/fonts_os_installed_preview.html](http://local.basetasks.site:8085/html_examples_sites_tools/fonts_os_installed_preview.html)

**Local link**:  🌐  **Sites Tools via Statique Secure https**  [https://local.basetasks.site:8445/html_examples_sites_tools/fonts_os_installed_preview.html](https://local.basetasks.site:8445/html_examples_sites_tools/fonts_os_installed_preview.html)





### Images files sizes minimization


#### Picture html node

Html node `<picture>` loads for a mobile portrait the url of the image of the smaller filesize 
than the url of the same image for the big TV display,
if downgraded image versions were generated and set for the picture html node urls.



















![../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg](../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg)

# Publishing Bibliotheques

[README.md HOME](./README.md)



## A. Solving tasks on quality improvals

  1. **deployments** of **previews** have **conforming sites addresses**   
     **Pattern**: https://github.com/`${organization}`/`${repository}`/blob/`${branch_deployd}`/README.md => https://`${organization | to_lowercase}`.github.io/`${repository | as_is}`/

     **Url**: [https://jaisocx-tools.github.io/jaisocx_sites_tools/](https://jaisocx-tools.github.io/jaisocx_sites_tools/)

  2. **documentation** look-and-feel **quality**

  3. **ease deployments** later, keeping in mind **rules on local previews** development ( rules for local **CDN** folder, **links**, **images** formats, **docs** formats )



### A.1. Deployments of previews have conforming sites addresses
  > aligned to **Github.com** rules for deployments 

  A.1.1. Subdomain for deployment

  A.1.2. Link for deployment



#### A.1.1. Subdomain for deployment

  Your libraries Top level namespace is the name of the **Organization** published by **Github.com**

  **Organization name**: `Jaisocx-Tools`

  **Subdomain name**: `jaisocx-tools.github.io`, 
  the name of the organization **transforms to lowercase**. 
  Keep in mind **special symbols**, supported **in links** by both, 
  browsers with git servers sites.



#### A.1.2. Link for deployment

  > https://github.com/`${organization}`/`${repository}`/blob/`${branch_deployd}`/README.md => https://`${organization | to_lowercase}`.github.io/`${repository | as_is}`/
  > 
  > [https://jaisocx-tools.github.io/jaisocx_sites_tools/](https://jaisocx-tools.github.io/jaisocx_sites_tools/) 

  Your libraries next namespace slug 
  is the name of the Repo, 
  published by **Github.com**, 
  being pushed by `git push` console command.

  **Repo name**: `jaisocx_sites_tools`

  **Link's first slug**: `jaisocx_sites_tools`, as is, no transform.
  > I've named my repo `Jaisocx_sitesTools`, 
  > and it was deployed automatique to `https://jaisocx-tools.github.io/Jaisocx_SitesTools/`, 
  > and this wasn't easy to type in browser's address bar, the url. 
  > 💡 I've renamed the repo to all symbols lowercase, joined by underscores. 

  **Link**: [https://jaisocx-tools.github.io/jaisocx_sites_tools/](https://jaisocx-tools.github.io/jaisocx_sites_tools/) 



### A.2. 💡 Documentation look-and-feel quality

  1. ❎ **Mini images of Unicode symbols are supported in UTF-8 charset encoding**: ✨ [https://jaisocx-tools.github.io/jaisocx_sites_tools/examples/html_pages/Unicode_Symbols/unicode_icons.html](https://jaisocx-tools.github.io/jaisocx_sites_tools/examples/html_pages/Unicode_Symbols/unicode_icons.html)

  2. **Format supported by all .md**: if one of well-known servers doesn't support some format, however a nice format, too, Your docs look good on other well-known servers only.

  3. **README.md doc shown always**: `README.md`, on having had navigated to a repo or a folder in the git repo. Just like `index.html` by most of sites servers.

  4. **Hashtags typed on a line start, no empty spaces before**: Hashtags in .md render like &lt;H1&gt; or &lt;H2&gt; or &lt;H3&gt; html tags, have to be typed from the line start. if empty spaces before, the hashtags in .md docs on sites of git servers are rendered as they are.

  5. **One .md README.md in a js library for node_modules**: `.md` in **javascript libs**, published for `node_modules`, are **unrendered**, just shown the markup. The only filename rendered is the `README.md` in the first level folder of the published library. The only `README.md` doc brings the impression of a good documented js library, since only this file is always rendered by both **all sites** for **js libs** for install later to `node_modules`.

  6. **No images in single README.md in a js library for node_modules**: images are supported by all **repo servers** for **javascript libs**, but conditionally, and also the rules distinguish, neither both sites conform the newest support for `.md` like in 2026 do other repos sites or IDEs. The best choice just to avoid, if the first, or few months js libs publishing experience. The invested time for nice images in README.md for a js lib could cost a lot, and the first published libs could have quality loose, inspite of lot of craft for good look and feel, and experienced improvals once on one repo server, since didn't notice bugs on some other.

  7. **PHP, Python, JSP, Java repo servers**: also, every programming language and every repo server for a programming language, not the same rules for documentation.



### A.3. Ease deployments later, keeping in mind rules on local previews developments

  > rules for local **CDN** folder, **links**, **images** formats, **docs** formats

  1. **local previews published with a slug**: example : `https://local.basetasks.site:9445/any_slug/examples_html/Unicode_Symbols/unicode_icons.html`
  > references in the local previews have to be relative, and work with a slug, or without.

  2. **local previews don't relay on node_modules**
  > the simpliest deployments 
  > without installs to node_modules in deploy time, 
  > are in free plans and are easier to configure.

  

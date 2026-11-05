
`Docker for a Site`  Jaisocx &#8482; &#169;


![cdn_sites/software_labels/docker/softlabel_docker.svg](./cdn_sites/software_labels/docker/softlabel_docker.svg)
![cdn_sites/software_labels/Jaisocx/softlabel_jaisocx.svg](./cdn_sites/software_labels/Jaisocx/softlabel_jaisocx.svg)



[HOME Docker for a Site](../README.md)


# Workspace, the multiple mounted volume

  >  💡  my advise, **never publish** on https endpoint the entire workspace.


  >  💡  For  🔒  protection via login credentials,
  >        You might set basic, digital or jwt authentication for a folder on Your Sites Server.



  |  🗓  **Updated**  |  🌾  Autumn 2026 | `AD 2026_Oct_22 16:20:10.900 GMT_24h`  


---



## Folders in the workspace


### 1.  Folders for the dockerized services:


  1. ts ( typescript, node )

  2. php 

  3. a4dc ( Acrobat electronique docs for printing and sending by email )





### 2.  💡  examples of **central**  `node_modules`  install

  >  💡  in order just to save up the harddrive space))


####  cdn_node_installs/node_modules
  
  1.  for cdn purposes



####  ts/node_modules

  2.  styles preprocessors  

  3.  typescript transpiler  

  4.  code prettifier  

  5.  webpack  





### 3.  ✅  Cdn data the right way

  >  💡  just for a habbit for a cdn directory, making **another solution**
  >        whether a `data` folder publishes when, and what publishing modes.


  ```ls
    📚  💻  workspace/
       🗂  🌐  cdn_sites/
         🗂  🌐  favicon/
         🗂  🌐  images/
         🗂  🌐  font-files/
         🗂  🌐  styles/
         🗂  🌐  javascript/
       🗂  🌐  cdn_node_installs/ 
       🗂  🌐  opened_data/
       🗂  🔒  protected_data/
  ```


  In the `/cdn_sites/` folder the best way never save `data` folders,
  since `/cdn_sites/data/` would also publish without protection by authentication.





##  ❎  Cdn: avoiding mistakes

  >  ⛔  never know, under what sites server,
  >        how the server overrides the rules for urls, 
  >        according to combinations of many publishing configurations.
  >        might deploy under Apache, Nginx, node-http, Jaisocx.



###  ❌  Wrong folders' structure for cdn publish


  >  ❗  could be, the folder `workspace/cdn_sites/data/protected-data/` publishes **twice**:

  1. once in protected mode, secured by credentials, under the endpoint num. 1, on url  https://cdn-domain.com/ **protected** / `data.json`

  2.  ⛔  and another in unprotected mode, under the endpoint num. 2, on url  https://cdn-domain.com/ **cdn** /data/protected-data/ `data.json`




  ```ls
    📚 workspace/
       🗂  cdn_sites/
         🗂  data/
           🗂  protected_data/
  ```



  1. **securing conf for publishing protected data**:

  🔒  `/protected/` (minimally `Basic auth`) => `workspace/cdn_sites/data/protected-data/`.
  


  2. but,  ❌  **publishing the entire cdn in unprotected mode**:

  🌐  `/cdn_sites/` =>  🌐  `workspace/cdn` has:  🌐  `workspace/cdn_sites/data/`, and, inside,  🌐  ❌  `workspace/cdn_sites/data/protected-data/`.



###  ✅  The right way. Cdn protected data.

  >  💡  just for a habbit for a cdn directory, making **another solution** 
  >        whether a `data` folder publishes when, and what publishing modes.


  ```ls
    📚  💻  workspace/
       🗂  🌐  ✅  cdn_sites/
       🗂  🌐  ✅  opened_data/
       🗂  🔒  ✅  protected_data/
  ```


---





Have a nice day,

Jaisocx Inc. Software Architect I.P.






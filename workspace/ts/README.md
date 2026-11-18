
`Docker for a Site`  Jaisocx &#8482; &#169;


![../cdn_sites/software_labels/docker/softlabel_docker.svg](../cdn_sites/software_labels/docker/softlabel_docker.svg)
![../cdn_sites/software_labels/Jaisocx/softlabel_jaisocx.svg](../cdn_sites/software_labels/Jaisocx/softlabel_jaisocx.svg)



[HOME Docker for a Site](../../README.md)




# cloned_repos
  > Zuckerrübe


  Just like example for placing other git repos. Jaisocx Sites Tools, too.

  For placing `package.json` to **install to node_modules** in **deploy** time.

  Both `package.json` and `-lock.json` are gitignored,
  and this is a nice solution for deploys with **git**, **npm** or **yarn**.

  **.gitignore**

  ```sh
    # vendor by composer
    /workspace/ts/cloned_repos/composer.json
    /workspace/ts/cloned_repos/composer.lock
    
    # node_modules by npm, yarn, or pnpm
    /workspace/ts/cloned_repos/package.json
    
    # npm
    /workspace/ts/cloned_repos/package-lock.json
    
    # yarn
    /workspace/ts/cloned_repos/yarn.lock
    
    # pnpm
    /workspace/ts/cloned_repos/package.json5
    /workspace/ts/cloned_repos/package.yml
    /workspace/ts/cloned_repos/package.yaml
    /workspace/ts/cloned_repos/pnpm-workspace.yaml
    /workspace/ts/cloned_repos/.pnpmfile.cjs
  ```


```ls
// step 1 git cloned
bash_5.3    docker a4dc_h523 ts node $ du -c -k -d1 -x "cloned_repos" .
K       path
249_376	 🗂  cloned_repos/jaisocx_sitestools
249_384	 🗂  cloned_repos
  4_052	 🗂  express
  1_684	 🗂  build_tools
  5_876	 📚  ./
255_260	 📚  total
```


```ls
// step 2 typescript install
bash_5.3    docker a4dc_h523 ts node $ npm install --install-strategy="shallow" --omit=dev "typescript"

added 2 packages, and audited 3 packages in 6s

found 0 vulnerabilities

bash_5.3    docker a4dc_h523 ts node $ du -c -k -d1 -x "cloned_repos" .
K       path
249_376	 🗂  cloned_repos/jaisocx_sitestools
249_384	 🗂  cloned_repos
  4_052	 🗂  express
 29_980	 🗂  node_modules
  1_684	 🗂  build_tools
 35_856	 📚  ./
255_260	 📚  total
```


```ls
// step 3 @types/node
bash_5.3    docker a4dc_h523 ts node $ npm install --install-strategy="shallow" --omit=dev "@types/node"

added 2 packages, and audited 5 packages in 7s

found 0 vulnerabilities

bash_5.3    docker a4dc_h523 ts node $ du -c -k -d1 -x "cloned_repos" .

K       path
249_376	 🗂  cloned_repos/jaisocx_sitestools
249_384	 🗂  cloned_repos
  4_052	 🗂  express
 32_956	 🗂  node_modules
  1_684	 🗂  build_tools
 38_848	 📚  ./
288_232	 📚  total

```


```ls
// step 4 http-server

bash_5.3    docker a4dc_h523 ts node $ npm install --install-strategy="shallow" --omit=dev "http-server"
npm warn deprecated whatwg-encoding@2.0.0: Use @exodus/bytes instead for a more spec-conformant and faster implementation

added 48 packages, and audited 53 packages in 8s

15 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

bash_5.3    docker a4dc_h523 ts node $ du -c -k -d1 -x "cloned_repos" .

K       path
249_376	 🗂  cloned_repos/jaisocx_sitestools
249_384	 🗂  cloned_repos
  4_052	 🗂  express
 37952	 🗂  node_modules
  1_684	 🗂  build_tools
 43864	 📚  ./
293248	 📚  total

```







```ls

bash_5.3    docker a4dc_h523 ts node $ du -c -k -d1 ./node_modules/
0	./node_modules/.bin
29976	./node_modules/typescript
29980	./node_modules/
29980	total

```

```ls
bash_5.3    docker a4dc_h523 ts node $ npm install --install-strategy="shallow" --omit=dev "@types/node"

added 2 packages, and audited 5 packages in 7s

found 0 vulnerabilities

bash_5.3    docker a4dc_h523 ts node $ du -c -k -d1 ./node_modules/
2976	./node_modules/@types
0	./node_modules/.bin
29976	./node_modules/typescript
32956	./node_modules/
32956	total

```


```
bash_5.3    docker a4dc_h523 ts node $ npm install --install-strategy="shallow" --omit=dev "http-server"
npm warn deprecated whatwg-encoding@2.0.0: Use @exodus/bytes instead for a more spec-conformant and faster implementation

added 48 packages, and audited 53 packages in 8s

15 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

bash_5.3    docker a4dc_h523 ts node $ du -c -k -d1 ./node_modules/
2976	./node_modules/@types
0	./node_modules/.bin
4972	./node_modules/http-server
29976	./node_modules/typescript
37952	./node_modules/
37952	total



```


---





Have a nice day, Jaisocx Inc. Software Architect Illia Polianskyi





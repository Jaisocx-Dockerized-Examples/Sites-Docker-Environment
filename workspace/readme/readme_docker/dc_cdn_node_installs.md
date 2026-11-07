
`Docker for a Site` Jaisocx &#8482; &#169;



![../img_software_labels/softlabel_docker.svg](../img_software_labels/softlabel_docker.svg)    ![../img_software_labels/softlabel_jaisocx.svg](../img_software_labels/softlabel_jaisocx.svg)


[HOME Docker for a Site](../../../README.md)



# cdn_node_installs

  >  💡  Just like example for placing `package.json` to **install to node_modules** in **deploy** time


  | 🗓  **Updated**  | 🌾 Autumn 2026 | `06 Oct AD 2026` |


---

  

  Both `package.json` and `-lock.json` are gitignored,
  and this is a nice solution for deploys with **git**, **npm**, **yarn**, **pnpm**

## example of the .gitignore

  ```sh
    # node_modules by npm, yarn, or pnpm
    /cdn_node_installs/package.json

    # npm
    /cdn_node_installs/package-lock.json

    # yarn
    /cdn_node_installs/yarn.lock

    # pnpm
    /cdn_node_installs/package.json5
    /cdn_node_installs/package.yml
    /cdn_node_installs/package.yaml
    /cdn_node_installs/pnpm-workspace.yaml
    /cdn_node_installs/.pnpmfile.cjs
  ```





## Structure

### git cloned
  
  ```ls
    📐  16_K 📚 cdn_node_installs
    📐   4_K     📄  example_package_json.txt
    📐   4_K     📄  example_package-lock_json.txt
    📐   4_K     📄  jaisocx.json
    📐   4_K     📒 README.md
  ```


**Copies of example_  .json's to the ignored .json's**

  ```bash
    cp -a example_package.json package.json
    cp -a example_package-lock.json package-lock.json
  
    npm -i --install-strategy=hoisted --omit=dev
  ```



### node_modules installed

  ```ls
    📐  35_000_K 📚 cdn_node_installs
    📐  35_000_K    🗂 node_modules/
    📐  35_000_K      🗂 @jaisocx/
    📐      76_K        🗂 api/
    📐                  🗂 ...
    📐                  ...
    📐       4_K    📄  example_package_json.txt
    📐      24_K    📄  example_package-lock_json.txt
    📐       4_K    📄  jaisocx.json
    📐       4_K    📄  package.json
    📐      24_K    📄  package-lock.json
    📐       4_K    📒 README.md
  ```







---





Have a nice day, Jaisocx Inc. Software Architect Illia Polianskyi






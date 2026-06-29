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



# node_cdn_installs

  Just like example for placing `package.json` to **install to node_modules** in **deploy** time.

  Both `package.json` and `-lock.json` are gitignored,
  and this is a nice solution for deploys with **git**, **npm** or **yarn**.

  **.gitignore**

  ```sh
    # node_modules by npm, yarn, or pnpm
    /cdn/node_cdn_installs/package.json

    # npm
    /cdn/node_cdn_installs/package-lock.json

    # yarn
    /cdn/node_cdn_installs/yarn.lock

    # pnpm
    /cdn/node_cdn_installs/package.json5
    /cdn/node_cdn_installs/package.yml
    /cdn/node_cdn_installs/package.yaml
    /cdn/node_cdn_installs/pnpm-workspace.yaml
    /cdn/node_cdn_installs/.pnpmfile.cjs
  ```



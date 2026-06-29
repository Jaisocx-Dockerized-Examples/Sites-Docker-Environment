
![../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg](../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg)

## Install Jaisocx Typescript Environment

  [README.md HOME](./README.md)


  via `docker compose up -d`, but before have to:

  1. **copy** `example_env` => `.env`

  2. **copy** `workspace/ts/example_env_dynamic` => `workspace/ts/.env.dynamic`

  3. **copy** `workspace/ts/express/example_env_allow-origin` => `workspace/ts/express/.env.allow-origin`



  **.env**

  ```sh
    #!/bin/sh

    TIME_ZONE="Europe/Paris"
    
    SOFTWARE_NAMESPACE="jaisocx"
    PROGRAM_NAME="tsvm_jsc"
    PROGRAM_VERSION="1.0.1"
    
    DOMAIN_NAME="basetasks.site"
    PREVIEW_DOMAIN_NAME="preview.basetasks.site"
    LOCAL_DOMAIN_NAME="local.basetasks.site"
    
    # NODE_HTTP_FLAT_PORT=80
    # NODE_HTTPS_PORT=443
    NODE_HTTP_FLAT_PORT=8085
    NODE_HTTPS_PORT=8445
    ### EXPRESS_PORT is in js hardcoded
    EXPRESS_SECURE_PORT=9443
    EXPRESS_PORT=3000
    
    ### Force custom compatible npm ver. install
    PROJECT_NODE_PACKAGE_MANAGER=npm
    NODE_INSTALL_TARBALL_RELOAD=false
    NPM_VER_FORCE_INSTALL=true
    YARN_INSTALL=no ### temporarily does't work in this setup
    
    NODE_VERSION="24.11.0"
    NPM_VERSION="11.7.0"
    YARN_VERSION="4.12.0-dev"
    
    PROJECT_VOLUME="./workspace/ts"
    IN_DOCKER_PROJECT_VOLUME="/opt/jaisocx/sites_tools/workspace/ts"
    YARN_HOME="/opt/jaisocx/sites_tools/workspace/ts/build_tools/command/tsvm/yarn"
    
    tsconfigVersion="ESNext"
    tsServicePathCdn="/opt/jaisocx/sites_tools/workspace/ts/cdn"
    
    JAISOCX_HTTP_FLAT_PORT=33223
    JAISOCX_HTTPS_PORT=9445
    
    ### MySQL
    MYSQL_DATABASE=db
    MYSQL_USER=user
    MYSQL_PASSWORD="change-this-password"
    MYSQL_ROOT_PASSWORD="change-this-password"
    MYSQL_PORT=3318
    
    GROUP_USERS_ID=3425
    GROUP_USERS_NAME=unpriv
    
    GROUP_READER_ID=2752
    GROUP_READER_NAME=reader
    
    GROUP_NODE_SOFTWARE_ID=2755
    GROUP_NODE_SOFTWARE_NAME=nodejs
    
    USER_ID=2002
    USER_NAME=user
    
    USER_READER_ID=2005
    USER_READER_NAME=reader
    
    USER_NODE_ID=5351
    USER_NODE_NAME=nodejs
    
    USER_NPX_ID=5352
    USER_NPX_NAME=npx
    
    USER_NPM_ID=5353
    USER_NPM_NAME=npm
    
    USER_PNPM_ID=5354
    USER_PNPM_NAME=pnpm
    
    USER_YARN_ID=5355
    USER_YARN_NAME=yarn
  ```

---



  **.env.example.dynamic**

  ```sh
    #!/bin/sh
    # @path workspace/ts/.env.dynamic
    
    start_node_https=true
    private_key_path="/opt/jaisocx/sites_tools/workspace/ts/https_keys/Basetasks_site/2026_2027_Basetasks_site/2026_2027_basetasks_site.key"
    ssl_cert_path="/opt/jaisocx/sites_tools/workspace/ts/https_keys/Basetasks_site/2026_2027_Basetasks_site/2026_2027_bundle_for_node_basetasks_site.crt"
    
    node_https_publish_port=8445
    node_https_publish_folder="/opt/jaisocx/sites_tools/workspace/ts/Jaisocx_SitesTools"
    
    start_node_http_flat=true
    node_http_flat_publish_port=8085
    node_http_flat_publish_folder="/opt/jaisocx/sites_tools/workspace/ts/Jaisocx_SitesTools"
    
    start_express_secure=true
    express_secure_publish_port=9443
    
    express_publish_port=3000
  ```

---



  **.env.allow-origin**
  ```text
  ^https:\/\/([a-z0-9]+\.)*basetasks\.site(:[0-9]{2,5})*$  
  ```

---



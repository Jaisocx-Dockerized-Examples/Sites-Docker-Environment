
`typescript environment`

![../../../cdn/software_labels/docker/softlabel_docker.svg](../../../cdn/software_labels/docker/softlabel_docker.svg)
![../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg](../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg)

[HOME](./README.md)

## Install Jaisocx Typescript Environment
  >  🗓  **Updated**:  🌼  Summer 2026,  the 02th of July 2026, 16:20:00 UTC.
  
  via `docker compose up -d`, but before have to:

  1. **copy** `example_env` => `.env`

  2. **copy** `example_env_beyond_yml` => `.env_beyond_yml`

  3. **copy** `workspace/env_dc_dinamique/example_env_ts` => `workspace/env_dc_dinamique/.env_ts`

  4. **copy** `workspace/ts/express/example_env_allow-origin` => `workspace/ts/express/.env.allow-origin`



  **.env**

  ```sh
    #!/usr/bin/env bash
    
    # -- php composer and php in open docker network --
    WORKSPACE_NAME="a4dc_h523"
    
    # -- php prod mode, php bound to internal docker network without internet --
    # WORKSPACE_NAME="a4dc_h525"
    
    
    
    SOFTWARE_NAMESPACE="jaisocx"
    SOFTWARE_NAME="sites_docker_environment"
    SOFTWARE_VERSION="1_2_0"
    #; echo $PATH: /opt/jaisocx/sites_docker_environment/v1_2_0/node_v26.4.0/
    
    WHETHER_DEV_MODE="true"
    
    
    
    # -- VOLUMES --
    WORKSPACE_VOLUME="./workspace"
    IN_DOCKER_WORKSPACE_VOLUME="/opt/jaisocx/sites_docker_environment/workspace"
    
    # -- DOMAINS --
    DOMAIN_NAME="basetasks.site"
    
    FORBROWSER_NODE_DOMAIN_NAME="node.basetasks.site"
    NODE_INTERNAL_DOMAIN_NAME="nodeinternal.basetasks.site"
    NODE_OPENED_DOMAIN_NAME="nodeopened.basetasks.site"
    
    FORBROWSER_EXPRESS_DOMAIN_NAME="express.basetasks.site"
    EXPRESS_INTERNAL_DOMAIN_NAME="expressinternal.basetasks.site"
    EXPRESS_OPENED_DOMAIN_NAME="expressopened.basetasks.site"
    
    
    FORBROWSER_DOMAIN_NAME="local.basetasks.site"
    JAISOCX_DOMAIN_NAME="dck.basetasks.site"
    JAISOCX_OPENED_DOMAIN_NAME="opendck.basetasks.site"
    
    
    PHP_FPM_OPEN_DOMAIN_NAME="fpmopen.basetasks.site"
    PHP_FPM_DOMAIN_NAME="phpfpm.basetasks.site"
    PHP_COMPOSER_DOMAIN_NAME="phpcomposer.basetasks.site"
    
    # -- DNS --
    DNS_SERVER_IPv4=8.8.8.8
    
    
    
    # --------------
    # -- NETWORKS --
    # -- php composer and php in open docker network --
    # WORKSPACE_NAME="a4dc_h523"
    # -- php prod mode, php bound to internal docker network without internet --
    # WORKSPACE_NAME="a4dc_h525"
    
    # networks:
      # jaisocx_dc_opened_one_for_browsers_network:
    OPENED_ONE_FOR_BROWSERS_NETWORK_NAME="jaisocx_dc_a4dc_h523_opened_one_for_browsers_network"
        # driver: bridge
      # jaisocx_dc_opened_for_inet_installs_network:
    OPENED_FOR_INET_INSTALLS_NETWORK_NAME="jaisocx_dc_a4dc_h523_opened_for_inet_installs_network"
        # driver: bridge
      # jaisocx_dc_internal_connected_all_network:
    INTERNAL_CONNECTED_ALL_NETWORK_NAME="jaisocx_dc_a4dc_h523_internal_connected_all_network"
        # driver: ipvlan
    
    
    
    # -- subnets --
    # -- php prod mode, php bound to internal docker network without internet --
    # WORKSPACE_NAME="a4dc_h525"
    #  OPENED_SUBNET_IPv4="172.20.250.0/24"
    #  OPENED_IP_RANGE_IPv4="172.20.250.244/30"
    #
    #  OPENED_SUBNET_IPv6="fdae:f122:9df5:4::/64"
    #  OPENED_IP_RANGE_IPv6="fdae:f122:9df5:4::/64"
    #
    #
    #  SUBNET_IPv4="172.20.251.0/24"
    #  IP_RANGE_IPv4="172.20.251.224/27"
    #
    #  SUBNET_IPv6="fdae:f122:9df5:5::/64"
    #  IP_RANGE_IPv6="fdae:f122:9df5:5::/64"
    
    
    # -- php composer and php in open docker network --
    # WORKSPACE_NAME="a4dc_h523"
    OPENED_SUBNET_IPv4="172.21.252.0/24"
    OPENED_IP_RANGE_IPv4="172.21.252.244/30"
    
    OPENED_SUBNET_IPv6="fdae:f122:9dea:a::/64"
    OPENED_IP_RANGE_IPv6="fdae:f122:9dea:a::/64"
    
    
    SUBNET_IPv4="172.20.253.0/24"
    IP_RANGE_IPv4="172.20.253.224/27"
    
    SUBNET_IPv6="fdae:f122:9dea:9::/64"
    IP_RANGE_IPv6="fdae:f122:9dea:9::/64"
    
    
    
    # -- ip addresses --
    # -- php prod mode, php bound to internal docker network without internet --
    # WORKSPACE_NAME="a4dc_h525"
    #  A4DC_IPv6="fdae:f122:9df5:5::2"
    #  A4DC_IPv4="172.20.251.225"
    #
    #  OPENED_JAISOCX_HTTP_IPv6="fdae:f122:9df5:4::3"
    #  OPENED_JAISOCX_HTTP_IPv4="172.20.250.245"
    #
    #  NODE_IPv4="172.20.251.229"
    #
    #  JAISOCX_HTTP_IPv6="fdae:f122:9df5:5::3"
    #  JAISOCX_HTTP_IPv4="172.20.251.226"
    #
    #  PHP_FPM_IPv6="fdae:f122:9df5:5::4"
    #  PHP_FPM_IPv4="172.20.251.227"
    #
    #  PHP_COMPOSER_IPv6="fdae:f122:9df5:5::5"
    #  PHP_COMPOSER_IPv4="172.20.251.228"
    
    
    
    # -- php composer and php in open docker network --
    # WORKSPACE_NAME="a4dc_h523"
    A4DC_IPv6="fdae:f122:9dea:9::2"
    A4DC_IPv4="172.20.253.225"
    
    OPENED_JAISOCX_HTTP_IPv6="fdae:f122:9dea:a::3"
    OPENED_JAISOCX_HTTP_IPv4="172.21.252.245"
    
    NODE_IPv4="172.20.253.229"
    NODE_IPv6="fdae:f122:9dea:9::9"
    
    JAISOCX_HTTP_IPv6="fdae:f122:9dea:9::3"
    JAISOCX_HTTP_IPv4="172.20.253.226"
    
    PHP_FPM_IPv6="fdae:f122:9dea:9::4"
    PHP_FPM_IPv4="172.20.253.227"
    
    PHP_COMPOSER_IPv6="fdae:f122:9dea:9::5"
    PHP_COMPOSER_IPv4="172.20.253.228"
    
    
    
    # -- ports --
    JAISOCX_HTTP_FLAT_PORT=2297
    JAISOCX_HTTPS_PORT=8447
    
    PHP_FPM_FLAT_PORT=9020
    PHP_FPM_STATUS_PORT=9022
    PHP_XDEBUG_FLAT_PORT=9050
    
    ### THIS CONF BLOCK WITH HTTP PORTS DOESN'T DO AUTOMATIQUE,
    ### SINCE 1. DOCKERFILE EXPOSE PORT NUMBER IS HARDCODED,
    ###   2. AND DOCKER-COMPOSE.YML STANDARD PORTS MAPPINGS HAVE TO BE HARDCODED TO BE ABLE TO SEE
    ###   3. AND SEVERAL OTHER TASKS, AND EXPRESS AND NODE_HTTPS START package.json:script EITHER
    ###   4. MOREOVER, FOR .env TO TAKE EFFECT WITH PORTS, SINCE IN EXPOSE INSTRUCTIONS IN DOCKERFILE, NEW DOCKER BUILD IS REQUIRED, NOT JUST RESTART.
    ### Sets here slowly NODE HTTP SERVICES PORTS thinking on ports opened and their amount.
    # NODE_HTTP_FLAT_PORT=80
    # NODE_HTTPS_PORT=443
    NODE_HTTP_FLAT_PORT=8085
    NODE_HTTPS_PORT=8445
    ### EXPRESS_PORT is in js hardcoded
    EXPRESS_SECURE_PORT=9443
    EXPRESS_PORT=3000
    NODE_DEBUG_PORT=9229
    
    
    
    A4DC_INSTALL_TARBALLS_VOLUME="./docker_compose/Prince/tarballs"
    A4DC_INSTALL_IN_DOCKER_TARBALLS_VOLUME="/tarballs"
    
    PHP_TARBALLS_VOLUME="./docker_compose/PHP/tarballs"
    PHP_TARBALLS_IN_DOCKER_VOLUME="/tarballs"
    
    NODE_TARBALLS_VOLUME="./docker_compose/ts/tarballs"
    NODE_TARBALLS_IN_DOCKER_VOLUME="/tarballs"
    
    
    
    # -- SITES SERVER --
    SOFTWARE_HOME="/opt/jaisocx/sites_docker_environment/v1_2_0/soft_home"
    LOGS_HOME="/opt/jaisocx/sites_docker_environment/v1_2_0/logs"
    
    A4DC_SOFTWARE_HOME="/opt/jaisocx/sites_docker_environment/v1_2_0/soft_home/prince/v16_2"
    JAISOCX_SOFTWARE_HOME="/opt/jaisocx/sites_docker_environment/v1_2_0/soft_home/jaisocx/v3_0_16/jaisocx-http"
    NODE_SOFTWARE_HOME="/opt/jaisocx/sites_docker_environment/v1_2_0/soft_home/node/v24_11_0"
    PHP_SOFTWARE_HOME="/opt/jaisocx/sites_docker_environment/v1_2_0/soft_home/php/v8_3"
    
    A4DC_SOFTWARE_LOGS="/opt/jaisocx/sites_docker_environment/v1_2_0/logs/prince"
    JAISOCX_SOFTWARE_LOGS="/opt/jaisocx/sites_docker_environment/v1_2_0/soft_home/jaisocx/v3_0_16/jaisocx-http/logs"
    NODE_SOFTWARE_LOGS="/opt/jaisocx/sites_docker_environment/v1_2_0/logs/node"
    PHP_SOFTWARE_LOGS="/opt/jaisocx/sites_docker_environment/v1_2_0/logs/php"
  ```

---



  **.env_beyond_yml**

  ```sh
    #!/bin/bash
    
    TIME_ZONE="Europe/Paris"
    
    SHELL="/bin/bash"
    
    # -- CPU --
    # Intel: x86_64 |  Apple MacBook: aarch64
    # CPU_ARCHITECTURE_A4DC="x86_64"
    CPU_ARCHITECTURE_A4DC="aarch64"
    
    
    ### NODE ALWAYS LINUX, SINCE ALPINE IMAGE
    # os="darwin"
    # os="linux"
    
    # CPU_ARCHITECTURE_NODE="loong64"
    # CPU_ARCHITECTURE_NODE="x64"
    # CPU_ARCHITECTURE_NODE="arm64"
    CPU_ARCHITECTURE_NODE=arm64
    
    
    # AMD: amd64 | Apple MacBook: mac
    CPU_ARCHITECTURE_JAISOCX="mac"
    
    
    
    A4DC_SOFTWARE_VERSION="16.2"
    JAISOCX_SOFTWARE_VERSION="3.0.16"
    PHP_SOFTWARE_VERSION="8.3"
    
    A4DC_SOFTWARE_LATEST_LTS="16.2"
    A4DC_SOFTWARE_LATEST_RELEASE="16.2"
    
    JAISOCX_SOFTWARE_LATEST_LTS="3.0.16"
    JAISOCX_SOFTWARE_LATEST_RELEASE="3.0.16"
    
    PHP_SOFTWARE_LATEST_LTS="8.5"
    PHP_SOFTWARE_LATEST_RELEASE="8.5"
    
    
    
    # -- USERS' GROUPS, USERS --
    # -- groups --
    GROUP_SUDIER_NAME=admin
    GROUP_SUDIER_ID=1002
    ADD_SUDIERS="true"
    
    GROUP_A4DC_NAME=prince
    GROUP_A4DC_ID=2325
    
    GROUP_JAISOCX_NAME=jaisocx
    GROUP_JAISOCX_ID=2524
    
    GROUP_JAVA_NAME=java
    GROUP_JAVA_ID=2525
    
    GROUP_PHP_NAME=php
    GROUP_PHP_ID=2330
    
    GROUP_NODE_NAME=node
    GROUP_NODE_ID=2329
    
    GROUP_USERS_NAME=privileged
    GROUP_USERS_ID=3435
    
    GROUP_READER_NAME=reader
    GROUP_READER_ID=3535
    
    
    
    # -- mkpasswd --
    # mkpasswd -m des asd
    
    # -- users --
    ROOT_HASHED_PWD="q6DDn07ExN73M"
    
    USER_SUDIER_NAME=admin
    USER_SUDIER_ID=1205
    USER_SUDIER_HASHED_PWD="q6DDn07ExN73M"
    
    USER_JAISOCX_NAME=jaisocx
    USER_JAISOCX_ID=2120
    USER_JAISOCX_HASHED_PWD="q6DDn07ExN73M"
    
    USER_JAVA_NAME=java
    USER_JAVA_ID=2202
    USER_JAVA_HASHED_PWD="q6DDn07ExN73M"
    
    USER_A4DC_NAME=prince
    USER_A4DC_ID=2532
    USER_A4DC_HASHED_PWD="q6DDn07ExN73M"
    
    USER_PHP_NAME=php
    USER_PHP_ID=3024
    USER_PHP_HASHED_PWD="q6DDn07ExN73M"
    
    USER_NODE_NAME=node
    USER_NODE_ID=3025
    USER_NODE_HASHED_PWD="q6DDn07ExN73M"
    
    USER_NAME=user
    USER_ID=3030
    USER_HASHED_PWD="q6DDn07ExN73M"
    
    USER_NPX_NAME=npx
    USER_NPX_ID=5352
    USER_NPX_HASHED_PWD="q6DDn07ExN73M"
    
    USER_NPM_NAME=npm
    USER_NPM_ID=5353
    USER_NPM_HASHED_PWD="q6DDn07ExN73M"
    
    USER_PNPM_NAME=pnpm
    USER_PNPM_ID=5354
    USER_PNPM_HASHED_PWD="q6DDn07ExN73M"
    
    USER_YARN_NAME=yarn
    USER_YARN_ID=5355
    USER_YARN_HASHED_PWD="q6DDn07ExN73M"
    
    USER_READER_NAME=reader
    USER_READER_ID=1010
    USER_READER_HASHED_PWD="q6DDn07ExN73M"
    
    
    
    # ---------
    # -- a4dc --
    A4DC_INSTALL_TARBALL_RELOAD=false
    A4DC_INSTALL_FOLDER="/dockr/a4dc/16_2"
    
    
    # -- SITES SERVER --
    JAVA_DC_JAISOCX_RAM_START="20m"
    JAVA_DC_JAISOCX_RAM_MAXIMAL="300m"
    
    PHP_FPM_HOST="${PHP_FPM_DOMAIN_NAME}:${PHP_FPM_FLAT_PORT}"
    
    
    
    # -- PHP FPM --
    PHP_FPM_LISTEN_MODE=750
    # php-fpm.conf
    #   log_level="${PHP_LOG_LEVEL}": degug | notice | warning | error
    PHP_FPM_LOG_LEVEL=notice
    
    # -- PHP --
    PHP_LOG_LEVEL=E_NOTICE
    
    
    
    ### Force custom compatible npm ver. install
    NPM_VER_FORCE_INSTALL=true
    YARN_INSTALL=false
    
    ### npm, pnpm or yarn. but for now works just npm
    PROJECT_NODE_PACKAGE_MANAGER=npm
    
    ### if set "true", then the tarball with node install loads from Inet every time on docker compose build and docker compose up.
    ### if set "false", proves automatique, whether the tarball already there, if not, then loads from Inet and stores in folder
    ### workspace/ts/build_tools/command/tsvm/tarballs
    ### this folder is in .gitignore file, and the saved tarballs are not pushed to GitHub,
    ### even when You publish Your own copy of this Alpine Image on Your GitServer.
    NODE_INSTALL_TARBALL_RELOAD=false
    YARN_HOME="/opt/jaisocx/sites_docker_environment/workspace/ts/build_tools/command/tsvm/yarn"
    
    
    
    ### NodeJS ver. being installed for the "ts" dockerized NodeJS service
    ### for programming in TypeScript Programming Language,
    ### and to run ServerSide Scripts for Sites in NodeJS Programming Language
    ### on Express flat http endpoint on port 3000
    NODE_VERSION="26.4.0"
    NPM_VERSION="11.18.0"
    YARN_VERSION="4.12.0-dev"
    
    
    
    ### LTS Long Time Support ver. number, LTS of some software sometimes being supported for 5 years even.
    ### Support means, the Software Manufacturing Company looks other software libs whether compatible, and runs tests from time to time,
    ### and doesn't erase the tarball to install from Inet.
    # 22. December 2025
    NODE_LATEST_LTS="24.16.0"
    NODE_LATEST_RELEASE="26.4.0"
    
    
    
    # the Typescript ProjectBuilder setting,
    # ESNext is for running ProjectBuilder with a later node ver.,
    # and CommonJS on the machines with the earlier node ver. installed.
    # this variable sets, what ProjectBuilder compiled version will be called.
    # ESNext is preferred, when You have the Node version 23.3 and above, since this ESNext build was done with Node v23.3.0
    tsconfigVersion="ESNext"
    tsServicePathCdn="/opt/jaisocx/sites_docker_environment/workspace/ts/cdn"
    
    # the constants for the docker compose and the ProjectBuilder used with buildPacks.sh
    # buildPacks.sh is to build the node projects, written in ts and js.
    
    # docker-compose.yml ts service:
      # ts:
      #   build:
      #     context: ./docker/ts
      #   volumes:
      #     - ./workspace/ts/:/opt/jaisocx/sites_docker_environment/workspace/ts/
      #   volumes:
      #     - "${relativeProjectPathWithTsCode}:${tsServicePathInDockerVolume}"

  ```

---



  **workspace/env_dc_dinamique/.env_ts**

  ```sh
    #!/bin/bash
    
    ### Ports open in Dockerfile on lines 193
    # EXPOSE 80
    # EXPOSE 443
    # EXPOSE 3000
    # EXPOSE 8445
    # EXPOSE 8085
    
    
    
    TYPING_PROMPT_SYMBOL='$ '
    PS1='\n\s_\v    docker ${WORKSPACE_NAME} ts \u ${TYPING_PROMPT_SYMBOL}'
    # PS1='\s \$ '
    
    
    
    # -- DEVELOPMENT MODE --
    # turns on echo to console, seen in console on command: $_ docker compose -f <filename of compose.yml> logs <service name>
    WHETHER_DEV_MODE="true"
    
    NODE_INSTALL_TARBALL_RELOAD=false
    
    start_node_https=true
    private_key_path="/opt/jaisocx/sites_docker_environment/workspace/ts/https_keys/Basetasks_site/2026_2027_Basetasks_site/2026_2027_basetasks_site.key"
    ssl_cert_path="/opt/jaisocx/sites_docker_environment/workspace/ts/https_keys/Basetasks_site/2026_2027_Basetasks_site/2026_2027_bundle_for_node_basetasks_site.crt"
    
    node_https_publish_port=8445
    node_https_publish_folder="/opt/jaisocx/sites_docker_environment/workspace/ts/cloned_repos/jaisocx_sitestools"
    
    
    start_node_http_flat=true
    node_http_flat_publish_port=8085
    node_http_flat_publish_folder="/opt/jaisocx/sites_docker_environment/workspace/ts/cloned_repos/jaisocx_sitestools"
    
    start_express_secure=true
    express_secure_publish_port=9443
    
    start_express_flat=true
    express_publish_port=3000
    
    
    
    cd ~ && pwd
    # cd "${IN_DOCKER_WORKSPACE_VOLUME}/ts" && pwd

  ```

---



  **.env.allow-origin**
  ```text
  ^https:\/\/([a-z0-9]+\.)*basetasks\.site(:[0-9]{2,5})*$  
  ```

---



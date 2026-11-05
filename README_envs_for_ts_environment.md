
`Docker for a Site` Jaisocx &#8482; &#169;


![workspace/cdn_sites/software_labels/docker/software_tm_label_docker_29_4_3.svg](workspace/cdn_sites/software_labels/docker/software_tm_label_docker_29_4_3.svg)
![workspace/cdn_sites/software_labels/Jaisocx/softlabel_jaisocx.svg](workspace/cdn_sites/software_labels/Jaisocx/softlabel_jaisocx.svg)



[HOME Docker for a Site](./README.md)


---


#  Examples for .env(s)

  >  💡  the real `.env(s)` aren't on the Git servers, add to `.gitignore`.

| 🗓  **Updated**  | 🌾 Autumn 2026 | `AD 2026 Oct 26 17:18:20.000 GMT_24h` 



## node

```ls

  📚  Docker for a Site/
    🗂  docker_compose/
      ...
      🗂  ts/
        🗂  docker/
          📄  Dockerfile  ( EXPOSE 9443 )
        🗂  logs/
        🗂  tarballs/
📐  32 MB  📄  node-v22.22.3-linux-x64-musl.tar.xz
    🗂  workspace/
      🗂  cdn_sites/
      ...
      ...
      🗂  env_dc_dinamique/
        📄  .env_ts  ( start_express_secure=true )
      ...
      🗂  ts/
        🗂  express/
          📄  .env.allow-origin  ( ^https:\/\/([a-z0-9]+\.)*basetasks\.site(:[0-9]{2,5})*$ )
      ...
      ...
    📄  .env  ( WORKSPACE_NAME="a4dc_h523" ) 
    📄  .env_beyond_yml  ( NODE_MODULES_FORCE_REINSTALL=false )

```





###  A. Hardware. env settings group


**.env_beyond_yml**

```env

# CPU_ARCHITECTURE_NODE="loong64"
CPU_ARCHITECTURE_NODE="x64"
# CPU_ARCHITECTURE_NODE="arm64"

```





###  B. for Offline mode. env settings group, node docker setup

>  💡  Alpine image with installed bibs, `docker image tag ... alpine_sites:3.23.2`,
>        doesn't require inet to install, since the apk libraries are in the image.


####  B.1 Alpine by docker-compose.yml

`docker_compose/Alpine/docker/Dockerfile`


```ls

  📚  Docker for a Site/
    🗂  docker_compose/
      🗂  alpine/
        🗂  docker/
          📄  Dockerfile  ( RUN apk add lib... )
          
    📄  .env  ( WORKSPACE_NAME="a4dc_h523" ) 
    📄  .env_beyond_yml  ( NODE_MODULES_FORCE_REINSTALL=false )
    📄  docker-compose.yml

```



##### B.1 Dockerfile. Installing libraries online, for offline mode later

  >  💡  for the offline mode, later, in other services by this image, the required libraries are installed once.

```Dockerfile
#; Dockerfile: code for the image, 
#;   the OS under Docker ( the technology, similar to Virtual Machine ), 
#;   code, similar to command line shell in terminal, 
#;   for installing OS libraries, OS users, folders, users' privilegs, 3rd parties software.

FROM alpine:3.23

RUN apk add lib...
RUN apk add lib...

```



##### B.1 terminal

  >  💡  building image, renaming the image, e.g. `alpine_sites`


```bash
docker compose build alpine
docker compose create alpine
```



```bash
docker image tag <image name> alpine_sites:3.23.2
```





#### B.2 Alpine saved image. Offline mode. node docker setup

##### B.2 Dockerfile. Offline mode

  >  💡  e.g. alpine_sites:3.23.2 for ts dockerized service



```Dockerfile

FROM alpine_sites:3.23.2
#; apk libraries, like Linux OS libraries, 
#;   for node and typescript are in the image, no inet required.

#; same code for the node dockerized service 
#;   after Dockerfile lines like 
#;     RUN apk add ...
USER   root
ARG A_GROUP_USERS_NAME
...
...

```



##### B.2 env_beyond_yml. Offline mode. env settings group

```env

NODE_INSTALL_TARBALL_RELOAD=false

#; whether to install another suitable npm. requires inet for another npm version than by node setup.
NPM_VER_FORCE_INSTALL=false

#; whether to clear node_modules and to reinstall freshly from inet, 
#;   due to node and npm or yarn or pnpm version, 
#;   every package version in package.json,
#;   cleaver checking by npm, yarn or pnpm engines, the node engine and js packages.
NODE_MODULES_FORCE_REINSTALL=false

YARN_INSTALL=false

#; just npm for now, other software wasn't tested in this setup. 
#;   spent lot of time for reading of npm cli docs n learning by doing,
#;   for node_modules structure, 
#;   package-lock.json health,
#;   .ignoring experience QA for easier work after git clone || pull,
#;   the architecture of the setup for 
#;   Linux users and groups for node, npm, server side sites engines,
#;   privilegs on filesystem resources and proccesses owing users.
#; however, still, the task wasn't tested, 
#;   npm link didn't do, then the fine-grained privilegs I've had to drop for now,
#;   planning the later review by finer QA for sure.
#; the liked newer yarn or pnpm, still,
#;   require one next install than just the node, the one install, including npm.
#;   I'd imagine the yarn n pnpm install n relay, however,
#;     I'd postpone since already the entry level would tell the clone no sence))
#;       docker engine install, compose plugin, cpu architecture checks for env(s),
#;       bash variables for .env(s), compose.yml, Dockerfile and entrypoint, 
#;       ip and ports confs, node, ts, php,
#;     required providing the reduced simpler setup 
#;       than 3 package managers on demand, 
#;       docs by experience and fine tests coverage 
#;       for combinations of any of 3 ways of install to node_modules in a workspace))
#;     for the usability in theory.
PROJECT_NODE_PACKAGE_MANAGER=npm

```





##### B.2 tarball. Offline mode.

**tarball**: `docker_compose/ts/tarballs/node-v22.22.3-linux-x64-musl.tar.xz`

```ls

  📚  Docker for a Site/
    🗂  docker_compose/
      🗂  ts/
        🗂  docker/
        🗂  logs/
        🗂  tarballs/
📐  32 MB  📄  node-v22.22.3-linux-x64-musl.tar.xz
    🗂  workspace/
      ...
      ...
```





### C. dinamique .env for node_https. env settings group

  >  💡  take effect on (re)start


  **path**: `workspace/env_dc_dinamique/.env_ts`

  **.env_ts**

```bash

NODE_INSTALL_TARBALL_RELOAD=false


node_https_publish_port=8445
node_https_sites_tools_publish_port=8449
express_secure_publish_port=9443

express_publish_port=3000
node_http_flat_publish_port=8085


start_node_https=true
start_node_sites_tools_https=false
start_express_secure=true

start_express_flat=true
start_node_http_flat=true

```





### D. Jaisocx Express CorsPolicy


**.env.allow-origin**

```regexp

^https:\/\/([a-z0-9]+\.)*basetasks\.site(:[0-9]{2,5})*$

```





### E. ports. node-http, express

  >  💡  hardcoded, nevertheless, in nearly every node https servers' start scripts. 
  >        The most of the ports numbers in all .env(s) are just for documentation.


#### E. Dockerfile. ports

  >  💡  hardcoded in Dockerfile, 
  >        due to Jaisocx workaround, 
  >        easiness of `compose.yml` without too many args: 
  > 
  > EXPOSE &lt; port number &gt; 


```Dockerfile

#; Express under https port number
EXPOSE 9443

```



#### E. env. ports

>  💡  hardcoded, nevertheless, in nearly every node https servers' start scripts
>        and in the Dockerfile.
>        The most of the ports numbers in all .env(s) are just for documentation,
>        and for aligning all services' env records for the ports numbers,
>        keeping in one file centrally where expected.


```env

#;   THIS CONF BLOCK WITH HTTP PORTS DOESN'T DO AUTOMATIQUE,
#;     SINCE 1. DOCKERFILE EXPOSE PORT NUMBER IS HARDCODED,
#;           2. AND DOCKER-COMPOSE.YML STANDARD PORTS MAPPINGS HAVE TO BE HARDCODED TO BE ABLE TO SEE
#;           3. AND SEVERAL OTHER TASKS, AND EXPRESS AND NODE_HTTPS START package.json:script EITHER
#;           4. MOREOVER, FOR .env TO TAKE EFFECT WITH PORTS, SINCE IN EXPOSE INSTRUCTIONS IN DOCKERFILE, NEW DOCKER BUILD IS REQUIRED, NOT JUST RESTART.

NODE_HTTP_FLAT_PORT=8085
NODE_HTTPS_PORT=8445

#;   EXPRESS_PORT is in js hardcoded
EXPRESS_SECURE_PORT=9443
EXPRESS_PORT=3000

NODE_DEBUG_PORT=9229

```



#### E. dinamique .env node. ports

>  💡  dinamique env settings take effect on (re)start, in theory,
>        however most of ports numbers aren't read from `.env(s)` 
>        in node https servers' start scripts in `package.json`


**path**: `workspace/env_dc_dinamique/.env_ts`

**.env_ts**

```bash

node_https_publish_port=8445
node_https_sites_tools_publish_port=8449
express_secure_publish_port=9443

express_publish_port=3000
node_http_flat_publish_port=8085

```





### F. versions. node


**.env_beyond_yml**

```env

NODE_VERSION="26.5.0"
NPM_VERSION="11.18.0"
YARN_VERSION="4.12.0-dev"

```




## env

  **.env**

```env

#!/bin/bash

WORKSPACE_NAME="a4dc_h523"

SOFTWARE_NAMESPACE="jaisocx"
SOFTWARE_NAME="sites_docker_environment"
SOFTWARE_VERSION="1_2_0"
#;  /opt/jaisocx/sites_docker_environment/v1_2_0/node_v26.4.0/

WHETHER_DEV_MODE="true"



# -- PORTS --
JAISOCX_HTTP_FLAT_PORT=2297
JAISOCX_HTTPS_PORT=8447

PHP_FPM_FLAT_PORT=9020
PHP_FPM_STATUS_PORT=9022
PHP_XDEBUG_FLAT_PORT=9050

#;   THIS CONF BLOCK WITH HTTP PORTS DOESN'T DO AUTOMATIQUE,
#;     SINCE 1. DOCKERFILE EXPOSE PORT NUMBER IS HARDCODED,
#;           2. AND DOCKER-COMPOSE.YML STANDARD PORTS MAPPINGS HAVE TO BE HARDCODED TO BE ABLE TO SEE
#;           3. AND SEVERAL OTHER TASKS, AND EXPRESS AND NODE_HTTPS START package.json:script EITHER
#;           4. MOREOVER, FOR .env TO TAKE EFFECT WITH PORTS, SINCE IN EXPOSE INSTRUCTIONS IN DOCKERFILE, NEW DOCKER BUILD IS REQUIRED, NOT JUST RESTART.
#;   Sets here slowly NODE HTTP SERVICES PORTS thinking on ports opened and their amount.
# NODE_HTTP_FLAT_PORT=80
# NODE_HTTPS_PORT=443

NODE_HTTP_FLAT_PORT=8085
NODE_HTTPS_PORT=8445

#;   EXPRESS_PORT is in js hardcoded
EXPRESS_SECURE_PORT=9443
EXPRESS_PORT=3000
NODE_DEBUG_PORT=9229



# -- HOME --
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



# -- VOLUMES --
WORKSPACE_VOLUME="./workspace"
IN_DOCKER_WORKSPACE_VOLUME="/opt/jaisocx/sites_docker_environment/workspace"
TYPESCRIPT_PACKAGES="ts/cloned_repos/jaisocx_sitestools"



# -- tarballs volumes --
A4DC_INSTALL_TARBALLS_VOLUME="./docker_compose/Prince/tarballs"
A4DC_INSTALL_IN_DOCKER_TARBALLS_VOLUME="/tarballs"

PHP_TARBALLS_VOLUME="./docker_compose/PHP/tarballs"
PHP_TARBALLS_IN_DOCKER_VOLUME="/tarballs"

NODE_TARBALLS_VOLUME="./docker_compose/ts/tarballs"
NODE_TARBALLS_IN_DOCKER_VOLUME="/tarballs"



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
OPENED_SUBNET_IPv4="172.21.252.0/24"
OPENED_IP_RANGE_IPv4="172.21.252.244/30"

OPENED_SUBNET_IPv6="fdae:f122:9dea:a::/64"
OPENED_IP_RANGE_IPv6="fdae:f122:9dea:a::/64"

SUBNET_IPv4="172.20.253.0/24"
IP_RANGE_IPv4="172.20.253.224/27"

SUBNET_IPv6="fdae:f122:9dea:9::/64"
IP_RANGE_IPv6="fdae:f122:9dea:9::/64"



# -- ip addresses --
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

```


---





Have a nice day,

Jaisocx Inc. Software Architect I.P.





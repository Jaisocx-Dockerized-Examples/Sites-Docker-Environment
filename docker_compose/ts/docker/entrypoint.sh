#!/bin/bash

### tried both /bin/bash and /usr/bin/env bash,
### and with this way of the adding users and user groups and Linux libraries install
### easier for now just /bin/bash
### and maybe I shall modify the Dockerfile in order to set
### the best way to note the shell with /usr/bin/env bash later.

# USER_HOME="/home/${USER_NAME}"
# NODEJS_HOME="${TSVM_JSC_HOME}/node_v${NODE_VERSION}"
templates="/templates"


whoami
ls -lahrtsi "${IN_DOCKER_PROJECT_VOLUME}"

# chown -R -hn "${USER_ID}:${GROUP_USERS_ID}" "${IN_DOCKER_PROJECT_VOLUME}"
# chmod -R a+rwx "${IN_DOCKER_PROJECT_VOLUME}"
# chmod -R o-rwx  "${IN_DOCKER_PROJECT_VOLUME}"

if [[ ! -e "${tarballs_folder}" ]]; then
  mkdir -p "${tarballs_folder}";
  ### for tarball store folder set fs privilegs
  ###;;; chown -R "${USER_NAME}:${GROUP_USERS_NAME}" "${tarballs_folder}"
  chmod -R ug+rwx "${tarballs_folder}"
  ### chmod -R o-rwx  "${tarballs_folder}"
fi



### set -a to load .env.tmp
set -a

### You may load a node installation tarball to cache it for later.
### The script with urls of tarballs resides in docker service context:
### docker/ts/tarball/load_tarball.sh
### You can load the tarball and save the hardcopy in build_tools:


### the .env variable tells whether to reload the tarball from Inet,
### and when .env var set true,
### the tarball_load var remains "true" inspite whether a cached tarball exists in the folder.
### if .env NODE_INSTALL_TARBALL_RELOAD was set "false",
### the tarball_load will be overridden if the tarball doesn't exist in the folder for cached tarballs.
tarball_load="${NODE_INSTALL_TARBALL_RELOAD}"

### if the tarball doesn't reside yet in the folder for cached tarballs,
### obviously, the tarball has to be loaded first,
### the var tarball_load set "true"
if [[ ! -e "${node_tarball_cached_path}" ]]; then
    tarball_load="true"
fi


### if the tarball_load variable set "true",
### the tarball loads from Inet with CURL command line tool,
### otherwise the cached tarball is copied to the folder for software installations in this Alpine docker service.
if [[ "${tarball_load}" == "true" ]]; then
    ### the tarball was not found in the folder for caches.
    ### loading from internet with CURL command line tool, and saving 2nd copy to caches folder.
    ### the install will be performed on the tarball 1st copy.
    curl --output-dir "${TSVM_JSC_TMP}"   -o "${node_tarball_name}.tar.xz"   "${node_tarball_link}"

    ### to keep both copies
    cp "${node_tarball_loaded_path}" "${node_tarball_cached_path}"

  else
    ### cached tarball was in "workspace/ts/build_tools/command/tsvm/tarballs"
    ### copying to the path, where will be decompressed and installed
    cp "${node_tarball_cached_path}" "${node_tarball_loaded_path}"
fi



### extracts installation pack from the tarball of node installation.
# chown "${USER_NAME}:${GROUP_USERS_NAME}"   "${node_tarball_loaded_path}"
ls -lahrts "${node_tarball_loaded_path}"
tar -xJf "${node_tarball_loaded_path}" -C "${TSVM_JSC_TMP}"

ls -lahrts "${TSVM_JSC_TMP}/${node_tarball_name}"

if [[ -e "${TSVM_JSC_HOME}/node_v${NODE_VERSION}" ]]; then
  rm -rf "${TSVM_JSC_HOME}/node_v${NODE_VERSION}"
fi

mv "${TSVM_JSC_TMP}/${node_tarball_name}"   "${TSVM_JSC_HOME}/node_v${NODE_VERSION}"
rm "${node_tarball_loaded_path}"
ls -lahrtsi "${TSVM_JSC_HOME}/node_v${NODE_VERSION}/"



### creates symlinks to node command line tools in the folder TSVM_JSC_SYMLINKS.
### "/opt/jaisocx/tsvm_jsc/V1.0.1/links"

#chmod ug+rx   "${TSVM_JSC_HOME}/node_v${NODE_VERSION}/lib/node_modules/npm/bin/npx-cli.js"
#chmod ug+rx   "${TSVM_JSC_HOME}/node_v${NODE_VERSION}/lib/node_modules/npm/bin/npm-cli.js"
#chmod ug+rx   "${TSVM_JSC_HOME}/node_v${NODE_VERSION}/lib/node_modules/corepack/dist/corepack.js"
#chmod ug+rx   "${TSVM_JSC_HOME}/node_v${NODE_VERSION}/bin/node"

#chown "${USER_NPX_NAME}:${GROUP_NODE_SOFTWARE_NAME}"   "${TSVM_JSC_HOME}/node_v${NODE_VERSION}/lib/node_modules/npm/bin/npx-cli.js"
#chown "${USER_NPM_NAME}:${GROUP_NODE_SOFTWARE_NAME}"   "${TSVM_JSC_HOME}/node_v${NODE_VERSION}/lib/node_modules/npm/bin/npm-cli.js"
#chown "${USER_NODE_NAME}:${GROUP_NODE_SOFTWARE_NAME}"   "${TSVM_JSC_HOME}/node_v${NODE_VERSION}/lib/node_modules/corepack/dist/corepack.js"
#chown "${USER_NODE_NAME}:${GROUP_NODE_SOFTWARE_NAME}"   "${TSVM_JSC_HOME}/node_v${NODE_VERSION}/bin/node"





### SYMLINKS TO THE INSTALLED NODEJS COMMANDS: node, corepack, npx, npm
chmod -R ug+rwx "${TSVM_JSC_SYMLINKS}"

ln -sf "${TSVM_JSC_HOME}/node_v${NODE_VERSION}/lib/node_modules/npm/bin/npx-cli.js" "${TSVM_JSC_SYMLINKS}/npx"
ln -sf "${TSVM_JSC_HOME}/node_v${NODE_VERSION}/lib/node_modules/npm/bin/npm-cli.js" "${TSVM_JSC_SYMLINKS}/npm"
ln -sf "${TSVM_JSC_HOME}/node_v${NODE_VERSION}/lib/node_modules/corepack/dist/corepack.js" "${TSVM_JSC_SYMLINKS}/corepack"
ln -sf "${TSVM_JSC_HOME}/node_v${NODE_VERSION}/bin/node" "${TSVM_JSC_SYMLINKS}/node"

ls -lahrts "${TSVM_JSC_SYMLINKS}"



### chowns DIDN'T WORK, SINCE HERE AS NO SUDIER USER IN THE ENTRYPOINT
###  I SHALL THINK LATER SOME DAY
###     1. FOR WHAT SUDIER INSTALL
###     2. WHETHER ALL PACKS INSTALL AS ROOT IN DOCKERFILE
###            ( SINCE NO CONDITIONS IN DOCKERFILE ALLOWED ),
###            THIS WILL BE 5 minutes LONGER TIME OF DOCKERIZED TS SERVICE BUILD AND START
#chown "${USER_NODE_NAME}:${GROUP_NODE_SOFTWARE_NAME}" "${TSVM_JSC_SYMLINKS}/node"
#chown "${USER_NODE_NAME}:${GROUP_NODE_SOFTWARE_NAME}" "${TSVM_JSC_SYMLINKS}/corepack"
#chown "${USER_NPX_NAME}:${GROUP_NODE_SOFTWARE_NAME}" "${TSVM_JSC_SYMLINKS}/npx"
#chown "${USER_NPM_NAME}:${GROUP_NODE_SOFTWARE_NAME}" "${TSVM_JSC_SYMLINKS}/npm"

#chmod -R ug+rx "${TSVM_JSC_SYMLINKS}"
#chmod -R o-rwx "${TSVM_JSC_SYMLINKS}"
#chmod -R ug-w  "${TSVM_JSC_SYMLINKS}"
#chmod ug+w     "${TSVM_JSC_SYMLINKS}"



# chmod -R o-rwx "${NODEJS_HOME}"

### preview of installed node
loc_folder="${NODEJS_HOME}"
echo "ls ${loc_folder}"
ls -lahrtsi "${loc_folder}"

loc_folder="${NODEJS_HOME}/bin"
echo "ls ${loc_folder}"
ls -lahrtsi "${loc_folder}"

loc_folder="${TSVM_JSC_SYMLINKS}"
echo "ls ${loc_folder}"
ls -lahrtsi "${loc_folder}"



### Preview CPU Architecture Alpine Docker Service built with
echo "uname -m"
uname -m

### Preview CPU Architecture node built with
echo "ldd"
ldd "${TSVM_JSC_SYMLINKS}/node"

echo "ls -l"
ls -l "${TSVM_JSC_SYMLINKS}/node"



### BASH PROFILE FOR USER
#### the first line to the text variable with bash profile

shell_declaration_line="#!/bin/bash"
bash_login_content="${shell_declaration_line}\n\n"

USER_HOME="/home/${USER_NAME}"
NODEJS_HOME="${TSVM_JSC_HOME}/node_v${NODE_VERSION}"
PROFILE="${USER_HOME}/.bashrc"
PATH="${TSVM_JSC_SYMLINKS}:${PATH}"



### env bash variables being later declared in bash profile
vars_of_profile=(
  "USER_HOME"
  "TSVM_JSC_HOME"
  "TSVM_JSC_SYMLINKS"
  "NODEJS_HOME"
  "PROFILE"
  "PATH"
)



variables_lines_content=""
variables_lines_exports=""

### generates bash profile's content of env variables
for variable_name in "${vars_of_profile[@]}"; do

  eval "variable_value=\"\${${variable_name}}\""
  line="${variable_name}=\"${variable_value}\""

  variables_lines_content="${variables_lines_content}\n${line}"

done;



### generates bash profile's content of exports of env variables
for variable_name in "${vars_of_profile[@]}"; do

  eval "variable_value=\"\${${variable_name}}\""
  line="export ${variable_name}"

  variables_lines_exports="${variables_lines_exports}\n${line}"

done;



### concats bash profile's bash blocks together before have saved to hard drive
bash_login_content="${bash_login_content}\n\n${variables_lines_content}\n\n\n${variables_lines_exports}\n\n\n"



### cat "${templates}/example.template"                 >> "${USER_HOME}/.bash_login"
#### reads a template for bash profile, and adds to the text variable with bash profile
#; start_comment_line_example_template_profile="### example.template"
#; example_template_profile="$(cat "${templates}/example.template")"
#; bash_login_content="${bash_login_content}\n\n\n${start_comment_line_example_template_profile}\n${example_template_profile}\n\n"

#### writes bash profile to the user's home dir
#### PROFILE="${USER_HOME}/.bashrc"
echo    -e "${bash_login_content}" > "${PROFILE}"

### shows bash profile's text
cat     "${PROFILE}"

### loads dynamic env variables
. "${IN_DOCKER_PROJECT_VOLUME}/.env.dynamic"

### loads bash profile with environment variables
. "${PROFILE}"







### SHOW INSTALLED PACKS VERSIONS

cd "${IN_DOCKER_PROJECT_VOLUME}"

### THE FIRST VERSIONS INSTALLED WITH THIS NODEJS PACK
echo -e "\n node --version "
node --version

echo -e "\n corepack --version "
corepack --version

echo -e "\n npx --version "
npx --version

echo -e "\n npm --version "
npm --version



### YARN AND PNPM INSTALL,
###    both not working,
###    yarn: installed well,
###    pnpm: NOPE, I haven't started to work on pnpm install.

export yarn_conf_home="${USER_HOME}/.yarn"
export yarn_install_home="${YARN_HOME}/${YARN_VERSION}"

### @install npm
if [ ! -e "${node_modules_installed_marker_path}" ]; then

    ### The custom compatible NPM ver. is being installed
    ### when in .env NPM_VER_FORCE_INSTALL=true
    ### if in .env NPM_VER_FORCE_INSTALL=false, the NPM was installed nevertheless before with NODE install
    if [[ "${NPM_VER_FORCE_INSTALL}" == "true" ]]; then
        npm install -g "npm@${NPM_VERSION}"
    fi


    ### YARN INSTALL WORKS SINCE 22. DEC 2025,
    ### HOWEVER
    ###    COULD NOT USE YARN, DUE TO LACK OF KNOWLEDGE,
    ###    DID NOT OPTIMIZE WITH TARBALL CACHE,
    ###    DIDN'T INSTALL node_modules WITH YARN
    if [[ "${YARN_INSTALL}" == "true" ]]; then

        echo "Yarn installation starts ..."

        echo "TO SAVE TARBALL FOR YARN, DIDN'T TEST NEITHER REUSED THE TARBALL, corepack pack "yarn@v${YARN_VERSION}" ..."
        ### NOT DONE FEATURE TO SAVE TARBALL FOR YARN,
        ### DIDN'T TEST NEITHER REUSED THE TARBALL
        corepack pack "yarn@v${YARN_VERSION}" -o "${yarn_install_home}/yarn.js"
        # corepack pack "yarn@v${YARN_VERSION}"

        echo "corepack install --global "yarn@v${YARN_VERSION}" ..."
        corepack install --global "yarn@v${YARN_VERSION}"

        echo "corepack enable yarn"
        corepack enable yarn

    fi

fi



### MAY NOT CD IN IF CASE IN BASH PROGRAMMING,
### THAT IS WHY HERE SEVERAL SAME IF CASES
### WE NEED INVOKE NORMAL CD TO RUN INSTALL GOOD WAY

### @install express
echo "cd "${IN_DOCKER_PROJECT_VOLUME}/express""
cd "${IN_DOCKER_PROJECT_VOLUME}/express"
pwd
if [ ! -e "${node_modules_installed_marker_path}" ]; then

    if [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "yarn" ]]; then
        echo "NOT WORKING: yarn install"
        ### NOT WORKING
        yarn install

      elif [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "pnpm" ]]; then
        exit 5

      else
        echo "npm install"
        npm install
    fi

fi



### @install typescript and other
# sudo -u ${USER_NAME}   npm install
echo "cd "${IN_DOCKER_PROJECT_VOLUME}""
cd "${IN_DOCKER_PROJECT_VOLUME}"
pwd
if [ ! -e "${node_modules_installed_marker_path}" ]; then

    if [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "yarn" ]]; then
        echo "NOT WORKING: yarn install"
        ### NOT WORKING
        yarn install

      elif [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "pnpm" ]]; then
        exit 5

      else
        echo "npm install"
        npm install
    fi

fi



### saves marker to know the node_modukes were installed
cd "${IN_DOCKER_PROJECT_VOLUME}"
pwd
if [ ! -e "${node_modules_installed_marker_path}" ]; then
    touch "${node_modules_installed_marker_path}"
fi






### SHOW INSTALLED PACKS VERSIONS
echo -e "\n node --version "
node --version

echo -e "\n corepack --version "
corepack --version

echo -e "\n\n === NPM_VER_FORCE_INSTALL=${NPM_VER_FORCE_INSTALL}"
echo -e "\n npx --version "
npx --version

echo -e "\n npm --version "
npm --version

if [[ "${YARN_INSTALL}" == "true" ]]; then
        echo -e "\n INSTALLED FINE, DIDN'T TEST NOR USE \n      ( I appolologize due to lack of experience ) \n yarn --version "
        yarn --version
fi

if [[ "${PNPM_INSTALL}" == "true" ]]; then
        echo -e "\n pnpm --version "
        pnpm --version
fi






### STARTS HTTP ENDPOINTS
### @start_services
export NODE_HTTP_FLAT_PORT
export NODE_HTTPS_PORT

if [[ "${start_node_https}" == "true" ]]; then

  echo -e "\n Node Secure Server starts ... "
  if [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "yarn" ]]; then
          echo -e "\n yarn https & "
          yarn https &

        elif [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "pnpm" ]]; then
          echo -e "\n pnpm --version "
          pnpm --version

        else
          echo -e "\n npm --prefix \"${IN_DOCKER_PROJECT_VOLUME}\" run https & "
          npm --prefix "${IN_DOCKER_PROJECT_VOLUME}" run https &
  fi

  # npm --prefix "${IN_DOCKER_PROJECT_VOLUME}" run https &      # @explained &: Start in background every process to be able to start also other processes, every with the ampersand sing
fi



if [[ "${start_node_http_flat}" == "true" ]]; then

  echo -e "\n Node http starts ... "
  if [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "yarn" ]]; then
          echo -e "\n yarn http_flat & "
          yarn http_flat &

        elif [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "pnpm" ]]; then
          echo -e "\n pnpm --version "
          pnpm --version

        else
          echo -e "\n npm --prefix \"${IN_DOCKER_PROJECT_VOLUME}\" run http_flat & "
          npm --prefix "${IN_DOCKER_PROJECT_VOLUME}" run http_flat &

  fi

  # npm --prefix "${IN_DOCKER_PROJECT_VOLUME}" run http_flat &  # @explained without &: Starts and holds dockerized service working
fi



cd "${IN_DOCKER_PROJECT_VOLUME}/express"

if [[ "${start_express_secure}" == "true" ]]; then

  echo -e "\n Express Framework Secure starts ... "
  if [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "yarn" ]]; then
          echo -e "\n yarn secure_start & "
          yarn secure_start &

        elif [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "pnpm" ]]; then
          echo -e "\n pnpm --version "
          pnpm --version

        else
          echo -e "\n npm --prefix \"${IN_DOCKER_PROJECT_VOLUME}/express\" run secure_start & "
          npm --prefix "${IN_DOCKER_PROJECT_VOLUME}/express" run secure_start &

  fi

  # npm --prefix "${IN_DOCKER_PROJECT_VOLUME}/express" run secure_start  # @explained &: Start in background every process to be able to start also other processes, every with the ampersand sing
fi



echo -e "\n Express Framework starts ... "
if [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "yarn" ]]; then
        echo -e "\n yarn start "
        yarn run start

      elif [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "pnpm" ]]; then
          echo -e "\n pnpm --version "
          pnpm --version

      else
        echo -e "\n npm --prefix \"${IN_DOCKER_PROJECT_VOLUME}/express\" run start "
        npm --prefix "${IN_DOCKER_PROJECT_VOLUME}/express" run start
fi



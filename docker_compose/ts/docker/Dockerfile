### docker/ts/tarball/load_tarball.sh
### workspace/ts/build_tools/command/tsvm/tarballs
FROM alpine:3.23



USER root

### The hardcoded path
###   of the mounted volume in docker-compose.yml
###   set in .env.example
###   IN_DOCKER_PROJECT_VOLUME



### DECLARATION OF BASH VARIABLES USED IN DOCKERFILE

### @env docker-compose.yml
### Obtain buildtime variables from .env noted in docker-compose.yml

ARG   A_TIME_ZONE
ARG   A_CPU_ARCHITECTURE

ARG   A_SOFTWARE_NAMESPACE
ARG   A_PROGRAM_NAME
ARG   A_PROGRAM_VERSION

ARG   A_NODE_INSTALL_TARBALL_RELOAD

ARG   A_GROUP_USERS_ID
ARG   A_GROUP_USERS_NAME

ARG   A_GROUP_READER_ID
ARG   A_GROUP_READER_NAME

ARG   A_GROUP_NODE_SOFTWARE_ID
ARG   A_GROUP_NODE_SOFTWARE_NAME



ARG   A_USER_ID
ARG   A_USER_NAME

ARG   A_USER_READER_ID
ARG   A_USER_READER_NAME

ARG   A_USER_NODE_ID
ARG   A_USER_NODE_NAME

ARG   A_USER_NPX_ID
ARG   A_USER_NPX_NAME

ARG   A_USER_NPM_ID
ARG   A_USER_NPM_NAME

ARG   A_USER_PNPM_ID
ARG   A_USER_PNPM_NAME

ARG   A_USER_YARN_ID
ARG   A_USER_YARN_NAME



ARG   A_NODE_LATEST_LTS
ARG   A_NODE_LATEST_RELEASE
ARG   A_NODE_VERSION
ARG   A_PROJECT_NODE_PACKAGE_MANAGER
ARG   A_NPM_VER_FORCE_INSTALL
ARG   A_NPM_VERSION
ARG   A_YARN_INSTALL
ARG   A_YARN_VERSION
ARG   A_YARN_HOME

ARG   A_PROJECT_VOLUME
ARG   A_IN_DOCKER_PROJECT_VOLUME

ARG   A_EXPRESS_PORT
ARG   A_NODE_HTTP_FLAT_PORT
ARG   A_NODE_HTTPS_PORT
ARG   A_NODE_DEBUG_PORT





### DECLARATION OF BASH VARIABLES FOR DOCKER ENTRYPOINT AND DOCKER RUNTIME

### @exports
### Set runtime variables from .env noted in docker-compose.yml
### on demand decomment, then these variables are exported like after bash instruction: export variable_name

ENV TIME_ZONE="${A_TIME_ZONE}"
ENV CPU_ARCHITECTURE="${A_CPU_ARCHITECTURE}"

ENV SOFTWARE_NAMESPACE="${A_SOFTWARE_NAMESPACE}"
ENV PROGRAM_NAME="${A_PROGRAM_NAME}"
ENV PROGRAM_VERSION="${A_PROGRAM_VERSION}"

ENV NODE_INSTALL_TARBALL_RELOAD="${A_NODE_INSTALL_TARBALL_RELOAD}"



### STARTED NEW FEATURE FOR THE FINE GRAINED CONTROL ON USERS AND SERVICES PRIVILEGS ON FILESYSTEM.
### I planned to try to set own User and Group for every Node program: node, npm, npx, yarn, express backend, node https service and other.
###     For now was not solved.
### VERY MANY USERS AND GROUPS FOR MY
###   ENGINIERING RESEARCH ON
###      DOCKERFILES,
###      ALPINE DOCKER IMAGE,
###      RUNTIME USER CONTEXT OF SERVICES
# ENV GROUP_USERS_ID="${A_GROUP_USERS_ID}"
ENV GROUP_USERS_NAME="${A_GROUP_USERS_NAME}"
ENV GROUP_READER_NAME="${A_GROUP_READER_NAME}"

ENV GROUP_NODE_SOFTWARE_ID="${A_GROUP_NODE_SOFTWARE_ID}"
ENV GROUP_NODE_SOFTWARE_NAME="${A_GROUP_NODE_SOFTWARE_NAME}"



ENV USER_ID="${A_USER_ID}"
ENV USER_NAME="${A_USER_NAME}"

ENV USER_READER_ID="${A_USER_READER_ID}"
ENV USER_READER_NAME="${A_USER_READER_NAME}"

ENV USER_NODE_ID="${A_USER_NODE_ID}"
ENV USER_NODE_NAME="${A_USER_NODE_NAME}"

ENV USER_NPX_ID="${A_USER_NPX_ID}"
ENV USER_NPX_NAME="${A_USER_NPX_NAME}"

ENV USER_NPM_ID="${A_USER_NPM_ID}"
ENV USER_NPM_NAME="${A_USER_NPM_NAME}"

ENV USER_PNPM_ID="${A_USER_PNPM_ID}"
ENV USER_PNPM_NAME="${A_USER_PNPM_NAME}"

ENV USER_YARN_ID="${A_USER_YARN_ID}"
ENV USER_YARN_NAME="${A_USER_YARN_NAME}"



### Just to know NodeJs versions when looking around for variables in the dockerized service in command line shell
ENV NODE_LATEST_LTS="${A_NODE_LATEST_LTS}"
ENV NODE_LATEST_RELEASE="${A_NODE_LATEST_RELEASE}"

### The ver. being installed
ENV NODE_VERSION="${A_NODE_VERSION}"

### npm, pnpm or yarn
ENV PROJECT_NODE_PACKAGE_MANAGER="${A_PROJECT_NODE_PACKAGE_MANAGER}"

ENV NPM_VER_FORCE_INSTALL="${A_NPM_VER_FORCE_INSTALL}"
ENV NPM_VERSION="${A_NPM_VERSION}"

ENV YARN_INSTALL="${A_YARN_INSTALL}"
ENV YARN_VERSION="${A_YARN_VERSION}"
ENV YARN_HOME="${A_YARN_HOME}"


ENV PROJECT_VOLUME="${A_PROJECT_VOLUME}"
ENV IN_DOCKER_PROJECT_VOLUME="${A_IN_DOCKER_PROJECT_VOLUME}"


### PORTS OF NODEJS HTTP ENDPOINTS
ENV EXPRESS_PORT="${A_EXPRESS_PORT}"
ENV NODE_HTTP_FLAT_PORT="${A_NODE_HTTP_FLAT_PORT}"
ENV NODE_HTTPS_PORT="${A_NODE_HTTPS_PORT}"
ENV NODE_DEBUG_PORT="${A_NODE_DEBUG_PORT}"



WORKDIR "${A_IN_DOCKER_PROJECT_VOLUME}"



### @install @libraries_core
# RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.23/main" >> /etc/apk/repositories
RUN apk update
### No apk upgrade here since we relay here in dockerized service on versions number values,
### that was the sence of this Dockerized setup.

RUN apk add ca-certificates
RUN apk add curl
RUN apk add openssl
RUN apk add libgcc
RUN apk add libstdc++
## RUN apk add git
RUN apk add bash
# RUN apk add sudo

### I don't know whether has worked and whether have tested NodeJS install with apk.
### I tried to install in other code blocks here with curl load to reuse cached installation tarballs once loaded.
### RUN apk add nodejs=22.16.0-r2 npm=11.3.0-r2 pnpm=10.9.0-r2 yarn=1.22.22-r1







### @user @group
### @group
RUN addgroup -g "${A_GROUP_USERS_ID}" "${A_GROUP_USERS_NAME}"

### group to set chown on a folder with reader privilegues on that folder like g+r g-wx
RUN addgroup -g "${A_GROUP_READER_ID}" "${A_GROUP_READER_NAME}"

### group for Node programs like node, corepack, npx, npm, pnpm, yarn
RUN addgroup -g "${A_GROUP_NODE_SOFTWARE_ID}" "${A_GROUP_NODE_SOFTWARE_NAME}"

RUN addgroup "root" "${A_GROUP_USERS_NAME}"
RUN addgroup "root" "${A_GROUP_READER_NAME}"
RUN addgroup "root" "${A_GROUP_NODE_SOFTWARE_NAME}"



### @user
RUN adduser  -u "${A_USER_ID}" -G "${A_GROUP_USERS_NAME}" -D "${A_USER_NAME}"
RUN addgroup "${A_USER_NAME}" "${A_GROUP_READER_NAME}"
RUN addgroup "${A_USER_NAME}" "${A_GROUP_NODE_SOFTWARE_NAME}"

### reader user to set later chown on a folder u+r u-wx
RUN adduser  -u "${A_USER_READER_ID}"  -G "${A_GROUP_READER_NAME}" -HD "${A_USER_READER_NAME}"

RUN adduser  -u "${A_USER_NODE_ID}"  -G "${A_GROUP_NODE_SOFTWARE_NAME}" -HD "${A_USER_NODE_NAME}"
RUN adduser  -u "${A_USER_NPX_ID}"   -G "${A_GROUP_NODE_SOFTWARE_NAME}" -HD "${A_USER_NPX_NAME}"
RUN adduser  -u "${A_USER_NPM_ID}"   -G "${A_GROUP_NODE_SOFTWARE_NAME}" -HD "${A_USER_NPM_NAME}"
RUN adduser  -u "${A_USER_PNPM_ID}"  -G "${A_GROUP_NODE_SOFTWARE_NAME}" -HD "${A_USER_PNPM_NAME}"
RUN adduser  -u "${A_USER_YARN_ID}"  -G "${A_GROUP_NODE_SOFTWARE_NAME}" -HD "${A_USER_YARN_NAME}"

RUN addgroup "${A_USER_NODE_NAME}" "${A_GROUP_READER_NAME}"
RUN addgroup "${A_USER_NPX_NAME}"  "${A_GROUP_READER_NAME}"
RUN addgroup "${A_USER_NPM_NAME}"  "${A_GROUP_READER_NAME}"
RUN addgroup "${A_USER_PNPM_NAME}" "${A_GROUP_READER_NAME}"
RUN addgroup "${A_USER_YARN_NAME}" "${A_GROUP_READER_NAME}"







### DECLARATION OF BASH VARIABLES FOR DOCKER ENTRYPOINT AND DOCKER RUNTIME
### FILESYSTEM PATHS

ENV USER_HOME="/home/${A_USER_NAME}"
ENV PROFILE="${USER_HOME}/.bashrc"

ENV COMPANY_SOFTWARE_DIR="/opt/${SOFTWARE_NAMESPACE}"
ENV COMPANY_SOFTWARE_CONF_PATH="/etc/${SOFTWARE_NAMESPACE}"
ENV COMPANY_SOFTWARE_CACHE_PATH="/etc/cache/${SOFTWARE_NAMESPACE}"

ENV fs_installed_software_path="${COMPANY_SOFTWARE_DIR}/${PROGRAM_NAME}/V${PROGRAM_VERSION}"
ENV fs_conf_of_software_path="${COMPANY_SOFTWARE_CONF_PATH}/${PROGRAM_NAME}/V${PROGRAM_VERSION}"
ENV fs_loaded_cache_path="${COMPANY_SOFTWARE_CACHE_PATH}/${PROGRAM_NAME}/V${PROGRAM_VERSION}"

ENV TSVM_JSC_HOME="${fs_installed_software_path}"
ENV TSVM_JSC_TMP="${fs_installed_software_path}/tmp"
ENV TSVM_JSC_SYMLINKS="${fs_installed_software_path}/links"
ENV TSVM_JSC_COMMANDS="${TSVM_JSC_HOME}/commands"
ENV TSVM_JSC_INSTALLATION_SH="${TSVM_JSC_COMMANDS}/install_${PROGRAM_NAME}.sh"
ENV TSVM_JSC_RUN_SH="${TSVM_JSC_COMMANDS}/run_${PROGRAM_NAME}.sh"

ENV node_modules_installed_marker_path="/entrypoint/npm-installed.mark"

ENV NODEJS_HOME="${TSVM_JSC_HOME}/node_v${NODE_VERSION}"
ENV yarn_conf_home="${USER_HOME}/.yarn"
ENV yarn_install_home="${YARN_HOME}/${YARN_VERSION}"





### ALWAYS LINUX, SINCE ALPINE IMAGE
# ARG os="darwin"
# ARG os="linux"

# ARG cpu_architecture="loong64"
# ARG cpu_architecture="x64"
# ARG cpu_architecture="arm64"
ARG cpu_architecture="${CPU_ARCHITECTURE}"

# ARG node_tarball_link="https://nodejs.org/dist/v25.0.0/node-v25.0.0-darwin-arm64.tar.gz"
# ARG node_tarball_link="https://nodejs.org/dist/v${A_NODE_VERSION}/node-v${A_NODE_VERSION}-linux-arm64.tar.xz"
# ARG node_tarball_link="https://nodejs.org/dist/v${A_NODE_VERSION}/node-v${A_NODE_VERSION}-linux-x64.tar.xz"

### https://unofficial-builds.nodejs.org/download/release/v24.11.0/node-v24.11.0-linux-x64-musl.tar.gz
### ARG node_tarball_link="https://unofficial-builds.nodejs.org/download/release/v${A_NODE_VERSION}/node-v${A_NODE_VERSION}-linux-${cpu_architecture}-musl.tar.gz"

ENV node_tarball_name="node-v${A_NODE_VERSION}-linux-${cpu_architecture}-musl"
ENV node_tarball_link="https://unofficial-builds.nodejs.org/download/release/v${A_NODE_VERSION}/${node_tarball_name}.tar.xz"
ENV node_tarball_loaded_path="${TSVM_JSC_TMP}/${node_tarball_name}.tar.xz"
ENV tarballs_folder="${IN_DOCKER_PROJECT_VOLUME}/build_tools/command/tsvm/tarballs"
### in the tarballs folder, the tarball path is:
ENV node_tarball_cached_path="${tarballs_folder}/${node_tarball_name}.tar.xz"







### CREATES FOLDERS
### @infrastructure @filesystem creates folders
RUN mkdir -p "${COMPANY_SOFTWARE_DIR}"
RUN mkdir -p "${COMPANY_SOFTWARE_CONF_PATH}"
RUN mkdir -p "${COMPANY_SOFTWARE_CACHE_PATH}"

RUN mkdir -p "${TSVM_JSC_HOME}"
RUN mkdir -p "${TSVM_JSC_TMP}"
RUN mkdir -p "${TSVM_JSC_SYMLINKS}"
RUN mkdir -p "${TSVM_JSC_COMMANDS}"

RUN mkdir -p "${NODEJS_HOME}"

RUN mkdir -p "${yarn_conf_home}"
RUN mkdir -p "${yarn_install_home}"

RUN mkdir -p   "/entrypoint"

ENV templates="/templates"
RUN mkdir   "${templates}"



COPY   "./entrypoint.sh"   "/entrypoint/entrypoint.sh"
COPY   "./templates/example.template"       "${templates}/example.template"



### SETS FILESYSTEM PRIVILEGS
### for user home folder set fs privilegs
RUN chown -R "${A_USER_NAME}:${A_GROUP_USERS_NAME}" "${USER_HOME}"
RUN chmod -R u+rwx  "${USER_HOME}"
RUN chmod -R go-rwx "${USER_HOME}"



### bash profile
RUN touch   "${PROFILE}"
RUN chown   "${A_USER_NAME}:${A_GROUP_USERS_NAME}"   "${PROFILE}"
RUN chmod   u+rwx    "${PROFILE}"
RUN chmod   go-rwx   "${PROFILE}"



### for Companie's Software Namespace folder set fs privilegs
RUN chown -R "${A_USER_NODE_NAME}:${A_GROUP_USERS_NAME}" "${COMPANY_SOFTWARE_DIR}"
RUN chown -R "${A_USER_NAME}:${A_GROUP_USERS_NAME}" "${COMPANY_SOFTWARE_CONF_PATH}"
RUN chown -R "${A_USER_NODE_NAME}:${A_GROUP_NODE_SOFTWARE_NAME}" "${COMPANY_SOFTWARE_CACHE_PATH}"

RUN chmod -R ug+rwx "${COMPANY_SOFTWARE_DIR}"
RUN chmod -R o-rwx  "${COMPANY_SOFTWARE_DIR}"

RUN chmod -R ug+rwx "${COMPANY_SOFTWARE_CONF_PATH}"
RUN chmod -R o-rwx  "${COMPANY_SOFTWARE_CONF_PATH}"

RUN chmod -R ug+rwx "${COMPANY_SOFTWARE_CACHE_PATH}"
RUN chmod -R o-rwx  "${COMPANY_SOFTWARE_CACHE_PATH}"



### for yarn folders set fs privilegs
RUN chmod -R ug+rwx "${yarn_conf_home}"
RUN chmod -R ug+rwx "${YARN_HOME}"

RUN chown -R "${A_USER_YARN_NAME}:${A_GROUP_NODE_SOFTWARE_NAME}" "${yarn_conf_home}"
RUN chown -R "${A_USER_YARN_NAME}:${A_GROUP_NODE_SOFTWARE_NAME}" "${YARN_HOME}"


### @entrypoint
RUN chown -R   "${A_USER_NAME}:${A_GROUP_USERS_NAME}"   "/entrypoint"
RUN chmod -R a+rwx   "/entrypoint"

### @templates @fs
RUN chown -R   "${A_USER_NAME}:${A_GROUP_USERS_NAME}"   "${templates}"
RUN chmod -R u+rx    "${templates}"
RUN chmod -R og-wx   "${templates}"

### @privilegs_fs Node install
RUN chown -R   "${A_USER_NAME}:${A_GROUP_USERS_NAME}"   "${TSVM_JSC_HOME}"

### @privilegs_fs Volume
RUN chown -R ${A_USER_NAME}:${A_GROUP_USERS_NAME} "${A_IN_DOCKER_PROJECT_VOLUME}"
RUN chmod -R a+rwx "${A_IN_DOCKER_PROJECT_VOLUME}"



### @mark_npm_i removes mark about npm have been installed.
###           The mark prevents npm install every time on docker restart/start
###           after first time having installed npm deps.
RUN if [ -e "${node_modules_installed_marker_path}" ]; then rm "${node_modules_installed_marker_path}"; fi



ENV USER_NAME="${A_USER_NAME}"

RUN mkdir -p "${A_IN_DOCKER_PROJECT_VOLUME}"
RUN chmod -R ug+rwx "${A_IN_DOCKER_PROJECT_VOLUME}"
RUN chown -Rh "${A_USER_ID}:${A_GROUP_USERS_ID}" "${A_IN_DOCKER_PROJECT_VOLUME}"
VOLUME [ "${A_PROJECT_VOLUME}", "${A_IN_DOCKER_PROJECT_VOLUME}" ]

USER "${A_USER_NAME}"



# Expose the application's port
EXPOSE 3000

# EXPOSE 80
# EXPOSE 443
EXPOSE 8085
EXPOSE 8445
EXPOSE 9229
EXPOSE 9443


# EXPOSE $A_EXPRESS_PORT
# EXPOSE $A_NODE_HTTP_FLAT_PORT
# EXPOSE $A_NODE_HTTPS_PORT

# EXPOSE $NODE_DEBUG_PORT



ENTRYPOINT [ "/entrypoint/entrypoint.sh" ]



#!/bin/bash

in_docker_env_node_install_path="${IN_DOCKER_PROJECT_VOLUME}/.env.node.install"

set -a
source "${in_docker_env_node_install_path}"



GREEN="\033[0;32m"
BOLD="\033[1m"
NC="\033[0m"

echo -e "\n\n$(date): ${BOLD}Installs NodeJS ...${NC}\n"
echo -e "# .env.node.install variables:"
echo -e "${BOLD}cpu_architecture${NC}: ${cpu_architecture}"
echo -e "${BOLD}NODE_VERSION${NC}: ${NODE_VERSION}"
echo -e "\n\n"



### why not at once NODE_VERSION like imported? this bash script is the hardcopy of a Dockerfile script
A_NODE_VERSION="${NODE_VERSION}"

node_tarball_name="node-v${A_NODE_VERSION}-linux-${cpu_architecture}-musl"
node_tarball_link="https://unofficial-builds.nodejs.org/download/release/v${A_NODE_VERSION}/${node_tarball_name}.tar.xz"
node_tarball_loaded_path="${TSVM_JSC_TMP}/${node_tarball_name}.tar.xz"

curl   --output-dir "${TSVM_JSC_TMP}"   -o "${node_tarball_name}.tar.xz"   "${node_tarball_link}"
ls -lahrts "${node_tarball_loaded_path}"
tar -xJf "${node_tarball_loaded_path}" -C "${TSVM_JSC_TMP}"

ls -lahrts "${TSVM_JSC_TMP}/${node_tarball_name}"
mv "${TSVM_JSC_TMP}/${node_tarball_name}"   "${TSVM_JSC_HOME}/node_v${NODE_VERSION}"
rm "${node_tarball_loaded_path}"



echo -e "$(date): ${GREEN}${BOLD}Done${NC} ${GREEN}Install NodeJS ${NODE_VERSION}${NC}, needs activation ...\n"
echo -e "$(date): ${BOLD}Installed NodeJS to${NC}: \"${TSVM_JSC_HOME}/node_v${NODE_VERSION}\"\n"


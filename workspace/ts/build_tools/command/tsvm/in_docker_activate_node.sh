#!/bin/bash

in_docker_env_node_install_path="${IN_DOCKER_PROJECT_VOLUME}/.env.node.install"

set -a
source "${in_docker_env_node_install_path}"



GREEN="\033[0;32m"
BOLD="\033[1m"
NC="\033[0m"

echo -e "\n\n$(date): ${BOLD}Activates NodeJS ...${NC}\n"
echo -e "# .env.node.install variables:"
echo -e "${BOLD}cpu_architecture${NC}: ${cpu_architecture}"
echo -e "${BOLD}NODE_VERSION${NC}: ${NODE_VERSION}"
echo -e "\n\n"



### why not at once NODE_VERSION like imported? this bash script is the hardcopy of a Dockerfile script
A_NODE_VERSION="${NODE_VERSION}"

ln -sf "${TSVM_JSC_HOME}/node_v${NODE_VERSION}/lib/node_modules/npm/bin/npx-cli.js" "${TSVM_JSC_SYMLINKS}/npx"
ln -sf "${TSVM_JSC_HOME}/node_v${NODE_VERSION}/lib/node_modules/npm/bin/npm-cli.js" "${TSVM_JSC_SYMLINKS}/npm"
ln -sf "${TSVM_JSC_HOME}/node_v${NODE_VERSION}/lib/node_modules/corepack/dist/corepack.js" "${TSVM_JSC_SYMLINKS}/corepack"
ln -sf "${TSVM_JSC_HOME}/node_v${NODE_VERSION}/bin/node" "${TSVM_JSC_SYMLINKS}/node"

. "${PROFILE}"

echo -e "$(date): ${GREEN}${BOLD}Done${NC} ${GREEN}Activating NodeJS ${NODE_VERSION} ${NC}\n"

echo -e "${GREEN}\$_ node -v ${NC}"
node -v

echo
echo -e "${GREEN}\$_ npm -v ${NC}"
npm -v
echo -e "${GREEN}_____${NC}\n"



#!/bin/bash

ts_conf_version="ESNext"

if [ "${TS_CONF_VERSION}" != "" ]; then
  ts_conf_version="${TS_CONF_VERSION}"
fi

#; overrides if command line call has the first arg: buildPackages.sh "ESNext"
command_arg="$1"
if [ "${command_arg}" != "" ]; then
  ts_conf_version="${command_arg}"
fi





export NODE_OPTIONS="--no-warnings"
node "${IN_DOCKER_WORKSPACE_VOLUME}/ts/build_tools/ProjectBuilder/transpiled/${ts_conf_version}/cli/run.js"
    --Root="${IN_DOCKER_WORKSPACE_VOLUME}" \
    --packagePath="ts/build_tools/ProjectBuilder" \
    --script="cli/run.js" \
      --ProjectRoot="${IN_DOCKER_WORKSPACE_VOLUME}/ts" \
      --BuildData="${IN_DOCKER_WORKSPACE_VOLUME}/ts/BuildData.json" \
      --PackagesPath="${IN_DOCKER_WORKSPACE_VOLUME}/${TYPESCRIPT_PACKAGES}/"












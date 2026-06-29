#!/usr/bin/env bash

tsconfigVersion="$1"
tsServicePathInDockerVolume="$2"

cd "${tsServicePathInDockerVolume}/build_tools/ProjectBuilder"

export NODE_OPTIONS="--no-warnings"
node --inspect-brk=0.0.0.0:9229 "./transpiled/${tsconfigVersion}/cli/run.js"       --ProjectRoot="${tsServicePathInDockerVolume}"       --BuildData="${tsServicePathInDockerVolume}/BuildData.json"       --PackagesPath="${tsServicePathInDockerVolume}/Jaisocx_SitesTools/"


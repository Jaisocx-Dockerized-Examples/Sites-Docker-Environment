#!/usr/bin/env bash

tsconfigVersion="$1"
tsServicePathInDockerVolume="$2"

cd "${tsServicePathInDockerVolume}/build_tools/ProjectBuilder"

export NODE_OPTIONS="--no-warnings"
node --inspect-brk=0.0.0.0:9229 "./transpiled/${tsconfigVersion}/cli/debug_and_test.js"       --ProjectRoot="${tsServicePathInDockerVolume}"       --BuildData="BuildData.json"       --PackagesPath="Jaisocx_SitesTools"


# to run in the debug terminal
# node "./debug_and_test.js"  --ProjectRoot="/Users/illiapolianskyi/Projects/JAISOCX_SITES_TOOLS/workspace/workspace/ts"  --BuildData="BuildData.json"  --PackagesPath="Jaisocx_SitesTools"
# node "./debug_and_test.js"  --ProjectRoot="/opt/jaisocx/sites_tools/workspace/ts"  --BuildData="BuildData.json"  --PackagesPath="Jaisocx_SitesTools"





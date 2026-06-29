#!/usr/bin/env bash



###------------------------------------------
## start block
## checks and validations

commandLineArgs="$@"

thisPath="$(dirname "$(realpath "$0")")"
fodlerName="$(basename "$thisPath")"

# echo "fodlerName: ${fodlerName}"

projectPath=""

if [[ "${fodlerName}" == "cmd" ]]; then
  projectPath="$(realpath "${thisPath}/..")"
else
  projectPath="$(realpath "${thisPath}")"
fi

# echo "projectPath: ${projectPath}"



jsInvokePath="${projectPath}/cmd/base/js_invoke.sh"

# echo "jsInvokePath: ${jsInvokePath}"

if [[ ! -e "${jsInvokePath}" ]]; then
  echo "Error: call this script in the root of this project or in the folder command."
  exit 2;
fi

## finish block
## checks and validations
###------------------------------------------



"${jsInvokePath}" "${commandLineArgs}" \
  --packagePath="Jaisocx_SitesTools/libraries/base_packs/LinkedResourcesIntegrity" \
  --script="cmd/produceLinkedResourceHash.js" \
      --filePath="/opt/jaisocx/sites_tools/workspace/ts/Jaisocx_SitesTools/libraries/sites_tools/json_styling_tools/Tree/MediaAndStyles/Tree_main_resolved_minimal.css" \
      --algo="sha384"







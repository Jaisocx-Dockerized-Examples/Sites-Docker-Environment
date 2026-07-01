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



if [[ ! -e "${projectPath}/.env" ]]; then
  echo "Error: .env NOT found on path: ${projectPath}/.env"
  exit 2;
fi

set -e
source "${projectPath}/.env"



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
  --Root="${IN_DOCKER_WORKSPACE_VOLUME}" \
  --BuildData="${IN_DOCKER_WORKSPACE_VOLUME}/ts/BuildData.json" \
  --packagePath="Jaisocx_SitesTools/libraries/console/JsInvoke" \
  --script="invokeCssImporter.js" \
      --sitesToolPath="Jaisocx_SitesTools/libraries/sites_tools/css_tools/css_flat/CssTable" \
      --cssFilePath="MediaAndStyles/CssTable_main_Webpack.css" \
      --cssTargetFilePath="MediaAndStyles/CssTable_resolved.css"











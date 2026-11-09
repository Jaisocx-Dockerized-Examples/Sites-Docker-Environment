#!/bin/sh



###------------------------------------------
## start block
## checks and validations

commandLineArgs="$@"

thisPath="$(dirname "$(realpath "$0")")"
fodlerName="$(basename "$thisPath")"

# echo "fodlerName: ${fodlerName}"

projectPath=""


if [[ "${fodlerName}" == "command" ]]; then
  projectPath="$(realpath "${thisPath}/..")"
elif [[ "${fodlerName}" == "dc_ts" ]]; then
  projectPath="$(realpath "${thisPath}/../..")"
elif [[ "${fodlerName}" == "ts_libs_calls" ]]; then
  projectPath="$(realpath "${thisPath}/../../..")"
else
  projectPath="$(realpath ".")"
fi

# echo "projectPath: ${projectPath}"



envPath="${projectPath}/.env"
envBeyondYmlPath="${projectPath}/.env_beyond_yml"
envDinamiquePath="${projectPath}/workspace/env_dc_dinamique/.env_ts"

# echo "envPath: ${envPath}"



if [[ -e "${envPath}" ]]; then
  . "${envPath}"
else
    # when no .env is in the Project,
    # this Exception text is written in the command line.
    exceptionNoticeLines=(
      "Error: .env file is not set,"
      "\n   the example of the .env file is the example_env"
      "\n   You need copy the example_env and rename to .env,"
      "\n   then to set in the new .env the for Your Project other constants for the sensitive infos."
      "\n"
    )

    echo "${exceptionNoticeLines[$'\052']}"


    exit 2;
fi


if [[ -e "${envBeyondYmlPath}" ]]; then
  . "${envBeyondYmlPath}"
else
    # when no .env is in the Project,
    # this Exception text is written in the command line.
    exceptionNoticeLines=(
      "Error: .env_beyond_yml file is not set,"
      "\n   the example of the .env_beyond_yml file is the example_env_beyond_yml"
      "\n   You need copy the example_env_beyond_yml and rename to .env_beyond_yml,"
      "\n   then to set in the new .env_beyond_yml the for Your Project other constants for the sensitive infos."
      "\n"
    )

    echo "${exceptionNoticeLines[$'\052']}"

    exit 3;
fi


if [[ -e "${envDinamiquePath}" ]]; then
  . "${envDinamiquePath}"
else
    # when no .env is in the Project,
    # this Exception text is written in the command line.
    exceptionNoticeLines=(
      "Warning: dinamique .env_ts is not set,"
      "\n   the example of the .env_ts file is the workspace/env_dc_dinamique/example_env_ts"
      "\n   You need copy the example_env_ts and rename to .env_ts,"
      "\n   then to set in the new .env_ts the for Your Project other constants for the sensitive infos."
      "\n"
    )

    echo "${exceptionNoticeLines[$'\052']}"
fi



jsInvokePath="${projectPath}/command/base/js_invoke.sh"

# echo "jsInvokePath: ${jsInvokePath}"

if [[ ! -e "${jsInvokePath}" ]]; then
  echo "Error: call this script in the root of this project or in the folder command."
  exit 5;
fi

## finish block
## checks and validations
###------------------------------------------





# "${jsInvokePath}" "${commandLineArgs}" \
#  --Root="${IN_DOCKER_WORKSPACE_VOLUME}" \
#  --packagePath="${TYPESCRIPT_PACKAGES}/libraries/console/JsInvoke" \
#  --script="invokeCssImporter.js" \
#      --sitesToolPath="${TYPESCRIPT_PACKAGES}/libraries/sites_tools/css_tools/css_flat/CssTable" \
#      --cssFilePath="MediaAndStyles/CssTable_main_Webpack.css" \
#      --cssTargetFilePath="MediaAndStyles/CssTable_resolved.css" \
#      --toExcludeComments="true"



#!/bin/sh

# This script obtains the settings values from the .env,
# and then invokes another .sh script,
# however the script already executes in the dockerized node environment,
# having the fixed node and npm ver.,
# this is the best to keep the npm dependencies of the same ver., too,
# since when another node and npm ver is installed,
# the npm dependencies (javascript libraries) supported, are already of another their versions,
# and then could be not doing.



transpiledJsSourcesLocalPathInPackage="transpiled/ESNext"


###------------------------------------------
## start block
## checks and validations, loads .env

echo "running js_invoke.sh ..."

commandLineArgs="$@"
thisPath="$(dirname "$(realpath "$0")")"
fodlerName="$(basename "$thisPath")"

# echo "thisPath: ${thisPath}"
# echo "fodlerName: ${fodlerName}"

projectPath=""

if [[ "${fodlerName}" == "command" ]]; then
  projectPath="$(realpath "${thisPath}/..")"
elif [[ "${fodlerName}" == "base" ]]; then
  projectPath="$(realpath "${thisPath}/../..")"
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

## finish block
## checks and validations, loads .env
###------------------------------------------



commandLineArgs="$@"
argsLines="$(echo "$@" | tr " " "\n")"

debug="$(echo "${argsLines}" | grep "debug")"
packagePath="$(echo "${argsLines}" | grep "packagePath" | cut -d'=' -f2)"
script="$(echo "${argsLines}" | grep "script" | cut -d'=' -f2)"



debugInspectOption=''
if [[ "${debug}" == "--debug" ]]; then
  debugInspectOption="--inspect-brk=0.0.0.0:9229"
fi

echo "debugInspectOption: ${debugInspectOption}"

commandToRun="cd "${IN_DOCKER_WORKSPACE_VOLUME}/${packagePath}" && node ${debugInspectOption} "./${transpiledJsSourcesLocalPathInPackage}/${script}""



hostScriptPath="$(realpath "${WORKSPACE_VOLUME}")/${packagePath}/${transpiledJsSourcesLocalPathInPackage}/${script}"
dockerScriptPath="${IN_DOCKER_WORKSPACE_VOLUME}/${packagePath}/${transpiledJsSourcesLocalPathInPackage}/${script}"



echo "Script Path: ${hostScriptPath}"
echo "Script Path in docker ts: ${dockerScriptPath}"



cd "${projectPath}"
docker compose exec -u "${USER_NODE_NAME}" ts bash -c ". "/home/${USER_NODE_NAME}/.bashrc"; ${commandToRun} $commandLineArgs"



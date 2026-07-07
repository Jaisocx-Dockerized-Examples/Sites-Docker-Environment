#!/usr/bin/env bash

# This script obtains the settings values from the .env,
# and then invokes another .sh script,
# however the script already executes in the dockerized node environment,
# having the fixed node and npm ver.,
# this is the best to keep the npm dependencies of the same ver., too,
# since when another node and npm ver is installed,
# the npm dependencies (javascript libraries) supported, are already of another their versions,
# and then could be not doing.

  commandLineArgs="$@"
  thisPath="$(dirname "$(realpath "$0")")"
  fodlerName="$(basename "$thisPath")"
  projectPath=""

  if [[ "${fodlerName}" == "cmd" ]]; then
    projectPath="$(realpath "${thisPath}/..")"
  else
    projectPath="$(realpath "${thisPath}")"
  fi

  pathToEnv="${thisPath}/.env"
  pathToEnv_beyond_yml="${thisPath}/.env_beyond_yml"



  if [ ! -e "${pathToEnv}" ]; then

    # when no .env is in the Project,
    # this Exception text is written in the command line.
    exceptionNoticeLines=(
      ".env file is not set,"
      "\n   the example of the .env file is the .env.example,"
      "\n   in order to invoke PackageBuilder, You need copy the .env.example and rename to .env,"
      "\n   then to set in the new .env the for Your Project other constants for the sensitive infos."
      "\n"
    )

    echo -e "${exceptionNoticeLines[$'\052']}"

    exit 3;

  fi

  if [ ! -e "${pathToEnv_beyond_yml}" ]; then

    # when no .env is in the Project,
    # this Exception text is written in the command line.
    exceptionNoticeLines=(
      ".env_beyond_yml file is not set,"
      "\n   the example of the .env_beyond_yml file is the example_env_beyond_yml"
      "\n   in order to invoke PackageBuilder, You need copy the example_env_beyond_yml and rename to .env_beyond_yml,"
      "\n   then to set in the new .env_beyond_yml the for Your Project other constants for the sensitive infos."
      "\n"
    )

    echo -e "${exceptionNoticeLines[$'\052']}"

    exit 3;

  fi



  # the constants from the .env, please don't use there hardcoed, the best to set in the .env file :
  # tsconfigVersion="ESNext"
  # relativeProjectPathWithTsCode="./workspace/ts"
  # IN_DOCKER_WORKSPACE_VOLUME="/opt/jaisocx/sites_docker_environment/workspace/ts"

  # the command line tool ProjectBuilder.ts is best to invoke in the dockerized node service,

  jsInvokePath="${projectPath}/cmd/base/js_invoke.sh"

  if [[ ! -e "${jsInvokePath}" ]]; then
    echo "Error: calling this script not in the root of this project."
    exit 4;
  fi

  ###------------------------------------------



cd "${projectPath}"
# Obtaining the Project's settings from the .env
set -a
. "${pathToEnv}"
. "${pathToEnv_beyond_yml}"


  bash "${jsInvokePath}" "$commandLineArgs" \
    --packagePath="ts/build_tools/ProjectBuilder" \
    --script="cli/run.js" \
    --ProjectRoot="${IN_DOCKER_WORKSPACE_VOLUME}/ts" \
    --BuildData="${IN_DOCKER_WORKSPACE_VOLUME}/ts/BuildData.json" \
    --PackagesPath="${IN_DOCKER_WORKSPACE_VOLUME}/${TYPESCRIPT_PACKAGES}/"

exit 0;



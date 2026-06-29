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



  if [[ ! -e "${pathToEnv}" ]]; then

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

  fi;



cd "${projectPath}"
# Obtaining the Project's settings from the .env
set -a
. "${pathToEnv}"

docker compose exec ts bash -c ". "/home/${USER_NAME}/.bashrc" && /bin/bash "${IN_DOCKER_PROJECT_VOLUME}/build_tools/command/buildProjectBuilder.sh" "${IN_DOCKER_PROJECT_VOLUME}""

exit 0;



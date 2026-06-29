#!/usr/bin/env bash

  commandLineArgs="$@"
  thisPath="$(dirname "$(realpath "$0")")"
  fodlerName="$(basename "$thisPath")"
  projectPath="$(realpath "${thisPath}")"
  pathToEnv="${thisPath}/.env"

  if [[ "${fodlerName}" == "tsvm" ]]; then
    projectPath="$(realpath "${thisPath}/../..")"
  else
    echo "Exits ... try to invoke from the root as ./cmd/tsvm//activate_node.sh"
    exit 1
  fi

  set -a
  source "${projectPath}/.env"

  commandToRun="${IN_DOCKER_PROJECT_VOLUME}/build_tools/cmd/tsvm/in_docker_activate_node.sh"
  docker compose exec ts bash -c "${commandToRun}"



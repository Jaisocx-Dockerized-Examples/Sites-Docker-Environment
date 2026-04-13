#!/bin/bash

  # bash flag, to load env variables from .env like files
  set -a

  # loading env variables
  source "/run/secrets/for_yml"
  source "/run/secrets/beyond_yml"

  source "${IN_DOCKER_WORKSPACE_VOLUME}/env_dc_dinamique/.env_jaisocx"
  source "/home/${USER_NAME}/.bashrc"


  cd "${JAISOCX_SOFTWARE_HOME}"

  JAVA_TOOL_OPTIONS="-Xms${JAVA_DC_JAISOCX_RAM_START} -Xmx${JAVA_DC_JAISOCX_RAM_MAXIMAL}"
  export JAVA_TOOL_OPTIONS
  # sudo -u $USER_JAISOCX_NAME nohup "/bin/bash -c "source /home/${USER_JAISOCX_NAME}/.bashrc; cd "${JAISOCX_SOFTWARE_HOME}"; java -jar "out/artifacts/jaisocx_http_jar/jaisocx-http.jar""" &
  sudo -u $USER_JAISOCX_NAME /bin/bash -c ". "/home/${USER_JAISOCX_NAME}/.bashrc"; cd "${JAISOCX_SOFTWARE_HOME}"; java -jar "out/artifacts/jaisocx_http_jar/jaisocx-http.jar" &"

  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "[$(date), after]: java -jar "out/artifacts/jaisocx_http_jar/jaisocx-http.jar"\n"
  fi



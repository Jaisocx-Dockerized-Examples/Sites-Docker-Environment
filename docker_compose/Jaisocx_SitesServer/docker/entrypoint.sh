#!/bin/bash

# bool variable tells whether the main software has been installed.
tarball_installed=no

# bool variable tells whether to load the tarball
tarball_load=no

# bool variable tells whether marker "tarball_installed" was set.
#    The marker is set after the software was installed first time.
if [ -e "${markers}/tarball_installed" ]; then
  tarball_installed="true"
fi

cd "${workdir}"

# bash flag, to load env variables from .env like files
set -a

# loading env variables
source "/run/secrets/for_yml"
source "/run/secrets/beyond_yml"

source "${IN_DOCKER_WORKSPACE_VOLUME}/env_dc_dinamique/.env_jaisocx"



# env variable User's home folder
USER_HOME="/home/${USER_NAME}"
USER_JAISOCX_HOME="/home/${USER_JAISOCX_NAME}"
SOFTWARE_INSTALL_FOLDER="${JAISOCX_SOFTWARE_HOME}"

# env variable, pointing to bash script, loading on user's login or entering Docker console
BASH_LOGIN="${USER_HOME}/.bashrc"
JAISOCX_SOFTWARE_LOGS="${JAISOCX_SOFTWARE_HOME}/logs"


JAVA_TOOL_OPTIONS="-Xms${JAVA_DC_JAISOCX_RAM_START} -Xmx${JAVA_DC_JAISOCX_RAM_MAXIMAL}"


# exiting entrypoint, once software was installed first time and the marker "tarball_installed" was set.
if [[ "${tarball_installed}" == "true" ]]; then

  echo -e "[$(date)]: starting docker service ... \n"

  /entrypoint/server_start.sh

  # the bash finish line, recommended from documentation on Dockerfile and Entrypoint.
  #    invokes Dockerfile code lines after ENTRYPOINT statement in Dockerfile
  # exec "$@"

fi



# Software install, only if marker "tarball_installed" wasn't set.
#   This if-case bool bash variable "tarball_installed" has same name as the marker "tarball_installed"
if [[ ( "${tarball_installed}" != "true" ) ]]; then

  if [[ "${ADD_SUDIERS}" == "true" ]]; then
    addgroup -g "${GROUP_SUDIER_ID}" "${GROUP_SUDIER_NAME}"

    if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
      echo -e "[$(date)]: new group GROUP_SUDIER ${GROUP_SUDIER_NAME}\n"
    fi
  fi



  # login users' group
#  addgroup -g "${GROUP_USERS_ID}" "${GROUP_USERS_NAME}"
#  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
#    echo -e "[$(date)]: new group GROUP_USERS "${GROUP_USERS_ID}" ${GROUP_USERS_NAME}\n"
#  fi

  addgroup -g "${GROUP_JAISOCX_ID}" "${GROUP_JAISOCX_NAME}"
  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "[$(date)]: new group GROUP_PHP "${GROUP_JAISOCX_ID}" ${GROUP_JAISOCX_NAME}\n"
  fi

  # reading privilegs users' group
  addgroup -g "${GROUP_READER_ID}" "${GROUP_READER_NAME}"
  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "[$(date)]: new group GROUP_READER "${GROUP_READER_ID}" ${GROUP_READER_NAME}\n"
  fi



  # the Super Admin's group obtains privilegs of new groups added above.
  addgroup "root" "${GROUP_SUDIER_NAME}"
  # addgroup "root" "${GROUP_USERS_NAME}"
  addgroup "root" "${GROUP_JAISOCX_NAME}"
  addgroup "root" "${GROUP_READER_NAME}"



  # Admin user
  echo "root:${ROOT_HASHED_PWD}" | chpasswd -e

  if [[ "${ADD_SUDIERS}" == "true" ]]; then
    adduser -u "${USER_SUDIER_ID}"  -G "${GROUP_SUDIER_NAME}" -D "${USER_SUDIER_NAME}"
    echo "${USER_SUDIER_NAME}:${USER_SUDIER_HASHED_PWD}" | chpasswd -e

    # -- sudo infrastructure --
    sudiers_dirname="/etc/sudoers.d"
    sudiers_file_name="${sudiers_dirname}/${GROUP_SUDIER_NAME}"

    if [ ! -e "${sudiers_dirname}" ]; then
      mkdir -p "${sudiers_dirname}"
    fi

    touch "${sudiers_file_name}"
    chmod u+rw "${sudiers_file_name}"

    echo -e "# The custom group in this test image\n\n" >> "${sudiers_file_name}"
    echo -e "%${GROUP_SUDIER_NAME} ALL=(ALL) ALL\n" >> "${sudiers_file_name}"
    echo -e "\n\n\n" >> "${sudiers_file_name}"

    # -- the right fs mode for sudiers' file --
    chmod 440 "${sudiers_file_name}"

    addgroup "${USER_SUDIER_NAME}" "${GROUP_USERS_NAME}"
    addgroup "${USER_SUDIER_NAME}" "${GROUP_JAISOCX_NAME}"
    addgroup "${USER_SUDIER_NAME}" "${GROUP_READER_NAME}"

    if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
      echo -e "[$(date)]: new user USER "${USER_SUDIER_ID}" ${USER_SUDIER_NAME}\n"
    fi

  fi



  # Login user in this setup has obtained SUDIER rights,
  #   due to need of setting in Dockerfile USER,
  #   then allowed reading .env was only in ENTRYPOINT,
  #   and doing things in ENTRYPOINT as USER, needs SUDIER rights for the USER.
  # adduser  -u "${USER_ID}" -G "${GROUP_USERS_NAME}" -D "${USER_NAME}"
  echo "${USER_NAME}:${USER_HASHED_PWD}" | chpasswd -e

  addgroup "${USER_NAME}" "${GROUP_USERS_NAME}"
  addgroup "${USER_NAME}" "${GROUP_JAISOCX_NAME}"
  addgroup "${USER_NAME}" "${GROUP_READER_NAME}"

  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "[$(date)]: new user USER "${USER_ID}" ${USER_NAME}\n"
  fi



# Jaisocx Sites Server runs as .env_beyond_yml USER_JAISOCX_NAME user,
#   with rights of groups: users, g_jaisocx, reader.
#   users group (GROUP_USERS_NAME in .env_beyond_yml => privileged) is owner of WORKSPACE volume.
#   Jaisocx Sites Server runs as jaisocx user (USER_JAISOCX_NAME in .env_beyond_yml => jaisocx)
#       and has group rights on WORKSPACE.
#       Example bash for Host OS console: chmod -R 0740 "./workspace"
#        u        g                    o
#        [user]   [users,g_jaisocx,reader]
#       -rwx      r--                  ---   index.html
  adduser  -u "${USER_JAISOCX_ID}"  -G "${GROUP_JAISOCX_NAME}" -D "${USER_JAISOCX_NAME}"
  echo "${USER_JAISOCX_NAME}:${USER_JAISOCX_HASHED_PWD}" | chpasswd -e
  USER_JAISOCX_HOME="/home/${USER_JAISOCX_NAME}"

  addgroup "${USER_JAISOCX_NAME}" "${GROUP_USERS_NAME}"
  addgroup "${USER_JAISOCX_NAME}" "${GROUP_READER_NAME}"
  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "[$(date)]: new user USER_PHP "${USER_JAISOCX_ID}" ${USER_JAISOCX_NAME}\n"
  fi

  # Reader user
  adduser  -u "${USER_READER_ID}"  -G "${GROUP_READER_NAME}" -HD "${USER_READER_NAME}" -h "${IN_DOCKER_WORKSPACE_VOLUME}"
  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "[$(date)]: new user USER_READER "${USER_READER_ID}" ${USER_READER_NAME}\n"
  fi



  # --------------------------
  # -- new OnLogin bash script --
  touch   "${BASH_LOGIN}"

  mkdir -p "${SOFTWARE_INSTALL_FOLDER}"

  # --------------------------
  # -- Users' privilegs on Filesystem Resources --
  # -- Setting Owner User --
  chown -R "${USER_NAME}:${GROUP_USERS_NAME}"  "${markers}"
  chown -R "${USER_NAME}:${GROUP_USERS_NAME}"  "${templates}"
  chown -R "${USER_NAME}:${GROUP_USERS_NAME}"  "/dockr"

  chown -R  "${USER_NAME}:${GROUP_USERS_NAME}" "${USER_HOME}"
  chown "${USER_NAME}:${GROUP_USERS_NAME}"     "${BASH_LOGIN}"

  chown -R "${USER_JAISOCX_NAME}:${GROUP_JAISOCX_NAME}"   "${SOFTWARE_INSTALL_FOLDER}"
  chown -R "${USER_JAISOCX_NAME}:${GROUP_JAISOCX_NAME}"   "${JAISOCX_SOFTWARE_HOME}"
  chown -R "${USER_JAISOCX_NAME}:${GROUP_JAISOCX_NAME}"   "${JAISOCX_SOFTWARE_LOGS}"


  # -- Setting Read/Write privilegs to Owner and Group --
  chmod -R u+rwx  "${markers}"
  chmod -R u+rwx  "${templates}"
  chmod -R u+rwx  "/dockr"

  chmod -R u+rwx   "${USER_HOME}"
  chmod u+w        "${BASH_LOGIN}"
  chmod a+rx       "${BASH_LOGIN}"

  chmod -R  u+rwx  "${SOFTWARE_INSTALL_FOLDER}"
  chmod -R  u+rwx  "${JAISOCX_SOFTWARE_HOME}"
  chmod -R  u+rwx  "${JAISOCX_SOFTWARE_LOGS}"


  chmod -R g+rwx  "${markers}"
  chmod -R g+rwx  "${templates}"
  chmod -R g+rwx  "/dockr"

  chmod -R g-rwx   "${USER_HOME}"
  chmod g-w        "${BASH_LOGIN}"

  chmod -R  g+rx  "${SOFTWARE_INSTALL_FOLDER}"
  chmod -R  g-w   "${SOFTWARE_INSTALL_FOLDER}"

  chmod -R  g+rwx  "${JAISOCX_SOFTWARE_HOME}"

  chmod -R  g+r    "${JAISOCX_SOFTWARE_LOGS}"
  chmod -R  g-wx   "${JAISOCX_SOFTWARE_LOGS}"



  # -- Revoking Read/Write privilegs from other users --
  chmod -R o-wx    "${markers}"
  chmod -R o-wx    "${templates}"
  chmod -R o-wx    "/dockr"

  chmod -R o-rwx   "${USER_HOME}"
  chmod  o-w       "${BASH_LOGIN}"

  chmod -R  o-rwx  "${SOFTWARE_INSTALL_FOLDER}"
  chmod -R  o-rwx  "${JAISOCX_SOFTWARE_HOME}"
  chmod -R  o-rwx  "${JAISOCX_SOFTWARE_LOGS}"



  #; was created in Dockerfile, and also mounted with 3 volumes
  # mkdir -p "${SOFTWARE_INSTALL_FOLDER}"
  # mkdir -p "${JAISOCX_SOFTWARE_HOME}"

  cp -R "/usr/lib/jaisocx-http/alphabets/"   "${JAISOCX_SOFTWARE_HOME}/alphabets/"
  cp -R "/usr/lib/jaisocx-http/apps/"   "${JAISOCX_SOFTWARE_HOME}/apps/"
  cp -R "/usr/lib/jaisocx-http/cmd-linux/"   "${JAISOCX_SOFTWARE_HOME}/cmd-linux/"
  cp -R "/usr/lib/jaisocx-http/database-drivers/"   "${JAISOCX_SOFTWARE_HOME}/database-drivers/"
  cp -R "/usr/lib/jaisocx-http/out/"   "${JAISOCX_SOFTWARE_HOME}/out/"
  cp -R "/usr/lib/jaisocx-http/ssl/"   "${JAISOCX_SOFTWARE_HOME}/ssl/"

  chown -R "${USER_JAISOCX_NAME}:${GROUP_JAISOCX_NAME}"    "${JAISOCX_SOFTWARE_HOME}"
  chmod -R 750    "${JAISOCX_SOFTWARE_HOME}/out"



  mkdir -p "${JAISOCX_SOFTWARE_LOGS}"
  if [ ! -e "${JAISOCX_SOFTWARE_LOGS}/jaisocx-server.log" ]; then touch "${JAISOCX_SOFTWARE_LOGS}/jaisocx-server.log"; fi



  # -- README: the filesystem privilegues set on volume in Host OS, may not be changed in the Dockerfile --
  # -- README: I have to see whether the owner username was set --
  chown -R "${USER_NAME}:${GROUP_USERS_NAME}" "${IN_DOCKER_WORKSPACE_VOLUME}"

fi



#------------------------------
# -- Showing folders and files --
# The console echo is seen in $_ docker compose -f <filename of compose.yml> logs <docker service name>
if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
  # -- of the mounted volume --
  echo -e "\n\nWorkspace folder: ls -lahrtsi "${IN_DOCKER_WORKSPACE_VOLUME}"\n"
  ls -lahrtsi "${IN_DOCKER_WORKSPACE_VOLUME}"

  # -- of the folder with installed software --
  echo -e "\nSoftware installed folder: ls -lahrtsi \"${JAISOCX_SOFTWARE_HOME}\"\n"
  ls -lahrtsi "${JAISOCX_SOFTWARE_HOME}"
fi



# -- Software is being installed --
if [[ "${tarball_installed}" != "true" ]]; then

  #-----------------------------------
  # -- writing OnLogin bash script --
  shell_declaration_line="#!/bin/bash"
  bash_login_content="${shell_declaration_line}\n\n"

  # -- Linux System env variable "PATH" --
  # PATH="${SOFTWARE_INSTALL_FOLDER}/bin:${PATH}"



  # -- Array of the bash variables, to write later in loop automatique into OnLogin bash script --
  vars_of_bash_login=(
    "GROUP_JAISOCX_NAME"
    "GROUP_USERS_NAME"
    "USER_JAISOCX_NAME"
    "USER_NAME"
    "USER_JAISOCX_HOME"
    "USER_HOME"
    "TIME_ZONE"
    "JAISOCX_HTTP_IPv6"
    "JAISOCX_HTTP_IPv4"
    "JAISOCX_SOFTWARE_HOME"
    "JAISOCX_HTTP_FLAT_PORT"
    "JAISOCX_HTTPS_PORT"
    "JAVA_DC_JAISOCX_RAM_START"
    "JAVA_DC_JAISOCX_RAM_MAXIMAL"
    "JAVA_TOOL_OPTIONS"
    "PHP_FPM_IPv6"
    "PHP_FPM_IPv4"
    "PHP_FPM_FLAT_PORT"
    "PHP_FPM_STATUS_PORT"
    "SOFTWARE_INSTALL_FOLDER"
    "IN_DOCKER_WORKSPACE_VOLUME"
    "PATH"
  )



  # -- in for loop, concatenate the text content of the OnLogin bash script --
  variables_lines_content=""
  variables_lines_exports=""

  # -- generates bash BASH_LOGIN's content of env variables --
  for variable_name in "${vars_of_bash_login[@]}"; do

    eval "variable_value=\"\${${variable_name}}\""
    line="${variable_name}=\"${variable_value}\""

    variables_lines_content="${variables_lines_content}\n${line}"

  done;



  # -- generates bash BASH_LOGIN's content of exports of env variables --
  for variable_name in "${vars_of_bash_login[@]}"; do

    eval "variable_value=\"\${${variable_name}}\""
    line="export ${variable_name}"

    variables_lines_exports="${variables_lines_exports}\n${line}"

  done;



  # -- concats bash BASH_LOGIN's bash blocks together before have saved to hard drive --
  bash_login_content="${bash_login_content}\n\n${variables_lines_content}\n\n\n${variables_lines_exports}\n\n\n"

  # -- writes BASH_LOGIN in the user's home dir --
  echo    -e "${bash_login_content}" >> "${BASH_LOGIN}"

  # -- writes profile template to BASH_LOGIN in the user's home dir --
  cat "${templates}/profile"  >> "${BASH_LOGIN}"

  # -- copies BASH_LOGIN to shared folder --
  cp  "${BASH_LOGIN}" "${USER_JAISOCX_HOME}/.bashrc"

  chown "${USER_JAISOCX_NAME}:${GROUP_JAISOCX_NAME}"   "${USER_JAISOCX_HOME}/.bashrc"
  chmod a+rx   "${USER_JAISOCX_HOME}/.bashrc"
  chmod go-w   "${USER_JAISOCX_HOME}/.bashrc"

  # -- Console echo of the OnLogin bash script --
  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "The OnLogin bash script: "${BASH_LOGIN}"\n"
    echo -e "The OnLogin bash script: "${USER_JAISOCX_HOME}/.bashrc"\n"
  fi



  # Set timezone
  ln -snf "/usr/share/zoneinfo/${TIME_ZONE}" /etc/localtime
  echo -e "${TIME_ZONE}\n" > /etc/timezone
  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "[$(date)]: TIME_ZONE written to confs\n"
  fi



  # -- Marker set, the software has been installed. --
  touch "/markers/tarball_installed"

  echo -e "$(date): the 1st time started docker service\n"

fi




  # SHELL="/bin/bash"
  # export SHELL

  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "[$(date)]: Before Jaisocx start ...\n"
  fi

  . "${BASH_LOGIN}"

  echo -e "[$(date)]: starting docker service ... \n"



  #  sudo -u $USER_PHP_NAME /bin/bash -c "echo ${USER_PHP_NAME}; nohup "/bin/bash -c ". /home/${USER_PHP_NAME}/.bashrc; php-fpm"" &"
  . /entrypoint/server_start.sh


  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "[$(date)]: After /entrypoint/server_start.sh ...\n"
  fi

  /bin/bash -c "tail -f /dev/null"



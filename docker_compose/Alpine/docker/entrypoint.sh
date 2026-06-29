#!/bin/bash

YES="YES"

cd "${workdir}"

# bash flag, to load env variables from .env like files
set -a

# loading env variables
source "/run/secrets/for_yml"
source "/run/secrets/beyond_yml"

source "${IN_DOCKER_WORKSPACE_VOLUME}/env_dc_dinamique/.env_php"
SOFTWARE_INSTALL_FOLDER="${PHP_SOFTWARE_HOME}"


# env variable User's home folder
USER_HOME="/home/${USER_NAME}"

# env variable, pointing to bash script, loading on user's login or entering Docker console
BASH_LOGIN="${USER_HOME}/.bashrc"



php_software_logs="${PHP_SOFTWARE_LOGS}"

php_fpm_installation_marker="/markers/php_fpm"
xdebug_installation_marker="/markers/xdebug"
xdebug_ext_marker="/markers/xdebug_ext"
composer_installation_marker="/markers/composer"

marker_php_fpm_installed="no"
marker_xdebug_installed="no"
marker_xdebug_ext="no"
marker_composer_installed="no"

env_pie_reload="no"
env_composer_reload="no"
env_composer_on="no"
env_xdebug_on="no"


if [ -e "${php_fpm_installation_marker}" ]; then
  marker_php_fpm_installed="${YES}"
fi

if [ -e "${xdebug_installation_marker}" ]; then
  marker_xdebug_installed="${YES}"
fi

if [ -e "${xdebug_ext_marker}" ]; then
  marker_xdebug_ext="${YES}"
fi

if [ -e "${composer_installation_marker}" ]; then
  marker_composer_installed="${YES}"
fi



. "${IN_DOCKER_WORKSPACE_VOLUME}/env_dc_dinamique/.env_php"



if [[ "${dyn_pie_reload}" == "true" ]]; then
  env_pie_reload="${YES}"
fi

if [[ "${dyn_composer_reload}" == "true" ]]; then
  env_composer_reload="${YES}"
fi

if [[ "${dyn_composer_on}" == "true" ]]; then
  env_composer_on="${YES}"
fi

if [[ "${dyn_xdebug_on}" == "true" ]]; then
  env_xdebug_on="${YES}"
fi



if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then

  echo -e "[$(date)]: marker_php_fpm_installed "${marker_php_fpm_installed}"\n"
  echo -e "[$(date)]: marker_xdebug_installed "${marker_xdebug_installed}"\n"
  echo -e "[$(date)]: marker_xdebug_ext "${marker_xdebug_ext}"\n"
  echo -e "[$(date)]: marker_composer_installed "${marker_composer_installed}"\n"

  echo -e "[$(date)]: dyn_composer_on "${dyn_composer_on}"\n"
  echo -e "[$(date)]: dyn_xdebug_on "${dyn_xdebug_on}"\n"

  echo -e "[$(date)]: env_composer_on "${env_composer_on}"\n"
  echo -e "[$(date)]: env_xdebug_on "${env_xdebug_on}"\n"

fi



# Software install, only if marker "tarball_installed" wasn't set.
#   This if-case bool bash variable "tarball_installed" has same name as the marker "tarball_installed"
if [[ ( "${marker_php_fpm_installed}" != "$YES" ) ]]; then

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

  addgroup -g "${GROUP_PHP_ID}" "${GROUP_PHP_NAME}"
  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "[$(date)]: new group GROUP_PHP "${GROUP_PHP_ID}" ${GROUP_PHP_NAME}\n"
  fi

  # reading privilegs users' group
  addgroup -g "${GROUP_READER_ID}" "${GROUP_READER_NAME}"
  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "[$(date)]: new group GROUP_READER "${GROUP_READER_ID}" ${GROUP_READER_NAME}\n"
  fi



  # the Super Admin's group obtains privilegs of new groups added above.
  addgroup "root" "${GROUP_SUDIER_NAME}"
  # addgroup "root" "${GROUP_USERS_NAME}"
  addgroup "root" "${GROUP_PHP_NAME}"
  addgroup "root" "${GROUP_READER_NAME}"



  # Admin user
  echo "root:${ROOT_HASHED_PWD}" | chpasswd -e

  if [[ "${ADD_SUDIERS}" == "true" ]]; then
    adduser -u "${USER_SUDIER_ID}"  -G "${GROUP_SUDIER_NAME}" -D "${USER_SUDIER_NAME}"
    echo "${USER_SUDIER_NAME}:${USER_SUDIER_HASHED_PWD}" | chpasswd -e

    # -- sudo infrastructure --
    sudiers_dirname="/etc/sudoers.d"
    sudiers_file_name="${sudiers_dirname}/${GROUP_SUDIER_NAME}"

    mkdir -p "${sudiers_dirname}"

    touch "${sudiers_file_name}"
    chmod u+rw "${sudiers_file_name}"

    echo -e "# The custom group in this test image\n\n" >> "${sudiers_file_name}"
    echo -e "%${GROUP_SUDIER_NAME} ALL=(ALL) ALL\n" >> "${sudiers_file_name}"
    echo -e "\n\n\n" >> "${sudiers_file_name}"

    # -- the right fs mode for sudiers' file --
    chmod 440 "${sudiers_file_name}"

    addgroup "${USER_SUDIER_NAME}" "${GROUP_USERS_NAME}"
    addgroup "${USER_SUDIER_NAME}" "${GROUP_PHP_NAME}"
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
  addgroup "${USER_NAME}" "${GROUP_PHP_NAME}"
  addgroup "${USER_NAME}" "${GROUP_READER_NAME}"

  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "[$(date)]: new user USER "${USER_ID}" ${USER_NAME}\n"
  fi



# php-fpm engine runs as .env_beyond_yml USER_PHP_NAME user,
#   with rights of groups: users, php, reader.
#   users group (GROUP_USERS_NAME in .env_beyond_yml => unpriv) is owner of WORKSPACE volume.
#   php-fpm engine runs as php user (USER_PHP_NAME in .env_beyond_yml => jsc_php_fpm)
#       and has group rights on WORKSPACE.
#       Example bash for Host OS console: chmod -R 0740 "./workspace"
#        u        g                    o
#        [user]   [users,php,reader]
#       -rwx      r--                  ---   powered_by_php.php
  adduser  -u "${USER_PHP_ID}"  -G "${GROUP_PHP_NAME}" -D "${USER_PHP_NAME}"
  echo "${USER_PHP_NAME}:${USER_PHP_HASHED_PWD}" | chpasswd -e
  USER_PHP_HOME="/home/${USER_PHP_NAME}"

  addgroup "${USER_PHP_NAME}" "${GROUP_USERS_NAME}"
  addgroup "${USER_PHP_NAME}" "${GROUP_READER_NAME}"
  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "[$(date)]: new user USER_PHP "${USER_PHP_ID}" ${USER_PHP_NAME}\n"
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

  chown -R "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "${SOFTWARE_INSTALL_FOLDER}"
  chown -R "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "${PHP_SOFTWARE_HOME}"
  chown -R "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "${PHP_SOFTWARE_LOGS}"
  chown -R "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "/etc/php83"
  chown -R "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "${php_conf_folder}"
  chown -R "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "/usr/lib/php83"


  # -- Setting Read/Write privilegs to Owner and Group --
  chmod -R u+rwx  "${markers}"
  chmod -R u+rwx  "${templates}"
  chmod -R u+rwx  "/dockr"

  chmod -R u+rwx   "${USER_HOME}"
  chmod u+rwx      "${BASH_LOGIN}"

  chmod -R  u+rwx  "${SOFTWARE_INSTALL_FOLDER}"
  chmod -R  u+rwx  "${PHP_SOFTWARE_HOME}"
  chmod -R  u+rwx  "${PHP_SOFTWARE_LOGS}"
  # chmod -R  u+rwx  "/etc/php83"
  # chmod -R  u+rwx  "${php_conf_folder}"
  chmod -R  u+rwx  "/usr/lib/php83"


  chmod -R g+rwx  "${markers}"
  chmod -R g+rwx  "${templates}"
  chmod -R g+rwx  "/dockr"

  chmod -R g-rwx   "${USER_HOME}"
  # chmod g+rwx      "${BASH_LOGIN}"

  chmod -R  g+rx  "${SOFTWARE_INSTALL_FOLDER}"
  chmod -R  g-w   "${SOFTWARE_INSTALL_FOLDER}"

  chmod -R  g+rwx  "${PHP_SOFTWARE_HOME}"

  chmod -R  g+r    "${PHP_SOFTWARE_LOGS}"
  chmod -R  g-wx   "${PHP_SOFTWARE_LOGS}"

  # chmod -R  g+rwx  "/etc/php83"
  # chmod -R  g+rwx  "${php_conf_folder}"
  chmod -R  g+rx  "/usr/lib/php83"
  chmod -R  g-w   "/usr/lib/php83"


  # -- Revoking Read/Write privilegs from other users --
  chmod -R o-wx    "${markers}"
  chmod -R o-wx    "${templates}"
  chmod -R o-wx    "/dockr"

  chmod -R o-rwx   "${USER_HOME}"
  # chmod  o-rwx     "${BASH_LOGIN}"

  chmod -R  o-rwx  "${PHP_SOFTWARE_HOME}"
  chmod -R  o-rwx  "${PHP_SOFTWARE_LOGS}"
  # chmod -R  o-rwx   "/etc/php83"
  # chmod -R  o-rwx   "${php_conf_folder}"
  chmod -R  o-rwx   "/usr/lib/php83"


  # -- README: I have to see whether the owner username was set --
  chown -R "${USER_NAME}:${GROUP_USERS_NAME}" "${IN_DOCKER_WORKSPACE_VOLUME}"

  # -- README: the filesystem privilegues set on volume in Host OS, may not be changed in the Dockerfile --
  #  chmod -R ug+rwx "${IN_DOCKER_WORKSPACE_VOLUME}"
  #  chmod -R o-wx   "${IN_DOCKER_WORKSPACE_VOLUME}"

fi



#------------------------------
# -- Showing folders and files --
# The console echo is seen in $_ docker compose -f <filename of compose.yml> logs <docker service name>
if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
  # -- of the mounted volume --
  echo -e "\n\n"
  echo -e "Workspace folder: ls -lahrtsi "${IN_DOCKER_WORKSPACE_VOLUME}"\n"
  ls -lahrtsi "${IN_DOCKER_WORKSPACE_VOLUME}"

  # -- of the folder with installed software --
  echo -e "\n\n"
  echo -e "Tarball decompressed to folder: ls -lahrtsi \"/dockr\"\n"
  ls -lahrtsi "/dockr"
fi



# -- Software is being installed --
if [[ ( "${marker_php_fpm_installed}" != "$YES" ) ]]; then

  if [ ! -e "${PHP_SOFTWARE_HOME}/tmp/upload" ]; then mkdir -p "${PHP_SOFTWARE_HOME}/tmp/upload"; fi


  if [ ! -e "${PHP_SOFTWARE_LOGS}/php83" ]; then mkdir "${PHP_SOFTWARE_LOGS}/php83"; fi

  if [ ! -e "${PHP_SOFTWARE_LOGS}/php83/php83_error.log" ]; then touch "${PHP_SOFTWARE_LOGS}/php83/php83_error.log"; fi
  if [ ! -e "${PHP_SOFTWARE_LOGS}/php83/fpm_php83_error.log" ];   then touch "${PHP_SOFTWARE_LOGS}/php83/fpm_php83_error.log"; fi
  if [ ! -e "${PHP_SOFTWARE_LOGS}/php83/access_workspace_fpm_php83.log" ];   then touch "${PHP_SOFTWARE_LOGS}/php83/access_workspace_fpm_php83.log"; fi
  if [ ! -e "${PHP_SOFTWARE_LOGS}/php83/slow_workspace_fpm_php83.log" ];   then touch "${PHP_SOFTWARE_LOGS}/php83/slow_workspace_fpm_php83.log"; fi


  if [ ! -e "${PHP_SOFTWARE_LOGS}/xdebug" ]; then mkdir "${PHP_SOFTWARE_LOGS}/xdebug"; fi

  if [ ! -e "${PHP_SOFTWARE_LOGS}/xdebug/profiler" ]; then mkdir "${PHP_SOFTWARE_LOGS}/xdebug/profiler"; fi
  if [ ! -e "${PHP_SOFTWARE_LOGS}/xdebug/gc_stats" ]; then mkdir "${PHP_SOFTWARE_LOGS}/xdebug/gc_stats"; fi
  if [ ! -e "${PHP_SOFTWARE_LOGS}/xdebug/trace" ];    then mkdir "${PHP_SOFTWARE_LOGS}/xdebug/trace"; fi
  if [ ! -e "${PHP_SOFTWARE_LOGS}/xdebug/dbg" ];      then mkdir "${PHP_SOFTWARE_LOGS}/xdebug/dbg"; fi

  if [ ! -e "${PHP_SOFTWARE_LOGS}/xdebug/dbg/php83_xdebug.log" ]; then touch "${PHP_SOFTWARE_LOGS}/xdebug/dbg/php83_xdebug.log"; fi

  chown -R "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "${PHP_SOFTWARE_LOGS}"



  # Set timezone
  ln -snf "/usr/share/zoneinfo/${TIME_ZONE}" /etc/localtime
  echo -e "${TIME_ZONE}\n" > /etc/timezone
  echo -e "[PHP]\ndate.timezone = ${TIME_ZONE}\n" > /etc/php83/conf.d/tzone.ini
  chown "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "/etc/php83/conf.d/tzone.ini"
  chmod 0644   "/etc/php83/conf.d/tzone.ini"
  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "[$(date)]: TIME_ZONE written to confs\n"
  fi



  #-----------------------------------
  # -- writing OnLogin bash script --
  shell_declaration_line="#!/bin/bash"
  bash_login_content="${shell_declaration_line}\n\n"

  # -- Linux System env variable "PATH" --
  PATH="${SOFTWARE_INSTALL_FOLDER}/bin:${PATH}"



  # -- Array of the bash variables, to write later in loop automatique into OnLogin bash script --
  vars_of_bash_login=(
    "GROUP_USERS_NAME"
    "USER_NAME"
    "USER_HOME"
    "TIME_ZONE"
    "JAISOCX_HTTP_IPv6"
    "JAISOCX_HTTP_IPv4"
    "PHP_FPM_IPv6"
    "PHP_FPM_IPv4"
    "PHP_FPM_FLAT_PORT"
    "PHP_FPM_STATUS_PORT"
    "PHP_XDEBUG_FLAT_PORT"
    "PHP_FPM_LISTEN_MODE"
    "PHP_SOFTWARE_HOME"
    "PHP_SOFTWARE_LOGS"
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
  cp  "${BASH_LOGIN}" "${USER_PHP_HOME}/.bashrc"

  chown "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "${USER_PHP_HOME}/.bashrc"
  chmod a+rx   "${USER_PHP_HOME}/.bashrc"
  chmod go-w   "${USER_PHP_HOME}/.bashrc"

  # -- Console echo of the OnLogin bash script --
  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "The OnLogin bash script: "${BASH_LOGIN}"\n"
    echo -e "The OnLogin bash script: "${USER_PHP_HOME}/.bashrc"\n"
  fi

  ln -s   "/usr/bin/php83"   "/usr/local/bin/php"
  ln -s   "/usr/sbin/php-fpm83"   "/usr/local/bin/php-fpm"


  rm "/etc/php83/conf.d/00_curl.ini"
  rm "/etc/php83/conf.d/00_iconv.ini"
  rm "/etc/php83/conf.d/00_session.ini"

  cp "${PHP_SOFTWARE_HOME}/conf/examples/92_curl.ini"   "/etc/php83/conf.d/00_curl.ini"
  cp "${PHP_SOFTWARE_HOME}/conf/examples/92_iconv.ini"   "/etc/php83/conf.d/00_iconv.ini"
  cp "${PHP_SOFTWARE_HOME}/conf/examples/92_session.ini"   "/etc/php83/conf.d/00_session.ini"

  chown -R "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "/etc/php83/conf.d"
  chmod -R 0644   "/etc/php83/conf.d"
  chmod 0754      "/etc/php83/conf.d"

  # -- Marker set, the software has been installed. --
  #  touch "/markers/tarball_installed"
  touch "${php_fpm_installation_marker}"

  echo -e "$(date): the 1st time started docker service\n"

fi



cd "/dockr"
if [[ ( "${env_composer_on}" == "$YES" ) && ( "${marker_composer_installed}" != "$YES" ) ]]; then

  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "[$(date)]: Starts loading Composer\n"
  fi

  if [[ ("${env_composer_reload}" == "${YES}") || (! -e "${PHP_TARBALLS_IN_DOCKER_VOLUME}/composer-setup.php") ]]; then
      curl   -o "composer-setup.php"   "https://getcomposer.org/installer"
      cp "./composer-setup.php"   "${PHP_TARBALLS_IN_DOCKER_VOLUME}/composer-setup.php"
    else
      cp "${PHP_TARBALLS_IN_DOCKER_VOLUME}/composer-setup.php"    "/dockr/composer-setup.php"
  fi

  php -f "/dockr/composer-setup.php"  --  --install-dir=/usr/local/bin --filename=composer
  chown "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "/usr/local/bin/composer"

  mkdir -p "/home/${USER_PHP_NAME}/.composer"
  chown -R "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "/home/${USER_PHP_NAME}/.composer"

  cp "/home/${USER_NAME}/.composer/keys.dev.pub"   "/home/${USER_PHP_NAME}/.composer/keys.dev.pub"
  cp "/home/${USER_NAME}/.composer/keys.tags.pub"  "/home/${USER_PHP_NAME}/.composer/keys.tags.pub"



  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "[$(date)]: Composer installed\n"
  fi

  touch "${composer_installation_marker}"

fi



if [[ ( "${env_xdebug_on}" == "$YES" ) && ( "${marker_xdebug_installed}" != "$YES" ) ]]; then

  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "[$(date)]: Starts XDebug install \n"
  fi


  if [[ ("${env_pie_reload}" == "${YES}") || (! -e "${PHP_TARBALLS_IN_DOCKER_VOLUME}/pie.phar") ]]; then
      curl   -o "pie.phar"    "https://github.com/php/pie/releases/latest/download/pie.phar"
      cp "pie.phar"   "${PHP_TARBALLS_IN_DOCKER_VOLUME}/pie.phar"
    else
      cp "${PHP_TARBALLS_IN_DOCKER_VOLUME}/pie.phar"    "pie.phar"
  fi


  # gh attestation verify --owner $USER_PHP_NAME   "/dockr/pie.phar"
  cp "/dockr/pie.phar"   "/usr/local/bin/pie"
  chown "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "/usr/local/bin/pie"
  chmod a+x   "/usr/local/bin/pie"

  # pie install xdebug
  apk add php83-pecl-xdebug

  rm "/etc/php83/conf.d/50_xdebug.ini"
  cp "${PHP_SOFTWARE_HOME}/conf/examples/92_xdebug.ini"   "/etc/php83/conf.d/50_xdebug.ini"

#  chown "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "/usr/lib/php83/modules/xdebug.so"
  chown "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "/etc/php83/conf.d/50_xdebug.ini"

  chmod 0750   "/usr/lib/php83/modules/xdebug.so"
  chmod 0644   "/etc/php83/conf.d/50_xdebug.ini"

  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "[$(date)]: XDebug installed \n"
  fi

  touch "${xdebug_installation_marker}"
  touch "${xdebug_ext_marker}"

fi



if [[ ( "${env_xdebug_on}" == "$YES" ) && ( "${marker_xdebug_ext}" != "$YES" ) ]]; then
    if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
      echo -e "[$(date)]: Starts enable XDebug php extension \n"
    fi

    rm "/etc/php83/conf.d/50_xdebug.ini"
    cp "${PHP_SOFTWARE_HOME}/conf/examples/92_xdebug.ini"   "/etc/php83/conf.d/50_xdebug.ini"
    chown "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "/etc/php83/conf.d/50_xdebug.ini"
    chmod 0644   "/etc/php83/conf.d/50_xdebug.ini"

    touch "${xdebug_ext_marker}"

  elif [[ ( "${env_xdebug_on}" != "$YES" ) && ( "${marker_xdebug_ext}" == "$YES" ) ]]; then
    if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
      echo -e "[$(date)]: Starts disable XDebug php extension \n"
    fi

    rm "/etc/php83/conf.d/50_xdebug.ini"
    rm "${xdebug_ext_marker}"

fi



  SHELL="/bin/bash"
  export SHELL

  if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
    echo -e "[$(date)]: Before php-fpm start ...\n"
  fi

  . "${BASH_LOGIN}"

  sudo -u $USER_PHP_NAME -s -E /bin/bash -c "php-fpm" &

  # the bash finish line, recommended from documentation on Dockerfile and Entrypoint.
  #    invokes Dockerfile code lines after ENTRYPOINT statement in Dockerfile
  exec "$@"






    # -- OWNERS AND CHANGE MODES --
    if [[ ( "${marker_first_start}" == "$YES" ) && ( "${marker_owners_n_modes_set}" != "$YES" ) ]]; then

      # --------------------------
      # -- new OnLogin bash script --
      touch   "${BASH_LOGIN}"

      # mkdir -p "${SOFTWARE_INSTALL_FOLDER}"
      # mkdir -p "${php_software_logs}"

      # --------------------------
      # -- Users' privilegs on Filesystem Resources --
      # -- Setting Owner User --
      chown -R "${USER_NAME}:${GROUP_USERS_NAME}"  "${markers}"
      chown -R "${USER_NAME}:${GROUP_USERS_NAME}"  "${templates}"
      chown -R "${USER_NAME}:${GROUP_USERS_NAME}"  "/dockr"

      chown -R  "${USER_NAME}:${GROUP_USERS_NAME}" "${USER_HOME}"
      chown "${USER_NAME}:${GROUP_USERS_NAME}"     "${BASH_LOGIN}"

      # chown -R "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "${SOFTWARE_INSTALL_FOLDER}"
      # chown -R "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "${PHP_SOFTWARE_HOME}"
      # chown -R "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "${PHP_SOFTWARE_LOGS}"
      # chown -R "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "/usr/lib/php83"


      # -- Setting Read/Write privilegs to Owner and Group --
      chmod -R u+rwx  "${markers}"
      chmod -R u+rwx  "${templates}"
      chmod -R u+rwx  "/dockr"

      chmod -R u+rwx   "${USER_HOME}"
      chmod u+rwx      "${BASH_LOGIN}"

      chmod -R g+rwx  "${markers}"
      chmod -R g+rwx  "${templates}"
      chmod -R g+rwx  "/dockr"

      chmod -R g-rwx   "${USER_HOME}"
      # chmod g+rwx      "${BASH_LOGIN}"


      # -- Revoking Read/Write privilegs from other users --
      chmod -R o-wx    "${markers}"
      chmod -R o-wx    "${templates}"
      chmod -R o-wx    "/dockr"

      chmod -R o-rwx   "${USER_HOME}"
      # chmod  o-rwx     "${BASH_LOGIN}"



      # -- README: I have to see whether the owner username was set --
      chown -R "${USER_NAME}:${GROUP_USERS_NAME}" "${IN_DOCKER_WORKSPACE_VOLUME}"

      touch "${owners_n_modes_set_marker}"
      marker_owners_n_modes_set="${YES}"

    fi



    if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
      echo -e "ls -lahrtsi \"/dockr\"\n"
      ls -lahrtsi "/dockr"

      echo -e "ls -lahrtsi "${IN_DOCKER_WORKSPACE_VOLUME}"\n"
      ls -lahrtsi "${IN_DOCKER_WORKSPACE_VOLUME}"
    fi



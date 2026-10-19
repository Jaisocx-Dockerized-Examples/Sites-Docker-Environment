


    if [[ ( "${marker_first_start}" == "$YES" ) && ( "${marker_groups_n_users_added}" != "$YES" ) ]]; then

      # Admin user
      echo "root:${ROOT_HASHED_PWD}" | chpasswd -e



      addgroup -g "${GROUP_A4DC_ID}" "${GROUP_A4DC_NAME}"
      if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
        echo -e "[$(date)]: new group GROUP_A4DC "${GROUP_A4DC_ID}" ${GROUP_A4DC_NAME}\n"
      fi

      # reading privilegs users' group
      addgroup -g "${GROUP_READER_ID}" "${GROUP_READER_NAME}"
      if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
        echo -e "[$(date)]: new group GROUP_READER "${GROUP_READER_ID}" ${GROUP_READER_NAME}\n"
      fi



      # the Super Admin's group obtains privilegs of new groups added above.
      addgroup "root" "${GROUP_SUDIER_NAME}"
      # addgroup "root" "${GROUP_USERS_NAME}"
      addgroup "root" "${GROUP_A4DC_NAME}"
      addgroup "root" "${GROUP_READER_NAME}"



      # Login user in this setup has obtained SUDIER rights,
      #   due to need of setting in Dockerfile USER,
      #   then allowed reading .env was only in ENTRYPOINT,
      #   and doing things in ENTRYPOINT as USER, needs SUDIER rights for the USER.
      # adduser  -u "${USER_ID}" -G "${GROUP_USERS_NAME}" -D "${USER_NAME}"
      echo "${USER_NAME}:${USER_HASHED_PWD}" | chpasswd -e

      addgroup "${USER_NAME}" "${GROUP_USERS_NAME}"
      addgroup "${USER_NAME}" "${GROUP_A4DC_NAME}"
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
      adduser  -u "${USER_A4DC_ID}"  -G "${GROUP_A4DC_NAME}" -D "${USER_A4DC_NAME}"
      echo "${USER_A4DC_NAME}:${USER_A4DC_HASHED_PWD}" | chpasswd -e
      USER_A4DC_HOME="/home/${USER_A4DC_NAME}"

      addgroup "${USER_A4DC_NAME}" "${GROUP_USERS_NAME}"
      addgroup "${USER_A4DC_NAME}" "${GROUP_READER_NAME}"
      if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
        echo -e "[$(date)]: new user USER_A4DC "${USER_A4DC_ID}" ${USER_A4DC_NAME}\n"
      fi

      # Reader user
      adduser  -u "${USER_READER_ID}"  -G "${GROUP_READER_NAME}" -D "${USER_READER_NAME}"
      if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
        echo -e "[$(date)]: new user USER_READER "${USER_READER_ID}" ${USER_READER_NAME}\n"
      fi



      if [[ ( "${ADD_SUDIERS}" == "true" ) ]]; then

        addgroup "${USER_SUDIER_NAME}" "${GROUP_USERS_NAME}"
        addgroup "${USER_SUDIER_NAME}" "${GROUP_A4DC_NAME}"
        addgroup "${USER_SUDIER_NAME}" "${GROUP_READER_NAME}"

      fi


      touch "${groups_n_users_added_marker}"
      marker_groups_n_users_added="${YES}"

    fi




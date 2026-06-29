



# -- ADD GROUPS, USERS --
# -- OWNERS AND CHANGE MODES --
# -- A4DC TARBALL SAVE --
# -- BASH LOGIN --



    # -- ADD GROUPS, USERS --
    if [[ ( "${marker_first_start}" == "$YES" ) && ( "${ADD_SUDIERS}" == "true" ) ]]; then

      addgroup -g "${GROUP_SUDIER_ID}" "${GROUP_SUDIER_NAME}"
      if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
        echo -e "[$(date)]: new group GROUP_SUDIER ${GROUP_SUDIER_NAME}\n"
      fi

      # the Super Admin's group obtains privilegs of new groups added above.
      addgroup "root" "${GROUP_SUDIER_NAME}"

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

      if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
        echo -e "[$(date)]: new user USER "${USER_SUDIER_ID}" ${USER_SUDIER_NAME}\n"
      fi

    fi




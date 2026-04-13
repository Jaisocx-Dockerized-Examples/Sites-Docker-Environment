#!/bin/bash

# -- ENVs --
YES="YES"

workdir="/dockr"
markers="/markers"
templates="/templates"

# env variable User's home folder
USER_HOME="/home/${USER_NAME}"

# env variable, pointing to bash script, loading on user's login or entering Docker console
BASH_LOGIN="${USER_HOME}/.bashrc"

cd "${workdir}"



# -- LOADING ENVs --
# bash flag, to load env variables from .env like files
set -a

# loading env variables
source "/run/secrets/for_yml"
source "/run/secrets/beyond_yml"
# source "/run/secrets/${LOCAL_ENV}"

. "${IN_DOCKER_WORKSPACE_VOLUME}/env_dc_dinamique/.env_a4dc"

if [ -e "${BASH_LOGIN}" ]; then
  . "${BASH_LOGIN}"
fi

# SOFTWARE_INSTALL_FOLDER="${PHP_SOFTWARE_HOME}"
# php_software_logs="${PHP_SOFTWARE_LOGS}/${local_service_name}"



# -------------
# -- MARKERS --

first_start_marker="/${markers}/set_after_first_start"

# -- SOFTWARE INSTALLED --
princexml_installed_marker="/${markers}/princexml_installed"

# -- ADD GROUPS, USERS --
groups_n_users_added_marker="/${markers}/groups_n_users_added"

# -- OWNERS AND CHANGE MODES --
owners_n_modes_set_marker="/${markers}/owners_n_modes_set"

# -- A4DC TARBALL SAVED --
princexml_tarball_saved_marker="/${markers}/princexml_tarball_saved"

# -- BASH LOGIN --
bash_login_written_marker="/${markers}/bash_login_written"



# -- MARKERS TO BOOL VARIABLES --
marker_first_start="${YES}"

  marker_groups_n_users_added="no"
  marker_owners_n_modes_set="no"
  marker_princexml_tarball_saved="no"
  marker_princexml_installed="no"
  marker_bash_login_written="no"

  env_a4dc_reload="no"



# -- PROVES MARKERS, SETS VALUES TO VARIABLES --
# if marker was found, variable tells, this is not the first start, but a next restart.
if [ -e "${first_start_marker}" ]; then marker_first_start="no"; fi

# marker found, bool variable set ${YES}
if [ -e "${groups_n_users_added_marker}" ]; then marker_groups_n_users_added="${YES}"; fi
if [ -e "${owners_n_modes_set_marker}" ]; then marker_owners_n_modes_set="${YES}"; fi
if [ -e "${princexml_tarball_saved_marker}" ]; then marker_princexml_tarball_saved="${YES}"; fi
if [ -e "${princexml_installed_marker}" ]; then marker_princexml_installed="${YES}"; fi
if [ -e "${bash_login_written_marker}" ]; then marker_bash_login_written="${YES}"; fi

if [ "${A4DC_INSTALL_TARBALL_RELOAD}" == "true" ]; then A4DC_INSTALL_TARBALL_RELOAD="${YES}"; fi



# -- FINISHES ENTRYPOINT, IF ALREADY INSTALLED --
if [[ "${marker_first_start}" != "$YES" ]]; then

    exec "$@"

    exit 0

fi



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
      adduser  -u "${USER_READER_ID}"  -G "${GROUP_READER_NAME}" -HD "${USER_READER_NAME}" -h "${IN_DOCKER_WORKSPACE_VOLUME}"
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



    if [[ ( "${marker_first_start}" == "$YES" ) && ( "${marker_princexml_installed}" != "$YES" ) ]]; then

      #curl -LO https://www.princexml.com/download/prince-16.2-alpine3.23-x86_64.tar.gz
      #tar -xvzf prince-16.2-alpine3.23-x86_64.tar.gz
      #WORKDIR /dockr/prince-16.2-alpine3.23-x86_64

      architectur="${CPU_ARCHITECTURE_A4DC}"
      tarball_name="prince-${A4DC_SOFTWARE_VERSION}-alpine3.23-${architectur}"
      tarball_link="https://www.princexml.com/download/${tarball_name}.tar.gz"
      tarball_path="/dockr/${tarball_name}.tar.gz"



      # -- TARBALL RELOAD --
      # --------------------

      # -- REINSTALL FROM TARBALL --
      # -- REINSTALL, LOAD FROM INET --

      if [ -e "${A4DC_INSTALL_IN_DOCKER_TARBALLS_VOLUME}/${tarball_name}.tar.gz" ]; then
            env_a4dc_reload="${A4DC_INSTALL_TARBALL_RELOAD}"

          else
            env_a4dc_reload="$YES"
      fi

      # -- TARBALL RELOAD --
      if [[ "${env_a4dc_reload}" == "$YES" ]]; then
        curl --output-dir "${A4DC_INSTALL_IN_DOCKER_TARBALLS_VOLUME}"   -o "${tarball_name}.tar.gz"   "${tarball_link}"

        touch "${princexml_tarball_saved_marker}"
        marker_princexml_tarball_saved="$YES"

      fi


      # -- INSTALL FROM TARBALL --
      cp "${A4DC_INSTALL_IN_DOCKER_TARBALLS_VOLUME}/${tarball_name}.tar.gz"   "/dockr/${tarball_name}.tar.gz"

      cd "/dockr"
      tar -xzf "${tarball_name}.tar.gz" -C "/dockr"

      cd "/dockr/${tarball_name}"
      "./install.sh"

      touch "${princexml_installed_marker}"
      marker_princexml_installed="$YES"

    fi



    # -- BASH LOGIN --
    if [[ ( "${marker_first_start}" == "$YES" ) && ( "${marker_bash_login_written}" != "$YES" ) ]]; then
      ### BASH BASH_LOGIN FOR USER
      #### the first line to the text variable with bash BASH_LOGIN

      shell_declaration_line="#!/bin/bash"
      bash_login_content="${shell_declaration_line}\n\n"

      PATH="/dockr/${tarball_name}:${PATH}"



      ### env bash variables being later declared in bash BASH_LOGIN
      vars_of_bash_login=(
        "GROUP_A4DC_NAME"
        "GROUP_USERS_NAME"
        "USER_A4DC_NAME"
        "USER_NAME"
        "USER_A4DC_HOME"
        "USER_HOME"
        "TIME_ZONE"
        "SHELL"
        "JAISOCX_HTTP_IPv6"
        "JAISOCX_HTTP_IPv4"
        "JAISOCX_DOMAIN_NAME"
        "PHP_FPM_IPv6"
        "PHP_FPM_IPv4"
        "JAISOCX_HTTP_FLAT_PORT"
        "JAISOCX_HTTPS_PORT"
        "SOFTWARE_INSTALL_FOLDER"
        "IN_DOCKER_WORKSPACE_VOLUME"
        "PATH"
      )



      variables_lines_content=""
      variables_lines_exports=""

      ### generates bash BASH_LOGIN's content of env variables
      for variable_name in "${vars_of_bash_login[@]}"; do

        eval "variable_value=\"\${${variable_name}}\""
        line="${variable_name}=\"${variable_value}\""

        variables_lines_content="${variables_lines_content}\n${line}"

      done;



      ### generates bash BASH_LOGIN's content of exports of env variables
      for variable_name in "${vars_of_bash_login[@]}"; do

        eval "variable_value=\"\${${variable_name}}\""
        line="export ${variable_name}"

        variables_lines_exports="${variables_lines_exports}\n${line}"

      done;



      ### concats bash BASH_LOGIN's bash blocks together before have saved to hard drive
      bash_login_content="${bash_login_content}\n\n${variables_lines_content}\n\n\n${variables_lines_exports}\n\n\n"

      if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
        echo    -e "${bash_login_content}"
      fi



      ### cat "${templates}/example.template"                 >> "${USER_HOME}/.bash_login"
      #### reads a template for bash BASH_LOGIN, and adds to the text variable with bash BASH_LOGIN
      #; start_comment_line_example_template_bash_login="### example.template"
      #; example_template_bash_login="$(cat "${templates}/example.template")"
      #; bash_login_content="${bash_login_content}\n\n\n${start_comment_line_example_template_bash_login}\n${example_template_bash_login}\n\n"

      #### writes bash BASH_LOGIN to the user's home dir
      #### BASH_LOGIN="${USER_HOME}/.bash_login"
      echo    -e "${bash_login_content}" >> "${BASH_LOGIN}"

      ### shows bash BASH_LOGIN's text
      if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
        echo    -e "BASH_LOGIN: cat     \"${BASH_LOGIN}\"\n---------------------\n"
        cat     "${BASH_LOGIN}"
      fi

      cp "${BASH_LOGIN}" "/home/${USER_A4DC_NAME}/.bashrc"
      chown "${USER_A4DC_NAME}:${GROUP_A4DC_NAME}"    "/home/${USER_A4DC_NAME}/.bashrc"
      chmod 700   "/home/${USER_A4DC_NAME}/.bashrc"


      touch "${bash_login_written_marker}"
      marker_bash_login_written="$YES"

      . "${BASH_LOGIN}"

    fi



touch "${first_start_marker}"

# this is the first docker start.
#    with the marker set,
#    the next time on start,
#    the code isn't executed til this code block.
marker_first_start="$YES"



cd "${USER_HOME}"

exec "$@"

exit 0



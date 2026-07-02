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

. "${IN_DOCKER_WORKSPACE_VOLUME}/env_dc_dinamique/.env_ts"

if [ -e "${BASH_LOGIN}" ]; then
  . "${BASH_LOGIN}"
fi

# SOFTWARE_INSTALL_FOLDER="${PHP_SOFTWARE_HOME}"
# php_software_logs="${PHP_SOFTWARE_LOGS}/${local_service_name}"



# -------------
# -- MARKERS --

first_start_marker="${markers}/set_after_first_start"

# -- ADD GROUPS, USERS --
groups_n_users_added_marker="${markers}/groups_n_users_added"

# -- OWNERS AND CHANGE MODES --
owners_n_modes_set_marker="${markers}/owners_n_modes_set"

# -- BASH LOGIN --
bash_login_written_marker="${markers}/bash_login_written"

# -- NODE TARBALL SAVED --
nodejs_tarball_saved_marker="${markers}/nodejs_tarball_saved"

# -- SOFTWARE INSTALLED --
nodejs_installed_marker="${markers}/nodejs_installed"
nodemodules_installed_marker="/${markers}/nodemodules_installed"



# -- MARKERS TO BOOL VARIABLES --
marker_first_start="${YES}"

  marker_groups_n_users_added="no"
  marker_owners_n_modes_set="no"
  marker_bash_login_written="no"
  marker_nodejs_tarball_saved="no"
  marker_nodejs_installed="no"
  marker_node_modules_installed="no"

  env_node_tarball_reload="no"



# -- PROVES MARKERS, SETS VALUES TO VARIABLES --
# if marker was found, variable tells, this is not the first start, but a next restart.
if [ -e "${first_start_marker}" ]; then marker_first_start="no"; fi

# marker found, bool variable set ${YES}
if [ -e "${groups_n_users_added_marker}" ]; then marker_groups_n_users_added="${YES}"; fi
if [ -e "${owners_n_modes_set_marker}" ]; then marker_owners_n_modes_set="${YES}"; fi
if [ -e "${bash_login_written_marker}" ]; then marker_bash_login_written="${YES}"; fi
if [ -e "${nodejs_tarball_saved_marker}" ]; then marker_nodejs_tarball_saved="${YES}"; fi
if [ -e "${nodejs_installed_marker}" ]; then marker_nodejs_installed="${YES}"; fi
if [ -e "${nodemodules_installed_marker}" ]; then marker_nodemodules_installed="${YES}"; fi

if [ "${NODE_INSTALL_TARBALL_RELOAD}" == "true" ]; then NODE_INSTALL_TARBALL_RELOAD="${YES}"; fi



# -- FINISHES ENTRYPOINT, IF ALREADY INSTALLED --
# ts no, dynamique .env_ts tells whether to start express or node-http
#if [[ "${marker_first_start}" != "$YES" ]]; then
#
#    exec "$@"
#
#    exit 0
#
#fi



# -- ADD GROUPS, USERS --
# -- OWNERS AND CHANGE MODES --
# -- NODE TARBALL SAVE --
# -- BASH LOGIN --



    # -- ADD GROUPS, USERS --
    if [[ ( "${marker_first_start}" == "$YES" ) && ( "${marker_groups_n_users_added}" != "$YES" ) && ( "${ADD_SUDIERS}" == "true" ) ]]; then

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



      addgroup -g "${GROUP_NODE_ID}" "${GROUP_NODE_NAME}"
      if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
        echo -e "[$(date)]: new group GROUP_NODE "${GROUP_NODE_ID}" ${GROUP_NODE_NAME}\n"
      fi

      # reading privilegs users' group
      addgroup -g "${GROUP_READER_ID}" "${GROUP_READER_NAME}"
      if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
        echo -e "[$(date)]: new group GROUP_READER "${GROUP_READER_ID}" ${GROUP_READER_NAME}\n"
      fi



      # the Super Admin's group obtains privilegs of new groups added above.
      # addgroup "root" "${GROUP_SUDIER_NAME}"
      # addgroup "root" "${GROUP_USERS_NAME}"
      # addgroup "root" "${GROUP_NODE_NAME}"
      # addgroup "root" "${GROUP_READER_NAME}"



      # Login user in this setup has obtained SUDIER rights,
      #   due to need of setting in Dockerfile USER,
      #   then allowed reading .env was only in ENTRYPOINT,
      #   and doing things in ENTRYPOINT as USER, needs SUDIER rights for the USER.
      # adduser  -u "${USER_ID}" -G "${GROUP_USERS_NAME}" -D "${USER_NAME}"
      echo "${USER_NAME}:${USER_HASHED_PWD}" | chpasswd -e

#      addgroup "${USER_NAME}" "${GROUP_USERS_NAME}"
#      addgroup "${USER_NAME}" "${GROUP_NODE_NAME}"
#      addgroup "${USER_NAME}" "${GROUP_READER_NAME}"

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
      adduser  -u "${USER_NODE_ID}"  -G "${GROUP_NODE_NAME}" -D "${USER_NODE_NAME}"
      echo "${USER_NODE_NAME}:${USER_NODE_HASHED_PWD}" | chpasswd -e
      USER_NODE_HOME="/home/${USER_NODE_NAME}"

      adduser  -u "${USER_YARN_ID}"  -G "${GROUP_NODE_NAME}" -D "${USER_YARN_NAME}"
      echo "${USER_YARN_NAME}:${USER_YARN_HASHED_PWD}" | chpasswd -e
      USER_YARN_HOME="/home/${USER_YARN_NAME}"

      adduser  -u "${USER_NPX_ID}"  -G "${GROUP_NODE_NAME}" -D "${USER_NPX_NAME}"
      echo "${USER_NPX_NAME}:${USER_NPX_HASHED_PWD}" | chpasswd -e
      USER_NPX_HOME="/home/${USER_NPX_NAME}"

      adduser  -u "${USER_NPM_ID}"  -G "${GROUP_NODE_NAME}" -D "${USER_NPM_NAME}"
      echo "${USER_NPM_NAME}:${USER_NPM_HASHED_PWD}" | chpasswd -e
      USER_NPM_HOME="/home/${USER_NPM_NAME}"

      adduser  -u "${USER_PNPM_ID}"  -G "${GROUP_NODE_NAME}" -D "${USER_PNPM_NAME}"
      echo "${USER_PNPM_NAME}:${USER_PNPM_HASHED_PWD}" | chpasswd -e
      USER_PNPM_HOME="/home/${USER_PNPM_NAME}"



#      addgroup "${USER_NODE_NAME}" "${GROUP_READER_NAME}"
#      addgroup "${USER_YARN_NAME}" "${GROUP_READER_NAME}"
#      addgroup "${USER_NPX_NAME}"  "${GROUP_READER_NAME}"
#      addgroup "${USER_NPM_NAME}"  "${GROUP_READER_NAME}"
#      addgroup "${USER_PNPM_NAME}" "${GROUP_READER_NAME}"

      if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
        echo -e "[$(date)]: new user USER_NODE "${USER_NODE_ID}" ${USER_NODE_NAME}\n"
      fi

      # Reader user
      adduser  -u "${USER_READER_ID}"  -G "${GROUP_READER_NAME}" -D "${USER_READER_NAME}"
      if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
        echo -e "[$(date)]: new user USER_READER "${USER_READER_ID}" ${USER_READER_NAME}\n"
      fi



#      if [[ ( "${ADD_SUDIERS}" == "true" ) ]]; then
#
#        addgroup "${USER_SUDIER_NAME}" "${GROUP_USERS_NAME}"
#        addgroup "${USER_SUDIER_NAME}" "${GROUP_NODE_NAME}"
#        addgroup "${USER_SUDIER_NAME}" "${GROUP_READER_NAME}"
#
#      fi



      touch "${groups_n_users_added_marker}"
      marker_groups_n_users_added="${YES}"

    fi



    # -- OWNERS AND CHANGE MODES --
    shopt -s extglob
    echo -e "extglob set\n"
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
      # chown -R "${USER_NODE_NAME}:${GROUP_NODE_NAME}"  "/dockr"
      chown -R "${USER_NAME}:${GROUP_USERS_NAME}"  "/dockr"

      chown -R  "${USER_NAME}:${GROUP_USERS_NAME}" "${USER_HOME}"
      chown "${USER_NAME}:${GROUP_USERS_NAME}"     "${BASH_LOGIN}"

      # chown -R "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "${SOFTWARE_INSTALL_FOLDER}"
      # chown -R "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "${PHP_SOFTWARE_HOME}"
      # chown -R "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "${PHP_SOFTWARE_LOGS}"
      # chown -R "${USER_PHP_NAME}:${GROUP_PHP_NAME}"   "/usr/lib/php83"



      #; shopt -s extglob before if block, or doesn't parse if block, since extglob didn't apply
      #; didn't set owner of the system folder .git
      #;   the folder resides in ts/cloned_repos folder.
      #;   shopt -s extglob allows excluding bash expression !(folder)

      # chown -R "${USER_NAME}:${GROUP_USERS_NAME}"  "${IN_DOCKER_WORKSPACE_VOLUME}/"!(ts)
      # chown -R "${USER_NAME}:${GROUP_NODE_NAME}"   "${IN_DOCKER_WORKSPACE_VOLUME}/ts/"!(cloned_repos)
      # chown -R "${USER_NAME}:${GROUP_NODE_NAME}"   "${IN_DOCKER_WORKSPACE_VOLUME}/ts/cloned_repos/jaisocx_sitestools/"!(\.git)
      # chown "${USER_NAME}:${GROUP_NODE_NAME}"      "${IN_DOCKER_WORKSPACE_VOLUME}/ts/cloned_repos/jaisocx_sitestools/.gitignore"

      chown -R "${USER_NAME}:${GROUP_USERS_NAME}"   "${IN_DOCKER_WORKSPACE_VOLUME}/"!(ts)
      chown -R "${USER_NAME}:${GROUP_USERS_NAME}"   "${IN_DOCKER_WORKSPACE_VOLUME}/ts/"!(cloned_repos)
      chown -R "${USER_NAME}:${GROUP_USERS_NAME}"   "${IN_DOCKER_WORKSPACE_VOLUME}/ts/cloned_repos/jaisocx_sitestools/"!(\.git)
      chown "${USER_NAME}:${GROUP_USERS_NAME}"      "${IN_DOCKER_WORKSPACE_VOLUME}/ts/cloned_repos/jaisocx_sitestools/.gitignore"
      #; shopt -u extglob

      chown -R "${USER_NAME}:${GROUP_USERS_NAME}"   "${NODE_TARBALLS_IN_DOCKER_VOLUME}"



      # -- Setting Read/Write privilegs to Owner and Group --
      chmod -R u+rwx  "${markers}"
      chmod -R u+rwx  "${templates}"
      chmod -R u+rwx  "/dockr"

      chmod -R u+rwx  "${USER_HOME}"
      chmod u+rwx     "${BASH_LOGIN}"

      chmod -R g+rx   "${markers}"
      chmod -R g+rx   "${templates}"
      chmod -R g+rx   "/dockr"

      chmod -R g-w    "/dockr"
      chmod -R g-rwx  "${USER_HOME}"
      # chmod g+rwx      "${BASH_LOGIN}"


      # -- Revoking Read/Write privilegs from other users --
      chmod -R o-rwx    "${markers}"
      chmod -R o-rwx    "${templates}"
      chmod -R o-rwx    "/dockr"

      chmod -R o-rwx    "${USER_HOME}"
      # chmod  o-rwx     "${BASH_LOGIN}"



      touch "${owners_n_modes_set_marker}"
      marker_owners_n_modes_set="${YES}"

      if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
        echo -e "ls -lahrtsi \"/dockr\"\n"
        ls -lahrtsi "/dockr"

        echo -e "ls -lahrtsi "${IN_DOCKER_WORKSPACE_VOLUME}/ts"\n"
        ls -lahrtsi "${IN_DOCKER_WORKSPACE_VOLUME}/ts"
      fi

    fi
    shopt -u extglob



    if [[ ( "${marker_first_start}" == "$YES" ) && ( "${marker_nodejs_installed}" != "$YES" ) ]]; then

      COMPANY_SOFTWARE_DIR="/opt/${SOFTWARE_NAMESPACE}"
      COMPANY_SOFTWARE_CONF_PATH="/etc/${SOFTWARE_NAMESPACE}"
      COMPANY_SOFTWARE_CACHE_PATH="/etc/cache/${SOFTWARE_NAMESPACE}"

      fs_installed_software_path="${COMPANY_SOFTWARE_DIR}/${SOFTWARE_NAME}/V${SOFTWARE_VERSION}"
      fs_conf_of_software_path="${COMPANY_SOFTWARE_CONF_PATH}/${SOFTWARE_NAME}/V${SOFTWARE_VERSION}"
      fs_loaded_cache_path="${COMPANY_SOFTWARE_CACHE_PATH}/${SOFTWARE_NAME}/V${SOFTWARE_VERSION}"

      TSVM_JSC_HOME="${fs_installed_software_path}"
      TSVM_JSC_TMP="${fs_installed_software_path}/tmp"
      TSVM_JSC_SYMLINKS="${fs_installed_software_path}/links"
      TSVM_JSC_COMMANDS="${TSVM_JSC_HOME}/commands"
      TSVM_JSC_INSTALLATION_SH="${TSVM_JSC_COMMANDS}/install_${SOFTWARE_NAME}.sh"
      TSVM_JSC_RUN_SH="${TSVM_JSC_COMMANDS}/run_${SOFTWARE_NAME}.sh"

      node_modules_installed_marker_path="/entrypoint/npm-installed.mark"

      NODEJS_HOME="${TSVM_JSC_HOME}/node_v${NODE_VERSION}"
      yarn_conf_home="${USER_HOME}/.yarn"
      yarn_install_home="${YARN_HOME}/${YARN_VERSION}"



      architectur="${CPU_ARCHITECTURE_NODE}"

      # tarball_link="https://nodejs.org/dist/v25.0.0/node-v25.0.0-darwin-arm64.tar.xz"
      # tarball_link="https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-arm64.tar.xz"
      # tarball_link="https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz"

      ### https://unofficial-builds.nodejs.org/download/release/v24.16.0/node-v24.16.0-linux-x64-musl.tar.xz
      ### tarball_link="https://unofficial-builds.nodejs.org/download/release/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-${architectur}-musl.tar.xz"

      # https://unofficial-builds.nodejs.org/download/release/v26.3.0/node-v26.3.0-linux-arm64-musl.tar.xz

      tarball_name="node-v${NODE_VERSION}-linux-${architectur}-musl"
      tarball_link="https://unofficial-builds.nodejs.org/download/release/v${NODE_VERSION}/${tarball_name}.tar.xz"
      tarball_path="/dockr/${tarball_name}.tar.xz"
      tarballs_folder="${NODE_TARBALLS_IN_DOCKER_VOLUME}"
      ### in the tarballs folder, the tarball path is:
      tarball_cache_path="${tarballs_folder}/${tarball_name}.tar.xz"



      ### CREATES FOLDERS
      ### @infrastructure @filesystem creates folders
      mkdir -p "${COMPANY_SOFTWARE_DIR}"
      mkdir -p "${COMPANY_SOFTWARE_CONF_PATH}"
      mkdir -p "${COMPANY_SOFTWARE_CACHE_PATH}"

      if [ ! -e "${tarballs_folder}" ]; then
        mkdir -p "${tarballs_folder}"
      fi

      mkdir -p "${TSVM_JSC_HOME}"
      mkdir -p "${TSVM_JSC_TMP}"
      mkdir -p "${TSVM_JSC_SYMLINKS}"
      mkdir -p "${TSVM_JSC_COMMANDS}"

      mkdir -p "${NODEJS_HOME}"

      mkdir -p "${yarn_conf_home}"
      mkdir -p "${yarn_install_home}"



      ### for Companie's Software Namespace folder set fs privilegs
      #; changed the volume before. chown -R "${USER_NAME}:${GROUP_USERS_NAME}" "${tarballs_folder}"
      chown -R "${USER_NAME}:${GROUP_USERS_NAME}" "${TSVM_JSC_HOME}"
      chown -R "${USER_NAME}:${GROUP_USERS_NAME}" "${COMPANY_SOFTWARE_CONF_PATH}"
      chown -R "${USER_NAME}:${GROUP_USERS_NAME}" "${COMPANY_SOFTWARE_CACHE_PATH}"

      chmod -R u+rwx  "${TSVM_JSC_HOME}"

      chmod -R g-w    "${TSVM_JSC_HOME}"
      chmod -R g+rx   "${TSVM_JSC_HOME}"

      chmod -R o-w    "${TSVM_JSC_HOME}"
      chmod -R o+rx   "${TSVM_JSC_HOME}"


      chmod -R ug+rwx "${COMPANY_SOFTWARE_CONF_PATH}"
      chmod -R o-rwx  "${COMPANY_SOFTWARE_CONF_PATH}"

      chmod -R ug+rwx "${COMPANY_SOFTWARE_CACHE_PATH}"
      chmod -R o-rwx  "${COMPANY_SOFTWARE_CACHE_PATH}"



      ### for yarn folders set fs privilegs
      chown -R "${USER_YARN_NAME}:${GROUP_NODE_NAME}" "${yarn_conf_home}"
      chown -R "${USER_YARN_NAME}:${GROUP_NODE_NAME}" "${YARN_HOME}"

      chmod -R ug+rwx "${yarn_conf_home}"
      chmod -R ug+rwx "${YARN_HOME}"



      # -- TARBALL RELOAD --
      # --------------------

      # -- REINSTALL FROM TARBALL --
      # -- REINSTALL, LOAD FROM INET --

      if [ -e "${tarball_cache_path}" ]; then
            env_node_tarball_reload="${NODE_INSTALL_TARBALL_RELOAD}"

          else
            env_node_tarball_reload="$YES"
      fi

      # -- TARBALL RELOAD --
      if [[ "${env_node_tarball_reload}" == "$YES" ]]; then
        curl --output-dir "${tarballs_folder}"   -o "${tarball_name}.tar.xz"   "${tarball_link}"

        touch "${nodejs_tarball_saved_marker}"
        marker_nodejs_tarball_saved="$YES"
      fi


      # -- INSTALL FROM TARBALL --
      cp -a "${tarballs_folder}/${tarball_name}.tar.xz"   "${NODEJS_HOME}/${tarball_name}.tar.xz"

      cd "${NODEJS_HOME}"
      tar -xf "${tarball_name}.tar.xz" -C "${NODEJS_HOME}"

      chown -R "${USER_NODE_NAME}:${GROUP_NODE_NAME}" "${NODEJS_HOME}/${tarball_name}"
      chmod -R 755  "${NODEJS_HOME}/${tarball_name}"

      if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
        echo -e "ls -lahrtsi \"${NODEJS_HOME}\"\n"
        ls -lahrtsi "${NODEJS_HOME}"

        echo -e "ls -lahrtsi \"${NODEJS_HOME}/${tarball_name}\"\n"
        ls -lahrtsi "${NODEJS_HOME}/${tarball_name}"
      fi

      #      if []; then
      #        cd "/dockr/${tarball_name}"
      #        "./install.sh"
      #      fi

      touch "${nodejs_installed_marker}"
      marker_nodejs_installed="$YES"

    fi



    # -- BASH LOGIN --
    if [[ ( "${marker_first_start}" == "$YES" ) && ( "${marker_bash_login_written}" != "$YES" ) ]]; then
      ### BASH BASH_LOGIN FOR USER
      #### the first line to the text variable with bash BASH_LOGIN

      shell_declaration_line="#!/bin/bash"
      bash_login_content="${shell_declaration_line}\n\n"

      PATH="${NODEJS_HOME}/${tarball_name}/bin:${PATH}"



      ### env bash variables being later declared in bash BASH_LOGIN
      vars_of_bash_login=(
        "JAISOCX_DOMAIN_NAME"
        "JAISOCX_HTTP_IPv4"
        "JAISOCX_HTTP_IPv6"
        "JAISOCX_HTTPS_PORT"
        "JAISOCX_HTTP_FLAT_PORT"
        "PHP_FPM_IPv4"
        "PHP_FPM_IPv6"
        "TIME_ZONE"
        "WORKSPACE_NAME"
        "GROUP_NODE_NAME"
        "USER_NODE_NAME"
        "USER_NODE_HOME"
        "USER_NPX_NAME"
        "USER_NPM_NAME"
        "USER_PNPM_NAME"
        "USER_YARN_NAME"
        "GROUP_USERS_NAME"
        "PROJECT_NODE_PACKAGE_MANAGER"
        "USER_NAME"
        "USER_HOME"
        "YARN_HOME"
        "NODE_LATEST_LTS"
        "NODE_LATEST_RELEASE"
        "SHELL"
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
      bash_login_content="${bash_login_content}\n\n\n${variables_lines_content}\n\n\n${variables_lines_exports}\n\n\n"


      ### cat "${templates}/example.template"                 >> "${USER_HOME}/.bash_login"
      #### reads a template for bash BASH_LOGIN, and adds to the text variable with bash BASH_LOGIN
      #; start_comment_line_example_template_bash_login="### example.template"
      #; template_bash_login="$(cat "${templates}/profile")"
      #; bash_login_content="${bash_login_content}\n\n\n${template_bash_login}\n\n\n"

      if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
        echo    -e "${bash_login_content}"
      fi

      USER_SUDIER_BASH_LOGIN="/home/${USER_SUDIER_NAME}/.bashrc"
      USER_NODE_BASH_LOGIN="/home/${USER_NODE_NAME}/.bashrc"
      USER_NPX_BASH_LOGIN="/home/${USER_NPX_NAME}/.bashrc"
      USER_NPM_BASH_LOGIN="/home/${USER_NPM_NAME}/.bashrc"
      USER_PNPM_BASH_LOGIN="/home/${USER_PNPM_NAME}/.bashrc"
      USER_YARN_BASH_LOGIN="/home/${USER_YARN_NAME}/.bashrc"
      USER_BASH_LOGIN="/home/${USER_NAME}/.bashrc"
      USER_READER_BASH_LOGIN="/home/${USER_READER_NAME}/.bashrc"

      if [ -e "${USER_SUDIER_BASH_LOGIN}" ]; then
        rm     "${USER_SUDIER_BASH_LOGIN}"
      fi
      if [ -e "${USER_NODE_BASH_LOGIN}" ]; then
        rm     "${USER_NODE_BASH_LOGIN}"
      fi
      if [ -e "${USER_NPX_BASH_LOGIN}" ]; then
        rm     "${USER_NPX_BASH_LOGIN}"
      fi
      if [ -e "${USER_NPM_BASH_LOGIN}" ]; then
        rm     "${USER_NPM_BASH_LOGIN}"
      fi
      if [ -e "${USER_PNPM_BASH_LOGIN}" ]; then
        rm     "${USER_PNPM_BASH_LOGIN}"
      fi
      if [ -e "${USER_YARN_BASH_LOGIN}" ]; then
        rm     "${USER_YARN_BASH_LOGIN}"
      fi
      if [ -e "${USER_BASH_LOGIN}" ]; then
        rm     "${USER_BASH_LOGIN}"
      fi
      if [ -e "${USER_READER_BASH_LOGIN}" ]; then
        rm     "${USER_READER_BASH_LOGIN}"
      fi

      if [[ ( "${ADD_SUDIERS}" == "true" ) ]]; then
        touch    "${USER_SUDIER_BASH_LOGIN}"
      fi
      touch    "${USER_NODE_BASH_LOGIN}"
      touch    "${USER_NPX_BASH_LOGIN}"
      touch    "${USER_NPM_BASH_LOGIN}"
      touch    "${USER_PNPM_BASH_LOGIN}"
      touch    "${USER_YARN_BASH_LOGIN}"
      touch    "${USER_BASH_LOGIN}"
      touch    "${USER_READER_BASH_LOGIN}"

      if [[ ( "${ADD_SUDIERS}" == "true" ) ]]; then
        echo    -e "${bash_login_content}" >> "${USER_SUDIER_BASH_LOGIN}"
        cat        "${templates}/profile"  >> "${USER_SUDIER_BASH_LOGIN}"
      fi

      echo    -e "${bash_login_content}" >> "${USER_NODE_BASH_LOGIN}"
      cat        "${templates}/profile"  >> "${USER_NODE_BASH_LOGIN}"

      echo    -e "${bash_login_content}" >> "${USER_NPX_BASH_LOGIN}"
      cat        "${templates}/profile"  >> "${USER_NPX_BASH_LOGIN}"

      echo    -e "${bash_login_content}" >> "${USER_NPM_BASH_LOGIN}"
      cat        "${templates}/profile"  >> "${USER_NPM_BASH_LOGIN}"

      echo    -e "${bash_login_content}" >> "${USER_PNPM_BASH_LOGIN}"
      cat        "${templates}/profile"  >> "${USER_PNPM_BASH_LOGIN}"

      echo    -e "${bash_login_content}" >> "${USER_YARN_BASH_LOGIN}"
      cat        "${templates}/profile"  >> "${USER_YARN_BASH_LOGIN}"

      echo    -e "${bash_login_content}" >> "${USER_BASH_LOGIN}"
      cat        "${templates}/profile"  >> "${USER_BASH_LOGIN}"

      echo    -e "${bash_login_content}" >> "${USER_READER_BASH_LOGIN}"
      cat        "${templates}/profile"  >> "${USER_READER_BASH_LOGIN}"


      ### shows bash BASH_LOGIN's text
      if [[ "${WHETHER_DEV_MODE}" == "true" ]]; then
        echo    -e "USER_BASH_LOGIN: cat     \"${USER_BASH_LOGIN}\"\n---------------------\n"
        cat     "${USER_BASH_LOGIN}"
      fi

      if [[ ( "${ADD_SUDIERS}" == "true" ) ]]; then
        chown -R "${USER_SUDIER_NAME}:${GROUP_SUDIER_NAME}"       "/home/${USER_SUDIER_NAME}"
      fi
      chown -R "${USER_NODE_NAME}:${GROUP_NODE_NAME}"       "/home/${USER_NODE_NAME}"
      chown -R "${USER_NPX_NAME}:${GROUP_NODE_NAME}"        "/home/${USER_NPX_NAME}"
      chown -R "${USER_NPM_NAME}:${GROUP_NODE_NAME}"        "/home/${USER_NPM_NAME}"
      chown -R "${USER_PNPM_NAME}:${GROUP_NODE_NAME}"       "/home/${USER_PNPM_NAME}"
      chown -R "${USER_YARN_NAME}:${GROUP_NODE_NAME}"       "/home/${USER_YARN_NAME}"
      chown -R "${USER_NAME}:${GROUP_USERS_NAME}"           "/home/${USER_NAME}"
      chown -R "${USER_READER_NAME}:${GROUP_READER_NAME}"   "/home/${USER_READER_NAME}"

      if [[ ( "${ADD_SUDIERS}" == "true" ) ]]; then
        chmod 700   "${USER_SUDIER_BASH_LOGIN}"
      fi
      chmod 700   "${USER_NODE_BASH_LOGIN}"
      chmod 700   "${USER_NPX_BASH_LOGIN}"
      chmod 700   "${USER_NPM_BASH_LOGIN}"
      chmod 700   "${USER_PNPM_BASH_LOGIN}"
      chmod 700   "${USER_YARN_BASH_LOGIN}"
      chmod 700   "${USER_BASH_LOGIN}"
      chmod 700   "${USER_READER_BASH_LOGIN}"



      ### SHOW INSTALLED PACKS VERSIONS
      ### THE FIRST VERSIONS INSTALLED WITH THIS NODEJS PACK
      echo -e "\n node --version "
      node --version

      echo -e "\n corepack --version "
      corepack --version

      echo -e "\n npx --version "
      npx --version

      echo -e "\n npm --version "
      npm --version



      touch "${bash_login_written_marker}"
      marker_bash_login_written="$YES"

    fi



### YARN AND PNPM INSTALL,
###    both don't work,
###    yarn: installed well,
###    pnpm: NOPE, I haven't started to work on pnpm install.

    export yarn_conf_home="${USER_HOME}/.yarn"
    export yarn_install_home="${YARN_HOME}/${YARN_VERSION}"

### @install npm
    if [[ ( "${marker_first_start}" == "$YES" ) && ( "${marker_nodemodules_installed}" != "$YES" ) ]]; then

      ### The custom compatible NPM ver. is being installed
      ### when in .env NPM_VER_FORCE_INSTALL=true
      ### if in .env NPM_VER_FORCE_INSTALL=false, the NPM was installed nevertheless before with NODE install
      if [[ "${NPM_VER_FORCE_INSTALL}" == "true" ]]; then
          npm install -g "npm@${NPM_VERSION}"
          # sudo -u ${USER_NPM_NAME} /bin/bash -c ". /home/${USER_NPM_NAME}/.bashrc; npm install -g "npm@${NPM_VERSION}""
      fi


      ### YARN INSTALL WORKS SINCE 22. DEC 2025,
      ### HOWEVER
      ###    COULD NOT USE YARN, DUE TO LACK OF KNOWLEDGE,
      ###    DID NOT OPTIMIZE WITH TARBALL CACHE,
      ###    DIDN'T INSTALL node_modules WITH YARN
      if [[ "${YARN_INSTALL}" == "true" ]]; then

          echo "Yarn installation starts ..."

          echo "TO SAVE TARBALL FOR YARN, DIDN'T TEST NEITHER REUSED THE TARBALL, corepack pack "yarn@v${YARN_VERSION}" ..."
          ### NOT DONE FEATURE TO SAVE TARBALL FOR YARN,
          ### DIDN'T TEST NEITHER REUSED THE TARBALL
          corepack pack "yarn@v${YARN_VERSION}" -o "${yarn_install_home}/yarn.js"
          # corepack pack "yarn@v${YARN_VERSION}"

          echo "corepack install --global "yarn@v${YARN_VERSION}" ..."
          corepack install --global "yarn@v${YARN_VERSION}"

          echo "corepack enable yarn"
          corepack enable yarn

      fi

    fi



### @install express
    if [[ ( "${marker_first_start}" == "$YES" ) && ( "${marker_nodemodules_installed}" != "$YES" ) ]]; then

        if [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "yarn" ]]; then
            echo "NOT WORKING: yarn install"
            ### NOT WORKING
            # yarn install
            sudo -u ${USER_YARN_NAME} /bin/bash -c ". /home/${USER_NPM_NAME}/.bashrc; cd "${IN_DOCKER_WORKSPACE_VOLUME}/ts/express"; yarn install"

          elif [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "pnpm" ]]; then
            exit 5

          else
            echo "npm install"
            # sudo -u ${USER_NPM_NAME} /bin/bash -c ". /home/${USER_NPM_NAME}/.bashrc; cd "${IN_DOCKER_WORKSPACE_VOLUME}/ts/express"; npm install"
            /bin/bash -c  ". /home/${USER_NAME}/.bashrc; cd "${IN_DOCKER_WORKSPACE_VOLUME}/ts/express"; npm install"
        fi

    fi



### @install typescript and other
    if [[ ( "${marker_first_start}" == "$YES" ) && ( "${marker_nodemodules_installed}" != "$YES" ) ]]; then

        if [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "yarn" ]]; then
            sudo -u ${USER_YARN_NAME} /bin/bash -c ". /home/${USER_YARN_NAME}/.bashrc; cd "${IN_DOCKER_WORKSPACE_VOLUME}/ts"; yarn install"

          elif [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "pnpm" ]]; then
            exit 5

          else
            echo "npm install"
            # npm install
            # sudo -u ${USER_NPM_NAME} /bin/bash -c ". /home/${USER_NPM_NAME}/.bashrc; cd "${IN_DOCKER_WORKSPACE_VOLUME}/ts"; npm install"
            /bin/bash -c ". /home/${USER_NAME}/.bashrc; cd "${IN_DOCKER_WORKSPACE_VOLUME}/ts"; npm install"
        fi

    fi



### saves marker to know the node_modukes were installed
    if [[ ( "${marker_first_start}" == "$YES" ) && ( "${marker_nodemodules_installed}" != "$YES" ) ]]; then
        touch "${nodemodules_installed_marker}"
        marker_nodemodules_installed="$YES"
    fi



### SHOW INSTALLED PACKS VERSIONS
    if [[ ( "${marker_first_start}" == "$YES" ) && ( "${NPM_VER_FORCE_INSTALL}" == "true" ) ]]; then
        echo -e "\n\n === NPM_VER_FORCE_INSTALL=${NPM_VER_FORCE_INSTALL}"

        echo -e "\n node --version "
        node --version

        echo -e "\n corepack --version "
        corepack --version

        echo -e "\n npx --version "
        npx --version

        echo -e "\n npm --version "
        npm --version

        if [[ "${YARN_INSTALL}" == "true" ]]; then
                echo -e "\n INSTALLED FINE, DIDN'T TEST NOR USE \n      ( I appolologize due to lack of experience ) \n yarn --version "
                yarn --version
        fi

        if [[ "${PNPM_INSTALL}" == "true" ]]; then
                echo -e "\n pnpm --version "
                pnpm --version
        fi

    fi



### STARTS HTTP ENDPOINTS
### @start_services
# export NODE_HTTP_FLAT_PORT
# export NODE_HTTPS_PORT

if [[ "${start_node_https}" == "true" ]]; then

  echo -e "\n Node Secure Server starts ... "
  if [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "yarn" ]]; then
          echo -e "\n yarn https & "
          # sudo -u ${USER_YARN_NAME} /bin/bash -c ". /home/${USER_YARN_NAME}/.bashrc; cd "${IN_DOCKER_WORKSPACE_VOLUME}/ts"; yarn https &"
          yarn https &

        elif [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "pnpm" ]]; then
          echo -e "\n pnpm --version "
          sudo -u ${USER_PNPM_NAME} /bin/bash -c ". /home/${USER_PNPM_NAME}/.bashrc; pnpm --version"
          # pnpm --version

        else
          echo -e "\n npm run https & "
          # sudo -u ${USER_NPM_NAME} /bin/bash -c ". /home/${USER_NPM_NAME}/.bashrc; cd "${IN_DOCKER_WORKSPACE_VOLUME}/ts"; npm run https &"
          npm --prefix "${IN_DOCKER_WORKSPACE_VOLUME}/ts" run https &
  fi

fi



if [[ "${start_node_http_flat}" == "true" ]]; then

  echo -e "\n Node http starts ... "
  if [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "yarn" ]]; then
          echo -e "\n yarn http_flat & "
          # sudo -u ${USER_YARN_NAME} /bin/bash -c ". /home/${USER_YARN_NAME}/.bashrc; cd "${IN_DOCKER_WORKSPACE_VOLUME}/ts"; yarn http_flat &"
          yarn http_flat &

        elif [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "pnpm" ]]; then
          echo -e "\n pnpm --version "
          sudo -u ${USER_PNPM_NAME} /bin/bash -c ". /home/${USER_PNPM_NAME}/.bashrc; pnpm --version"
          # pnpm --version

        else
          echo -e "\n npm run http_flat & "
          # sudo -u ${USER_NPM_NAME} /bin/bash -c ". /home/${USER_NPM_NAME}/.bashrc; cd "${IN_DOCKER_WORKSPACE_VOLUME}/ts"; npm run http_flat &"
          npm --prefix "${IN_DOCKER_WORKSPACE_VOLUME}/ts" run http_flat &

  fi

  # npm --prefix "${IN_DOCKER_WORKSPACE_VOLUME}/ts" run http_flat &  # @explained without &: Starts and holds dockerized service working
fi



if [[ "${start_express_secure}" == "true" ]]; then

  echo -e "\n Express Framework Secure starts ... "
  if [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "yarn" ]]; then
          echo -e "\n yarn secure_start & "
          # yarn secure_start &
          sudo -u ${USER_YARN_NAME} /bin/bash -c ". /home/${USER_YARN_NAME}/.bashrc; cd "${IN_DOCKER_WORKSPACE_VOLUME}/ts/express"; yarn secure_start &"

        elif [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "pnpm" ]]; then
          echo -e "\n pnpm --version "
          # pnpm --version
          sudo -u ${USER_PNPM_NAME} /bin/bash -c ". /home/${USER_PNPM_NAME}/.bashrc; pnpm --version"

        else
          echo -e "\n npm run secure_start & "
          # sudo -u ${USER_NPM_NAME} /bin/bash -c ". /home/${USER_NPM_NAME}/.bashrc; cd "${IN_DOCKER_WORKSPACE_VOLUME}/ts/express"; npm run secure_start &"
          npm --prefix "${IN_DOCKER_WORKSPACE_VOLUME}/ts/express" run secure_start &

  fi

  # npm --prefix "${IN_DOCKER_WORKSPACE_VOLUME}/ts/express" run secure_start  # @explained &: Start in background every process to be able to start also other processes, every with the ampersand sing
fi



if [[ "${start_express_flat}" == "true" ]]; then
  echo -e "\n Express Framework starts ... "
  if [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "yarn" ]]; then
          echo -e "\n yarn start "
          # yarn run start
          sudo -u ${USER_YARN_NAME} /bin/bash -c ". /home/${USER_YARN_NAME}/.bashrc; cd "${IN_DOCKER_WORKSPACE_VOLUME}/ts/express"; yarn run start &"

        elif [[ "${PROJECT_NODE_PACKAGE_MANAGER}" == "pnpm" ]]; then
            echo -e "\n pnpm --version "
            # pnpm --version
            sudo -u ${USER_PNPM_NAME} /bin/bash -c ". /home/${USER_PNPM_NAME}/.bashrc; pnpm --version"

        else
          echo -e "\n npm run start "
          # sudo -u ${USER_NPM_NAME} /bin/bash -c ". /home/${USER_NPM_NAME}/.bashrc; cd "${IN_DOCKER_WORKSPACE_VOLUME}/ts/express"; npm run start &"
          npm --prefix "${IN_DOCKER_WORKSPACE_VOLUME}/ts/express" run start
  fi
fi



if [[ ( "${marker_first_start}" == "$YES" ) ]]; then
  touch "${first_start_marker}"

  # this is the first docker start.
  #    with the marker set,
  #    the next time on start,
  #    the code isn't executed til this code block.
  #; marker_first_start="$YES"
fi



exec "$@"

exit 0



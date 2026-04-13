FROM alpine:3.23



# ---------------------
# -- local variables available in entrypoint bash script entrypoint.sh --
#    entrypoint bash script runs,
#        after volumes are available in docker local filesystem, and the Alpine OS built.
#    entrypoint runs every time on docker compose restart,
#        that is why markers are used in if statements in order to get know,
#        whether build time or all other next (re)starts times.
#    templates are thought like command line shell scripts copies one way to docker filesystem,
#        e.g for .profile bash scripts, running on every $docker exec bash => logging into docker service's terminal.
ENV workdir="/dockr"
ENV markers="/markers"
ENV templates="/templates"


WORKDIR "${workdir}"


# -- Dockerdocs AI --
# To avoid compatibility issues, always:
#
#   Pin the base image version (e.g., FROM alpine:3.23)
#   Pin package versions as needed (e.g., apk add package=version)
#   Avoid apk upgrade unless you want to update all installed packages to their latest versions within the current Alpine release
#   This prevents unexpected changes in package versions and API incompatibilities.
RUN apk update

RUN apk add ca-certificates
RUN apk add curl
RUN apk add openssl
#RUN apk add libgcc
#RUN apk add libstdc++
## RUN apk add git
RUN apk add bash

# -- admin privilegs libraries installation --
RUN apk add sudo
RUN apk add shadow
# RUN apk add util-linux


RUN apk add    php83
RUN apk add    php83-fpm

RUN apk add    php83-common
RUN apk add    php83-curl
RUN apk add    php83-fileinfo
# RUN apk add    php83-gd
RUN apk add    php83-json
RUN apk add    php83-iconv
RUN apk add    php83-mbstring
# RUN apk add    php83-opcache
RUN apk add    php83-openssl
RUN apk add    php83-pear
RUN apk add    php83-phar
RUN apk add    php83-session
RUN apk add    php83-xml
RUN apk add    php83-zip

# -- Work with SQL securely --
# RUN apk add    php83-pdo
# RUN apk add    php83-pdo_mysql
# RUN apk add    php83-pdo_pgsql



# -------------------------------------
# -- Super Admin Alpine OS User --
# Dockerfile instructions as Super Admin Alpine OS User,
#   starting from this code line, and for the other code lines. --
USER   root


ARG a_php_conf_folder="/etc/php83"
ARG a_php_confd_folder="${a_php_conf_folder}/conf.d"
ARG a_fpm_php_conf_folder="${a_php_conf_folder}/php-fpm.d"

ARG a_backup_php_conf_folder="/etc/backup/php83/conf"
ARG a_backup_php_confd_folder="${a_backup_php_conf_folder}/conf.d"
ARG a_backup_fpm_php_conf_folder="${a_backup_php_conf_folder}/php-fpm.d"



ARG A_GROUP_USERS_NAME

ARG A_USER_NAME
ARG A_USER_HASHED_PWD="q6DDn07ExN73M"

ARG A_PHP_SOFTWARE_HOME



RUN addgroup "${A_GROUP_USERS_NAME}"
RUN adduser  -G "${A_GROUP_USERS_NAME}" -D "${A_USER_NAME}"
RUN echo "${A_USER_NAME}:${A_USER_HASHED_PWD}" | chpasswd -e

RUN addgroup "root" "${A_GROUP_USERS_NAME}"



  # -- sudo infrastructure --
ARG   sudiers_dirname="/etc/sudoers.d"
ARG   sudiers_file_name="${sudiers_dirname}/${A_GROUP_USERS_NAME}"

RUN   mkdir -p "${sudiers_dirname}"

RUN   touch "${sudiers_file_name}"
RUN   chmod u+rw "${sudiers_file_name}"

RUN   echo -e "# The custom group in this test image\n" >> "${sudiers_file_name}"
RUN   echo -e "%${A_GROUP_USERS_NAME} ALL=(ALL) ALL\n" >> "${sudiers_file_name}"
RUN   echo -e "%${A_GROUP_USERS_NAME} ALL=(ALL) NOPASSWD:SETENV: /entrypoint/entrypoint.sh, /usr/bin/sudo -E --non-interactive /entrypoint/entrypoint.sh\n" >> "${sudiers_file_name}"
RUN   echo -e "\n\n\n" >> "${sudiers_file_name}"


  # -- the right fs mode for sudiers' file --
RUN   chmod 440 "${sudiers_file_name}"



# -- custom files and folders in docker filesystem for infrastructure --
RUN mkdir -p "${markers}"
RUN mkdir -p "${templates}"
RUN mkdir -p "/entrypoint"
RUN mkdir -p "/usr/local/bin"


# -- just allowances, keeping this code block little --
#    in entrypoint the user privilegs are set,
#    since only in entrypoint .env variables for users names, ids and groups may have access,
#    then all users and groups may be added only in entrypoint,
#    then the code block in entrypoint for filesystem privilegs may be written in entrypoint,
#    having overview of all filesystem resources in one bash code block,
#    we have interest on for a docker service, in time of designing privilegs.
RUN chmod -R a+r    "${markers}"
RUN chmod -R ug+rwx "${markers}"

RUN chmod -R a+r    "${templates}"

COPY   "./entrypoint.sh"    "/entrypoint/entrypoint.sh"
# COPY   "./server_start.sh"  "/entrypoint/server_start.sh"
COPY   "./templates/profile"  "${templates}/profile"
RUN chmod -R a+rx   "/entrypoint"

RUN chmod -R a+rx  "/usr/local/bin"
RUN chmod -R ug+w  "/usr/local/bin"


# -- one .env variable accessed --
# Docker, docker-compose.yml and Dockerfile,
#    for the finer Docker Security feature,
#    are planned and designed,
#    not to have too wide grants or privilegs.
# After several weeks of engineering research before,
#    and several testing coding sessions in diferent years in 2020ths,
#    I code this only way,
#    the command line shell variable from .env file,
#    may be the nice way, always working, accessed in Dockerfile.
# How to: (\n for new line)
#    path to .env file:   compose.yml: services:\n   a_service:\n   env_file:\n    - "./.env_for_yml"
#    declare variable:    compose.yml: services:\n   a_service:\n   build:\n   args:\n   - "A_USER_NAME=${USER_NAME}"
#    where:
#       ${USER_NAME} is variable from .env like this: USER_NAME=user
#    keyword ARG for declaring Dockerfile variables build time,
#       not available neither in entrypoint,
#       nor in docker console after $_ docker compose exec a_service bash
#    keyword ENV for declaring variables available in both three: Dockerfile, entrypoint, terminal.
#    other ways, however were documented, didn't work before and neither today, on 12th of mars in year AC 2026.
ARG A_WHETHER_DEV_MODE
ARG A_PHP_SOFTWARE_HOME

ENV WHETHER_DEV_MODE="${A_WHETHER_DEV_MODE}"
ENV PHP_SOFTWARE_HOME="${A_PHP_SOFTWARE_HOME}"

RUN mkdir -p "${a_backup_php_conf_folder}"
RUN mkdir "${a_backup_php_confd_folder}"
RUN mkdir "${a_backup_fpm_php_conf_folder}"

RUN mkdir -p "${A_PHP_SOFTWARE_HOME}/conf"
RUN mkdir "${A_PHP_SOFTWARE_HOME}/conf/examples"
RUN mkdir "${A_PHP_SOFTWARE_HOME}/pids"
RUN if [ ! -e "${a_php_conf_folder}" ]; then mkdir -p "${a_php_conf_folder}"; fi
RUN if [ ! -e "${a_php_confd_folder}" ]; then mkdir -p "${a_php_confd_folder}"; fi
RUN if [ ! -e "${a_fpm_php_conf_folder}" ]; then mkdir -p "${a_fpm_php_conf_folder}"; fi
RUN if [ ! -e "${A_PHP_SOFTWARE_HOME}/tmp/uploads" ]; then mkdir -p "${A_PHP_SOFTWARE_HOME}/tmp/uploads"; fi

COPY "./conf/php83/php.ini"         "${A_PHP_SOFTWARE_HOME}/conf/examples/php.ini"
COPY "./conf/php83/php-fpm.conf"    "${A_PHP_SOFTWARE_HOME}/conf/examples/php-fpm.ini"
COPY "./conf/php83/php-fpm.d/pool_workspace.conf"     "${A_PHP_SOFTWARE_HOME}/conf/examples/pool_workspace.conf"

COPY "./conf/php83/conf.d/dc_curl.ini"  "${A_PHP_SOFTWARE_HOME}/conf/examples/92_curl.ini"
COPY "./conf/php83/conf.d/dc_iconv.ini"  "${A_PHP_SOFTWARE_HOME}/conf/examples/92_iconv.ini"
COPY "./conf/php83/conf.d/dc_session.ini"  "${A_PHP_SOFTWARE_HOME}/conf/examples/92_session.ini"
COPY "./conf/php83/conf.d/dc_xdebug.ini"  "${A_PHP_SOFTWARE_HOME}/conf/examples/92_xdebug.ini"



# COPY "${a_php_conf_folder}/php.ini" "${a_backup_php_conf_folder}/php.ini"
# COPY "${a_php_conf_folder}/php-fpm.conf" "${a_backup_php_conf_folder}/php-fpm.conf"
# COPY "${a_fpm_php_conf_folder}/www.conf" "${a_backup_fpm_php_conf_folder}/www.conf"

# Install Your custom php and xdebug config files
COPY "./conf/php83/php.ini"         "${a_php_conf_folder}/php.ini"
COPY "./conf/php83/php-fpm.conf"    "${a_php_conf_folder}/php-fpm.conf"
COPY "./conf/php83/php-fpm.d/pool_workspace.conf"  "${a_fpm_php_conf_folder}/pool_workspace.conf"
RUN  rm "${a_fpm_php_conf_folder}/www.conf"



ENV php_conf_folder="${a_php_conf_folder}"
ENV php_confd_folder="${a_php_confd_folder}"
ENV fpm_php_conf_folder="${a_fpm_php_conf_folder}"

ENV USER_NAME="${A_USER_NAME}"
ENV USER_HOME="/home/${USER_NAME}"



# EXPOSE ${PHP_FPM_FLAT_PORT}
# EXPOSE ${PHP_FPM_STATUS_PORT}
# EXPOSE ${PHP_XDEBUG_FLAT_PORT}

# - php_fpm --
EXPOSE 9020
# -- php_composer --
EXPOSE 9025

EXPOSE 9022
EXPOSE 9050



USER "${USER_NAME}"

# WORKDIR "${IN_DOCKER_WORKSPACE_VOLUME}"

WORKDIR "${USER_HOME}"

# -------------------------------------
# -- ENTRYPOINT --
# After docker service build due code lines in this Dockerfile,
#   the entrypoint runs on every (re)start of this docker service
# ENTRYPOINT [ "sudo", "-E", "--non-interactive", "/entrypoint/entrypoint.sh" ]
ENTRYPOINT [ "/usr/bin/sudo", "-E", "--non-interactive", "/entrypoint/entrypoint.sh" ]



# -------------------------------------
# -- MAIN DOCKER SERVICE START --
# This code keeps docker service on,
#   after instructions in entrypoint have run
#   on every (re)start of this docker service
CMD [ "tail", "-f", "/dev/null" ]



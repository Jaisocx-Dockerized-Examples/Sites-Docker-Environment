# amd64 CPU Architecture, when not working, I have one more docker build, with arm64/v8
FROM jaisocx/webserver:amd64.3.0.16

# arm64/v8 CPU Architecture
# FROM jaisocx/webserver:mac.latest
# FROM alpine:3.23



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



# -------------------------------------
# -- Super Admin Alpine OS User --
# Dockerfile instructions as Super Admin Alpine OS User,
#   starting from this code line, and for the other code lines. --
USER   root


# ARG A_GROUP_SUDIER_ID
ARG A_GROUP_USERS_NAME

ARG A_USER_NAME
ARG A_USER_HASHED_PWD="q6DDn07ExN73M"

ARG A_JAISOCX_SOFTWARE_HOME



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
COPY   "./server_start.sh"  "/entrypoint/server_start.sh"
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
# ARG A_WHETHER_DEV_MODE
# ENV WHETHER_DEV_MODE="${A_WHETHER_DEV_MODE}"

ARG A_JAISOCX_SOFTWARE_HOME
ENV JAISOCX_SOFTWARE_HOME="${A_JAISOCX_SOFTWARE_HOME}"



EXPOSE 2297
EXPOSE 8447


ENV LOCAL_ENV="${A_LOCAL_ENV}"
ENV USER_NAME="${A_USER_NAME}"
ENV USER_HOME="/home/${USER_NAME}"



USER "${USER_NAME}"

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



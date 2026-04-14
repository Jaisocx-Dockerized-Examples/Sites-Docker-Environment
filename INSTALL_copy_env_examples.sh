#/usr/bin/env bash

  this_folder="$(realpath "$(dirname "$0")")"
  backup_folder="${this_folder}/env_backups"
  fname_example=""

  replace() {
    local in_text_value="$1"
    local in_to_replace="$2"
    local in_replaced_with="$3"

    # Transform the text value by replacing the delimiter with a newline
    local transformed_value="$(echo "${in_text_value}" | tr "${in_to_replace}" "${in_replaced_with}")"

    echo "${transformed_value}"
  }

  mkdir -p "${backup_folder}"



  envs=(
    ".env"
    ".env_beyond_yml"
  )
  cd "${this_folder}"

  for fname_env in $envs; do
    fname_example="example_$(printf "%s" "$fname_env" | cut -d'.' -f2- | xargs)"
    if [ -e "${this_folder}/${fname_env}" ]; then
      cp "${this_folder}/${fname_env}"  "${backup_folder}/bckp${fname_env}"
    fi
    cp "${this_folder}/${fname_example}"  "${this_folder}/${fname_env}"
  done;



  ymls=(
    "docker-compose.yml"
  )
  # cd "${this_folder}"

  for fname_env in $ymls; do
    fname_example="example_${fname_env}"
    if [ -e "${this_folder}/${fname_env}" ]; then
      cp "${this_folder}/${fname_env}"  "${backup_folder}/bckp${fname_env}"
    fi
    cp "${this_folder}/${fname_example}"  "${this_folder}/${fname_env}"
  done;



  dyn_folder_envs="workspace/env_dc_dinamique"
  dyn_envs=(
    ".env_a4dc"
    ".env_jaisocx"
    ".env_php"
  )
  cd "${this_folder}/${dyn_folder_envs}"

  for fname_env in dyn_envs; do

    fname_example="example_$(printf "%s" "$fname_env" | cut -d'.' -f2- | xargs)"

    if [ ! -e "${backup_folder}/${dyn_folder_envs}" ]; then
      mkdir -p "${backup_folder}/${dyn_folder_envs}"
    fi

    if [ -e "${this_folder}/${dyn_folder_envs}/${fname_env}" ]; then
      cp "${this_folder}/${dyn_folder_envs}/${fname_env}"  "${backup_folder}/${dyn_folder_envs}/bckp${fname_env}"
    fi

    cp "${this_folder}/${dyn_folder_envs}/${fname_example}"  "${this_folder}/${dyn_folder_envs}/${fname_env}"

  done;



  command_folder_envs="command"
  command_envs=(
    ".env"
  )
  cd "${this_folder}/${command_folder_envs}"

  for fname_env in command_envs; do

    fname_example="example_$(printf "%s" "$fname_env" | cut -d'.' -f2- | xargs)"

    if [ ! -e "${backup_folder}/${command_folder_envs}" ]; then
      mkdir -p "${backup_folder}/${command_folder_envs}"
    fi

    if [ -e "${this_folder}/${command_folder_envs}/${fname_env}" ]; then
      cp "${this_folder}/${command_folder_envs}/${fname_env}"  "${backup_folder}/${command_folder_envs}/bckp${fname_env}"
    fi

    cp "${this_folder}/${command_folder_envs}/${fname_example}"  "${this_folder}/${command_folder_envs}/${fname_env}"

  done;



  php_folder_envs="docker_compose/PHP"
  php_envs=(
    ".env_php_composer"
    ".env_php_fpm"
  )
  cd "${this_folder}/${php_folder_envs}"

  for fname_env in php_envs; do

    fname_example="example_$(printf "%s" "$fname_env" | cut -d'.' -f2- | xargs)"

    if [ ! -e "${backup_folder}/${php_folder_envs}" ]; then
      mkdir -p "${backup_folder}/${php_folder_envs}"
    fi

    if [ -e "${this_folder}/${php_folder_envs}/${fname_env}" ]; then
      cp "${this_folder}/${php_folder_envs}/${fname_env}"  "${backup_folder}/${php_folder_envs}/bckp${fname_env}"
    fi

    cp "${this_folder}/${php_folder_envs}/${fname_example}"  "${this_folder}/${php_folder_envs}/${fname_env}"

  done;



  # "x_example_php_ini.txt"
  # "x_example_php-fpm_conf.txt"
  php_folder_ini="docker_compose/PHP/docker/conf/php83"
  php_ini=(
    "php.ini"
    "php-fpm.conf"
  )
  cd "${this_folder}/${php_folder_ini}"

  for fname_env in php_ini; do

    fname_ext="$(printf "%s" "$fname_env" | cut -d'.' -f2- | xargs)"
    fname_example="x_example_$(printf "%s" "$fname_env" | cut -d'.' -f1 | xargs)_${fname_ext}.txt"

    if [ ! -e "${backup_folder}/php83" ]; then
      mkdir -p "${backup_folder}/php83"
    fi

    if [ -e "${this_folder}/${php_folder_ini}/${fname_env}" ]; then
      cp "${this_folder}/${php_folder_ini}/${fname_env}"  "${backup_folder}/${php_folder_ini}/bckp${fname_env}"
    fi

    cp "${this_folder}/${php_folder_ini}/${fname_example}"  "${this_folder}/${php_folder_ini}/${fname_env}"

  done;



  php_folder="docker_compose/PHP/docker/conf/php83"
  php_folder_example_conf_ini="example_conf.d"
  php_folder_conf_ini="conf.d"
  php_conf_ini=(
    "dc_curl.ini"
    "dc_iconv.ini"
    "dc_session.ini"
    "dc_xdebug.ini"
  )
  cd "${this_folder}/${php_folder}"

  if [ -e "${this_folder}/${php_folder}/${php_folder_conf_ini}" ]; then
    cp -R "${this_folder}/${php_folder}/${php_folder_conf_ini}"  "${backup_folder}/${php_folder}/${php_folder_conf_ini}"
  fi

  if [ ! -e "${this_folder}/${php_folder}/${php_folder_conf_ini}" ]; then
    mkdir -p "${this_folder}/${php_folder}/${php_folder_conf_ini}"
  fi

  cp -R "${this_folder}/${php_folder}/${php_folder_example_conf_ini}"   "${this_folder}/${php_folder}/${php_folder_conf_ini}"



  # "example_pool_workspace_conf.txt"
  php_fpm_folder_confs="docker_compose/PHP/docker/conf/php83/php-fpm.d"
  php_fpm_confs=(
    "pool_workspace.conf"
  )
  cd "${this_folder}/${php_fpm_folder_confs}"

  for fname_env in php_fpm_confs; do

    fname_ext="$(printf "%s" "$fname_env" | cut -d'.' -f2- | xargs)"
    fname_example="example_$(printf "%s" "$fname_env" | cut -d'.' -f1 | xargs)_${fname_ext}.txt"

    if [ ! -e "${backup_folder}/${php_fpm_folder_confs}" ]; then
      mkdir -p "${backup_folder}/${php_fpm_folder_confs}"
    fi

    if [ -e "${this_folder}/${php_fpm_folder_confs}/${fname_env}" ]; then
      cp "${this_folder}/${php_fpm_folder_confs}/${fname_env}"  "${backup_folder}/${php_fpm_folder_confs}/bckp${fname_env}"
    fi

    cp "${this_folder}/${php_fpm_folder_confs}/${fname_example}"  "${this_folder}/${php_fpm_folder_confs}/${fname_env}"

  done;



  # "example_blacklist.txt"
  jaisocx_folder_ip_lists="docker_compose/Jaisocx_SitesServer/http/etc/ip-lists"
  jaisocx_ip_lists=(
    "blacklist.txt"
    "whitelist.txt"
  )
  cd "${this_folder}/${jaisocx_folder_ip_lists}"

  for fname_env in jaisocx_ip_lists; do

    fname_example="example_${fname_env}"

    if [ ! -e "${backup_folder}/${jaisocx_folder_ip_lists}" ]; then
      mkdir -p "${backup_folder}/${jaisocx_folder_ip_lists}"
    fi

    if [ -e "${this_folder}/${jaisocx_folder_ip_lists}/${fname_env}" ]; then
      cp "${this_folder}/${jaisocx_folder_ip_lists}/${fname_env}"  "${backup_folder}/${jaisocx_folder_ip_lists}/bckp${fname_env}"
    fi

    cp "${this_folder}/${jaisocx_folder_ip_lists}/${fname_example}"  "${this_folder}/${jaisocx_folder_ip_lists}/${fname_env}"

  done;



  # "example_server.properties"
  jaisocx_folder_etc="docker_compose/Jaisocx_SitesServer/http/etc"
  jaisocx_etc=(
    "server.properties"
  )
  cd "${this_folder}/${jaisocx_folder_etc}"

  for fname_env in jaisocx_etc; do

    fname_example="example_${fname_env}"

    if [ ! -e "${backup_folder}/${jaisocx_folder_etc}" ]; then
      mkdir -p "${backup_folder}/${jaisocx_folder_etc}"
    fi

    if [ -e "${this_folder}/${jaisocx_folder_etc}/${fname_env}" ]; then
      cp "${this_folder}/${jaisocx_folder_etc}/${fname_env}"  "${backup_folder}/${jaisocx_folder_etc}/bckp${fname_env}"
    fi

    cp "${this_folder}/${jaisocx_folder_etc}/${fname_example}"  "${this_folder}/${jaisocx_folder_etc}/${fname_env}"

  done;



  jaisocx_folder_confs="docker_compose/Jaisocx_SitesServer/http/conf"
  jaisocx_confs=(
    "http-conf.xml"
    "idm-conf.xml"
  )
  cd "${this_folder}/${jaisocx_folder_confs}"

  for fname_env in jaisocx_confs; do

    fname_example="example_${fname_env}"

    if [ ! -e "${backup_folder}/${jaisocx_folder_confs}" ]; then
      mkdir -p "${backup_folder}/${jaisocx_folder_confs}"
    fi

    if [ -e "${this_folder}/${jaisocx_folder_confs}/${fname_env}" ]; then
      cp "${this_folder}/${jaisocx_folder_confs}/${fname_env}"  "${backup_folder}/${jaisocx_folder_confs}/bckp${fname_env}"
    fi

    cp "${this_folder}/${jaisocx_folder_confs}/${fname_example}"  "${this_folder}/${jaisocx_folder_confs}/${fname_env}"

  done;



  mkdir -p "command/security"
  echo -e "#!/bin/bash\n  owner_pwd=\"<owner_password>\"\n\n" > "./command/security/.owner_pwd"
  echo -e "<user_password>" > "./command/security/.user_pwd"
  chmod -R 740 "command/security"



  cd "${this_folder}/workspace/cdn"
  yarn install
  # npm install

  # for composer installs, thought the mod=dev docker service [php_composer] in the open docker network
  #    $_ docker compose exec php_composer bash
  #    $_ cd "${IN_DOCKER_WORKSPACE_VOLUME}/php_packages"
  #    $_ composer install
  exit 0

  cd "${this_folder}/workspace/php_packages"
  composer install



#/bin/bash

  this_folder="$(realpath "$(dirname "$0")")"
  backup_folder="${this_folder}/env_backups"
  fname_example=""
  folder_name=""



#; creates folder for backups of .env files
  mkdir -p "${backup_folder}"



#; creates gitignored system folders
#;  in docker_compose/<service_name> ( logs, tarballs ),
#;  these aren't saved on git server.
  docker_compose_folder="docker_compose"
  docker_services=(
    "Prince"
    "PHP"
    "Jaisocx_SitesServer"
    "ts"
  )

  for fname_env in ${docker_services[@]}; do

    folder_name="${fname_env}"

    folder_rel_path="logs"
    folder_to_create="${this_folder}/${docker_compose_folder}/${folder_name}/${folder_rel_path}"
    if [ ! -e "${folder_to_create}" ]; then
      echo -e "[Docker Compose] [${folder_name}]: ${folder_rel_path} in ${this_folder}/${docker_compose_folder}/${folder_name}"
      mkdir -p "${folder_to_create}"
    fi

    folder_rel_path="tarballs"
    folder_to_create="${this_folder}/${docker_compose_folder}/${folder_name}/${folder_rel_path}"
    if [ ! -e "${folder_to_create}" ]; then
      echo -e "[Docker Compose] [${folder_name}]: ${folder_rel_path} in ${this_folder}/${docker_compose_folder}/${folder_name}"
      mkdir -p "${folder_to_create}"

      echo -e "\n"
    fi

  done;



#; copies .envs from examples
#;  in the root of the project
  envs=(
    ".env"
    ".env_beyond_yml"
  )

  for fname_env in ${envs[@]}; do
    fname_example="example_$(printf "%s" "$fname_env" | cut -d'.' -f2- | xargs)"
    echo -e "[env] [${fname_env}]: cp ./${fname_example} => ${fname_env}"

    #; confs backup
    if [ -e "${this_folder}/${fname_env}" ]; then
      cp "${this_folder}/${fname_env}"  "${backup_folder}/bckp${fname_env}"
    fi

    cp "${this_folder}/${fname_example}"  "${this_folder}/${fname_env}"

  done;
  echo -e "\n"

  . "${this_folder}/.env"



#; a4dc
  if [ ! -e "${WORKSPACE_VOLUME}/gen" ]; then
    mkdir -p "${WORKSPACE_VOLUME}/gen"
  fi

  #; README a4dc security in folder "./cmd/security"
  if [ ! -e "${this_folder}/cmd/security" ]; then
    mkdir -p "${this_folder}/cmd/security"
    touch "${this_folder}/cmd/security/README.md"

    echo -e "# A4DC Security\n\n" >> "${this_folder}/cmd/security/README.md"
    echo -e "Passwords examples reside in folder `./cmd/example_a4dc_security` \n\n" >> "${this_folder}/cmd/security/README.md"
    echo -e "\n\n" >> "${this_folder}/cmd/security/README.md"
  fi


  #; copies passwords example files in the example_a4dc_security folder
  a4dc_security_folder_example="cmd/example_a4dc_security"
  a4dc_pwds=(
    ".owner_pwd"
    ".user_pwd"
    ".https_auth_creds"
  )

  #; creates backup subfolder
  if [ ! -e "${backup_folder}/example_a4dc_security" ]; then
    mkdir -p "${backup_folder}/example_a4dc_security"
  fi

  for fname_env in ${a4dc_pwds[@]}; do

    fname_example="example_$(printf "%s" "$fname_env" | cut -d'.' -f2- | xargs)"
    echo -e "[a4dc example pwds] [${fname_env}]: cp ./${a4dc_security_folder_example}/${fname_example} => ${fname_env}"

    #; confs backup
    if [ -e "${this_folder}/${a4dc_security_folder_example}/${fname_env}" ]; then
      cp "${this_folder}/${a4dc_security_folder_example}/${fname_env}"  "${backup_folder}/example_a4dc_security/bckp${fname_env}"
    fi

    cp "${this_folder}/${a4dc_security_folder_example}/${fname_example}"  "${this_folder}/${a4dc_security_folder_example}/${fname_env}"

  done;
  echo -e "\n"



#; copies docker-compose.yml from example
#;  in the root of the project
  ymls=(
    "docker-compose.yml"
  )

  for fname_env in ${ymls[@]}; do
    fname_example="example_${fname_env}"
    echo -e "[Docker Compose] [${fname_env}]: cp ./${fname_example} => ${fname_env}"

    #; confs backup
    if [ -e "${this_folder}/${fname_env}" ]; then
      cp "${this_folder}/${fname_env}"  "${backup_folder}/bckp${fname_env}"
    fi

    cp "${this_folder}/${fname_example}"  "${this_folder}/${fname_env}"

  done;
  echo -e "\n"



#; copies dinamique .envs from examples
#;  in the mounted volume workspace
  dyn_folder_envs="workspace/env_dc_dinamique"
  dyn_envs=(
    ".env_a4dc"
    ".env_jaisocx"
    ".env_php"
    ".env_ts"
  )

  #; creates envs backup subfolder
  if [ ! -e "${backup_folder}/${dyn_folder_envs}" ]; then
    mkdir -p "${backup_folder}/${dyn_folder_envs}"
  fi

  for fname_env in ${dyn_envs[@]}; do

    fname_example="example_$(printf "%s" "$fname_env" | cut -d'.' -f2- | xargs)"
    echo -e "[dyn envs] [${fname_env}]: cp ./${dyn_folder_envs}/${fname_example} => ${fname_env}"

    #; confs backup
    if [ -e "${this_folder}/${dyn_folder_envs}/${fname_env}" ]; then
      cp "${this_folder}/${dyn_folder_envs}/${fname_env}"  "${backup_folder}/${dyn_folder_envs}/bckp${fname_env}"
    fi

    cp "${this_folder}/${dyn_folder_envs}/${fname_example}"  "${this_folder}/${dyn_folder_envs}/${fname_env}"

  done;
  echo -e "\n"



#; a4dc

  #; a4dc folder.
  #;   You may mount a4dc volume to "${WORKSPACE_VOLUME}/gen/:${IN_DOCKER_WORKSPACE_VOLUME}/gen/"
  if [ ! -e "${WORKSPACE_VOLUME}/gen" ]; then
    mkdir -p "${WORKSPACE_VOLUME}/gen"
  fi

  #; copies .env from example for a4dc Jaisocx command line tool
  command_folder_envs="cmd"
  command_envs=(
    ".env_a4dc"
  )

  #; creates envs backup subfolder
  if [ ! -e "${backup_folder}/${command_folder_envs}" ]; then
    mkdir -p "${backup_folder}/${command_folder_envs}"
  fi

  for fname_env in ${command_envs[@]}; do

    fname_example="example_$(printf "%s" "$fname_env" | cut -d'.' -f2- | xargs)"
    echo -e "[A4DC] [${fname_env}]: cp ./${command_folder_envs}/${fname_example} => ${fname_env}"

    #; confs backup
    if [ -e "${this_folder}/${command_folder_envs}/${fname_env}" ]; then
      cp "${this_folder}/${command_folder_envs}/${fname_env}"  "${backup_folder}/${command_folder_envs}/bckp${fname_env}"
    fi

    cp "${this_folder}/${command_folder_envs}/${fname_example}"  "${this_folder}/${command_folder_envs}/${fname_env}"

  done;
  echo -e "\n"



  #; README a4dc security in folder "./cmd/security"
  if [ ! -e "${this_folder}/cmd/security" ]; then
    mkdir -p "${this_folder}/cmd/security"
    touch "${this_folder}/cmd/security/README.md"

    echo -e "# A4DC Security\n\n" >> "${this_folder}/cmd/security/README.md"
    echo -e "Passwords examples reside in folder `./cmd/example_a4dc_security` \n\n" >> "${this_folder}/cmd/security/README.md"
    echo -e "\n\n" >> "${this_folder}/cmd/security/README.md"
  fi


  #; copies passwords example files in the example_a4dc_security folder
  a4dc_security_folder_example="cmd/example_a4dc_security"
  a4dc_pwds=(
    ".owner_pwd"
    ".user_pwd"
    ".https_auth_creds"
  )

  #; creates backup subfolder
  if [ ! -e "${backup_folder}/example_a4dc_security" ]; then
    mkdir -p "${backup_folder}/example_a4dc_security"
  fi

  for fname_env in ${a4dc_pwds[@]}; do

    fname_example="example_$(printf "%s" "$fname_env" | cut -d'.' -f2- | xargs)"
    echo -e "[a4dc example pwds] [${fname_env}]: cp ./${a4dc_security_folder_example}/${fname_example} => ${fname_env}"

    #; confs backup
    if [ -e "${this_folder}/${a4dc_security_folder_example}/${fname_env}" ]; then
      cp "${this_folder}/${a4dc_security_folder_example}/${fname_env}"  "${backup_folder}/example_a4dc_security/bckp${fname_env}"
    fi

    cp "${this_folder}/${a4dc_security_folder_example}/${fname_example}"  "${this_folder}/${a4dc_security_folder_example}/${fname_env}"

  done;
  echo -e "\n"



#; PHP: copies php service .envs from examples
  php_folder_envs="docker_compose/PHP"
  php_envs=(
    ".env_php_composer"
    ".env_php_fpm"
  )

  if [ ! -e "${backup_folder}/${php_folder_envs}" ]; then
    mkdir -p "${backup_folder}/${php_folder_envs}"
  fi

  for fname_env in ${php_envs[@]}; do

    fname_example="example_$(printf "%s" "$fname_env" | cut -d'.' -f2- | xargs)"
    echo -e "[PHP] [${fname_env}]: cp ./${php_folder_envs}/${fname_example} => ${fname_env}"

    #; confs backup
    if [ -e "${this_folder}/${php_folder_envs}/${fname_env}" ]; then
      cp "${this_folder}/${php_folder_envs}/${fname_env}"  "${backup_folder}/${php_folder_envs}/bckp${fname_env}"
    fi

    cp "${this_folder}/${php_folder_envs}/${fname_example}"  "${this_folder}/${php_folder_envs}/${fname_env}"

  done;
  echo -e "\n"



#; PHP: copies php.ini and php-fpm.conf from examples
  # "x_example_php_ini.txt"
  # "x_example_php-fpm_conf.txt"
  php_folder_ini="docker_compose/PHP/docker/conf/php83"
  php_ini=(
    "php.ini"
    "php-fpm.conf"
  )

  if [ ! -e "${backup_folder}/php83" ]; then
    mkdir -p "${backup_folder}/php83"
  fi

  for fname_env in ${php_ini[@]}; do

    fname_ext="$(printf "%s" "$fname_env" | cut -d'.' -f2- | xargs)"
    fname_example="x_example_$(printf "%s" "$fname_env" | cut -d'.' -f1 | xargs)_${fname_ext}.txt"
    echo -e "[PHP] [${fname_env}]: cp ./${php_folder_ini}/${fname_example} => ${fname_env}"

    #; confs backup
    if [ -e "${this_folder}/${php_folder_ini}/${fname_env}" ]; then
      cp "${this_folder}/${php_folder_ini}/${fname_env}"  "${backup_folder}/${php_folder_ini}/bckp${fname_env}"
    fi

    cp "${this_folder}/${php_folder_ini}/${fname_example}"  "${this_folder}/${php_folder_ini}/${fname_env}"

  done;
  echo -e "\n"



#; PHP: copies php modules .ini from examples
  php_folder="docker_compose/PHP/docker/conf/php83"
  php_folder_example_conf_ini="example_conf.d"
  php_folder_conf_ini="conf.d"
  php_conf_ini=(
    "dc_curl.ini"
    "dc_iconv.ini"
    "dc_session.ini"
    "dc_xdebug.ini"
  )

  #; php confs backup folder
  if [ ! -e "${backup_folder}/php83/${php_folder_conf_ini}" ]; then
    mkdir -p "${backup_folder}/php83/${php_folder_conf_ini}"
  fi

  #; php modules conf.ini folder
  if [ ! -e "${this_folder}/${php_folder}/${php_folder_conf_ini}" ]; then
    mkdir -p "${this_folder}/${php_folder}/${php_folder_conf_ini}"
  fi

  for fname_env in ${php_conf_ini[@]}; do

    echo -e "[PHP] [${fname_env}]: cp ./${php_folder}/${php_folder_example_conf_ini}/${fname_env} => ${fname_env}"

    #; confs backup
    if [ -e "${this_folder}/${php_folder}/${php_folder_conf_ini}/${fname_env}" ]; then
      cp "${this_folder}/${php_folder}/${php_folder_conf_ini}/${fname_env}"  "${backup_folder}/php83/${php_folder_conf_ini}/bckp${fname_env}"
    fi

    cp "${this_folder}/${php_folder}/${php_folder_example_conf_ini}/${fname_env}"  "${this_folder}/${php_folder}/${php_folder_conf_ini}/${fname_env}"

  done;
  echo -e "\n"



#; PHP: copies php-fpm.conf for one php-fpm pool from example
  # "example_pool_workspace_conf.txt"
  php_fpm_folder_confs="docker_compose/PHP/docker/conf/php83/php-fpm.d"
  php_fpm_confs=(
    "pool_workspace.conf"
  )

  if [ ! -e "${backup_folder}/${php_fpm_folder_confs}" ]; then
    mkdir -p "${backup_folder}/${php_fpm_folder_confs}"
  fi

  for fname_env in ${php_fpm_confs[@]}; do

    fname_ext="$(printf "%s" "$fname_env" | cut -d'.' -f2- | xargs)"
    fname_example="example_$(printf "%s" "$fname_env" | cut -d'.' -f1 | xargs)_${fname_ext}.txt"
    echo -e "[PHP] [${fname_env}]: cp ./${php_fpm_folder_confs}/${fname_example} => ${fname_env}"

    #; confs backup
    if [ -e "${this_folder}/${php_fpm_folder_confs}/${fname_env}" ]; then
      cp "${this_folder}/${php_fpm_folder_confs}/${fname_env}"  "${backup_folder}/${php_fpm_folder_confs}/bckp${fname_env}"
    fi

    cp "${this_folder}/${php_fpm_folder_confs}/${fname_example}"  "${this_folder}/${php_fpm_folder_confs}/${fname_env}"

  done;
  echo -e "\n"



#; Jaisocx: Dockerfile from example
  jaisocx_folder_docker="docker_compose/Jaisocx_SitesServer/docker"
  jaisocx_docker=(
    "Dockerfile"
  )

  if [ ! -e "${backup_folder}/${jaisocx_folder_docker}" ]; then
    mkdir -p "${backup_folder}/${jaisocx_folder_docker}"
  fi

  for fname_env in ${jaisocx_docker[@]}; do

    fname_example="example_${fname_env}"
    echo -e "[Jaisocx_SitesServer] [${fname_env}]: cp ./${jaisocx_folder_docker}/${fname_example} => ${fname_env}"

    #; confs backup
    if [ -e "${this_folder}/${jaisocx_folder_docker}/${fname_env}" ]; then
      cp "${this_folder}/${jaisocx_folder_docker}/${fname_env}"  "${backup_folder}/${jaisocx_folder_docker}/bckp${fname_env}"
    fi

    cp "${this_folder}/${jaisocx_folder_docker}/${fname_example}"  "${this_folder}/${jaisocx_folder_docker}/${fname_env}"

  done;
  echo -e "\n"



#; Jaisocx: black- n white- lists of IPs from examples
  # "example_blacklist.txt"
  jaisocx_folder_ip_lists="docker_compose/Jaisocx_SitesServer/http/etc/ip-lists"
  jaisocx_ip_lists=(
    "blacklist.txt"
    "whitelist.txt"
  )

  if [ ! -e "${backup_folder}/${jaisocx_folder_ip_lists}" ]; then
    mkdir -p "${backup_folder}/${jaisocx_folder_ip_lists}"
  fi

  for fname_env in ${jaisocx_ip_lists[@]}; do

    fname_example="example_${fname_env}"
    echo -e "[Jaisocx_SitesServer] [${fname_env}]: cp ./${jaisocx_folder_ip_lists}/${fname_example} => ${fname_env}"

    #; confs backup
    if [ -e "${this_folder}/${jaisocx_folder_ip_lists}/${fname_env}" ]; then
      cp "${this_folder}/${jaisocx_folder_ip_lists}/${fname_env}"  "${backup_folder}/${jaisocx_folder_ip_lists}/bckp${fname_env}"
    fi

    cp "${this_folder}/${jaisocx_folder_ip_lists}/${fname_example}"  "${this_folder}/${jaisocx_folder_ip_lists}/${fname_env}"

  done;
  echo -e "\n"



#; Jaisocx: server configuration file server.properties from example
  # "example_server.properties"
  jaisocx_folder_etc="docker_compose/Jaisocx_SitesServer/http/etc"
  jaisocx_etc=(
    "server.properties"
  )

  if [ ! -e "${backup_folder}/${jaisocx_folder_etc}" ]; then
    mkdir -p "${backup_folder}/${jaisocx_folder_etc}"
  fi

  for fname_env in ${jaisocx_etc[@]}; do

    fname_example="example_${fname_env}"
    echo -e "[Jaisocx_SitesServer] [${fname_env}]: cp ./${jaisocx_folder_etc}/${fname_example} => ${fname_env}"

    #; confs backup
    if [ -e "${this_folder}/${jaisocx_folder_etc}/${fname_env}" ]; then
      cp "${this_folder}/${jaisocx_folder_etc}/${fname_env}"  "${backup_folder}/${jaisocx_folder_etc}/bckp${fname_env}"
    fi

    cp "${this_folder}/${jaisocx_folder_etc}/${fname_example}"  "${this_folder}/${jaisocx_folder_etc}/${fname_env}"

  done;
  echo -e "\n"



#; Jaisocx: urls configuration files from examples
  jaisocx_folder_confs="docker_compose/Jaisocx_SitesServer/http/conf"
  jaisocx_confs=(
    "http-conf.xml"
    "idm-conf.xml"
  )

  if [ ! -e "${backup_folder}/${jaisocx_folder_confs}" ]; then
    mkdir -p "${backup_folder}/${jaisocx_folder_confs}"
  fi

  for fname_env in ${jaisocx_confs[@]}; do

    fname_example="example_${fname_env}"
    echo -e "[Jaisocx_SitesServer] [${fname_env}]: cp ./${jaisocx_folder_confs}/${fname_example} => ${fname_env}"

    #; confs backup
    if [ -e "${this_folder}/${jaisocx_folder_confs}/${fname_env}" ]; then
      cp "${this_folder}/${jaisocx_folder_confs}/${fname_env}"  "${backup_folder}/${jaisocx_folder_confs}/bckp${fname_env}"
    fi

    cp "${this_folder}/${jaisocx_folder_confs}/${fname_example}"  "${this_folder}/${jaisocx_folder_confs}/${fname_env}"

  done;
  echo -e "\n"



#; A4DC Security: passwords
  mkdir -p "cmd/security"
  echo -e "#!/bin/bash\n  owner_pwd=\"<owner_password>\"\n\n" > "./cmd/security/.owner_pwd"
  echo -e "<user_password>" > "./cmd/security/.user_pwd"
  chmod -R 740 "cmd/security"



#; Express framework
  echo -e "[Express framework] [.env.allow-origin]: cp ./workspace/ts/express/example_env_allow-origin => .env.allow-origin"
  cp "${this_folder}/workspace/ts/express/example_env_allow-origin" "${this_folder}/workspace/ts/express/.env.allow-origin"



#; js libraries: package.json from examples
  cdn_installs_folder="workspace/cdn/node_cdn_installs"
  package_json=(
    "package.json"
    "package-lock.json"
  )

  if [ ! -e "${backup_folder}/${cdn_installs_folder}" ]; then
    mkdir -p "${backup_folder}/${cdn_installs_folder}"
  fi

  for fname_env in ${package_json[@]}; do

    fname_example="example_${fname_env}"
    echo -e "[node_cdn_installs package.json] [${fname_env}]: cp ./${cdn_installs_folder}/${fname_example} => ${fname_env}"

    #; confs backup
    if [ -e "${this_folder}/${cdn_installs_folder}/${fname_env}" ]; then
      cp "${this_folder}/${cdn_installs_folder}/${fname_env}"  "${backup_folder}/${cdn_installs_folder}/bckp${fname_env}"
    fi

    cp "${this_folder}/${cdn_installs_folder}/${fname_example}"  "${this_folder}/${cdn_installs_folder}/${fname_env}"

  done;
  echo -e "\n"



#; php libraries: composer.json from examples
  composer_installs_folder="workspace/php/php_packages"
  composer_json=(
    "composer.json"
    "composer.lock"
  )

  if [ ! -e "${backup_folder}/${composer_installs_folder}" ]; then
    mkdir -p "${backup_folder}/${composer_installs_folder}"
  fi

  for fname_env in ${composer_json[@]}; do

    fname_example="example_${fname_env}"
    echo -e "[PHP composer.json] [${fname_env}]: cp ./${composer_installs_folder}/${fname_example} => ${fname_env}"

    #; confs backup
    if [ -e "${this_folder}/${composer_installs_folder}/${fname_env}" ]; then
      cp "${this_folder}/${composer_installs_folder}/${fname_env}"  "${backup_folder}/${composer_installs_folder}/bckp${fname_env}"
    fi

    cp "${this_folder}/${composer_installs_folder}/${fname_example}"  "${this_folder}/${composer_installs_folder}/${fname_env}"

  done;
  echo -e "\n"



#; installs to cdn js libraries from inet
#;   if yarn installed on Host OS
#;   or, may install later in "ts" dockerized nodejs service.
  cd "${this_folder}/workspace/cdn/node_cdn_installs"
  yarn install
  # npm install



#; installs to cdn php libraries from inet
#;   if composer installed on Host OS
#;   or, may install later in "php_composer" dockerized php service.
  # cd "${this_folder}/workspace/php/objdata_example"
  # composer install

  # cd "${this_folder}/workspace/php/php_packages"
  # composer install



  cd "${this_folder}"

  exit 0



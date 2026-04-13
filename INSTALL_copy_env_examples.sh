#/usr/bin/env bash

  envs=(
    ".env"
    ".env_beyond_yml"
  )

  ymls=(
    "docker-compose.yml"
  )

  dyn_folder_envs="./workspace/env_dc_dinamique/"
  dyn_envs=(
    ".env_a4dc"
    ".env_jaisocx"
    ".env_php"
  )

  command_folder_envs="./command/"
  command_envs=(
    ".env"
  )

  php_folder_envs="./docker_compose/PHP/"
  php_envs=(
    ".env_php_composer"
    ".env_php_fpm"
  )

  # "x_example_php_ini.txt"
  # "x_example_php-fpm_conf.txt"
  php_folder_ini="./docker_compose/PHP/docker/conf/php83/"
  php_ini=(
    "php.ini"
    "php-fpm.conf"
  )

  php_folder_conf_ini="./docker_compose/PHP/docker/conf/php83/example_conf.d/"
  php_conf_ini=(
    "dc_curl.ini"
    "dc_iconv.ini"
    "dc_session.ini"
    "dc_xdebug.ini"
  )

  # "example_pool_workspace_conf.txt"
  php_fpm_folder_confs="./docker_compose/PHP/docker/conf/php83/php-fpm.d/"
  php_fpm_confs=(
    "pool_workspace.conf"
  )

  # "example_blacklist.txt"
  jaisocx_folder_ip_lists="./docker_compose/Jaisocx_SitesServer/http/etc/ip-lists/"
  jaisocx_ip_lists=(
    "blacklist.txt"
    "whitelist.txt"
  )

  # "example_server.properties"
  jaisocx_folder_etc="./docker_compose/Jaisocx_SitesServer/http/etc/"
  jaisocx_etc=(
    "server.properties"
  )

  jaisocx_folder_confs="./docker_compose/Jaisocx_SitesServer/http/conf/"
  jaisocx_confs=(
    "http-conf.xml"
    "idm-conf.xml"
  )


  "./command/security/.owner_pwd"
  "./command/security/.user_pwd"



  cd "./workspace/cdn"
  yarn install
  # npm install

  cd "./workspace/php_packages"
  composer install


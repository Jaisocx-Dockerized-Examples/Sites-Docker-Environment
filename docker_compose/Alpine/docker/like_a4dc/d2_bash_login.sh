



    # -- BASH LOGIN --
    if [[ ( "${marker_first_start}" == "$YES" ) && ( "${marker_bash_login_written}" != "$YES" ) ]]; then
      ### BASH BASH_LOGIN FOR USER
      #### the first line to the text variable with bash BASH_LOGIN

      shell_declaration_line="#!/bin/bash"
      bash_login_content="${shell_declaration_line}\n\n"

      PATH="/dockr/${tarball_name}:${PATH}"



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
        "GROUP_A4DC_NAME"
        "USER_A4DC_NAME"
        "USER_A4DC_HOME"
        "GROUP_USERS_NAME"
        "USER_NAME"
        "USER_HOME"
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

      cp "${BASH_LOGIN}" "/home/${USER_NAME}/.bashrc"
      chown "${USER_NAME}:${GROUP_USERS_NAME}"    "/home/${USER_NAME}/.bashrc"
      chmod 700   "/home/${USER_NAME}/.bashrc"

      cp "${BASH_LOGIN}" "/home/${USER_READER_NAME}/.bashrc"
      chown "${USER_READER_NAME}:${GROUP_READER_NAME}"    "/home/${USER_READER_NAME}/.bashrc"
      chmod 700   "/home/${USER_READER_NAME}/.bashrc"



      touch "${bash_login_written_marker}"
      marker_bash_login_written="$YES"

      . "${BASH_LOGIN}"

    fi




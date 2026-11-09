#!/bin/bash

  . "./.env"
  . "./.env_beyond_yml"
  . "./command.env_a4dc"
  . "./commandsecurity/.https_auth_creds"
  . "./commandsecurity/.owner_pwd"
  user_pwd="$( cat "./commandsecurity/.user_pwd")"
  gen_path="gen/${doc_name}${letter_name}.pdf"
  func_contents="$(cat "./commanda4dc_func.sh")"

  script_sources="
      . \"/home/${USER_A4DC_NAME}/.bashrc\"
      ${func_contents}
      a4dc_func \"${doc_name}\" \"${letter_name}\" \"${Author}\" \"${Creator}\" \"${user_pwd}\" \"${owner_pwd}\" \"${letter_doc}\" \"${page_margin}\" \"${IN_DOCKER_WORKSPACE_VOLUME}\" \"${https_auth_method}\" \"${https_auth_user}\" \"${https_auth_p}\"
  "



  if [ -e "${WORKSPACE_VOLUME}/${gen_path}" ]; then
    rm "${gen_path}"
  fi

  docker compose exec -u $USER_A4DC_NAME a4dc bash -c "${script_sources}"



echo "---------------------------------------------------------------"

  if [ -e "${WORKSPACE_VOLUME}/${gen_path}" ]; then
      echo "DONE"
      echo "Produced: $(date)   "${WORKSPACE_VOLUME}/${gen_path}""
      echo -e "\n\n"
      exit 0;

    else
      echo "ERROR, didn't write "${WORKSPACE_VOLUME}/${gen_path}""
      echo -e "\n\n"
      exit 1;

  fi



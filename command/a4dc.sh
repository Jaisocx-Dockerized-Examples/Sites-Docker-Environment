#!/bin/bash

  . "./.env"
  . "./.env_beyond_yml"
  . "./command/.env"
  . "./command/security/.owner_pwd"
  user_pwd="$( cat "./command/security/.user_pwd")"
  gen_path="gen/${doc_name}${letter_name}.pdf"
  func_contents="$(cat "./command/a4dc_func.sh")"

  script_sources="
      . \"/home/${USER_A4DC_NAME}/.bashrc\"
      ${func_contents}
      a4dc_func \"${doc_name}\" \"${letter_name}\" \"${Author}\" \"${Creator}\" \"${user_pwd}\" \"${owner_pwd}\" \"${letter_doc}\" \"${page_margin}\" \"${IN_DOCKER_WORKSPACE_VOLUME}\"
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



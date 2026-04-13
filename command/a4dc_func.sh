#!/bin/bash

a4dc_func() {

  local doc_name="$1"
  local letter_name="$2"
  local author="$3"
  local creator="$4"
  local user_pwd="$5"
  local owner_pwd="$6"
  local html_doc="$7"
  local page_margin="$8"
  local workspace="$9"



# after line 27:
#      --user-password "${user_pwd}" \
#      --disallow-print \
#      --disallow-copy \

#  prince --media=print-for-screen "http://${JAISOCX_DOMAIN_NAME}:${JAISOCX_HTTP_FLAT_PORT}/Letters/${letter_name}/${html_doc}" \
  prince --media=print-for-screen "https://${JAISOCX_DOMAIN_NAME}:${JAISOCX_HTTPS_PORT}/Letters/${letter_name}/${html_doc}" \
      -o "${workspace}/gen/${doc_name}${letter_name}.pdf" \
      --pdf-title "${letter_name}" \
      --pdf-subject "${letter_name}" \
      --pdf-author "${author}" \
      --pdf-creator "${creator}" \
      --encrypt \
      --key-bits 40 \
      --owner-password "${owner_pwd}" \
      --disallow-modify \
      --page-margin "${page_margin}"
}



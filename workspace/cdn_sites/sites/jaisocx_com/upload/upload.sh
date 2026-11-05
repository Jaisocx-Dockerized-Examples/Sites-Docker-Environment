#!/bin/bash

IS_MAC=1
UPLOAD_TO_LIVE=1
UPLOAD_TO_TEST=1

FILE_TO_UPLOAD="index.html"
# FILE_TO_UPLOAD="js/index.js"
# FILE_TO_UPLOAD="documentation.html"
# FILE_TO_UPLOAD="styles/docs/documentation.css"

SSH_URL="root@62.77.153.40"

if [ $IS_MAC = 1 ]; then
  LOCAL_SOURCES_DIR="/Users/illiapolianskyi/Projects/jaisocx.com"
elif [ $IS_MAC = 0 ]; then
  LOCAL_SOURCES_DIR=""
fi

if [ $UPLOAD_TO_LIVE = 1 ]; then
  SSH_PATH="/home/illia/jaisocx-web/application/jaisocx-web/www/"
  scp -P 46384 "${LOCAL_SOURCES_DIR}/${FILE_TO_UPLOAD}" "${SSH_URL}:${SSH_PATH}${FILE_TO_UPLOAD}"
  ssh -p 46384 -t "${SSH_URL}" < "${LOCAL_SOURCES_DIR}/upload/restart-live-on-remote.sh"
fi

if [ $UPLOAD_TO_TEST = 1 ]; then
  SSH_PATH="/home/illia/jaisocx-web-test/application/jaisocx-web-test/www/"
  scp -P 46384 "${LOCAL_SOURCES_DIR}/${FILE_TO_UPLOAD}" "${SSH_URL}:${SSH_PATH}${FILE_TO_UPLOAD}"
  ssh -p 46384 -t "${SSH_URL}" < "${LOCAL_SOURCES_DIR}/upload/restart-test-on-remote.sh"
fi


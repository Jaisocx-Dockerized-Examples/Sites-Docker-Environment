#!/usr/bin/env bash

NPMLIB_EXAMPLE_HTML_FILENAME="index.preview.html"



thisPath="$(realpath "$(dirname "$(realpath "$0")")")"



npm_package_name="$1"
npm_package_ver="$2"
to_place_npm_package_folder_path="$(realpath "$3")"


if [[ "$#" == 4 ]]; then

  NPMLIB_EXAMPLE_HTML_FILENAME="$4"

fi


npm_package_name_and_ver="${npm_package_name}@${npm_package_ver}"


cd "${to_place_npm_package_folder_path}"



if [ ! -e "${to_place_npm_package_folder_path}/package.json" ]; then

  echo -e "new package.json, then You need to invoke the script again.\n"
  echo -e "New place where js libs are installed, new package.json in folder "${to_place_npm_package_folder_path}"\n"

  npm init

  echo -e "Exits script without have installed ...\n"
  exit 2;

fi

npm install -S  --install-strategy=hoisted  --omit=dev  --save-optional=true  "${npm_package_name_and_ver}"



cd "${thisPath}"

# 5. Open the example HTML in a browser

commandname_1="xdg-open"
is_installed_1="$(whereis "${commandname_1}")"

commandname_2="open"
is_installed_2="$(whereis "${commandname_2}")"



npmlib_example_html_path="${to_place_npm_package_folder_path}/node_modules/${npm_package_name}/${NPMLIB_EXAMPLE_HTML_FILENAME}"

if [[ "${is_installed_1}" != "${commandname_1}:" ]]; then
  # echo "matched expr with ${commandname_1}"
  bash -c "${commandname_2} "${npmlib_example_html_path}""

elif  [[ "${is_installed_2}" != "${commandname_2}:" ]]; then
  # echo "matched expr with ${commandname_2}"
  bash -c "${commandname_2} "${npmlib_example_html_path}""

else
  echo -e "Please open ${NPMLIB_EXAMPLE_HTML_FILENAME} in your browser at path:\n ${npmlib_example_html_path}\n"
fi







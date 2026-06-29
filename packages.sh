#!/usr/bin/env bash
# Usage: ./list-npm-deps.sh /path/to/search

SEARCH_DIR="${1:-.}" # default current dir

loc_packagename="_"
loc_dependency="_"

# Find all package.json files recursively
find "$SEARCH_DIR/workspace/ts/Jaisocx_SitesTools/packages" -type f -name "package.json" | while read -r pkgfile; do
  pkgdir=$(dirname "$pkgfile")
  loc_packagename="$(echo "${pkgdir}" | awk -F'/' '{print $6}')"
  echo -e "\n--${loc_packagename}\n" >> written_packages.txt

    cd "$pkgdir"
    # List all dependencies with version numbers (depth 0 only)
    loc_dependency="$(npm ls --depth=3 --parseable --long  | awk -F':' '{print $2}')"

    cd -

  echo -e "${loc_dependency}\n" >> written_packages.txt

done



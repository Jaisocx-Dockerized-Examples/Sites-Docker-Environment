#!/usr/bin/env bash

# loads a font pack from Google Fonts site, and stores on Your cdn to use for Your sites centrally.
# 
# Why copy to Your cdn endpoint? Your cdn endpoint is under Your or Your Admin access. And is kept healthy by You or Your Admin. 
# 
# Why use cdn? 
#   When Your sites use 5 custom font files for sites' design, 
#   there will be just one place on Your machines ssd, 
#   for example with just 18M disk usage once, 
#   and not every js and css tool and webpage every time and every install 12M more.

thisPath="$(dirname "$(realpath "$0")")"
projectRoot="$(dirname "$(realpath "${thisPath}/../../")")"


cdn_fonts_path="${projectRoot}/cdn/www/fonts"
cdn_fonts_path_docker="/var/www/cdn/www/fonts"


url=""
fontName=""


read "" 
read "" 

wget -O "${fontName}" "${url}"

cdn_font_target_path="${cdn_fonts_path}/${fontName}"


mkdir -p "${cdn_font_target_path}"
mv "./${fontName}" "${cdn_font_target_path}"

tar gz



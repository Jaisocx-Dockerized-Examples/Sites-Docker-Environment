FROM alpine:3.23


ENV workdir="/dockr"

WORKDIR "${workdir}"


# -- Dockerdocs AI --
# To avoid compatibility issues, always:
#
#   Pin the base image version (e.g., FROM alpine:3.23)
#   Pin package versions as needed (e.g., apk add package=version)
#   Avoid apk upgrade unless you want to update all installed packages to their latest versions within the current Alpine release
#   This prevents unexpected changes in package versions and API incompatibilities.
RUN apk update

RUN apk add   curl
RUN apk add   ca-certificates
RUN apk add   openssl
RUN apk add   libgcc
RUN apk add   libstdc++
# RUN apk add   git
RUN apk add   bash



# -- admin privilegs libraries installation --
RUN apk add sudo
RUN apk add shadow
# RUN apk add util-linux



# -- Princexml --

# -- a4dc --
RUN apk add   freetype
RUN apk add   fontconfig
RUN apk add   ttf-dejavu
RUN apk add   libxrender
RUN apk add   libjpeg-turbo
RUN apk add   libpng
# ts RUN apk add   zlib
# ts RUN apk add   libx11
# ts RUN apk add   libxext
# ts RUN apk add   libxft
# ts RUN apk add   glib
RUN apk add   icu-libs
RUN apk add   libxml2
RUN apk add   tiff
RUN apk add   giflib
RUN apk add   libwebp
RUN apk add   libwebpdemux
RUN apk add   libavif
RUN apk add   aom
RUN apk add   lcms2






# -- Nodejs --
RUN apk add   zlib
RUN apk add   libx11
RUN apk add   libxext
RUN apk add   libxft
RUN apk add   glib





# -- php --

RUN apk add    php85
RUN apk add    php85-fpm

RUN apk add    php85-common
RUN apk add    php85-curl
RUN apk add    php85-fileinfo
# RUN apk add    php85-gd
RUN apk add    php85-json
RUN apk add    php85-iconv
RUN apk add    php85-mbstring
# RUN apk add    php85-opcache
RUN apk add    php85-openssl
RUN apk add    php85-pear
RUN apk add    php85-phar
RUN apk add    php85-session
RUN apk add    php85-xml
RUN apk add    php85-zip

# -- Work with SQL securely --
# RUN apk add    php85-pdo
# RUN apk add    php85-pdo_mysql
# RUN apk add    php85-pdo_pgsql





CMD [ "/bin/bash" ]



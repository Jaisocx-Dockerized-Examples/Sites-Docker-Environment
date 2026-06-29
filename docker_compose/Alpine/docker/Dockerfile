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

RUN apk add ca-certificates
RUN apk add curl
RUN apk add openssl
#RUN apk add libgcc
#RUN apk add libstdc++
## RUN apk add git
RUN apk add bash

# -- admin privilegs libraries installation --
RUN apk add sudo
RUN apk add shadow
# RUN apk add util-linux

CMD [ "/bin/bash" ]



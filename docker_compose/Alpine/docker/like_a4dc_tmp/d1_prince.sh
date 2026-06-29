




    if [[ ( "${marker_first_start}" == "$YES" ) && ( "${marker_princexml_installed}" != "$YES" ) ]]; then

      #curl -LO https://www.princexml.com/download/prince-16.2-alpine3.23-x86_64.tar.gz
      #tar -xvzf prince-16.2-alpine3.23-x86_64.tar.gz
      #WORKDIR /dockr/prince-16.2-alpine3.23-x86_64

      architectur="${CPU_ARCHITECTURE_A4DC}"
      tarball_name="prince-${A4DC_SOFTWARE_VERSION}-alpine3.23-${architectur}"
      tarball_link="https://www.princexml.com/download/${tarball_name}.tar.gz"
      tarball_path="/dockr/${tarball_name}.tar.gz"



      # -- TARBALL RELOAD --
      # --------------------

      # -- REINSTALL FROM TARBALL --
      # -- REINSTALL, LOAD FROM INET --

      if [ -e "${A4DC_INSTALL_IN_DOCKER_TARBALLS_VOLUME}/${tarball_name}.tar.gz" ]; then
            env_a4dc_reload="${A4DC_INSTALL_TARBALL_RELOAD}"

          else
            env_a4dc_reload="$YES"
      fi

      # -- TARBALL RELOAD --
      if [[ "${env_a4dc_reload}" == "$YES" ]]; then
        curl --output-dir "${A4DC_INSTALL_IN_DOCKER_TARBALLS_VOLUME}"   -o "${tarball_name}.tar.gz"   "${tarball_link}"

        touch "${princexml_tarball_saved_marker}"
        marker_princexml_tarball_saved="$YES"

      fi


      # -- INSTALL FROM TARBALL --
      cp "${A4DC_INSTALL_IN_DOCKER_TARBALLS_VOLUME}/${tarball_name}.tar.gz"   "/dockr/${tarball_name}.tar.gz"

      cd "/dockr"
      tar -xzf "${tarball_name}.tar.gz" -C "/dockr"

      cd "/dockr/${tarball_name}"
      "./install.sh"

      touch "${princexml_installed_marker}"
      marker_princexml_installed="$YES"

    fi




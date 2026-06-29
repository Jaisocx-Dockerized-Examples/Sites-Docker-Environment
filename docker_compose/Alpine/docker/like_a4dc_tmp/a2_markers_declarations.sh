
# -- LOADING ENVs --
# bash flag, to load env variables from .env like files
set -a

# loading env variables
source "/run/secrets/for_yml"
source "/run/secrets/beyond_yml"
# source "/run/secrets/${LOCAL_ENV}"

. "${IN_DOCKER_WORKSPACE_VOLUME}/env_dc_dinamique/.env_a4dc"

if [ -e "${BASH_LOGIN}" ]; then
  . "${BASH_LOGIN}"
fi

# SOFTWARE_INSTALL_FOLDER="${PHP_SOFTWARE_HOME}"
# php_software_logs="${PHP_SOFTWARE_LOGS}/${local_service_name}"



# -------------
# -- MARKERS --

first_start_marker="/${markers}/set_after_first_start"

# -- SOFTWARE INSTALLED --
princexml_installed_marker="/${markers}/princexml_installed"

# -- ADD GROUPS, USERS --
groups_n_users_added_marker="/${markers}/groups_n_users_added"

# -- OWNERS AND CHANGE MODES --
owners_n_modes_set_marker="/${markers}/owners_n_modes_set"

# -- A4DC TARBALL SAVED --
princexml_tarball_saved_marker="/${markers}/princexml_tarball_saved"

# -- BASH LOGIN --
bash_login_written_marker="/${markers}/bash_login_written"



# -- MARKERS TO BOOL VARIABLES --
marker_first_start="${YES}"

  marker_groups_n_users_added="no"
  marker_owners_n_modes_set="no"
  marker_princexml_tarball_saved="no"
  marker_princexml_installed="no"
  marker_bash_login_written="no"

  env_a4dc_reload="no"



# -- PROVES MARKERS, SETS VALUES TO VARIABLES --
# if marker was found, variable tells, this is not the first start, but a next restart.
if [ -e "${first_start_marker}" ]; then marker_first_start="no"; fi

# marker found, bool variable set ${YES}
if [ -e "${groups_n_users_added_marker}" ]; then marker_groups_n_users_added="${YES}"; fi
if [ -e "${owners_n_modes_set_marker}" ]; then marker_owners_n_modes_set="${YES}"; fi
if [ -e "${princexml_tarball_saved_marker}" ]; then marker_princexml_tarball_saved="${YES}"; fi
if [ -e "${princexml_installed_marker}" ]; then marker_princexml_installed="${YES}"; fi
if [ -e "${bash_login_written_marker}" ]; then marker_bash_login_written="${YES}"; fi

if [ "${A4DC_INSTALL_TARBALL_RELOAD}" == "true" ]; then A4DC_INSTALL_TARBALL_RELOAD="${YES}"; fi


# -- ENVs --
YES="YES"

workdir="/dockr"
markers="/markers"
templates="/templates"

# env variable User's home folder
USER_HOME="/home/${USER_NAME}"

# env variable, pointing to bash script, loading on user's login or entering Docker console
BASH_LOGIN="${USER_HOME}/.bashrc"

cd "${workdir}"



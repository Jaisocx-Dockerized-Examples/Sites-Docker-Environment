
# -- FINISHES ENTRYPOINT, IF ALREADY INSTALLED --
if [[ "${marker_first_start}" != "$YES" ]]; then

    exec "$@"

    exit 0

fi






touch "${first_start_marker}"

# this is the first docker start.
#    with the marker set,
#    the next time on start,
#    the code isn't executed til this code block.
marker_first_start="$YES"



cd "${USER_HOME}"

exec "$@"

exit 0




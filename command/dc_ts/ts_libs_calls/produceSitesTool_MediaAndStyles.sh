#!/bin/sh



###------------------------------------------
## start block
## checks and validations

commandLineArgs="$@"

thisPath="$(dirname "$(realpath "$0")")"
fodlerName="$(basename "$thisPath")"

# echo "fodlerName: ${fodlerName}"

projectPath=""


if [[ "${fodlerName}" == "command" ]]; then
  projectPath="$(realpath "${thisPath}/..")"
elif [[ "${fodlerName}" == "dc_ts" ]]; then
  projectPath="$(realpath "${thisPath}/../..")"
elif [[ "${fodlerName}" == "ts_libs_calls" ]]; then
  projectPath="$(realpath "${thisPath}/../../..")"
else
  projectPath="$(realpath ".")"
fi

# echo "projectPath: ${projectPath}"



envPath="${projectPath}/.env"
envBeyondYmlPath="${projectPath}/.env_beyond_yml"
envDinamiquePath="${projectPath}/workspace/env_dc_dinamique/.env_ts"

# echo "envPath: ${envPath}"



if [[ -e "${envPath}" ]]; then
  . "${envPath}"
else
    # when no .env is in the Project,
    # this Exception text is written in the command line.
    exceptionNoticeLines=(
      "Error: .env file is not set,"
      "\n   the example of the .env file is the example_env"
      "\n   You need copy the example_env and rename to .env,"
      "\n   then to set in the new .env the for Your Project other constants for the sensitive infos."
      "\n"
    )

    echo "${exceptionNoticeLines[$'\052']}"


    exit 2;
fi



jsInvokePath="${projectPath}/command/base/js_invoke.sh"

# echo "jsInvokePath: ${jsInvokePath}"

if [[ ! -e "${jsInvokePath}" ]]; then
  echo "Error: call this script in the root of this project or in the folder command."
  exit 5;
fi

## finish block
## checks and validations
###------------------------------------------



"${jsInvokePath}" "${commandLineArgs}" \
  --packagePath="${TYPESCRIPT_PACKAGES}/libraries/base_packs/fine_tuning/SitesToolAutomation" \
  --script="main/produceSitesTool_MediaAndStyles.js" \
      --cssOrJsTool="css" \
      --sitesToolName="CssCleanStart_Lite" \
      --sitesTool_ThemeName="theme_base" \
      --templatePath="data/templates/css/responsive/responsive_size__CssCleanStart_Lite.css.template" \
      --withSizesCssConstants="no" \
      --justTheme="no" \
      --justThemeResponsiveDataset="no"



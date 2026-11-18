#!/bin/bash


echo -e "Jaisocx Project Builder [$(date)] [Rebuilds ...]"

export NODE_OPTIONS="--no-warnings"

#; npx eslint --config "${IN_DOCKER_WORKSPACE_VOLUME}/ts/eslint.config.js" --fix "${IN_DOCKER_WORKSPACE_VOLUME}/ts/build_tools/ProjectBuilder/src/**/*.ts"



cd "${IN_DOCKER_WORKSPACE_VOLUME}/ts/build_tools/ProjectBuilder"


echo -e "Jaisocx Project Builder [$(date)] [Rebuilds ESNext ...]"
npx tsc -p "./tsconfig.ESNext.overrides.json"


echo -e "Jaisocx Project Builder [$(date)] [Rebuilds CommonJS ...]"
npx tsc -p "./tsconfig.CommonJS.overrides.json"





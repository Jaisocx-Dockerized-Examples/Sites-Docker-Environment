#!/bin/bash


export NODE_OPTIONS="--no-warnings"

npx eslint --config "${IN_DOCKER_WORKSPACE_VOLUME}/ts/eslint.config.js" --fix "${IN_DOCKER_WORKSPACE_VOLUME}/ts/build_tools/ProjectBuilder/src/**/*.ts"



cd "${IN_DOCKER_WORKSPACE_VOLUME}/ts/build_tools/ProjectBuilder"

npx tsc -p "./tsconfig.ESNext.overrides.json"

npx tsc -p "./tsconfig.CommonJS.overrides.json"





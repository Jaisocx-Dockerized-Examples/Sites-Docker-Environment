#!/usr/bin/env bash

tsServicePathInDockerVolume="$1"

# cd "${tsServicePathInDockerVolume}/build_tools/ProjectBuilder"

export NODE_OPTIONS="--no-warnings"

npx eslint --config "${tsServicePathInDockerVolume}/eslint.config.js" --fix "${tsServicePathInDockerVolume}/build_tools/ProjectBuilder/src/**/*.ts"



cd "${tsServicePathInDockerVolume}/build_tools/ProjectBuilder"

npx tsc -p "./tsconfig.ESNext.overrides.json"

npx tsc -p "./tsconfig.CommonJS.overrides.json"



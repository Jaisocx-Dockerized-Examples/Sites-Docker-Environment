
![../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg](../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg)

# TSVM Alpine Docker Service

  [HOME](./README.md)

## Features

### Alpine Docker Base Features

**Consistency and Forecasted Behavior**
1. `Bash` installed, for the foreseen shell scripting in docker terminal.
2. Exactly set `User and Users' Group` with numerique IDs from `.env` variables, User's ownership assigned tp volume, and docker shell logs in as the User, either.
3. The variables from `workspace/ts/.env.dynamic` take effect on `docker compose restart`, like https port and dir published with node-http.
4. Example of `Bash Profile for Alpine` with exports of shell variables, like `NODEJS_HOME` and other.
5. In the Dockerfile, all .env variables are referenced for build time, and You may later freely choose to export for Docker Shell with the `ENV` Dockerfile Instruction.



### NodeJS and TypeScript Relevant Docker Features

6. Node Versions Management the simpliest bash scripts.
7. `docker/ts/tarball/load_tarballs.sh` loads once tarballs for Node installation in Docker to save up network traffic on next docker builds, without deep knowledge of Docker `--no-cache or --cache` option.










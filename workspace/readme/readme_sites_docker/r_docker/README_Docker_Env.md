
`Docker for a Site`

![r_dc_images/softlabel_docker.svg](r_dc_images/softlabel_docker.svg)    ![r_dc_images/softlabel_jaisocx.svg](r_dc_images/softlabel_jaisocx.svg)

[HOME](../../../../README.md)

---

# Env variables in Docker

### 1. env variables take effect in compose.yml for compose.yml properties

> ✅ 1. compose.yml properties like ports, volumes.
>
> ❌ 2. but, neither in Dockerfile nor in entrypoint



#### 1.1. Env file path and name

1.1. ✅ for the `docker comopose` the only filename and path: **${root}/.env**


1.2. ❌ however, the command line arg **just** for `docker`, for the `compose` plugin **never** do:
  ```bash
  
    docker --env-file="<custom filename of .env>" ...
  ```


1.3.  💡  for reloading OS bibs offline from the once built base image like Alpine,
set in Your ver. of Dockerfile's, in the `FROM` statement on the first line, the name of the base image.
However, the `Dockerfile` I'd have to ignore for the git, and publish like `example_Dockerfile`.

  ```Dockerfile
    FROM a4dc_h523-alpine:latest
  ```


1.4. for the more precision the path to `(docker-)compose.yml` by `-f`:

  ```bash
  
    docker compose -f "./compose.yml" build ts
    
    # after this instruction, the dockerized service is to start, stop, or restart.
    docker compose -f "./compose.yml" create --scale="ts=1"
    
    docker compose -f "./compose.yml" start ts
  ```


  ```bash
  
    # when in need of stop the dockerized service:
    docker compose -f "./compose.yml" stop ts
  ```


  ```bash
  
    # the next time, just start, no need docker compose up -d. 
    # already the service was created, was just stopped.
    docker compose -f "./compose.yml" start ts
  ```





#### 1.2. Example
`step 1`, **.env**

  ```bash
    #!/bin/bash
    HTTPS_PORT=9443
  ```


`step 2`, **docker-compose.yml**
  ```yaml
    
    services:
    
      https_service:
        build:
          context: "./docker_compose/https_service/docker"
        ports:
          - "${HTTPS_PORT}:${HTTPS_PORT}"
      ...
      ...
  ```



---
### 2. env variables take effect in Dockerfile

> 1. for example, variable A_TIME_ZONE in Dockerfile from .env file variable TIME_ZONE
>
> 2. variable A_USER_NAME in Dockerfile not from .env file, hardcoded in compose.yml value "user"

`step 1`, **.env**

  ```bash
    #!/bin/bash
    TIME_ZONE="Europe/Paris"
  ```


`step 2`, **docker-compose.yml**
  ```yaml
    
    services:
    
      a_service:
        build:
          context: "./docker_compose/a_service/docker"
          args:
            A_TIME_ZONE: "${TIME_ZONE}"
            A_USER_NAME: "user"
      ...
      ...
  ```


`step 3`, **Dockerfile**
  ```Dockerfile
    FROM alpine:3.19
    
    ARG A_TIME_ZONE
    ARG A_USER_NAME
    
    RUN echo "TIME_ZONE=${A_TIME_ZONE}\nexport TIME_ZONE\n\n" >> "locale"
    RUN adduser -D "${A_USER_NAME}"
  ```



---
### 3. variables take effect in Entrypoint

`steps 1, 2 and 3 before`, and `step 4`, **Dockerfile**

💡  could name the variable `E_TIME_ZONE`, since this were then in the code clear,
that wasn't fetched by the reading of the `.env` file,
but reassigned from the variable, set in `docker-comppose.yml` in the `args` block:



**docker-compose.yml**

  ```yaml
    a_service: 
      build: 
        args:
          - "A_TIME_ZONE=Europe/Paris"
  ```

The other thought was, the `.env` variables were read in this setup from yaml `secrets` the next time,
in the entrypoint,
and in the `Dockerfile` wasn't there.
But, the variable's name and value could be the same,
if the `ARG` would be referenced by .env's variable's name like this:



**docker-compose.yml**

  ```yaml
    a_service: 
      build: 
        args:
          - "A_TIME_ZONE=${TIME_ZONE}"
  ```


**Dockerfile**

  ```Dockerfile
    FROM alpine:3.19
    
    ARG  A_TIME_ZONE
    ARG  A_USER_NAME

    # ENV  E_TIME_ZONE="${A_TIME_ZONE}"
    ENV  TIME_ZONE="${A_TIME_ZONE}"
    ENV  USER_NAME="${A_USER_NAME}"
    
    RUN mkdir "/entrypoint"
    COPY "./entrypoint.sh" "/entrypoint/entrypoint.sh"
    RUN chmod -R a+x "/entrypoint"
    
    ENTRYPOINT [ "/bin/bash", "/entrypoint/entrypoint.sh" ]
    CMD [ "tail", "-f", "/dev/null" ]
    
  ```


`step 5`, **entrypoint.sh** on context path: `./docker_compose/a_service/docker/entrypoint.sh`
  ```bash
    #!/bin/bash
    
    echo "${TIME_ZONE}"
    adduser -D "${USER_NAME}"
    
  ```



---
### 4. variables take effect in docker console

> 💡 .profile in user's home folder runs on login.
>
> to login as user:
>
>     1. docker command line arg: 
>       -u user
>     2. or, invoke in docker console: 
>       su - user 


the steps before and `step 6`, **entrypoint.sh** on context path: `./docker_compose/a_service/docker/entrypoint.sh`
  ```bash
    #!/bin/bash
    
    echo -e "#!/bin/bash\n\n" > /home/user/.profile
    echo -e "TIME_ZONE="${TIME_ZONE}"\nexport TIME_ZONE\n\n\n" >> /home/user/.profile
  ```


`step 7`, **console** Host OS, enter docker console
  ```bash
    docker compose exec a_service bash
  ```


`step 8`, **console** Docker console
  ```bash
    su - user
    echo "${TIME_ZONE}"
  ```



`step 7`, or, **console** Host OS, enter docker console as user
  ```bash
    docker compose exec -u user a_service bash
  ```


`step 8`, **console** Docker console
  ```bash
    echo "${TIME_ZONE}"
  ```



---
### 5. variables take effect on docker compose (re)start in entrypoint logics

`step 1`, **.env_dynamic** on path `workspace/env_dc_dinamique/.env_dynamic`
  ```bash
    #!/bin/bash
    
    VAR_FROM_ENV_DYNAMIC="true"
  ```


`step 2`, **docker-compose.yml**
  ```yaml

    services:
      
      a_service:
        build:
          context: "./docker_compose/a_service/docker"
        volumes:
          - "./workspace/:/workspace/"
      ...
      ...
  ```


`step 3`, **entrypoint.sh** at context path: `./docker_compose/a_service/docker/entrypoint.sh`
  ```bash
    #!/bin/bash
    
    source "/workspace/env_dc_dinamique/.env_dynamic"
    
    if [[ "${VAR_FROM_ENV_DYNAMIC}" == "true" ]]; then
      # codeblock takes effect on docker compose (re)start, 
      #   as the variable VAR_FROM_ENV_DYNAMIC in "${MOUNTED_VOLUME_PATH}/.env_dynamic" was changed,
      #   VAR_FROM_ENV_DYNAMIC="no"
    fi
  ```



---
### 6. variables from configs or secrets take effect in entrypoint logics

`step 1`, **.env_beyond_yml**
  ```bash
    #!/bin/bash
    
    VAR_FROM_ENV_BEYOND_YML="true"
  ```


`step 2`, **docker-compose.yml**
  ```yaml
    secrets:
      beyond_yml:
        file: "./.env_beyond_yml"
    
    services:
    
      a_service:
        build:
          context: "./docker_compose/a_service/docker"
          args:
            A_TIME_ZONE: "${TIME_ZONE}"
            A_USER_NAME: "user"
      secrets:
        - beyond_yml
      ...
      ...
  ```


`step 3`, **entrypoint.sh** at context path: `./docker_compose/a_service/docker/entrypoint.sh`
  ```bash
    #!/bin/bash
    
    source "/run/secrets/beyond_yml"
    
    if [[ "${VAR_FROM_ENV_BEYOND_YML}" == "true" ]]; then
      # codeblock takes effect
    fi

  ```







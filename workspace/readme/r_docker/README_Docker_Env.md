
`Docker for a Site`

![r_dc_images/software_tm_label_dockerhub.svg](r_dc_images/software_tm_label_dockerhub.svg)    ![r_dc_images/software_tm_label_jaisocx.svg](r_dc_images/software_tm_label_jaisocx.svg)

[HOME](./README_Docker.md)

---

# Env variables in Docker

### 1. env variables take effect in compose.yml for compose.yml properties

  > ✅ 1. compose.yml properties like ports, volumes.
  > 
  > ❌ 2. but, neither in Dockerfile nor in entrypoint



#### 1.1. Env file path and name
  1.1. the only filename and path: `${root}/.env`

  1.2. or, the command line arg for `docker compose`: 
  ```bash
  
    docker compose --env-file="<custom filename of .env>" -f "<custom filename of compose.yml>" build | up | (re)start | ...
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
  ```Dockerfile
    FROM alpine:3.19
    
    ARG A_TIME_ZONE
    ARG A_USER_NAME

    ENV TIME_ZONE="${A_TIME_ZONE}"
    ENV USER_NAME="${A_USER_NAME}"
    
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
    
    source "/workspace/.env_dynamic"
    
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







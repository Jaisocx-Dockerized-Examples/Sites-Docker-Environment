
[HOME](./README_Docker.md)

---

`Code snippets, Dockerfile, ENTRYPOINT`

# Code Snippets Dockerfile, ENTRYPOINT

## Actions of code blocks

### Dockerfile
  1. env variables in docker-compose.yml, available for Dockerfile.
  2. Linux libraries install.
  3. PHP extensions install.
  4. Adds Users' Group and User.
  5. Adds to the Users' Group the Super Admin rights.
  6. ENTRYPOINT invoked by Super Admin rights without password, needed in command line shell scripts.
  7. USER logged in, requires password to invoke instructions with the Super Admin rights.


### ENTRYPOINT
  1. Markers and env variables of boolean datatype aligned to boolean variables.
  2. Markers in if cases tell, whether to exec the code block, once or on every Docker compose start.
  3. Adds all Users' Groups and Users with IDs by variables in env.
  4. Adds Users to other Groups.
  5. Sets custom configuration files.
  6. Sets owning Users and rights on filesystem resources.
  7. Bash script, for the Login event, with env variables, loaded for the USER.
  8. TIME ZONE set the right way.
  9. On Demand installed libraries due to dynamic env variables.
  10. Invokes the nice way the service's core program with its dedicated User's privilegs, like **php-fpm** and user in **.env USER_PHP_NAME**.
  

#### ENTRYPOINT.7. Login event bash script

  **2 options**:

  `.bashrc` invokes by Linux OS
  > `/home/user/.bashrc` invokes on `docker compose exec <a service name> bash`

  - Other filename, as `.bash_login` You're free to invoke in bash instruction. Then You know, that the script was invoked just once.
  ```bash
    /bin/bash -c ". /home/${USER_PHP_NAME}/.bash_login; php-fpm"
  ```








`Docker for a Site`

# Docker for a Site
 > For a **Site**, several **Docker** services by **Alpine** Image with `.env`, `Dockerfile`, `ENTRYPOINT`, services configurations like `http-conf.xml` and `php-fpm.conf`.

 > Refinements in the current February 2026 review after 3 months release before.

  - ✅ [**Ideas, Why Coded What**](./README_Ideas_why_coded_what.md).
  - ✅ **A. Aligned All Services**.
  - ✅ **B. Workarounds improve quality and easen work day**.
  - ✅ **C. Code snippets for reuse by copy-paste**.


  1. ✅ [**Network**](./README_Docker_Networks.md), firewall, ports, ip, domain names, ssl, https.

  2. ✅ [**Users**](./README_Docker_Users.md), groups, name, id, password, privilegs.

  3. ✅ **Envs**, docker-compose.yml, Dockerfile, ENTRYPOINT, php-fpm confs.

  4. ✅ **Tarballs** for reuse on reinstall.

  5. ✅ [**Docker Env Theories**](./README_Docker_Env.md).



## Why coded what

  - Why **Docker**
  - When Docker, why **Alpine**
  - Why **bash** 
  - Why **sudo** ( see [**Users** => 4.](./README_Docker_Users.md) )



## A. Aligned All Services

  - Alpine one image
  - bash for console
  - Workspace VOLUME same .env bash variable



## B. Workarounds improve quality and easen work day
  > knowledge, control and transparency

  1. Fine-grained filesystem structure for the **Docker Context** for `Dockerfile` and **Mounted Volumes** for `Workspace`.

  2. `ENTRYPOINT` saves USER's **bash profile** with env variables exports and **bash template inclusion**.

  3. **Markers** for `ENTRYPOINT` code blocks **run once the first time**.



## C. Code snippets for reuse by copy-paste
  > Examples of use like code snippets for reuse by copy-paste.

  1. `.env` **bash variables** for `docker-compose.yml`, `Dockerfile`, `ENTRYPOINT`

  2. **dynamic bash variables** in `${workspace}/env_dc_dinamique/.env*`, renew on `docker (re)start`, take effect in `if` expressions in `ENTRYPOINT`.

  3. `docker-compose.yml`

  4. `Dockerfile` and `ENTRYPOINT`



## 1. Network

### Aim of the Setup
  > Fine tuning 
  
  - ✅ Firewall
  - ✅ ports
  - ✅ ip
  - ✅ domain names
  - ✅ ssl
  - ✅ https
  - ✅ Services' network confs
  - ✅ Signed Wildcard SSL Certificate for any subdomain of **basetasks.site**.
  - ✅ Local and Open Docker Networks
  - ✅ The option to set the **fine-grained security confs** like `allowed_clients`, for sure, of greate use for Databases confs. 
  > 💡 If, or when, You or System Admin change or add a network for a service, or add another open network, still, the single allowed client's IP has effect, and the first time at once NO data compromizing because of unintended open port doesn't occur.



## 2. Users
  
### 💡 Aim of the Setup
  > For fine-tuning of privilegs to services on filesystem resources.



### 2.1. Easy in development

  - Known **Volume's Owner** `user:group`.

  - Known Docker **Service's Owner** `user:group`.



### 2.2. Secure in deployment
  > This was one of the aims, but was not done 100%. (Explained in [**Users** => 3, 4.](./README_Docker_Users.md) )

  Once docker service deployed to production server machine,
  after logging inn,
  **the Docker service OS' user**:
  - **isn't the Super Admin**,
  - **can not install or remove software**,
  - neither **can not change filesystem privilegs** on filesystem resources, these the user doesn't owe.
  


## 3. Envs
  > The workarounds does with a single or several .env files

  - ✅ .env ( shared for all services ) **build time**.
  - ✅ .env ( for a docker service ) **build time**, in context folder of a service, for `ENTRYPOINT`, not in `Dockerfile`.
  - ✅ .env ( shared for all services, dynamic ) in [VOLUME], **start time**.
  - ✅ User's **hashed password** example in .env USER's block.
  - ✅ Service's software turns due to **dynamic .env** boolean variables ( XDebug for php-fpm ).
  - ✅ Entrypoint prints to console due to **dynamic .env** boolean variable `WHETHER_IN_DEV_MODE`.



## 4. Tarballs
  > Have to copy from TypescriptEnvironment our [ts] service's confs for node, Express, node-http, typescript, npm, yarn, webpack.



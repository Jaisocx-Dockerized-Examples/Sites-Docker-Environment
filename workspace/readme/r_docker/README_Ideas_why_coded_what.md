
`Docker for a Site`

![r_dc_images/software_tm_label_dockerhub.svg](r_dc_images/software_tm_label_dockerhub.svg)    ![r_dc_images/software_tm_label_jaisocx.svg](r_dc_images/software_tm_label_jaisocx.svg)

[HOME](./README_Docker.md)

---



# Ideas documented

## Docker Technology Idea

  1. Virtual Machine, small OS under Host OS on Computer.
  2. Smaller and more saving-up than Virtual Machines of previous generation.
  3. Aimed like Virtual OS accessed via console and via network, then seen on displays in browsers, if browser was connected to a sites server under docker.


## Why Alpine

  1. Alpine Docker Image aimed to be the most saving-up lowest size of MB install needed, since the base Linux libraries are installed along with Docker Engine on Host Linux OS.
  2. mostly very same like other Linux.



## Why Docker

  > Why Docker and Cubernetes with similar Idea are widely used, due to advantages


### 1. Good for Deployments
  1. **Versions numbers** of most Software and libraries, Servers and Programming Languages Interpreting Engines ( **Alpine OS**, **MySQL Database**, **PHP**, **Java**, **Node**, **Yarn** to install numbered in `package.json` or `yarn.lock` **Node libraries**), are set in confs, thanks to this, tested and proved Software under Docker installs nearly **same on other Computers**.
  2. **Sites** are **published** not on developers' computers, then, a site, when installing **on a computer for publishing** sites, **deploys very well** with fewer errors and adjustments in deployment time.

### 2. Ease clean-up
  > Ease clean-up of 3rd party software from a computer's Host OS and filesystem.

  Software deinstallation in theory easier: 
  stopping, removing docker service, clearing service 
  and installed docker images from installations cache.



## Why installed what

### 1. Why installed bash

✅  **Just to align all**: **bash** install, in order to foresee the command line shell dialect when entering console under a docker service, 
  just to align all own built docker services.

✅  **Newer than sh**: **bash setup** costs **12MB** in addition, 
  but, the **bash** was **the newer** command line shell dialect after the **sh**.

✅  **Most of 3rd parties software use bash scripts**: If You've chosen to save-up installs of bash, and have rewritten all Your scripts valid for SH (/bin/sh), many 3rd parties software libs still can have bash scripts, for installs, too, and their Docker Image's Docker console is set bash. We just install bash, since other 3rd parties might use bash for their system, and then we just align the console command line shell dialect always bash, not guessing later under review in, let's say, 10 months or 3 years, what service was previous time what command line shell dialect and due to what reasons)). 

  If remaining with SH, `it's just to document somewhere centrally` for Your own all Docker Images, 
  to have this somehow easier in programming work time.
  Nevertheless, the bash install and entering the Docker Console with bash, 
  are coded in this setup as `Dockerfile` and `bash` code blocks.

✅  **Fewer errors**: due to known engine, running scripts. 
  Both, **sh** and **bash**, have own synthax and functions,
  and **sh scripts** run with **sh interpreting engine**,
  and **bash scripts** with **bash interpreting engine**.

✅  Entrypoint and all other command line shell scripts,
  are being run with **sh** or **bash**,
  due to the first line as this:


  **bash** scripts
  ```bash
    #!/bin/bash
  ```

  **sh** scrips
  ```sh
    #!/bin/sh
  ```


  **installation of bash in Dockerfile**
  ```Dockerfile
    
    FROM alpine:3.23
    
    RUN apk update
    
    # installs bash, the command line dialect, on demand
    RUN apk add bash
  
  ```


  **entering docker console with bash**
  ```bash
  
    docker compose -f "<filename of compose.yml>" exec <docker service name> bash
  ```



  **bash instructions in docker, proving docker service's setup**
  ```bash
  
    # logged into docker console 
    
    # CURRENT FOLDER:
    # path of the current folder 
      pwd
    
    # list all files and folders
    # as one field table
      ls -1
    # with more infos several fields
      ls -la
    
    # CURRENT USER:
    # username of logged into docker console user
      whoami
    
  ```




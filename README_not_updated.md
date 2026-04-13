
<!-- software labels -->
[![Prince badge](./workspace/cdn/software_labels/Prince/prince.svg)](https://www.princexml.com/)
[![php-fpm badge](./workspace/cdn/software_labels/php/php.svg)](https://www.php.net/)



![./workspace/cdn/software_labels/Jaisocx/software_tm_label_jaisocx.svg](./workspace/cdn/software_labels/Jaisocx/software_tm_label_jaisocx.svg)
![./workspace/cdn/software_labels/Jaisocx/js_serverside_tm_label_jaisocx.svg](./workspace/cdn/software_labels/Jaisocx/js_serverside_tm_label_jaisocx.svg)
![./workspace/cdn/software_labels/Jaisocx/js_clientside_tm_label_jaisocx.svg](./workspace/cdn/software_labels/Jaisocx/js_clientside_tm_label_jaisocx.svg)



`12th of April 2026`
> **In reconstruction**, the very nice **docker compose update**. 
> 
> I work in the moment, 13.04.2026, on
>    1. installation script `INSTALL_copy_env_examples.sh` for `.env's`
>    2. and the updated `README.md` documentation.
> 
>   Hope to push the updated README's tonight.
> 
> The documentation in the moment might not be 100% the right one.
> 
> Please, see 
>    1. `example_docker-compose.yml` conf, 
>    2. `docker_compose` folder,
>    3. `INSTALL_copy_env_examples.sh` script, 
>    4. make copies of `example_'s` to => `.env's`, 
>    5. make folder `command/security` with passwords `.owner_pwd` and `.user_pwd` for the produced docs.
> 
> `INSTALL_copy_env_examples.sh` makes later copies `example_env's` to => `.env's`, since **all .env's are .gitignored**.



# [![jaisocx logo](./workspace/cdn/favicons/Icon_Jaisocx.ico)](https://jaisocx.com/) A4DC 
  > **A4 Electronic Document** for printing or sending via email, by **Docker Compose** Technology.

  > Software of Company **Princexml.com** requires license. 
  > 
  > This application is the example of producing A4 Electronic Documents from an `.html` page by Software like **Prince**.



```bash

  docker compose -f "./docker-compose.yml" stop a4dc 
  docker compose -f "./docker-compose.yml" rm a4dc --volumes
  docker compose -f "./docker-compose.yml" build a4dc
  docker compose -f "./docker-compose.yml" create a4dc 
  docker compose -f "./docker-compose.yml" start a4dc 
  docker compose -f "./docker-compose.yml" restart a4dc 
  docker compose -f "./docker-compose.yml" logs a4dc 
  docker compose -f "./docker-compose.yml" exec a4dc bash 
  docker compose -f "./docker-compose.yml" ps
  docker compose ps

```



![./workspace/readme/r_docker/r_a4dc_images/page_in_browser_logoipsum.jpg](./workspace/readme/r_docker/r_a4dc_images/page_in_browser_logoipsum.jpg)

![./workspace/readme/r_docker/r_a4dc_images/doc_in_browser_logoipsum.jpg](./workspace/readme/r_docker/r_a4dc_images/doc_in_browser_logoipsum.jpg)


![./workspace/readme/r_docker/r_a4dc_images/page_in_browser_music.jpg](./workspace/readme/r_docker/r_a4dc_images/page_in_browser_music.jpg)

![./workspace/readme/r_docker/r_a4dc_images/doc_in_browser_music.jpg](./workspace/readme/r_docker/r_a4dc_images/doc_in_browser_music.jpg)



## 1. URL of the Site to convert

### 1.1. /etc/hosts

in the file `/etc/hosts` add Your machine's local IPv4 address *127.0.0.1* and the host name *letter* like this:

```
127.0.0.1    letter
```

or, in the Terminal with Your machine's user password like this:

```bash
# propmpts password to authorize:
sudo -s

# adds mapping of the IPv4 to the host name for Your browsers on Your machine.
echo "127.0.0.1    letter" >> /etc/hosts 
```



### 1.2. Bash Scripts
The host name has to be equal to the name of the dockerized service Jaisocx Sites Server in the `docker-compose.yml` on *line 3*. This host name is requested by the PrinceXML service, and has to be the dockerized service name, when converting html page to a pdf doc in the script `command/genPdf.sh` on *line 3*: 

```bash
### command/genPdf.sh
... prince http://letter/ ...
```



### 1.3. Docker Compose Conf
```yaml
### docker-compose.yml
services:

  letter:
    build:
      context: ./docker/jaisocx-http
    volumes:
      - ./workspace/cdn/:/var/workspace/cdn/
      - ./pdf_doc/:/var/pdf_doc/
```



### 1.4. Jaisocx Sites Server Conf

  The Jaisocx Sites Server 
  sends site to browser 
  when the host name matches the domain name 
  in the conf on *line 10*:

```xml
  ### docker/jaisocx-http/conf/http-conf.xml
  <domain name="letter"
```





---

`Docker`

## 2. Docker install

  **For Linux Ubuntu**
  > see for keyword linux/ubuntu

```bash

  ./command/install_docker/a_install_docker_repos_urls.sh
  ./command/install_docker/b_install_docker_compose.sh

```



## 3. Docker conf

### 3.1. Architectur related conf

#### 3.1.1. Inet Sites Service Jaisocx

  `docker/jaisocx-http/Dockerfile`

```Dockerfile

   1: # amd64 CPU Architecture, when not working, I have one more docker build, with arm64/v8
   2: # FROM jaisocx/webserver:amd64.3.0.16
   3: 
   4: # arm64/v8 CPU Architecture
   5: FROM jaisocx/webserver:mac.3.0.16

```



#### 3.1.2. Converter lib Prince

  `docker/a4dc/Dockerfile`

  *When docker builds the PrinceXML service, and the error message is shown in the terminal "architecture mismatch",
  try other package, commented in the
  `docker/a4dc/Dockerfile`, lines 23, 26*


```Dockerfile

  22:   ### Intel CPU
  23:   ARG architectur="x86_64"
  24: 
  25:   ### Apple CPU
  26:   # ARG architectur="aarch64"

```



## 4. Docker Start 
 > Finer is like this:

### 4.1. Build services

#### 4.1.1. Build PHP

  If **php** dockerized service is uncommented in `docker-compose.yml`

```bash

  docker compose build php
  
```



#### 4.1.2. Build Jaisocx Sites Service

```bash

  docker compose build letter

```



#### 4.1.3. Build Converter lib Prince

  Prince lib converts `html` pages to `pdf` ( Portable Printable Document Format )

```bash

  docker compose build a4dc

```



### 4.2. Start services


```bash

  docker-compose up -d

```



### 4.3. Navigate to:

  [http://letter:2297/Letters/letter_first/](http://letter:2297/Letters/letter_first/)



## 5. Gen .pdf

### 5.1. Set Environment variables

  `command/.env`

```bash

  #!/usr/bin/env bash
  
  Author="<Your Name>"
  Creator="<Your Name>"
  
  letter_name="LetterTemplate"
  letter_doc="index.html"
  page_margin="1mm"

```



### 5.2. Gen pdf doc via command in the Terminal:

```bash

  ./command/genPdf.sh

```



## WHERE IS THE .pdf 

  the `pdf` is here:
  
  
  [pdf_doc/letter.pdf](pdf_doc/letter.pdf)
  
  [http://letter:2297/pdf_doc/](http://letter:2297/pdf_doc/)


```
  ${project_root}/pdf_doc/letter.pdf
```







#### Friendly greetings

  Jaisocx Software Architect
  
  Elias
  


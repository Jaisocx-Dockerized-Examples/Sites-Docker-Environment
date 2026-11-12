
`Docker for a Site` Jaisocx &#8482; &#169;


![workspace/cdn_sites/software_labels/docker/software_tm_label_docker_29_4_3.svg](workspace/cdn_sites/software_labels/docker/software_tm_label_docker_29_4_3.svg)
![workspace/cdn_sites/software_labels/Jaisocx/software_tm_label_jaisocx.svg](./workspace/cdn_sites/software_labels/Jaisocx/software_tm_label_jaisocx.svg)


[HOME](./README.md)


---



# Advise on updates

  >  ⛔  **Warning November 2026!!! don't update, first do backup!!!**

  -  ❌   **git pull**  `.env's and configs lost unattended, database data lost`

  -  ❌  **changing git branches**  `.env's and configs lost unattended, on docker restart database data lost`

  -  ❌  **INSTALL_copy_env_examples.sh**  `.env's and configs lost unattended, on docker restart database data lost`

  -  ❌  **npm i or npm upgrade**  `configs lost unattended ( package.lock.json ), js bibs from node_modules lost`

  -  ❌  **yarn add, install or update**  `configs lost unattended ( yarn.lock ), js bibs from node_modules lost`

  -  ❌  **composer install or update**  `configs lost unattended ( composer.lock ), php bibs from vendor lost`

  -  ❌  **pip install or update**  `configs lost unattended, py bibs from venv lost`

  -  😀  And if Java? Und denn, scho, Java ...


  >   the warning was thought for js developers, first learned docker and databases
  >
  >   all project **data could get lost**:  ⛔  changed several configurations
  > 
  >  💡  **Before** every `git pull` to **update** this project,
  >  even without checking whether Docker settings were changed,
  >  first do backups:
  
  -  💡  **.env(s) copies**

  -  💡  **secrets or passwords copies**

  -  💡  **Your own programs copies** of gitignored or uncommitted folders, for example, if coded in node_modules

  -  💡  **MySQL db dump** and db dump **backup**

  >  ⛔  **Databases** under Docker **recreate a fresh and clean db instance**,
  >  when some  ❌  Docker config file was changed,
  >  and after `git pull && docker compose restart`, too.
  

---


  >  **News**:  ✨  `e-book multiple updates` [workspace/readme/readme_ts/ts_env_news.md](./workspace/readme/readme_ts/ts_env_news.md)


  -  🗓  AD 2026  🌾  Autumn, Nov 10  `e-book security` **cdn protected data**:  📙  [workspace/readme/readme_docker/dc_cdn_protected_data.md](./workspace/readme/readme_docker/dc_cdn_protected_data.md)

  -  🗓  AD 2026  🌾  Autumn, Nov 10  `new soft for security` **JaisocxExpress DomainPolicy, https** (http/1.1):  📙  [workspace/readme/readme_ts/ts_env_JaisocxExpress.md](./workspace/readme/readme_ts/ts_env_JaisocxExpress.md)


---



Have a nice day, Jaisocx Inc. Software Architect I.P.





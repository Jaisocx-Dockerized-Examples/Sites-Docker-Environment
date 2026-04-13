
[HOME](./README_Docker.md)

---

`Docker Networks`

# Docker Networks

## 1. Refinements
  > Refinements in the current February review after 3 months release before.

  - Firewall
  - ports
  - ip
  - domain names
  - ssl
  - https
  - Services' network confs
  - Signed Wildcard SSL Certificate for any subdomain of **basetasks.site**.
  - Local and Open Docker Networks
  - The option to set the **fine-grained security confs** like `allowed_clients`, for sure, of greate use for Databases confs.
  > If, or when, You or System Admin change or add a network for a service, or add another open network, still, the single allowed client's IP has effect, and the first time at once NO data compromizing because of unintended open port doesn't occur.



  ## 2. Aim of the Setup
  > Fine tuning Firewall, https, services' network confs.

  2.1. Known local docker network IPv4, IPv6 addresses, Domain names, set in `.env`.

  2.2. Free for use, installed, with published installation bash scripts, valid til December 2026 **Signed Wildcard SSL Certificate** for 95.00 USD for any subdomain of the Domain name **basetasks.site**, paid from my money cost sum ( bound abos and payments inclusive ) above 400 USD.

  ![./workspace/readme/docker/r_dc_images/ssl_certs_commands_720.png](./workspace/readme/docker/r_dc_images/ssl_certs_commands_720.png)



  2.3. The Local Docker Network named in .env `INTERNAL_NETWORK_NAME`.
```bash
  INTERNAL_NETWORK_NAME="jaisocx_internal_dockr_network_a4dc_e366"
```


  2.4. The Open Docker Network for Sites named in .env `OPENED_NETWORK_NAME`.
```bash
  OPENED_NETWORK_NAME="jaisocx_opened_dockr_network_a4dc_e366"
```


  2.5. Every service are in the Local Docker Network, NO open services neither to Host OS on Your machine, nor to other machines in the Inet. 

**Local Network assigned for a service [a4dc]**
```yaml
services:
  a4dc:
    ...
    ...
    networks:
      jaisocx_dck_local_network:
        ipv6_address: "${A4DC_IPv6}"
        ipv4_address: "${A4DC_IPv4}"
```


**Networks definition block, local network [jaisocx_internal_dockr_network_a4dc_e366]**
```yaml
networks:
    jaisocx_dck_local_network:
      name: "${INTERNAL_NETWORK_NAME}"
      driver: ipvlan
      enable_ipv6: true
      external: false
      internal: true
      attachable: false
      ...
      ...
```

 
  2.6. Just to the single **Jaisocx Sites Server** added the **open** bridge **network** with open **ports** set in `.env` like `JAISOCX_HTTPS_PORT=8445`. However, **hardcoded** just for the Docker system and documentation purposes, since the **Jaisocx' confs don't read** in `http-conf.xml` the **.env** bash variables.

  ```yaml
  services:
    jaisocx:
      ...
      ...
      ports:
      - "${JAISOCX_HTTPS_PORT}:${JAISOCX_HTTPS_PORT}"
  ```


  2.7. The Sites Docker Service can connect locally to **php-fpm** by IPv4 and port, and other docker services **can connect** to the Sites Service **via https** clients like `curl` or `wget` by **Domain name** and, though, **valid SNI TLS Extension**.
  ```yaml
  services:
    jaisocx:
      ...
      ...
      networks:
        jaisocx_dck_local_network:
          aliases:
            - "${JAISOCX_DOMAIN_NAME}"
  ```


  2.8. Docker services can connect in the Local Docker Network by Domain names, with SSL Certs and SNI TLS Extension.

  2.9. The option to set the **fine-grained security confs** with the **allowed to connect clients** of the local docker network, by their IP address and port number, like in **php-fpm**: docker_compose/PHP/docker/conf/php83/**php-fpm.d/pool_workspace.conf**: ```listen.allowed_clients="${JAISOCX_HTTP_IPv6},${JAISOCX_HTTP_IPv4}"```. And, for sure, of greate use for Databases confs. 
  > If, or when, You or System Admin change or add a network for a service, or add another open network, still, the single allowed client's IP has effect, and the first time at once NO data compromizing because of unintended open port doesn't occur.



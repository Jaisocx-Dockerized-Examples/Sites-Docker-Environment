
![./software_tm_label_jaisocx.svg](./software_tm_label_jaisocx.svg)

`bash command line`



# SSL Command Line

  [README.md HOME](./../../README.md)

  > for SSL Certificates.
  

  
  **Installed Wildcard SSL** for [basetasks.site]() served by **Jaisocx**
  
  ![PopupSiteSecured_Jaisocx](./readme_images/PopupSiteSecured_Jaisocx_600.png)
  
  **Installed Wildcard SSL** for [basetasks.site]() served by **Node** and **Express Framework**
  
  ![PopupSiteSecured_Node_https](./readme_images/PopupSiteSecured_Node_https_600.png)





## 1. For what

---
  
  For **security of data transport** in Inet,
  since 2010-ies the published sites
  are sent to browsers **encrypted** with **SSL** technology.



## 2. What is in this package
  
  For our new domain **basetasks.site** with the Wildcard Certificate for year 2026.
  
  2.1. **JKS** for **Jaisocx Sites Server** `2026_2027_basetasks_site.jks`
  
  2.2. **Bundle.crt** for **NodeJS HTTPS** and **Express Framework** `bundle_for_node_https_basetasks_site.crt`
  
  2.3. Two **scripts** for two **SSL tasks**:

    2.3.1. Produce Private Key and CSR
    2.3.2. Install Certificates for Jaisocx and Node https




### 2.3. two scripts for two SSL tasks

---

  Two command line shell scripts, written in bash programming language in this library solve 2 tasks for the SSL:

  2.3.1. When **ordering new SSL Cert**, produces:
  
    2.3.1.1. Private Key
    2.3.1.2. CSR (Certificate Sign Request)

  2.3.2. After **have obtained new SSL Cert** from a Provider, produces:

    2.3.2.1. `<domain_name>.jks` (Java Key Store file) for Jaisocx Sites Server Secure HTTPS Endpoints
    2.3.2.1. `bundle.crt` for both, Node and Express Framework, Secure HTTPS Endpoints





## 2.3.1. When **ordering new SSL** Certificate

  The script produces new **Private Key** and **CSR** (Certificate Sign Request).


  **Example script** location: `cmd/ssl/Step1_CertificateRequestIssue/a_step1_scripts`

  `Example_gen_private_key_with_certificate_request.sh`



  **Example folder structure** for the **CSR** with **Private Key**

  `cmd/ssl/Step1_CSR_n_PKey/b_produced_csr_with_private_key/Domain_name_csr_n_pkey/2026_2027_domain_name_csr_n_pkey`



```fs
  cmd
    ssl
      Step1_CSR_n_PKey

        a_step1_scripts
          Example_gen_private_key_with_certificate_request.sh

        b_produced_csr_with_private_key
          Domain_name_csr_n_pkey
            2026_2027_domain_name_csr_n_pkey
                New CSR:         2026_2027_domain_name.csr
                New Private Key: 2026_2027_domain_name.key
```



Script:

```bash
  
  #!/usr/bin/env bash
  
  # Define your domain name
  DOMAIN="<domain name>"
  COUNTRY_CODE="<2 chars Country code>"
  STATE_CODE="<2 chars State code>"
  CITY_NAME="<City name>"
  COMPANY_NAME="<Company name>"
  ORGANIZATION_DEPT="<Department name>"
  
  
  
  # Generate a private key
  openssl genpkey -algorithm RSA -out "${DOMAIN}.key" -pkeyopt rsa_keygen_bits:2048
  
  # Generate a CSR for a wildcard certificate
  openssl req -new -key "${DOMAIN}.key" -out "${DOMAIN}.csr" -subj "/C=${COUNTRY_CODE}/ST=${STATE_CODE}/L=${CITY_NAME}/O=${COMPANY_NAME}/OU=${ORGANIZATION_DEPT}/CN=*.${DOMAIN}"

```



## 2.3.2. After **have obtained new SSL** certificates from a Provider

  2.3.2.1. `<domain_name>.jks` (Java Key Store file) for **Jaisocx** Sites Server Secure HTTPS Edpoints
  
  2.3.2.2. `bundle.crt` for both, **Node** and **Express Framework**, Secure HTTPS Edpoints



  ### 2.3.2.3. Example scripts in the folder

  `cmd/ssl/Step2_JavaKeyStore/a_step2_scripts/Example_step2_cert_gen_scripts/2026_2027_Example_jks_gen.sh`


```fs
  cmd
    ssl
      Step2_JavaKeyStore
        a_step2_scripts
          Example_step2_cert_gen_scripts
            Script: 2026_2027_Example_jks_gen.sh
          Script: obtain_free_3month_valid_SSL_certificate_with_jks.sh
```




## 3. Installed SSL Certificates for Jaisocx and Node with Express

  ### 3.1. Installed SSL for Jaisocx
  Installed `basetasks_site.jks` (Java Key Store) for **Jaisocx** Sites Server Secure HTTPS Endpoints


  #### 3.1.1. JKS location:
  `docker/Jaisocx_SitesServer/ssl/2026_2027_basetasks_site.jks`

  #### 3.1.2. Conf for Jaisocx:
  `docker/Jaisocx_SitesServer/conf/http-conf.xml`


```xml
  <servers>
    <server port="9445" alternative-port="9444" secure="true">
      <domain
        name="cdn.basetasks.site"
        jks-path="/usr/lib/jaisocx-http/ssl/2026_2027_basetasks_site.jks"
        jks-alias="basetasks.site"
        jks-passphrase="72vNSMvK3YdgphVwUA34DgrbApK9DgDM4koDA42AK7VmYYaAckivmvhMogCPPXh"
        publish-charset="UTF-8" src-charset="UTF-8">
  
      ...
      ...
      </domain>
    
      <domain
        name="local.basetasks.site"
        jks-path="/usr/lib/jaisocx-http/ssl/2026_2027_basetasks_site.jks"
        jks-alias="basetasks.site"
        jks-passphrase="72vNSMvK3YdgphVwUA34DgrbApK9DgDM4koDA42AK7VmYYaAckivmvhMogCPPXh"
        document-root="/opt/jaisocx/sites_tools/workspace/php"
        publish-charset="UTF-8" src-charset="UTF-8">
  
        ...
        ...
      </domain>
    </server>
  </servers>
```



### 3.2. Installed SSL for Node with Express

  Installed `bundle.crt` for both, 
    **Node** 
    and **Express Framework** 
    Secured HTTPS Endpoints.

  **Bundle.crt and Private Key** location:
    `workspace/ts/ssl/Basetasks_site/2026_2027_Basetasks_site`

  3.2.1. **Installed** for **Node https** in `package.json` location: 
    `workspace/ts/package.json`

  3.2.2. **Installed** for **Express** in `secure_server.js` location:
    `workspace/ts/express/src/secure_server.js` 
    after Line 215

```js
  // workspace/ts/express/src/secure_server.js
  // Line Nr.: 215
  // ...
  
215:  https
216:    .createServer (
217:      {
218:        key:  fs.readFileSync( ' ... /2026_2027_basetasks_site.key' ),
219:        cert: fs.readFileSync( ' ... /2026_2027_bundle_for_node_basetasks_site.crt' ),
220:      },
221:      app
222:    ).listen( https_port );
```










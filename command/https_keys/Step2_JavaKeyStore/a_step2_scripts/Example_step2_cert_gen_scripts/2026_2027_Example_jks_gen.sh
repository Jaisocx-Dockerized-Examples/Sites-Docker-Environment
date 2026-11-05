#!/usr/bin/env bash

FOR_JKS=true
FOR_NODE_HTTPS=true

DOMAIN_NAME="basetasks.site"

### HERE GO YOUR OUTPUT JKS PARAMS
# Keystore JKS alias.
JKS_ALIAS="${DOMAIN_NAME}"

# Specify the keystore password which is used to protect the integrity of the keystore.
# Keystore password must be at least 6 characters.
JKS_PASSWORD=<change-pwd>



SSL_CERT_FOLDER="<absolute path of folder cmd/ssl>"

CSR_N_PKEY_FOLDER="${SSL_CERT_FOLDER}/Step1_CertificateRequestIssue/b_produced_csr_with_private_key/Basetasks_site_csr_n_pkey/2026_2027_Basetasks_site_csr_n_pkey"
OBTAINED_SSL_CERT_FOLDER="${SSL_CERT_FOLDER}/Step2_JavaKeyStore/A_SSL_Certs/Basetasks_site_SSL_Certs/2026_2027_STAR_basetasks_site"

PRODUCED_BUNDLES_FOLDER="${SSL_CERT_FOLDER}/Step2_JavaKeyStore/b_produced_ssl_cert_bundles/Basetasks_site_ssl_cert_bundles/2026_2027_Basetasks_site_ssl_cert_bundles"
PRODUCED_JKS_FOLDER="${SSL_CERT_FOLDER}/Step2_JavaKeyStore/c_produced_jks/Basetasks_site_jks/2026_2027_Basetasks_site_jks"

PRIVATE_KEY_PATH="${CSR_N_PKEY_FOLDER}/2026_2027_basetasks.site.key"
PRODUCED_JKS_PATH="${PRODUCED_JKS_FOLDER}/2026_2027_${DOMAIN_NAME}.jks"



CERT_LEVEL_A="${OBTAINED_SSL_CERT_FOLDER}/Root.crt"
CERT_LEVEL_B="${OBTAINED_SSL_CERT_FOLDER}/Intermediate.crt"
CERT_LEVEL_C="${OBTAINED_SSL_CERT_FOLDER}/Domain_name.crt"



###=============================================================
### DON'T EDIT BELOW
###=============================================================

BUNDLE_FOR_NODE_HTTPS="${PRODUCED_BUNDLES_FOLDER}/bundle_for_node_https_${DOMAIN_NAME}.crt"
BUNDLE_FOR_JKS="${PRODUCED_BUNDLES_FOLDER}/bundle_for_jks_${DOMAIN_NAME}.crt"



# PKCS12
PKCS_PATH="${PRODUCED_BUNDLES_FOLDER}/pkcs_keystore_${DOMAIN_NAME}.p12"
PKCS12_NAME="${JKS_ALIAS}"
PKCS12_PASSWORD=xd7jmM2



# =================================================================================================

bundle_of_certs_for_jks=(
  "CERT_LEVEL_A"
  "CERT_LEVEL_B"
  "CERT_LEVEL_C"
)

bundle_of_certs_for_node_https=(
  "CERT_LEVEL_C"
  "CERT_LEVEL_B"
  "CERT_LEVEL_A"
)



### for Jaisocx Sites Server
### -------------------------------------------------------
if [[ "${FOR_JKS}" == "true" ]]; then

  if [[ -e "${BUNDLE_FOR_JKS}" ]]; then
    rm "${BUNDLE_FOR_JKS}"
  fi

  for cert_for_jks in "${bundle_of_certs_for_jks[@]}"; do

    ### echo "${cert_for_jks}"
    cat  "${!cert_for_jks}" >> "${BUNDLE_FOR_JKS}"

  done;

fi



### for NodeJS HTTPS and NodeJS Express Framework
### -------------------------------------------------------
if [[ "${FOR_NODE_HTTPS}" == "true" ]]; then

  if [[ -e "${BUNDLE_FOR_NODE_HTTPS}" ]]; then
    rm "${BUNDLE_FOR_NODE_HTTPS}"
  fi

  for cert_for_node in "${bundle_of_certs_for_node_https[@]}"; do

    ### echo "${cert_for_node}"
    cat  "${!cert_for_node}" >> "${BUNDLE_FOR_NODE_HTTPS}"

  done;

fi



if [[ "${FOR_JKS}" != "true" ]]; then
  exit 0
fi



openssl pkcs12 -export -name "$PKCS12_NAME" -in "$BUNDLE_FOR_JKS" -inkey "$PRIVATE_KEY_PATH" \
 -passout pass:$PKCS12_PASSWORD -out "$PKCS_PATH"

# =================================================================================================

# Convert PKCS12 keystore into a JKS keystore.
keytool -importkeystore -destkeystore "$PRODUCED_JKS_PATH" -srckeystore "$PKCS_PATH" -srcstoretype pkcs12 \
-srcstorepass $PKCS12_PASSWORD -alias $JKS_ALIAS -storepass $JKS_PASSWORD

# Delete PKCS12 and BUNDLE_FOR_JKS
rm "$PKCS_PATH"
rm "$BUNDLE_FOR_JKS"



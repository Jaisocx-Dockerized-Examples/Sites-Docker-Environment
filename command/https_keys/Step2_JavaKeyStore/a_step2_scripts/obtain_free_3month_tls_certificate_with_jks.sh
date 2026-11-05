#!/bin/bash

# FREE HTTPS CERT BY CERTBOT, VALID FOR 90 DAYS

#=========== PLEASE SET HERE YOUR PARAMS ==============================
export EMAIL="emailaddress@domainname.site"
export DOMAIN="domainname.site"

# Specify the keystore password 
# that is used to protect the integrity of the keystore.
# Keystore password must be at least 6 characters.

JKS_PASSWORD=jkspwd123

#===============================================================









###=============================================================
### DON'T EDIT BELOW
###=============================================================

sudo ufw allow 80

sudo apt update
sudo apt install snapd

sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

mkdir certs

export CRT_FOLDER="certs/${DOMAIN}"

mkdir "${CRT_FOLDER}"

certbot certonly \
  --non-interactive \
  --agree-tos \
  --email "${EMAIL}" \
  --domains "${DOMAIN}" \
  --standalone \
  --preferred-challenges http-01 \
  --http-01-port 80
#  --cert-path $CRT_FOLDER

# Set the destination folder
DEST_FOLDER="${CRT_FOLDER}"

### PATHS TO YOUR CERT FROM CERTIFICATION AUTHORITY
PRIVATE_KEY="/etc/letsencrypt/live/${DOMAIN}/pkey.pem"
CRT="/etc/letsencrypt/live/${DOMAIN}/cert.pem"

JKS_ALIAS="${DOMAIN}"
JKS="${DEST_FOLDER}/${DOMAIN}.jks"

PKCS_PATH="${DEST_FOLDER}/keystore.p12"
PKCS12_NAME="${JKS_ALIAS}"
PKCS12_PASSWORD=p12temppass



# =================================================================================================
# Create PKCS12 keystore from certificate.
 openssl pkcs12 -export -name "$PKCS12_NAME" -in "$CRT" -inkey "$PRIVATE_KEY" \
 -passout pass:$PKCS12_PASSWORD -out "$PKCS_PATH"
# =================================================================================================

# Convert PKCS12 keystore into a JKS keystore.
keytool -importkeystore -destkeystore "$JKS" -srckeystore "$PKCS_PATH" -srcstoretype pkcs12 \
-srcstorepass $PKCS12_PASSWORD -alias $JKS_ALIAS -storepass $JKS_PASSWORD

# Delete PKCS12
rm "$PKCS_PATH"



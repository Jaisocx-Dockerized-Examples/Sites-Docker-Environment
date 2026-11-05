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





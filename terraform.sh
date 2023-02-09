#!/bin/bash
source .env
export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
export AWS_BUCKET_NAME=$AWS_BUCKET_NAME
export TF_VAR_system_bucket_name=$TF_VAR_system_bucket_name
export TF_VAR_bucket_name=$TF_VAR_bucket_name
export TF_VAR_domain_name=$TF_VAR_domain_name
#cd terraform && terraform init
cd terraform && terraform apply

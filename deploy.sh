#!/bin/bash
source .env
export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
export AWS_BUCKET_NAME=$AWS_BUCKET_NAME

# Load nvm (node version manager), install node (version in .nvmrc), and npm install packages
[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh" && nvm use
#git pull
#node articles.js
#git add *
#git commit -am "add approved articles"
#git push origin master
#npm run build
npm run deploy
npm run deploy # sometimes some files are not uploaded

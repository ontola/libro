#!/bin/bash

if [ $EUID != 0 ]; then
    sudo "$0" "$@"
    exit $?
fi

USR=$SUDO_USER
USR_HOME=$(getent passwd $SUDO_USER | cut -d: -f6)

generate_password() {
  head -c 256 /dev/urandom | tr -dc 'a-zA-Z0-9'
}

init_secrets() {
  if [ -f $1 ]; then
    echo ".env already exists, skipping"
    return
  fi
  client_id="$(docker-compose --file ../argu/compose/docker-compose.yml run app bundle exec rails runner 'puts "\n\n#{Doorkeeper::Application.first.uid}"; STDOUT.flush' 2> /dev/null | tail -n 1)"
  client_secret="$(docker-compose --file ../argu/compose/docker-compose.yml run app bundle exec rails runner 'puts Doorkeeper::Application.first.secret; STDOUT.flush'  2> /dev/null | tail -n 1)"
  echo "$client_id"
  echo "$client_secret"

  sudo -u $USR /bin/bash -c "sed \"s/{secret}/$2/g\" $1.template | sed \"s/{client_id}/$client_id/g\" | sed \"s/{client_secret}/$client_secret/g\" > $1"
}

password=$(generate_password)
init_secrets ./.env $password
if [ -f /usr/bin/nodejs ]; then
  if [ ! -f /usr/bin/node ]; then
    ln -s /usr/bin/nodejs /usr/bin/node
  fi
fi

sudo -u $USR /bin/bash -c '. $HOME/.nvm/nvm.sh && yarn'
sudo -u $USR /bin/bash -c '. $HOME/.nvm/nvm.sh && npm rebuild --force node-sass'
sudo -u $USR /bin/bash -c '. $HOME/.nvm/nvm.sh && yarn run build:verbose'

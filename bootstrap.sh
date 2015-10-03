#!/usr/bin/env bash

apt-get update
apt-get install -y apache2
if ! [ -L /var/www ]; then
  rm -rf /var/www
  ln -fs /vagrant /var/www
fi

echo "--- installing nvm ---"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.28.0/install.sh | bash

nvm install v4.1.1
nvm alias default v4.1.1
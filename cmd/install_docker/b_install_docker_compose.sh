#!/usr/bin/env bash

whether_to_bypass_confirmation="$1"



sudo apt-get update

sudo apt-get install curl
sudo apt-get install git

### docker related Linux packages installation
sudo apt-get install docker-ce
sudo apt-get install docker-ce-cli
sudo apt-get install containerd.io
sudo apt-get install docker-buildx-plugin
sudo apt-get install docker-compose-plugin




apt install curl
apt install git
apt install docker-ce
apt install docker-ce-cli
apt install containerd.io
apt install docker-buildx-plugin
apt install docker-compose-plugin


if [[ "${whether_to_bypass_confirmation}" == "-y" ]]; then

    echo "Docker installed, Docker Compose Plugin installed"
    echo "Starts reboot ..."

    sudo reboot;

    exit 0;

fi



read -p "Reboot now? y/N ( yes | no ) ..." whether_to_restart

if [[ "${whether_to_restart}" == "y" ]]; then

    echo "Docker installed, Docker Compose Plugin installed"
    echo "Starts reboot ..."

    sudo reboot;

    exit 0;


  else

    echo "Didn't start reboot ..."
    exit 0;

fi



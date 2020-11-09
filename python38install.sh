#!/bin/sh

#check if amazon-linux-extras has the python3.8 we want (it'll be listed as output)
amazon-linux-extras | grep -i python

#we must enable the python 3.8 repo in the amzn lnx xtras
sudo amazon-linux-extras enable python3.8
#now, we can install it to instance
sudo yum install python3.8

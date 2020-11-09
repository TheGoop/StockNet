#!/bin/sh

wget https://bootstrap.pypa.io/get-pip.py
python get-pip.py
python -m pip install --upgrade pip setuptools wheel

#!/usr/bin/env bash

mysql -h127.0.0.1 -uroot -e 'DROP DATABASE editthis;'
mysql -h127.0.0.1 -uroot -e 'CREATE DATABASE editthis;'
mysql -h127.0.0.1 -uroot -e "$(cat initial.sql)" editthis

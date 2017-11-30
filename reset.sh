#!/usr/bin/env bash

if [ -d pictures ]; then rm pictures/*; fi
if [ ! -d pictures ]; then mkdir pictures; fi
mysql -h127.0.0.1 -uroot -e 'DROP DATABASE IF EXISTS editthis;'
mysql -h127.0.0.1 -uroot -e 'CREATE DATABASE editthis;'
mysql -h127.0.0.1 -uroot -e "$(cat initial.sql)" editthis

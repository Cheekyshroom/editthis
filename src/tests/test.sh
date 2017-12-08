#!/usr/bin/env bash

# Reset Database
mysql -h127.0.0.1 -uroot -e 'DROP DATABASE IF EXISTS editthis;'
mysql -h127.0.0.1 -uroot -e 'CREATE DATABASE editthis;'
mysql -h127.0.0.1 -uroot -e "$(cat initial.sql)" editthis

# Run unit tests
echo "Running unit tests"
node build/test-bundle.js

# Run integration tests
#echo "Running integration tests"
#src/tests/integration.sh

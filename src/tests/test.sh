#!/usr/bin/env bash

# Reset Database
mysql -h127.0.0.1 -uroot -e 'DROP DATABASE IF EXISTS editthis;'
mysql -h127.0.0.1 -uroot -e 'CREATE DATABASE editthis;'
mysql -h127.0.0.1 -uroot -e "$(cat ../../initial.sql)" editthis

# Group creation test 
groupId="1234"
out=$(curl -s "localhost:3000/api/createGroup/$groupId")

if [ `echo "$out" | jq '.success'` != "true" ]; then
  echo "Group creation failed with result $(echo "out" | jq)"
  exit
fi

echo "All tests passed!"

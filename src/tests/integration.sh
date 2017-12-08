#!/usr/bin/env bash

# Group creation test 
groupId="1234"
out=$(curl -s "localhost:3000/api/createGroup/$groupId")

if [ `echo "$out" | jq '.success'` != "true" ]; then
  echo "Group creation failed with result $(echo "out" | jq)"
  exit
fi

echo "All tests passed!"

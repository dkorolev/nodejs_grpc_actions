#!/bin/bash

[ -d nodejs/node_modules ] || (cd nodejs; npm i; echo)

node nodejs/service_add.js &
sleep 0.5  # Just to be safe, TODO(dkorolev): Replace by a health check.
node nodejs/client_add.js

wait

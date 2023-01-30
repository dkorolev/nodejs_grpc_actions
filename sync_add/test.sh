#!/bin/bash

retval=0

[ -d nodejs/node_modules ] || (cd nodejs; npm i; echo)

node nodejs/service_add.js &
sleep 0.5  # Just to be safe, TODO(dkorolev): Replace by a health check.

for i in '1 2' '2 2' '2 3' '32 10' ; do
  read -r a b <<< $i
  c=$((a + b))
  echo -n "Testing $a + $b == $((a + b)): "
  r=$(grpcurl -plaintext -proto add.proto -d "{\"a\":$a,\"b\":$b}" 0.0.0.0:5555 test_add.RPC/Add | jq -r .c)
  if [ "$r" == "$c" ] ; then
    echo -e "\033[32mPASS\033[0m"
  else
    echo -e "\033[31mFAIL\033[0m, received $r while expecting $c."
    retval=1
  fi
done

echo
if [ "$retval" != 0 ] ; then
  echo "Has failed tests."
else
  echo "All tests passed."
fi

grpcurl -plaintext -proto add.proto 0.0.0.0:5555 test_add.RPC/Kill >/dev/null

wait

exit $retval

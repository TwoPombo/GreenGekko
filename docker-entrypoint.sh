#!/bin/sh

echo "Starting Gekko service ${HOST} ${PORT}";

sed -i 's/127.0.0.1/0.0.0.0/g' /usr/src/app/web/vue/dist/UIconfig.js;
sed -i 's/localhost/'${HOST}'/g' /usr/src/app/web/vue/dist/UIconfig.js;
sed -i 's/3000/'${PORT}'/g' /usr/src/app/web/vue/dist/UIconfig.js;

#if [ "${USE_SSL:-0}" == "1" ]; then
#    sed -i 's/ssl: false/ssl: true/g' /usr/src/app/web/vue/dist/UIconfig.js;
#fi

if [ ! -d './node_modules' ]; then
  yarn install;
fi

if [ ! -d './exchange/node_modules' ]; then
  cd exchange || exit;
  yarn install;
  cd ../ || exit;
fi

exec node gekko "$@"

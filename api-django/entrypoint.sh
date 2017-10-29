#!/bin/sh
cd /opt/app
echo "${@:2}"
if [ $1 = 'manage' ]; then
    shift
    python manage.py $@
else
    eval "${@}"
fi

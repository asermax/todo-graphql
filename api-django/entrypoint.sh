#!/bin/sh
cd /opt/app
echo "${@:2}"
if [ $1 = 'manage' ]; then
    shift
    python manage.py $@
elif [ $1 = 'gunicorn' ]; then
    shift
    python /usr/local/lib/python3.6/site-packages/gunicorn/app/wsgiapp.py $@
else
    eval "${@}"
fi

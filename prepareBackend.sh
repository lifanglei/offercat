#!/bin/bash
# exec ~/Project-Kaizen/kaizen/manage.py runserver 0.0.0.0:8080
source ~/officeCat/env/bin/activate
rm -rf ~/officeCat/static/
exec ~/officeCat/manage.py collectstatic --noinput
exec ~/officeCat/manage.py makemigrations
exec ~/officeCat/manage.py migrate

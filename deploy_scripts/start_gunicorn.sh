#!/bin/bash

# Activer l'environnement virtuel
source venv/bin/activate

# Collecter les fichiers statiques
python manage.py collectstatic --noinput

# Lancer Gunicorn
gunicorn --config gunicorn_config.py ec.wsgi

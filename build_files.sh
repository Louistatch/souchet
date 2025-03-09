#!/bin/bash

# Construire le projet
echo "Construire le projet..."
pip install -r requirements.txt

# Collecte des fichiers statiques
echo "Collecte des fichiers statiques..."
python manage.py collectstatic --noinput --clear

echo "Construction terminée !"

#!/bin/bash

echo "Starting Netlify build process..."

# Installer les dépendances
echo "Installing dependencies..."
pip install -r requirements-netlify.txt

# Créer les répertoires nécessaires
echo "Creating necessary directories..."
mkdir -p staticfiles
mkdir -p static/app
mkdir -p media
mkdir -p netlify/functions

# Copier les fichiers statiques
echo "Copying static files..."
cp -r app/static/* static/app/ || echo "No static files to copy or directory doesn't exist"

# Collecter les fichiers statiques
echo "Collecting static files..."
python manage.py collectstatic --noinput --clear

echo "Build completed successfully!"

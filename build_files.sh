#!/bin/bash

# Ensure the script is executable
chmod +x build_files.sh

# Construire le projet
echo "Construire le projet..."
pip install -r requirements.txt

# Nettoyer les anciens fichiers statiques
echo "Nettoyer les répertoires de static et media..."
rm -rf staticfiles
rm -rf static

# Créer des répertoires s'ils n'existent pas
mkdir -p staticfiles
mkdir -p media
mkdir -p static/app
mkdir -p netlify/functions

# Copier manuellement les fichiers statiques
echo "Copie manuelle des fichiers statiques..."
cp -r app/static/* static/app/

# Collecte des fichiers statiques
echo "Collecte des fichiers statiques..."
python manage.py collectstatic --noinput --clear

# Créer le répertoire pour les fonctions Netlify si nécessaire
if [ ! -d "netlify/functions" ]; then
  mkdir -p netlify/functions
fi

# Pour le débogage - afficher les répertoires
echo "Contenu du répertoire staticfiles:"
ls -la staticfiles
echo "Contenu du répertoire static/app:"
ls -la static/app

echo "Construction terminée !"

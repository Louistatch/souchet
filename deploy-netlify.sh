#!/bin/bash

echo "===== Préparation du déploiement Netlify ====="
echo "Nettoyage des fichiers temporaires..."
rm -rf .netlify/.netlify-cache
rm -rf .netlify/cache
rm -rf staticfiles

echo "Collecte des fichiers statiques..."
python manage.py collectstatic --noinput --clear

echo "===== Déploiement sur Netlify ====="
echo "NOTE: Assurez-vous que les modifications ont été commitées sur votre dépôt Git!"
echo "Rendez-vous sur Netlify et redéployez votre site depuis l'interface."
echo "URL: https://app.netlify.com/"

echo "===== Instructions de déploiement ====="
echo "1. Connectez-vous à Netlify (https://app.netlify.com/)"
echo "2. Sélectionnez votre site"
echo "3. Allez dans l'onglet 'Deploys'"
echo "4. Cliquez sur 'Trigger deploy' > 'Clear cache and deploy site'"
echo "5. Attendez que le déploiement soit terminé"
echo "6. Vérifiez votre site à l'URL fournie par Netlify"

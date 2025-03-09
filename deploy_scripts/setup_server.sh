#!/bin/bash

# Script d'installation pour un serveur Digital Ocean avec Django
# À exécuter sur le droplet après sa création

# Mettre à jour le système
echo "Mise à jour du système..."
sudo apt-get update
sudo apt-get upgrade -y

# Installer les dépendances nécessaires
echo "Installation des dépendances..."
sudo apt-get install -y python3-pip python3-dev libpq-dev postgresql postgresql-contrib nginx curl build-essential

# Configurer un environnement virtuel Python
echo "Configuration de l'environnement virtuel..."
sudo pip3 install virtualenv
virtualenv venv
source venv/bin/activate

# Installer les paquets Python requis
echo "Installation des paquets Python..."
pip install -r requirements.txt
pip install gunicorn psycopg2-binary

# Configurer Nginx
echo "Configuration de Nginx..."
sudo cat > /etc/nginx/sites-available/laclemencegroupe <<EOF
server {
    listen 80;
    server_name laclemencegroupe.com www.laclemencegroupe.com;

    location = /favicon.ico { access_log off; log_not_found off; }
    
    location /static/ {
        root /home/django/souchet;
    }
    
    location /media/ {
        root /home/django/souchet;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/home/django/souchet/laclemencegroupe.sock;
    }
}
EOF

# Activer le site
sudo ln -s /etc/nginx/sites-available/laclemencegroupe /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx

# Configurer le service Gunicorn
echo "Configuration du service Gunicorn..."
sudo cat > /etc/systemd/system/gunicorn.service <<EOF
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=django
Group=www-data
WorkingDirectory=/home/django/souchet
ExecStart=/home/django/souchet/venv/bin/gunicorn --access-logfile - --workers 3 --bind unix:/home/django/souchet/laclemencegroupe.sock ec.wsgi:application

[Install]
WantedBy=multi-user.target
EOF

# Démarrer et activer le service Gunicorn
sudo systemctl start gunicorn
sudo systemctl enable gunicorn

# Configurer le firewall
echo "Configuration du firewall..."
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh

echo "Installation terminée !"
echo "Votre application est maintenant accessible sur http://laclemencegroupe.com"

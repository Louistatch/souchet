# La Clémence Groupe - Site Web

Site web pour La Clémence Groupe, entreprise spécialisée dans la transformation du souchet.

## Fonctionnalités

- Catalogue de produits avec pages de détail
- Navigation par catégories
- Recherche de produits
- Pages d'information (À propos, Contact)
- Interface administrateur pour gérer les produits et commandes

## Technologies utilisées

- Django 4.2.18
- HTML/CSS/JavaScript
- Bootstrap 5
- SQLite (développement)
- Razorpay pour le traitement des paiements

## Déploiement sur Digital Ocean

### Étape 1 : Créer un Droplet sur Digital Ocean

1. Créez un compte sur [Digital Ocean](https://www.digitalocean.com/)
2. Créez un nouveau Droplet avec :
   - Ubuntu 22.04 LTS
   - Plan Basic (2GB RAM / 1 CPU minimum recommandé)
   - Région proche de vos utilisateurs (Afrique ou Europe)
   - Authentification par mot de passe (notez bien le mot de passe)

### Étape 2 : Configurer le Droplet

1. Connectez-vous à votre Droplet via SSH :
   ```
   ssh root@votre_ip_droplet
   ```

2. Créez un utilisateur non-root :
   ```bash
   adduser django
   usermod -aG sudo django
   ```

3. Basculez vers le nouvel utilisateur :
   ```bash
   su - django
   ```

4. Clonez ce dépôt :
   ```bash
   git clone https://github.com/Louistatch/souchet.git
   cd souchet
   ```

5. Exécutez le script d'installation :
   ```bash
   bash deploy_scripts/setup_server.sh
   ```

### Étape 3 : Configuration du domaine

1. Pointez votre domaine (laclemencegroupe.com) vers l'adresse IP de votre Droplet
2. Configurez les enregistrements DNS :
   - A Record pour laclemencegroupe.com → IP_de_votre_Droplet
   - A Record pour www.laclemencegroupe.com → IP_de_votre_Droplet

### Étape 4 : Sécuriser avec HTTPS (SSL/TLS)

1. Installez Certbot :
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   ```

2. Obtenez un certificat SSL :
   ```bash
   sudo certbot --nginx -d laclemencegroupe.com -d www.laclemencegroupe.com
   ```

3. Suivez les instructions pour configurer HTTPS

### Étape 5 : Finalisation

1. Vérifiez que votre site est accessible à https://laclemencegroupe.com
2. Vérifiez que les fichiers statiques (CSS, JavaScript, images) s'affichent correctement
3. Testez toutes les fonctionnalités

## Maintenance

### Mettre à jour le site

1. Connectez-vous à votre serveur :
   ```bash
   ssh django@votre_ip_droplet
   ```

2. Accédez au répertoire du projet et tirez les dernières modifications :
   ```bash
   cd souchet
   git pull
   ```

3. Activez l'environnement virtuel et appliquez les migrations :
   ```bash
   source venv/bin/activate
   python manage.py migrate
   python manage.py collectstatic
   ```

4. Redémarrez Gunicorn :
   ```bash
   sudo systemctl restart gunicorn
   ```

### Sauvegardes

Il est recommandé de configurer des sauvegardes automatiques pour votre base de données :

```bash
# Créer une sauvegarde manuelle
python manage.py dumpdata > backup_$(date +%Y%m%d).json
```

## Support

Pour toute question ou assistance, contactez Clemenceekoue17@gmail.com
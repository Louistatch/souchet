# Guide de déploiement sur Netlify

## Étapes à suivre

1. **Créez un compte sur Netlify** si ce n'est pas déjà fait:
   - Allez sur [https://app.netlify.com/signup](https://app.netlify.com/signup)
   - Inscrivez-vous avec GitHub, GitLab, Bitbucket ou par email

2. **Depuis le tableau de bord Netlify**:
   - Cliquez sur "Add new site" puis "Import an existing project"
   - Choisissez votre fournisseur Git (GitHub, GitLab, Bitbucket)
   - Autorisez Netlify à accéder à vos dépôts
   - Sélectionnez le dépôt de votre projet Django

3. **Configurez les paramètres de build**:
   - **Build command**: `chmod +x build_files.sh && ./build_files.sh`
   - **Publish directory**: `staticfiles`
   - Cliquez sur "Show advanced" et ajoutez la variable d'environnement:
     - Clé: `NETLIFY`
     - Valeur: `true`

4. **Cliquez sur "Deploy site"**

5. **Une fois le déploiement terminé**:
   - Netlify vous attribuera un sous-domaine (ex: votre-site.netlify.app)
   - Vous pourrez configurer un domaine personnalisé si nécessaire

## Vérification après déploiement

Une fois le site déployé, vérifiez:
- Que les images et fichiers statiques s'affichent correctement
- Que toutes les fonctionnalités du site fonctionnent comme prévu
- Consultez les logs de build en cas de problème pour identifier les erreurs

## Configuration spécifique à Netlify

Tous les fichiers nécessaires ont déjà été configurés dans votre projet:
- `netlify.toml` - Configuration des redirections et du build
- `netlify/functions/django.py` - Point d'entrée pour l'application
- `package.json` - Configuration Node.js de base
- `requirements-netlify.txt` - Dépendances Python spécifiques à Netlify

Bonne chance avec votre déploiement!
